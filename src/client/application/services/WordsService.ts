import { WordsAdapter } from "@/client/domain/WordsAdapter";
import { Word } from "@/client/domain/entities/Word";

class WordsService implements WordsAdapter {
  async makeTranslation(
    url: string,
    { arg }: { arg: Word }
  ): Promise<Word | undefined> {
    const res = await fetch("/api/words", {
      method: "POST",
      body: JSON.stringify(arg),
    });

    const data = await res.json();
    return data;
  }

  async getUserTranslations(userId: string) {
    const res = await fetch("/api/words");
    const data = await res.json();
    return data;
  }
}

export default new WordsService();
