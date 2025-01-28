import {deleteAnimation, optionsVariants, optionVariants} from "@/client/ui/animations/actions";
import {Button} from "@/client/ui/components/action/buttons/Button";
import {Notifications} from "@/client/ui/components/action/Notifications";
import {NoWords} from "@/client/ui/components/layout/NoWords";
import {P} from "@/client/ui/components/layout/Text";
import {renderCorrectFlag} from "@/client/ui/utils";
import {AnimatePresence, motion} from "framer-motion";
import styled from "styled-components";
import {useQuiz} from './useQuiz';

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
    const {options, randomLang, randomWord, streak, validateAnswer, isLoading, words} = useQuiz();

    if (isLoading || !randomWord || !words) return <NoWords />

    if (words.length < 8) return <InsufficientTranslations
        animate="enter"
        exit="exit"
        initial="initial"
        variants={deleteAnimation}
        layout
    >
        You need to make at least <P>8 translations</P> in order to play the Quiz!
    </InsufficientTranslations>

    const renderQuizQuestion = () => (
        <P $align="center">
            What is <Patch>{randomWord}</Patch>
            in &nbsp;<span className={`fi fi-${renderCorrectFlag(randomLang ?? '')}`} />&nbsp;?
        </P>
    );

    const renderStreakMessage = (streak: number) => (
        streak > 0 && <StreakMessage $align="center">
            {streak > 1
                ? `You are on a streak of ${streak} correct answers!`
                : `Great start! Keep going!`}
        </StreakMessage>
    )

    return (
        <>
            <Wrapper>
                {renderQuizQuestion()}
                <AnimatePresence mode="popLayout">
                    <Options
                        as={motion.div}
                        variants={optionsVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        {options.map(option =>
                                <OptonButton key={`option-${option}`} variants={optionVariants}>
                                    <Button label={option} onClick={() => validateAnswer(option)} type="button" />
                                </OptonButton>
                        )}
                    </Options>
                </AnimatePresence>
                {renderStreakMessage(streak)}
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
    background-color: ${({theme}) => theme.colors.hoverColor};
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
    color: ${({theme}) => theme.colors.primaryAccentFontColor};
`;

const InsufficientTranslations = styled(motion.div)`
    color: ${({theme}) => theme.colors.primaryAccentFontColor};
    margin-top: 2rem;
    text-align: center;
    line-height: 3rem;
`;

const OptonButton = styled(motion.div)`
    button {
        height: 5rem;
        line-height: 1.6rem;
    }
`;