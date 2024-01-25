/* eslint-disable react/jsx-props-no-spreading */
import type {AppProps} from 'next/app';
import Layout from '@/client/ui/layouts/Layout';

const App = ({Component, pageProps}: AppProps) => (
    <Layout>
        <Component {...pageProps} />
    </Layout>
);

export default App;