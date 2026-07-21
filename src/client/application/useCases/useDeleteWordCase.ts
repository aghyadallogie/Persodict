import useSWRMutation from 'swr/mutation';
import { mutate } from 'swr';
import WordsService from '@/client/application/services/WordsService';

const isWordsKey = (key: unknown) => typeof key === 'string' && key.startsWith('/api/words');

export const useDeleteWordCase = () => {
    const {trigger} = useSWRMutation(
        '/api/words',
        WordsService.deleteWord,
        {onSuccess: () => mutate(isWordsKey)}
    );

    return {deleteWord: trigger};
};