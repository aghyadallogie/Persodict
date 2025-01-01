import { ButtonIcons } from "@/client/ui/assets/images/icons";
import { Button } from "@/client/ui/components/action/buttons/Button";
import { lightTheme } from "@/client/ui/styles/theme";
import { mount } from "cypress/react18";
import { ThemeProvider } from 'styled-components';

describe('Button Component', () => {
    beforeEach(() => {
        mount(
            <ThemeProvider theme={lightTheme}>
                <Button onClick={() => { }} type="button" label="Click Me" />
            </ThemeProvider>
        );
    });

    it('renders with the correct label', () => {
        cy.get('button').contains('Click Me');
    });

    it('is disabled when isDisabled prop is true', () => {
        mount(
            <ThemeProvider theme={lightTheme}>
                <Button label="Click Me" onClick={() => { }} isDisabled></Button>
            </ThemeProvider>
        );
        cy.get('button').should('be.disabled');
    });

    it('triggers onClick when clicked', () => {
        const onClickSpy = cy.spy().as('onClickSpy');
        mount(
            <ThemeProvider theme={lightTheme}>
                <Button label="Click Me" onClick={onClickSpy} type="button" />
            </ThemeProvider>
        );
        cy.get('button').click();
        cy.get('@onClickSpy').should('have.been.called');
    });

    it('displays the icon on the left when position is left', () => {
        mount(
            <ThemeProvider theme={lightTheme}>
                <Button label="Click Me" icon={ButtonIcons.Translate} position="left" />
            </ThemeProvider>
        );
        cy.get('button').find('svg').should('exist');
    });

    it('displays the icon on the right when position is right', () => {
        mount(
            <ThemeProvider theme={lightTheme}>
                <Button label="Click Me" icon={ButtonIcons.Translate} position="right" />
            </ThemeProvider>
        );
        cy.get('button').find('svg').should('exist');
    });
});