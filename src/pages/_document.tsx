import type {ReactElement} from 'react';
import Document, {
    Head,
    Html,
    Main,
    NextScript
} from 'next/document';
import {ServerStyleSheet} from 'styled-components';
import type {
    DocumentContext,
    DocumentInitialProps
} from 'next/document';

export default class AppDocument extends Document {
    static async getInitialProps(
        ctx: DocumentContext
    ): Promise<DocumentInitialProps> {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = async () => originalRenderPage({enhanceApp: App => props => sheet.collectStyles(<App {...props} />)});

            const initialProps = await Document.getInitialProps(ctx);

            return {
                ...initialProps,
                styles: [initialProps.styles, sheet.getStyleElement()]
            };
        } finally {
            sheet.seal();
        }
    }

    render(): ReactElement {
        return (
            <Html lang="en">
                <Head />
                <body style={{fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif"}}>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}