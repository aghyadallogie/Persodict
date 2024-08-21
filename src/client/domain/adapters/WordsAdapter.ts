import type {MutationArgs, UserTranslations, Word} from '@/client/domain/entities/Word';

export interface WordsAdapter {
    getUserTranslations(userId: string): Promise<UserTranslations | undefined>;
    makeTranslation(key: string, mutationArgs: MutationArgs): Promise<Word | undefined>;
}