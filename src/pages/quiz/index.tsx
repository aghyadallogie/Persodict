import SessionLayout from "@/client/ui/layouts/Layout";
import { QuizModule } from "@/client/ui/modules/Quiz/QuizModule";
import { Wrapper } from "@/pages/index";
import { NextPageWithLayout } from "@/types/global";

/**
* Quiz component that renders a quiz interface based on the user's available translations.
*
* This component checks the number of words available for the quiz. If the user has more than
* 8 words, it displays the quiz module. Otherwise, it shows a message indicating that the user
* needs to make at least 8 translations to participate in the quiz.
* 
* @param {Object} props - The component props.
* @param {string[]} props.userLangs - An array of languages the user can translate to.
* @param {Word[]} [props.words=[]] - An array of words available for the quiz.
* @returns {JSX.Element} The rendered Quiz component.
*/
const Quiz: NextPageWithLayout = () => {

    return (
        <Wrapper>
            {/* {words.length > 8
            ? */}
            <QuizModule />
            {/* : <InsufficientTranslations
                animate="enter"
                exit="exit"
                initial="initial"
                variants={deleteAnimation}
                layout
            >
                You need to make at least <P>8 translations</P> in order to play the Quiz!
            </InsufficientTranslations>
        } */}
        </Wrapper>
    )
}

// const InsufficientTranslations = styled(motion.div)`
//     margin-top: 5rem;
//     text-align: center;
//     line-height: 3rem;
// `;

export default Quiz;

Quiz.getLayout = (router, pageProps, PageComponent) => (
    <SessionLayout title="Persodict | Quiz">
        <PageComponent router={router} {...pageProps} />
    </SessionLayout>
);

export const getServerSideProps = async () => ({ props: {} });