import { childrenAnimation, deleteAnimation } from "@/client/ui/animations/actions";
import { Button } from "@/client/ui/components/action/buttons/Button";
import { NoWords } from "@/client/ui/components/layout/NoWords";
import { P } from "@/client/ui/components/layout/Text";
import { renderCorrectFlag } from "@/client/ui/utils";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { Notifications } from "../../components/action/Notifications";
import { useQuiz } from './useQuiz';

/**
 * QuizModule component renders a quiz question with multiple choice options.
 * It displays the current word in a specified language and allows the user to select an answer.
 * 
 * The component utilizes the `useQuiz` hook to manage quiz state, including options, 
 * the current word, the user's streak, and loading state.
 * 
 * @returns {JSX.Element} The rendered QuizModule component if the user has enough translations.
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
    const { options, randomLang, randomWord, streak, validateAnswer, isLoading, words } = useQuiz();
    if (isLoading || !randomWord) return <NoWords />

    if (words.length < 8) return <InsufficientTranslations
        animate="enter"
        exit="exit"
        initial="initial"
        variants={deleteAnimation}
        layout
    >
        You need to make at least <P>8 translations</P> in order to play the Quiz!
    </InsufficientTranslations>

    return (
        <>
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
            <Notifications />
        </>
    )
}

const Wrapper = styled(motion.div)`
    margin-top: 1.6rem;
`

const Patch = styled.span`
    border-radius: 2rem;
    background-color: ${({ theme }) => theme.colors.hoverColor};
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

const InsufficientTranslations = styled(motion.div)`
    color: ${({ theme }) => theme.colors.primaryAccentFontColor};
    margin-top: 2rem;
    text-align: center;
    line-height: 3rem;
`;