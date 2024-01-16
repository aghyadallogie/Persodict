import { Langs } from "../controllers/WordController";
import { Lingo, Word } from "../domain/entities/Word";
import { prisma } from "../utils/prisma";

export class WordService {
  static async getWords() {
    try {
      const words = await prisma.word.findMany();

      return words;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  static async addWord(word: Word) {
    try {
      const translated = await prisma.word.create({
        data: {
          authorId: word.authorId,
          translation: word.translation,
        },
      });

      return translated;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  static async translateWord({ text }: Lingo) {
    try {
      const result = await this.translateWordToLangs(text, Langs);

      return result;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  static async translateWithDeepL(word: string, lang: string) {
    const res = await fetch(
      `https://api-free.deepl.com/v2/translate?auth_key=${process.env.NEXT_APP_DEEPL_AUTH_KEY}&text=${word}&target_lang=${lang}`
    );

    const response = await res.json();

    const translation = {
      lang,
      lingo: response.translations[0].text,
    };

    return translation;
  }

  static async translateWordToLangs(word: string, langs: string[]) {
    const wordsPromises = ["en", ...langs].map(
      async (lang: string) => await this.translateWithDeepL(word, lang)
    );

    const translations = await Promise.all(wordsPromises);

    return translations;
  }
}
