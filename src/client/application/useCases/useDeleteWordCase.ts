import useSWRMutation from 'swr/mutation';

import WordsService from '../services/WordsService';

export const useDeleteWordCase = () => {
    const {trigger} = useSWRMutation(
        '/api/words',
        WordsService.deleteWord
    );

    // await mutate('/api/words');

    return {deleteWord: trigger};
};