import { AnimatePresence } from 'framer-motion';
import { NoWords } from './layout/NoWords';
import { WordView } from './WordView';
import { useGetUserTranslations } from '@/client/application/useCases/useGetUserTranslations';
import { useSession } from 'next-auth/react';

/**
 * The `TranslatedWord` Component displays the most recent translated word.
 * It utilizes animations for word transitions.
 *
 * @returns A React element representing the `TranslatedWord` component.
 *
 * @example
 * ```tsx
 * const MyComponent = <TranslatedWord />;
 * ```
 */
export const TranslatedWord = () => {
    const { data: session } = useSession();
    const { userTranslations } = useGetUserTranslations(session?.user?.email as string);

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