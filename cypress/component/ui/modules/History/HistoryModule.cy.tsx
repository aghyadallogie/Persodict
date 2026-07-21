import { HistoryModule } from "@/client/ui/modules/History/HistoryModule";
import { lightTheme } from "@/client/ui/styles/theme";
import { mount } from "cypress/react18";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "styled-components";

const authorId = "user-123";

const fakeSession = {
    user: { id: authorId, email: authorId, name: "Test User" },
    expires: "2099-01-01T00:00:00.000Z",
};

const word = (id: string, lingo: string) => ({
    authorId,
    id,
    translations: [{ lang: "en", lingo }],
});

describe("HistoryModule - deleting a word updates the visible list", () => {
    beforeEach(() => {
        // A stateful fake backend: deleting a word must be reflected in the
        // *next* GET response, exactly like the real API. A static fixture
        // would hide this regression by always returning the original list.
        let words = [word("word-1", "Hello"), word("word-2", "Goodbye")];

        cy.intercept("GET", "/api/auth/session", fakeSession);
        cy.intercept("GET", `/api/words?authorId=${authorId}`, (req) => {
            req.reply({ data: words, status: "OK" });
        }).as("getWords");
        cy.intercept("DELETE", "/api/words/word-1", (req) => {
            words = words.filter((w) => w.id !== "word-1");
            req.reply({ data: "word-1", status: "OK" });
        }).as("deleteWord");

        mount(
            <SessionProvider session={fakeSession}>
                <ThemeProvider theme={lightTheme}>
                    <HistoryModule />
                </ThemeProvider>
            </SessionProvider>
        );

        cy.wait("@getWords");
    });

    it("removes the deleted word from the DOM without a page reload", () => {
        cy.contains("Hello").should("be.visible");
        cy.contains("Goodbye").should("be.visible");

        cy.get('[data-cy="word-view"][data-word-id="word-1"]')
            .find('[data-cy="delete-word"]')
            .click();

        cy.wait("@deleteWord");

        // Regression guard: the backend can succeed while the SWR cache the
        // list reads from is never told to revalidate, leaving the deleted
        // word visible until a manual reload. This must not happen.
        cy.contains("Hello", { timeout: 4000 }).should("not.exist");
        cy.contains("Goodbye").should("be.visible");
    });
});
