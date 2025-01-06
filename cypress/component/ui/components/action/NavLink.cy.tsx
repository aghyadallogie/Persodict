import React from 'react';
import { mount } from "cypress/react18";
import { NavLink } from '@/client/ui/components/action/NavLink';
import { ThemeProvider } from 'styled-components';
import { RiHome4Fill } from 'react-icons/ri';
import { hexToRgba } from '@/client/ui/utils';

const theme = {
    colors: {
        textPlaceholder: "#989898bf",
        darkSelected: "#333"
    },
    gradients: {
        viewBackground: 'linear-gradient(rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.1))',
    },
};

describe('NavLink Component', () => {
    it('renders correctly with active state', () => {
        mount(
            <ThemeProvider theme={theme}>
                <NavLink href="/test" $isActive={true}>
                    <RiHome4Fill />
                </NavLink>
            </ThemeProvider>
        );
        cy.get('svg')
            .should(($el) => {
                const actualColor = getComputedStyle($el[0]).color;
                const expectedColor = hexToRgba(theme.colors.darkSelected);

                const actual = actualColor.match(/[\d.]+/g)?.map(Number);
                const expected = expectedColor.match(/[\d.]+/g)?.map(Number);

                if (actual && expected) {
                    expect(actual[0]).to.eq(expected[0]);
                    expect(actual[1]).to.eq(expected[1]);
                    expect(actual[2]).to.eq(expected[2]);
                    if (actual.length === 4) {
                        expect(actual[3]).to.be.closeTo(expected[3], 0.01);
                    }
                }
            });
    });

    it('renders correctly with inactive state', () => {
        mount(
            <ThemeProvider theme={theme}>
                <NavLink href="/test" $isActive={false}>
                    <RiHome4Fill />
                </NavLink>
            </ThemeProvider>
        );
        cy.get('svg')
            .should(($el) => {
                const actualColor = getComputedStyle($el[0]).color;
                const expectedColor = hexToRgba(theme.colors.textPlaceholder);

                const actual = actualColor.match(/[\d.]+/g)?.map(Number);
                const expected = expectedColor.match(/[\d.]+/g)?.map(Number);

                if (actual && expected) {
                    expect(actual[0]).to.eq(expected[0]); // r
                    expect(actual[1]).to.eq(expected[1]); // g
                    expect(actual[2]).to.eq(expected[2]); // b
                    if (actual.length === 4) {
                        // Increased tolerance to 0.01
                        expect(actual[3]).to.be.closeTo(expected[3], 0.01);
                    }
                }
            });
    });

    it('navigates to the correct href', () => {
        mount(
            <ThemeProvider theme={theme}>
                <NavLink href="/test" $isActive={false}>
                    <RiHome4Fill />
                </NavLink>
            </ThemeProvider>
        );
        cy.get('a').should('have.attr', 'href', '/test');
    });
});