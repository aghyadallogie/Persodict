import {prisma} from "@/server/utils/prisma";
import type {Lingo, Word} from "@/server/domain/entities/Word";
import {SettingsService} from "./SettingsService";

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
          authorId
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
   * @returns {Promise<any | Error>} A promise resolving to the translation results if successful,
   * or an error if the operation fails.
   */
  static async translateWord({text, authorId}: Lingo) {
    try {
      const settings = (await SettingsService.getSettings(authorId)) as {
        userLangs: string[];
      };
      const result = await this.translateWordToLangs(text, settings.userLangs);

      return result;
    } catch (error) {
      return error;
    }
  }

  /**
   * Translates a word to a specified language using the DeepL API.
   *
   * This function sends a request to the DeepL API to translate the provided word
   * into the target language. It constructs the API URL using environment variables
   * and returns the translation result.
   *
   * @private
   * @param {string} word - The word to be translated.
   * @param {string} lang - The target language code for the translation.
   * @returns {Promise<{lang: string, lingo: string}>} A promise resolving to an object containing
   * the target language and the translated text.
   * @throws {Error} If the fetch request or response parsing fails.
   */
  private static async translateWithDeepL(word: string, lang: string) {
    const res = await fetch(
      `https://api-free.deepl.com/v2/translate?auth_key=${process.env.NEXT_APP_DEEPL_AUTH_KEY}&text=${word}&target_lang=${lang}`
    );

    const response = (await res.json()) as Word;
    const translation = {
      lang,
      lingo: response.translations[0].text,
    };

    return translation;
  }

  private static async translateWordToLangs(word: string, langs: string[]) {
    const wordsPromises = ["en", ...langs].map(async (lang: string) =>
      this.translateWithDeepL(word, lang)
    );

    const translations = await Promise.all(wordsPromises);

    return translations;
  }

  static async deleteWord(wordId: string) {
    try {
      const deleted = await prisma.word.delete({where: {id: wordId}});

      return deleted;
    } catch (error) {
      console.log("errr", error);
    }
    return undefined;
  }
}