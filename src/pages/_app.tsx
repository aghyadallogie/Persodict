import Head from "next/head";
import { ThemeProvider } from "styled-components";
import { theme } from "@/client/ui/utils/globalStyles";
import { AppProps } from "@/types/global";
import type { Session } from "next-auth";
import { Component, ReactNode } from "react";

class App extends Component<AppProps<{ session: Session }>> {
  chooseLayout(): ReactNode {
    const { Component: PageComponent, pageProps, router } = this.props;

    if (PageComponent.getLayout) {
      return PageComponent.getLayout(router, pageProps, PageComponent);
    }

    return <PageComponent {...pageProps} />;
  }

  render(): ReactNode {
    const {
      pageProps: { session },
    } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <Head>
          <link
            href="https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.6.6/css/flag-icons.min.css"
            rel="stylesheet"
          />
        </Head>
        {this.chooseLayout()}
      </ThemeProvider>
    );
  }
}

export default App;
