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
    <GrayedMessage>
      You can choose the languages you want to translate into in the <SettingsLink href='/settings'>settings</SettingsLink> tab!
    </GrayedMessage>
    <LargeTranslateIcon size="16rem" />
  </>
);

const LargeTranslateIcon = styled(MdOutlineTranslate)`
  color: ${({ theme }) => theme.colors.primaryAccentColor};
  color: #aaa3;
  width: 100%;
`;

const GrayedMessage = styled.p`
  color: #aaa8;
  font-weight: 400;
  margin: 2rem;
  text-align: center;
`;

const SettingsLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primaryAccentFontColor};
  transition: 0.5s;

  &:hover {
    color: ${({ theme }) => theme.colors.primaryAccentColor};
  }
`;