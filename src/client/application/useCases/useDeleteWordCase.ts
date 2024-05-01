import useSWRMutation from 'swr/mutation';
import WordsService from '../services/WordsService';

export const useDeleteWordCase = () => {
    const {trigger} = useSWRMutation(
        '/api/words',
        WordsService.deleteWord,
        {revalidate: true}
    );

    return {deleteWord: trigger};
};