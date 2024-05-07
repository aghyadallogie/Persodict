/* eslint-disable import/no-unresolved */
import {AnimatePresence} from 'framer-motion';

import {NoWords} from './NoWords';
import {WordView} from './WordView';
import {useGetUserTranslations} from '@/client/application/useCases/useGetUserTranslations';

export const TranslatedWord = () => {
    const {userTranslations} = useGetUserTranslations();
    const mostRecentWord = userTranslations.data[userTranslations.data.length - 1]?.translations ?? [];
    const mostRecentWordId = userTranslations.data[userTranslations.data.length - 1]?.id;

    return mostRecentWord.length > 0 ? (
        <AnimatePresence mode="wait">
            <WordView key={mostRecentWordId} data={mostRecentWord} wordId={mostRecentWordId} />
        </AnimatePresence>

    ) : (
        <NoWords />
    );
};