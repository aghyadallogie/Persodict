import TranslateModule from "@/client/ui/modules/Translate/TranslateModule";

describe('Form', () => {
    // cy.intercept("GET", "http://localhost")

    it('renders the componenn', () => {
        cy.mount(<TranslateModule />);
        cy.getCy('translate-form').should('exist');
    });

    it('renders as a form', () => {
        cy.mount(<TranslateModule />);
        cy.getCy('translate-form').should('be.htmlElement', 'form');
    });
});