import useSWR from 'swr';

import WordsService from '../services/WordsService';

export const useGetUserTranslations = () => {
    const {data} = useSWR(
        '/api/words',
        WordsService.getUserTranslations
    );

    return {userTranslations: data};
};