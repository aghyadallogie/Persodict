import React from 'react'
import { NoWords } from "@/client/ui/components/layout/NoWords";
import { WordView } from "@/client/ui/components/WordView";
import { AnimatePresence } from "framer-motion";
import { Wrapper } from "@/pages/index";
import type { Word } from "@/client/domain/entities/Word";
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

    return (
        <Wrapper>
            {orderedTranslations.length ? (
                <WordsWrapper>
                    <AnimatePresence mode="sync">
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
                <NoWords />
            )}
        </Wrapper>
    );
};

const WordsWrapper = styled.div`
  margin-top: 2rem;
`;