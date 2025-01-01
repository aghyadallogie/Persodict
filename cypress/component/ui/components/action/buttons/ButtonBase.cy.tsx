import { ButtonBase } from "@/client/ui/components/action/buttons/ButtonBase";
import { lightTheme } from "@/client/ui/styles/theme";
import { mount } from "cypress/react18";
import { ThemeProvider } from 'styled-components';

describe('ButtonBase Component', () => {
    beforeEach(() => {
        mount(
            <ThemeProvider theme={lightTheme}>
                <ButtonBase onClick={() => { }}>{'Click Me'}</ButtonBase>
            </ThemeProvider>
        );
    });

    it('renders correctly', () => {
        cy.get('button').should('exist');
    });

    it('displays children correctly', () => {
        cy.get('button').contains('Click Me');
    });

    it('is disabled when isDisabled prop is true', () => {
        mount(
            <ThemeProvider theme={lightTheme}>
                <ButtonBase onClick={() => { }} isDisabled>{'Click Me'}</ButtonBase>
            </ThemeProvider>
        );
        cy.get('button').should('be.disabled');
    });

    it('is active when isActive prop is true', () => {
        mount(
            <ThemeProvider theme={lightTheme}>
                <ButtonBase onClick={() => { }} isActive>{'Click Me'}</ButtonBase>
            </ThemeProvider>
        );
        cy.get('button').should('have.class', 'active');
    });
});