import { prisma } from "@/server/utils/prisma";
import type {
  DeepLResponse,
  Lingo,
  Translation,
  Word,
} from "@/server/domain/entities/Word";
import { SettingsService } from "./SettingsService";

export class WordService {
  /**
   * Retrieves words from the database for a specific author.
   *
   * This function queries the database using Prisma to fetch all words
   * associated with the provided `authorId`.
   *
   * @param {string} authorId - The ID of the author whose words are to be fetched.
   * @returns {Promise<Array<Word> | Error>} A promise resolving to an array of words if successful,
   * or an error if the query fails.
   */
  static async getWords(authorId: string) {
    try {
      const words = await prisma.word.findMany({
        where: {
          authorId,
        },
      });

      return words;
    } catch (error) {
      return error;
    }
  }

  /**
   * Adds a new word to the database.
   *
   * This function uses Prisma to create a new word record in the database
   * with the provided word details.
   *
   * @param {Word} word - The word object containing details to be added.
   * @param {string} word.authorId - The ID of the author adding the word.
   * @param {string[]} word.translations - An array of translations for the word.
   * @returns {Promise<Word | Error>} A promise resolving to the created word object if successful,
   * or an error if the creation fails.
   */
  static async addWord(word: Word) {
    try {
      const translated = await prisma.word.create({
        data: {
          authorId: word.authorId,
          translations: word.translations,
        },
      });
      return translated;
    } catch (error) {
      return error;
    }
  }

  /**
   * Translates a given word to the user's preferred languages.
   *
   * This function retrieves the user's language settings and translates the provided text
   * into the specified languages.
   *
   * @param {Lingo} param - An object containing the text to translate and the author's ID.
   * @param {string} param.text - The text to be translated.
   * @param {string} param.authorId - The ID of the author whose settings are used for translation.
   * @returns {Promise<Translation[] | Error>} A promise resolving to the translation results if successful,
   * or an error if the operation fails.
   */
  static async translateWord({ text, authorId }: Lingo) {
    try {
      const settings = (await SettingsService.getSettings(authorId)) as {
        userLangs: string[];
      };
      const result = await this.translateWordToLangs(text, settings.userLangs);

      return result as Translation[];
    } catch (error) {
      return error;
    }
  }

  /**
   * Translates a given text into a specified language using the DeepL API with retry logic.
   *
   * This function makes a request to the DeepL API to translate the provided text.
   * It includes retry logic with exponential backoff in case of rate limiting (429 errors).
   *
   * @private
   * @param {string} text - The text to be translated.
   * @param {string} lang - The target language code for translation.
   * @param {number} [retryCount=0] - The current retry attempt count.
   * @returns {Promise<Translation | undefined>} A promise resolving to a translation object containing
   * the target language and translated text, or `undefined` if an error occurs.
   * @throws {Error} If the API key is missing, the request fails, or max retries are reached.
   */
  private static async translateWithDeepL(
    text: string,
    lang: string,
    retryCount = 0
  ): Promise<Translation | undefined> {
    const MAX_RETRIES = 3;

    if (!process.env.NEXT_APP_DEEPL_AUTH_KEY)
      throw new Error("DeepL API key is not configured");

    const params = new URLSearchParams({
      auth_key: process.env.NEXT_APP_DEEPL_AUTH_KEY,
      text: text,
      target_lang: lang,
    });

    try {
      const response = await fetch(`https://api-free.deepl.com/v2/translate?${params}`);

      if (!response.ok)
        throw new Error(`DeepL API error: ${response.status} ${response.statusText}`);

      if (response.status === 429) {
        if (retryCount >= MAX_RETRIES)
          throw new Error("Max retries reached for DeepL API");

        const waitTime = Math.pow(2, retryCount) * 1000;
        await new Promise((resolve) => setTimeout(resolve, waitTime));

        return WordService.translateWithDeepL(text, lang, retryCount + 1);
      }

      const data = (await response.json()) as DeepLResponse;
      if (!data.translations?.[0]?.text)
        throw new Error("Invalid response format from DeepL API");

      return {
        lang,
        lingo: data.translations[0].text,
      };
    } catch (error) {
      console.error("Translation error:", error);
      throw error;
    }
  }

  /**
   * Translates a given text to multiple languages using the DeepL API.
   *
   * This function takes a text and an array of target languages, and returns a
   * promise resolving to an array of translation results. The result array
   * contains the original text in English, followed by the translations in
   * the specified target languages 'langs'.
   *
   * @param {string} text - The text to be translated.
   * @param {string[]} langs - An array of target language codes for the translation.
   * @returns {Promise<Translation[]>} A promise resolving to an array of translation results.
   * @throws {Error} If the fetch request or response parsing fails.
   */
  private static async translateWordToLangs(text: string, langs: string[]) {
    const textPromises = ["en", ...langs].map(async (lang: string) =>
      this.translateWithDeepL(text, lang)
    );

    const translations = await Promise.all(textPromises);
    return translations;
  }

  static async deleteWord(wordId: string) {
    try {
      const deleted = await prisma.word.delete({ where: { id: wordId } });

      return deleted;
    } catch (error) {
      console.log("errr", error);
    }
    return undefined;
  }
}
