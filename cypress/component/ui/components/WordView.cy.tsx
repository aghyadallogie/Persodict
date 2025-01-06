import { WordView } from "@/client/ui/components/WordView";
import { renderCorrectFlag } from "@/client/ui/utils";
import { ThemeProvider } from "styled-components";

const theme = {
    colors: {
        textPlaceholder: "#989898bf",
        darkSelected: "#333"
    },
    shadows: {
        inputShadow: "inset 5px 5px 10px rgba(0, 0, 0, 0.1), inset -5px -5px 10px #fff",
        buttonShadow: "5px 5px 10px rgb(0, 0, 0, 0.1), -5px -5px 10px #fff"
    },
    gradients: {
        viewBackground: 'linear-gradient(rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.1))',
    },
};

describe('WordView Component', () => {
    it('renders translations correctly', () => {
        const translations = [
            { lang: 'en', lingo: 'Hello' },
            { lang: 'es', lingo: 'Hola' },
        ];

        cy.intercept('GET', '/api/translations', translations).as('getTranslations');

        cy.mount(
            <ThemeProvider theme={theme}>
                <WordView data={translations} wordId="123" />
            </ThemeProvider>);

        translations.forEach((trans) => {
            cy.contains(trans.lingo).should('be.visible');
            cy.get(`.fi.fi-${renderCorrectFlag(trans.lang)}`).should('exist');
        });
    });

    // it('deletes a translation when delete button is clicked', () => {
    //     const translations = [
    //         { lang: 'en', lingo: 'Hello' },
    //         { lang: 'es', lingo: 'Hola' },
    //     ];

    //     const handleDeleteWord = cy.stub();
    //     cy.mount(<WordView data={translations} wordId="123" handleDeleteWord={() => {}} />);

    //     cy.get('DeleteTranslation').click();
    //     cy.wrap(handleDeleteWord).should('have.been.calledOnce');
    // });
});