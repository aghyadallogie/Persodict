import { useGetUserTranslations } from '@/client/application/useCases/useGetUserTranslations';
import { AnimatePresence } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { NoWords } from './layout/NoWords';
import { WordView } from './WordView';

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
    const { data: session, status } = useSession();
    const { userTranslations } = useGetUserTranslations(session?.user?.email as string);

    const words = userTranslations?.data ?? [];
    const latest = words[words.length - 1];
    const hasWord = status !== "loading" && !!latest?.translations?.length;

    return (
        <AnimatePresence mode="wait">
            {hasWord ? (
                <WordView key={latest!.id} data={latest!.translations} wordId={latest!.id} />
            ) : (
                <NoWords key="no-words" error={error} />
            )}
        </AnimatePresence>
    );
};