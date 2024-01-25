/* eslint-disable import/no-unresolved */
import {NoWords} from './NoWords';
import {WordView} from './WordView';

import {useGetUserTranslations} from '@/client/application/useCases/useGetUserTranslations';

export const TranslatedWord = () => {
    const {userTranslations} = useGetUserTranslations();
    const mostRecentWord = userTranslations?.data[userTranslations.data.length - 1]?.translations ?? [];

    return mostRecentWord.length > 0 ? (
        <WordView data={mostRecentWord} />
    ) : (
        <NoWords />
    );
};