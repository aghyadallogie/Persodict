import type { Word } from "@/client/domain/entities/Word";
import { NoWords } from "@/client/ui/components/layout/NoWords";
import { WordView } from "@/client/ui/components/WordView";
import { Wrapper } from "@/pages/index";
import { AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { useHistory } from './useHistory';
import { useInfiniteScroll } from './useInfiniteScroll';

/**
 * HistoryModule component displays a list of translations.
 * It utilizes the useHistory hook to fetch the translations and
 * conditionally renders either the translations or a NoWords placeholder component
 * if there are no translations available.
 *
 * Translations are rendered incrementally via infinite scroll, revealing
 * 8 items at a time to keep the rendered node count low.
 *
 * @returns {JSX.Element} The rendered HistoryModule component.
 */
export const HistoryModule = () => {
    const { orderedTranslations } = useHistory()
    const { visibleCount } = useInfiniteScroll(orderedTranslations.length, 8);

    const visibleTranslations = orderedTranslations.slice(0, visibleCount);

    return (
        <Wrapper>
            {orderedTranslations.length ? (
                <WordsWrapper>
                    <AnimatePresence mode="popLayout">
                        {visibleTranslations.map((word: Word) => (
                            <WordView
                                key={word.id}
                                data={word?.translations}
                                wordId={word.id}
                            />
                        ))}
                    </AnimatePresence>
                </WordsWrapper>
            ) : (
                <NoWords error={null} />
            )}
        </Wrapper>
    );
};

const WordsWrapper = styled.div`
  margin-top: 2rem;
`;