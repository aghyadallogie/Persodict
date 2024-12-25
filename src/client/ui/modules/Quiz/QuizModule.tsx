import { Button } from "@/client/ui/components/action/buttons/Button";
import { P } from "@/client/ui/components/layout/Text";
import { renderCorrectFlag } from "@/client/ui/utils";
import styled from "styled-components";
import { childrenAnimation, deleteAnimation } from "@/client/ui/animations/actions";
import { useQuiz } from './useQuiz';
import { NoWords } from "@/client/ui/components/layout/NoWords";
import { AnimatePresence, motion } from "framer-motion";

/**
 * QuizModule component renders a quiz question with multiple choice options.
 * It displays the current word in a specified language and allows the user to select an answer.
 * 
 * The component utilizes the `useQuiz` hook to manage quiz state, including options, 
 * the current word, the user's streak, and loading state.
 * 
 * @returns {JSX.Element} The rendered QuizModule component.
 * 
 * @example
 * // Example usage of QuizModule
 * <QuizModule />
 * 
 * @see {@link useQuiz} for the hook that provides quiz state and functionality.
 * @see {@link NoWords} for the component displayed when there are no words to quiz.
 * @see {@link Button} for the button component used for answer options.
 */
export const QuizModule = (): JSX.Element => {
    const { options, randomLang, randomWord, streak, validateAnswer, isLoading } = useQuiz();

    if (isLoading || !randomWord) return <NoWords />

    return (
        <Wrapper
            animate="enter"
            exit="exit"
            initial="initial"
            variants={deleteAnimation}
        >
            <P $align="center">
                What is <Patch>{randomWord}</Patch>
                in &nbsp; <span className={`fi fi-${renderCorrectFlag(randomLang ?? '')}`} /> &nbsp; ?
            </P>
            <AnimatePresence mode="sync">
                <Options
                    animate="enter"
                    exit="exit"
                    initial="initial"
                    variants={deleteAnimation}
                    layout
                >
                    {options.map(option => <motion.div key={option} variants={childrenAnimation}>
                        <Button label={option!} onClick={() => validateAnswer(option!)} type="button" />
                    </motion.div>
                    )}
                </Options>
            </AnimatePresence>
            {streak > 1 && <StreakMessage $align="center">You are on a streak of {streak} correct answers</StreakMessage>}
        </Wrapper>
    )
}

const Wrapper = styled(motion.div)`
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

const Options = styled(motion.div)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin-top: 2rem;

    @media (min-width: 476px) {
        flex-direction: row;
        flex-wrap: wrap;
    }
`;

const StreakMessage = styled(P)`
    margin-top: 3rem;
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.primaryAccentFontColor};
`;