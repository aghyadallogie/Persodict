import { prisma } from "../utils/prisma";

import type { Lingo, Word } from "../domain/entities/Word";
import { SettingsService } from "./SettingsService";

export class WordService {
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
      return undefined;
    }
  }

  static async translateWord({ text, authorId }: Lingo) {
    try {
      const settings = (await SettingsService.getSettings(authorId)) as {
        userLangs: string[];
      };
      const result = await this.translateWordToLangs(text, settings.userLangs);

      return result;
    } catch (error) {
      return undefined;
    }
  }

  static async translateWithDeepL(word: string, lang: string) {
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

  static async translateWordToLangs(word: string, langs: string[]) {
    const wordsPromises = ["en", ...langs].map(async (lang: string) =>
      this.translateWithDeepL(word, lang)
    );

    const translations = await Promise.all(wordsPromises);

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
