import type { Word } from "@/client/domain/entities/Word";
import { Button } from "@/client/ui/components/action/buttons/Button";
import { P } from "@/client/ui/components/layout/Text";
import { renderCorrectFlag } from "@/client/ui/utils";
import styled from "styled-components";
import { useQuiz } from './useQuiz';

interface ComponentProps {
    langs: string[];
    words: Word[];
}

export const QuizModule = ({ langs, words }: ComponentProps) => {
    const { options, randomLang, randomWord, streak, validateAnswer } = useQuiz(langs, words);
    console.log(randomWord);

    return (
        <Wrapper
        // animate="enter"
        // exit="exit"
        // initial="initial"
        // variants={childrenAnimation}
        >
            <P $align="center">
                What is <Patch>{randomWord}</Patch>
                in &nbsp; <span className={`fi fi-${renderCorrectFlag(randomLang ?? '')}`} /> &nbsp; ?
            </P>
            <Options
            // animate="enter"
            // exit="exit"
            // initial="initial"
            // variants={deleteAnimation}
            // layout
            >
                {options.map(option => <Button key={option} label={option!} onClick={() => validateAnswer(option!)} type="button" />)}
            </Options>
            {streak > 1 && <StreakMessage $align="center">You are on a streak of {streak} correct answers</StreakMessage>}
        </Wrapper>
    )
}

const Wrapper = styled.div`
    margin-top: 1.6rem;
    color: ${({ theme }) => theme.colors.primaryFontColor};
`

const Patch = styled.span`
    border-radius: 2rem;
    background-color: #e1e1e1;
    font-size: .9rem;
    padding: .3rem .5rem;
    margin: 0 .5rem;
`;

const Options = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin-top: 2rem;
`;

const StreakMessage = styled(P)`
    margin-top: 3rem;
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.primaryAccentFontColor};
`;