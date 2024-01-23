import {MdOutlineTranslate} from 'react-icons/md';
import styled from 'styled-components';

import {WordView} from './WordView';

import {useGetUserTranslations} from '@/client/application/useCases/useGetUserTranslations';

export const TranslatedWord = () => {
    const {userTranslations} = useGetUserTranslations();
    const mostRecentWord = userTranslations?.data[userTranslations.data.length - 1]?.translations ?? [];

    return mostRecentWord.length > 0 ? (
        <WordView data={mostRecentWord} />
    ) : (
        <>
            <LargeTranslateIcon size="20rem" />
            <GrayedMessage>
                You can pick the languages you want to translate your words to in the
                settings tab!
            </GrayedMessage>
        </>
    );
};

const LargeTranslateIcon = styled(MdOutlineTranslate)`
  color: #aaa3;
  margin: 40px 0;
  width: 100%;
`;

const GrayedMessage = styled.p`
  color: #aaa8;
  font-weight: 500;
  margin-bottom: 2rem;
  padding: 0 20px;
  text-align: center;
`;