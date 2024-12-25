import { Button } from "@/client/ui/components/action/buttons/Button";
import { P } from "@/client/ui/components/layout/Text";
import { renderCorrectFlag } from "@/client/ui/utils";
import styled from "styled-components";
import { childrenAnimation, deleteAnimation } from "@/client/ui/animations/actions";
import { useQuiz } from './useQuiz';
import { NoWords } from "@/client/ui/components/layout/NoWords";
import { AnimatePresence, motion } from "framer-motion";

export const QuizModule = () => {
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
`;

const StreakMessage = styled(P)`
    margin-top: 3rem;
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.primaryAccentFontColor};
`;