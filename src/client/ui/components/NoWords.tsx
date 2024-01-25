import {MdOutlineTranslate} from 'react-icons/md';
import styled from 'styled-components';

export const NoWords = () => (
    <>
        <LargeTranslateIcon size="20rem" />
        <GrayedMessage>
            You can pick the languages you want to translate your words into in the
            settings tab!
        </GrayedMessage>
    </>
);

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