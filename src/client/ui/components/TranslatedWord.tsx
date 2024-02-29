/* eslint-disable import/no-unresolved */
import {NoWords} from './NoWords';
import {WordView} from './WordView';

import {useGetUserTranslations} from '@/client/application/useCases/useGetUserTranslations';

export const TranslatedWord = () => {
    const {userTranslations} = useGetUserTranslations();
    const mostRecentWord = userTranslations?.data[userTranslations.data.length - 1]?.translations ?? [];
    const mostRecentWordId = userTranslations?.data[userTranslations.data.length - 1]?.id;

    return mostRecentWord.length > 0 ? (
        <WordView data={mostRecentWord} wordId={mostRecentWordId} />
    ) : (
        <NoWords />
    );
};