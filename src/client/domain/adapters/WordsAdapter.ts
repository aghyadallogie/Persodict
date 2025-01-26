import type {UserTranslations, Word} from '@/client/domain/entities/Word';
import {Lingo} from '@/server/domain/entities/Word';

export interface WordsAdapter {
    getUserTranslations(userId: string): Promise<UserTranslations | undefined>;
    makeTranslation(key: string, mutationArgs: {arg: Lingo}): Promise<Word | undefined>;
    deleteWord(key: string, mutationArgs: {arg: string}): Promise<string | undefined>;
}