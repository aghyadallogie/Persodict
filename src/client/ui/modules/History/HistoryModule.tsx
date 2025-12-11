import type { Word } from "@/client/domain/entities/Word";
import { NoWords } from "@/client/ui/components/layout/NoWords";
import { WordView } from "@/client/ui/components/WordView";
import { Wrapper } from "@/pages/index";
import { AnimatePresence } from "framer-motion";
import { useMemo } from 'react';
import styled from "styled-components";
import { useHistory } from './useHistory';

/**
 * HistoryModule component displays a list of ordered translations.
 * It utilizes the useHistory hook to fetch the translations and 
 * conditionally renders either the translations or a NoWords component 
 * if there are no translations available.
 *
 * @returns {JSX.Element} The rendered HistoryModule component.
 */
export const HistoryModule = () => {
    const { orderedTranslations } = useHistory()

    const wordsList = useMemo(() => (
        orderedTranslations?.map((word: Word) => (
            <WordView
                key={word.id}
                data={word?.translations}
                wordId={word.id}
            />
        ))
    ), [orderedTranslations]);

    return (
        <Wrapper>
            {wordsList.length ? (
                <WordsWrapper>
                    <AnimatePresence mode="popLayout">
                        {orderedTranslations?.map((word: Word) => (
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