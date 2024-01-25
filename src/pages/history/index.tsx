/* eslint-disable import/no-unresolved */
import styled from 'styled-components';

import {Wrapper} from '../index';
import {NoWords} from '@/client/ui/components/NoWords';
import {WordView} from '@/client/ui/components/WordView';

import type {Word} from '@/client/domain/entities/Word';

import {WordService} from '@/server/services/WordService';

interface PageProps {
    words: Word[] | [];
}

const History = ({words}: PageProps) => {
    console.log('words', words.length);

    return (
        <Wrapper>
            {words.length ? (
                <WordsWrapper>
                    {words.map((word: Word) => <WordView key={word.id} data={word.translations} />)}
                </WordsWrapper>
            ) : <NoWords />}
        </Wrapper>
    );
};

export default History;

const WordsWrapper = styled.div`
    margin-top: 1rem;
`;

export const getStaticProps = async () => {
    const userWords = await WordService.getWords();

    return {
        props: {
            revalidate: 18000,
            words: userWords ?? []
        }
    };
};