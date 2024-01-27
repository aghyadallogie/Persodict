import TranslateModule from "@/client/ui/modules/Translate/TranslateModule";

describe('Form', () => {
    it('renders the componenn', () => {
        cy.mount(<TranslateModule />);
        cy.getCy('translate-form').should('exist');
    });

    it('renders as a form', () => {
        cy.mount(<TranslateModule />);
        cy.getCy('translate-form').should('be.htmlElement', 'form');
    });

    it('calls onSubmit when translate button is clicked', () => {
        const onSubmit = cy.stub();

        cy.mount(<TranslateModule />);

        cy.getCy('translate-form').get('input[type="text"]').type('example');
        cy.getCy('translate-form').get('button[type="submit"]').click();
        cy.wrap(onSubmit).should('be.calledOnce');
    })
});