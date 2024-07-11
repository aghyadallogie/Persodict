/* eslint-disable import/no-unresolved */
import { AnimatePresence } from 'framer-motion';

import { NoWords } from './layout/NoWords';
import { WordView } from './WordView';
import { useGetUserTranslations } from '@/client/application/useCases/useGetUserTranslations';
import { useSession } from 'next-auth/react';

export const TranslatedWord = () => {
    const { data: session } = useSession();

    const { userTranslations } = useGetUserTranslations({
        authorId: session?.user?.email as string,
        wordData: []
    });
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