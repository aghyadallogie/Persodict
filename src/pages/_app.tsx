import Head from "next/head";
import { AppProps } from "@/types/global";
import type { Session } from "next-auth";
import { Component, ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { GlobalStyles } from "@/client/ui/styles/globalStyles";
import { ThemeProvider } from '@/client/context/ThemeContext';
import { NotificationProvider } from "@/client/ui/components/action/Notifications/NotificationContext";

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
      <ThemeProvider>
        <GlobalStyles />
        <NotificationProvider>
          <SessionProvider session={session}>
            <Head>
              <link
                href="https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.6.6/css/flag-icons.min.css"
                rel="stylesheet"
              />
            </Head>
            {this.chooseLayout()}
          </SessionProvider>
        </NotificationProvider>
      </ThemeProvider>
    );
  }
}

export default App;
