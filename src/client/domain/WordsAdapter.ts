import { Word } from "./entities/Word";

export interface WordsAdapter {
    makeTranslation(key: string, mutationArgs: any): Promise<Word | undefined>;
}