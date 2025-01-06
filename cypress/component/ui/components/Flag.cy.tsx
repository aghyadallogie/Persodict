import { Flag } from '@/client/ui/components/Flag';
import { lightTheme } from '@/client/ui/styles/theme';
import { ThemeProvider } from 'styled-components';

describe('Flag Component', () => {
    const mockUserSettings = {
        data: {
            userLangs: ['en', 'es']
        }
    };

    const mockUpdateSettings = cy.stub().as('updateSettings');

    beforeEach(() => {
        // Reset handlers before each test
        cy.stub(window, 'useGetUserSettings').returns({ userSettings: mockUserSettings });
        cy.stub(window, 'useUpdateSettings').returns({
            handleUpdateSettings: mockUpdateSettings,
            isLoading: false
        });
    });

    it('renders with correct flag class when not loading', () => {
        cy.mount(
            <ThemeProvider theme={lightTheme}>
                <Flag
                    langCode="en"
                    langFlag="fi fi-gb"
                    userId="123"
                />
            </ThemeProvider>
        );

        cy.get('div').should('have.class', 'fi-gb');
    });

    it('shows loading state correctly', () => {
        // Override the useUpdateSettings mock for loading state
        cy.stub(window, 'useUpdateSettings').returns({
            handleUpdateSettings: mockUpdateSettings,
            isLoading: true
        });

        cy.mount(
            <ThemeProvider theme={lightTheme}>
                <Flag
                    langCode="en"
                    langFlag="fi fi-gb"
                    userId="123"
                />
            </ThemeProvider>
        );

        cy.get('div').should('have.class', 'loading');
        cy.get('div').should('not.have.class', 'fi-gb');
    });

    it('reflects picked state correctly', () => {
        cy.mount(
            <ThemeProvider theme={lightTheme}>
                <Flag
                    langCode="en"
                    langFlag="fi fi-gb"
                    userId="123"
                />
            </ThemeProvider>
        );

        // Check if the picked state is reflected in styling
        // Adjust the assertion based on how $picked affects your styling
        cy.get('div').should('have.attr', 'data-picked', 'true');
    });

    it('handles click events correctly when not loading', () => {
        cy.mount(
            <ThemeProvider theme={lightTheme}>
                <Flag
                    langCode="en"
                    langFlag="fi fi-gb"
                    userId="123"
                />
            </ThemeProvider>
        );

        cy.get('div').click();
        cy.get('@updateSettings').should('have.been.called');
    });

    it('does not handle clicks when loading', () => {
        // Override the useUpdateSettings mock for loading state
        cy.stub(window, 'useUpdateSettings').returns({
            handleUpdateSettings: mockUpdateSettings,
            isLoading: true
        });

        cy.mount(
            <ThemeProvider theme={lightTheme}>
                <Flag
                    langCode="en"
                    langFlag="fi fi-gb"
                    userId="123"
                />
            </ThemeProvider>
        );

        cy.get('div').click();
        cy.get('@updateSettings').should('not.have.been.called');
    });

    it('renders with unpicked state correctly', () => {
        // Override the userSettings mock for unpicked state
        cy.stub(window, 'useGetUserSettings').returns({
            userSettings: {
                data: {
                    userLangs: ['fr', 'de']  // doesn't include 'en'
                }
            }
        });

        cy.mount(
            <ThemeProvider theme={lightTheme}>
                <Flag
                    langCode="en"
                    langFlag="fi fi-gb"
                    userId="123"
                />
            </ThemeProvider>
        );

        // Check if the unpicked state is reflected in styling
        cy.get('div').should('have.attr', 'data-picked', 'false');
    });
});