import { NextComponentType, NextPage, NextPageContext } from "next";
import type { AppProps as NextAppProps } from "next/app";
import type { NextRouter } from "next/router";

type NextPageWithLayout<T = any> = NextPage<T> & Layout<T>;
type NextComponentWithLayout = NextComponentType<NextPageContext, any, any> & Partial<NextPageWithLayout>;

export interface Layout<T> {
    getLayout: GetLayout<T>;
}

export type GetLayout<T> = (router: NextRouter, pageProps: T, PageComponent: NextComponentWithLayout) => ReactNode;

export type AppProps<P = any> = Omit<NextAppProps<P>, 'pageProps'> & {
    Component: NextComponentWithLayout;
    pageProps: P;
}