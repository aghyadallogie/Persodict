/* eslint-disable no-undef */
/// <reference types="cypress" />

import './commands';

type Fn<I, O> = (...input: I) => O;

declare global {
    namespace Cypress {
        interface Chainable {
            /**
             * Custom command to select DOM element by data-cy attribute.
             *
             * @example cy.getCy('greeting')
             */
            getCy(value: string): Chainable<JQuery>;

            /**
             * Custom command to mount hooks for testing.
             *
             * @example cy.mountHook(useHook);
             */
            mountHook<T extends (...args: any) => any>(hook: T):
                Chainable<{
                    MockComponent(props: {children?(data: ReturnType<T>): ReactNode}): ReactElement;
                    values: {current: ReturnType<T> | null};
                }>;

            /**
             * Custom command to mount hooks for testing.
             *
             * @example cy.mountHook(useHook);
             */
            mountHooks<T extends Fn<any, any>[]>(...args: T):
                Chainable<{
                    MockComponent(props: {children?(data: ReturnType<T[number]>[]): ReactNode}): ReactElement;
                    values: {current: ReturnType<T[number]>[] | null};
                }>;
        }

        interface Chainer<Subject> {
            /**
             * Custom Chai assertion that checks if given subject is an specific HTML element.
             *
             * @example
             * ```
             * expect('foo').to.be.an.htmlElement('button)
             * cy.wrap('foo').should('be.an.htmlElement', 'button')
             * ```
             */
            (chainer: 'be.an.htmlElement', value: string): Chainable<Subject>;
            /**
             * Custom Chai assertion that checks if given subject is an specific HTML element.
             *
             * @example
             * ```
             * expect('foo').to.not.be.an.htmlElement('button)
             * cy.wrap('foo').should('not.be.an.htmlElement', 'button')
             * ```
             */
            // eslint-disable-next-line @typescript-eslint/unified-signatures
            (chainer: 'not.be.an.htmlElement', value: string): Chainable<Subject>;
            /**
             * Custom Chai assertion that checks if given subject is an specific HTML element.
             *
             * @example
             * ```
             * expect('foo').to.be.dark
             * cy.wrap('foo').should('be.dark')
             * ```
             */
            // eslint-disable-next-line @typescript-eslint/unified-signatures
            (chainer: 'be.dark'): Chainable<Subject>;
            /**
             * Custom Chai assertion that checks if given subject is an specific HTML element.
             *
             * @example
             * ```
             * expect('foo').to.not.be.dark
             * cy.wrap('foo').should('not.be.dark')
             * ```
             */
            // eslint-disable-next-line @typescript-eslint/unified-signatures
            (chainer: 'not.be.dark'): Chainable<Subject>;
            /**
             * Custom Chai assertion that checks if given subject is an specific HTML element.
             *
             * @example
             * ```
             * expect('foo').to.be.darker
             * cy.wrap('foo').should('be.darker')
             * ```
             */
            // eslint-disable-next-line @typescript-eslint/unified-signatures
            (chainer: 'be.darker'): Chainable<Subject>;
            /**
             * Custom Chai assertion that checks if given subject is an specific HTML element.
             *
             * @example
             * ```
             * expect('foo').to.not.be.darker
             * cy.wrap('foo').should('not.be.darker')
             * ```
             */
            // eslint-disable-next-line @typescript-eslint/unified-signatures
            (chainer: 'not.be.darker'): Chainable<Subject>;
            /**
             * Custom Chai assertion that checks if given subject is an specific color.
             *
             * @example
             * ```
             * expect('foo').to.be.colored(color)
             * cy.wrap('foo').should('have.css', 'background-color').and('be.colored', color)
             * ```
             */
            // eslint-disable-next-line @typescript-eslint/unified-signatures
            (chainer: 'be.colored'): Chainable<Subject>;
            /**
             * Custom Chai assertion that checks if given subject is an specific color.
             *
             * @example
             * ```
             * expect('foo').to.not.be.colored(color)
             * cy.wrap('foo').should('have.css', 'background-color').and('not.be.colored', color)
             * ```
             */
            // eslint-disable-next-line @typescript-eslint/unified-signatures
            (chainer: 'not.be.colored'): Chainable<Subject>;
        }
    }
}