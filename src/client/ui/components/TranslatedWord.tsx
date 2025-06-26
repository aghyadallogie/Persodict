import { AnimatePresence } from 'framer-motion';
import { NoWords } from './layout/NoWords';
import { WordView } from './WordView';
import { useGetUserTranslations } from '@/client/application/useCases/useGetUserTranslations';
import { useSession } from 'next-auth/react';

/**
 * The `TranslatedWord` Component displays the most recent translated word.
 * It utilizes animations for word transitions.
 * 
 * @param {string | null} error - The error message to display.
 *
 * @returns A React element representing the `TranslatedWord` component.
 *
 * @example
 * ```tsx
 * const MyComponent = <TranslatedWord />;
 * ```
 */
export const TranslatedWord = ({ error }: { error: string | null }) => {
    const {data: session, status } = useSession();
    const { userTranslations } = useGetUserTranslations(session?.user?.email as string, status);
    const mostRecentWord = userTranslations?.data[userTranslations.data.length - 1]?.translations ?? [];
    const mostRecentWordId = userTranslations?.data[userTranslations.data.length - 1]?.id;

    if (status === "loading") return <NoWords error={error} />

    return mostRecentWord.length > 0 ? (
        <AnimatePresence mode="wait">
            <WordView key={mostRecentWordId} data={mostRecentWord} wordId={mostRecentWordId} />
        </AnimatePresence>

    ) : (
        <NoWords error={error} />
    );
};