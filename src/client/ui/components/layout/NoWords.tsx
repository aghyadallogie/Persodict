import Link from 'next/link';
import { MdOutlineTranslate } from 'react-icons/md';
import styled from 'styled-components';

/**
 * The `NoWords` Component.
 * This component displays a message when no words are available.
 *
 * @returns A React element representing the `NoWords` component.
 *
 * @example
 * ```tsx
 * const MyComponent = <NoWords />;
 * ```
 */
export const NoWords = () => (
  <>
    <GrayedMessage>Loading your translations..</GrayedMessage>
    <LargeTranslateIcon size="20rem" />
    <GrayedMessage>
      You can choose the languages you want to translate into in the <SettingsLink href='/settings'>settings</SettingsLink> tab!
    </GrayedMessage>
  </>
);

const LargeTranslateIcon = styled(MdOutlineTranslate)`
  color: ${({ theme }) => theme.colors.primaryAccentColor};
  color: #aaa3;
  margin: 40px 0;
  width: 100%;
`;

const GrayedMessage = styled.p`
  color: #aaa8;
  font-weight: 400;
  margin-bottom: 2rem;
  padding: 0 20px;
  text-align: center;
`;

const SettingsLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primaryAccentFontColor};
  transition: 0.5s;

  &:hover {
    color: ${({ theme }) => theme.colors.primaryAccentColor};
  }
`;