import Head from 'next/head';
import styled from 'styled-components';

import TranslateModule from '@/client/ui/modules/Translate/TranslateModule';

const Home = () => (
    <>
        <Head>
            <title>Persodict</title>
            <meta content="width=device-width, initial-scale=1" name="viewport" />
            <link href="/favicon.ico" rel="icon" />
        </Head>
        <Wrapper>
            <TranslateModule />
        </Wrapper>
    </>
);

export default Home;

export const Wrapper = styled.main`
    margin: auto;
    max-width: 40rem;
`;