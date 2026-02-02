import type {
  DeepLResponse,
  Lingo,
  Translation,
  Word,
} from "@/server/domain/entities/Word";
import { prisma } from "@/server/utils/prisma";
import { Word as PrismaWord } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { SettingsService } from "./SettingsService";

export class WordService {
  /**
   * Retrieves a list of words associated with the specified authorId.
   *
   * This method queries the database to find words associated with the provided `authorId`.
   * If no words are found, it explicitly returns `null`.
   *
   * @param {string} authorId - The unique identifier of the author whose words are to be fetched.
   * @returns {Promise<PrismaWord[] | null>} A promise resolving to the author's words or `null` if not found.
   * @throws Will throw an error if the words cannot be fetched due to a database error.
   */
  static async getWords(authorId: string): Promise<PrismaWord[] | null> {
    try {
      const words = await prisma.word.findMany({
        where: {
          authorId,
        },
      });

      return words ?? null;
    } catch (error) {
      console.error("Error fetching words:", error);
      throw new Error("Failed to fetch words for the specified authorId"); // Throw an error with a custom message
    }
  }

  /**
   * Adds a new word to the database.
   *
   * This method takes in a `Word` object and adds it to the database.
   * If the word is invalid, it throws an error.
   *
   * @param {Word} word - The word to be added.
   * @returns {Promise<PrismaWord>} A promise resolving to the newly added word.
   * @throws {Error} Will throw an error if the word is invalid or if there is a database error.
   */
  static async addWord(word: Word): Promise<PrismaWord> {
    try {
      if (
        !word.authorId ||
        !word.translations ||
        word.translations.length === 0
      ) {
        throw new Error("Invalid word data.");
      }

      const translated = await prisma.word.create({
        data: {
          authorId: word.authorId,
          translations: word.translations,
        },
      });

      return translated;
    } catch (error) {
      console.error("Error adding word:", error);
      throw new Error("Failed to add word.");
    }
  }

  /**
   * Translates a given text into multiple languages specified in the user's settings.
   *
   * This method retrieves the language settings for the user identified by `authorId`
   * and translates the provided `text` into those languages.
   *
   * @param {Lingo} param - An object containing the text to be translated and the author's ID.
   * @param {string} param.text - The text to be translated.
   * @param {string} param.authorId - The ID of the author whose language settings are used for translation.
   *
   * @returns {Promise<Translation[]>} A promise that resolves to an array of translations.
   * @throws Will throw an error if no language settings are found for the user or if translation fails.
   */
  static async translateWord({
    text,
    authorId,
  }: Lingo): Promise<Translation[]> {
    try {
      const settings = await SettingsService.getSettings(authorId);

      if (!settings || !settings.userLangs || settings.userLangs.length === 0) {
        throw new Error("No language settings found for user.");
      }

      const result = await this.translateWordToLangs(text, settings.userLangs);

      return result as Translation[];
    } catch (error) {
      console.error("Error translating word for user: ", error);
      throw new Error("Failed to translate word.");
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

    const apiKey = process.env.NEXT_APP_DEEPL_AUTH_KEY;

    if (!apiKey) {
      console.error("DeepL API key is not configured");
      throw new Error("DeepL API key is not configured");
    }

    try {
      const url = `https://api-free.deepl.com/v2/translate`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `DeepL-Auth-Key ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: [text],
          target_lang: lang.toUpperCase(),
        }),
      });

      if (response.status === 403) {
        const errorText = await response.text();
        console.error("DeepL 403 Error details:", errorText);
        throw new Error(
          `DeepL API authentication failed. Please check your API key. Error: ${errorText}`
        );
      }

      if (response.status === 429) {
        if (retryCount >= MAX_RETRIES)
          throw new Error("Max retries reached for DeepL API");

        const waitTime = Math.pow(2, retryCount) * 1000;
        console.log(`Rate limited. Waiting ${waitTime}ms before retry...`);
        await new Promise((resolve) => setTimeout(resolve, waitTime));

        return WordService.translateWithDeepL(text, lang, retryCount + 1);
      }

      if (!response.ok) {
        const errorText = await response.text();
        console.error("DeepL API error details:", errorText);
        throw new Error(
          `DeepL API error: ${response.status} ${response.statusText} - ${errorText}`
        );
      }

      const data = (await response.json()) as DeepLResponse;

      if (!data.translations?.[0]?.text) {
        console.error("Invalid DeepL response:", JSON.stringify(data));
        throw new Error("Invalid response format from DeepL API");
      }

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
   * Translates a given text to an array of languages using the DeepL API.
   *
   * @param {string} text - The text to translate.
   * @param {string[]} langs - The languages to translate the text to.
   *
   * @returns {Promise<Translation[]>} A promise resolving to an array of translations in the same order as the input languages.
   * Each translation object contains the translated text and the target language.
   *
   * @throws {Error} If the text is empty or if an error occurs when translating.
   */
  private static async translateWordToLangs(text: string, langs: string[]) {
    if (!text.trim()) {
      throw new Error("Text cannot be empty");
    }

    const translationPromises = ["en", ...langs].map(async (lang) =>
      this.translateWithDeepL(text, lang)
    );

    const results = await Promise.allSettled(translationPromises);

    return results
      .filter(
        (result): result is PromiseFulfilledResult<Translation> =>
          result.status === "fulfilled"
      )
      .map((result) => result.value);
  }

  /**
   * Deletes a word from the database by its ID.
   *
   * This method attempts to delete a word from the database using the provided `wordId`.
   * If the word with the specified ID is not found, it logs a warning and returns `null`.
   * Throws an error if the deletion fails for any other reason.
   *
   * @param {string} wordId - The unique identifier of the word to be deleted.
   * @returns {Promise<PrismaWord | null>} A promise resolving to the deleted word object or `null` if not found.
   * @throws Will throw an error if the deletion fails due to a database error other than "word not found".
   */
  static async deleteWord(wordId: string) {
    try {
      return await prisma.word.delete({ where: { id: wordId } });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        console.error("Word with ID not found.");
        return null;
      }

      console.error("Error deleting word:", error);
      throw new Error("Failed to delete word");
    }
  }
}
