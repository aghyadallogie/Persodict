import type {UserTranslations, Word} from '@/client/domain/entities/Word';
import type {WordsAdapter} from '@/client/domain/WordsAdapter';
import type {Lingo} from '@/server/domain/entities/Word';

class WordsService implements WordsAdapter {
    async makeTranslation(
        url: string,
        {arg}: {arg: Lingo}
    ): Promise<Word | undefined> {
        const res = await fetch('/api/words', {
            body: JSON.stringify(arg),
            method: 'POST'
        });

        const data = await res.json() as Word;

        return data;
    }

    async getUserTranslations() {
        const res = await fetch('/api/words');
        const data = await res.json();

        return data as UserTranslations;
    }
}

export default new WordsService();