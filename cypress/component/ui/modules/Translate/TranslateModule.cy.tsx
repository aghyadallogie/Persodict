import TranslateModule from "@/client/ui/modules/Translate/TranslateModule";
import { lightTheme } from "@/client/ui/styles/theme";
import { mount } from "cypress/react18";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "styled-components";

const authorId = "user-123";

const fakeSession = {
    user: { id: authorId, email: authorId, name: "Test User" },
    expires: "2099-01-01T00:00:00.000Z",
};

describe("TranslateModule - submitting a word updates the visible translation", () => {
    beforeEach(() => {
        cy.intercept("GET", "/api/auth/session", fakeSession);
        cy.intercept("GET", `/api/settings?userId=${authorId}`, {
            data: { userId: authorId, userLangs: ["de"] },
            status: "OK",
        });
        // A stateful fake backend: the new translation must appear in the
        // *next* GET response, exactly like the real API. A static fixture
        // would hide this regression by always returning the original list.
        let words: unknown[] = [];

        cy.intercept("GET", `/api/words?authorId=${authorId}`, (req) => {
            req.reply({ data: words, status: "OK" });
        }).as("getWords");
        cy.intercept("POST", "/api/words", (req) => {
            const newWord = {
                authorId,
                id: "word-new",
                translations: [
                    { lang: "en", lingo: "river" },
                    { lang: "de", lingo: "Fluss" },
                ],
            };
            words = [...words, newWord];
            req.reply({ data: newWord, status: "OK" });
        }).as("postWord");

        mount(
            <SessionProvider session={fakeSession}>
                <ThemeProvider theme={lightTheme}>
                    <TranslateModule />
                </ThemeProvider>
            </SessionProvider>
        );

        cy.wait("@getWords");
    });

    it("shows the newly translated word without a page reload", () => {
        cy.get('[data-cy="translate-input"]').type("river");
        cy.get('[data-cy="translate-form"]').submit();

        cy.wait("@postWord");

        // Regression guard: the backend can succeed while the SWR cache the
        // "most recent word" view reads from is never told to revalidate,
        // leaving the newly translated word invisible until a manual reload.
        cy.contains("Fluss", { timeout: 4000 }).should("be.visible");
    });
});
