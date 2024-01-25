import Head from 'next/head';
import styled from 'styled-components';
import TranslateModule from '@/client/ui/modules/Translate/TranslateModule';

const Home = () => (
    <>
        <Head>
            <title>Persodict</title>
            <meta content="width=device-width, initial-scale=1" name="viewport" />
            <link href="/favicon.ico" rel="icon" />
            <link
                href="https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.6.6/css/flag-icons.min.css"
                rel="stylesheet"
            />
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