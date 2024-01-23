import type {UserTranslations, Word} from './entities/Word';

export interface WordsAdapter {
    getUserTranslations(userId: string): Promise<UserTranslations | undefined>;
    makeTranslation(key: string, mutationArgs: any): Promise<Word | undefined>;
}