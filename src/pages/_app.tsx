/* eslint-disable react/jsx-props-no-spreading */
import Head from 'next/head';

import type {AppProps} from 'next/app';

import Layout from '@/client/ui/layouts/Layout';

const App = ({Component, pageProps}: AppProps) => (
    <Layout>
        <Head>
            <link
                href="https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.6.6/css/flag-icons.min.css"
                rel="stylesheet"
            />
        </Head>
        <Component {...pageProps} />
    </Layout>
);

export default App;