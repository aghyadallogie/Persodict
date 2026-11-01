import type { DocumentContext, DocumentInitialProps } from "next/document";
import Document, { Head, Html, Main, NextScript } from "next/document";
import type { ReactElement } from "react";
import { ServerStyleSheet } from "styled-components";

export default class AppDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = async () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: [initialProps.styles, sheet.getStyleElement()],
      };
    } finally {
      sheet.seal();
    }
  }

  render(): ReactElement {
    return (
      <Html lang="en">
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(){try{var t=localStorage.getItem('theme');var d=t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(d){var s=document.createElement('style');s.id='theme-preload';s.textContent='html,body{background:#1c1d1e !important}';document.head.appendChild(s);document.documentElement.style.colorScheme='dark';}}catch(e){}})();`,
            }}
          />
        </Head>
        <body
          style={{
            fontFamily:
              "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
          }}
        >
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
