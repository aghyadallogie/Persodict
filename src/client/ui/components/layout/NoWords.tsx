import Link from 'next/link';
import {MdOutlineTranslate} from 'react-icons/md';
import styled from 'styled-components';

/**
 * The `NoWords` Component.
 * This component displays a message when no words are available.
 *
 * @param {string | null} error - The error message to display.
 *
 * @returns A React element representing the `NoWords` component.
 *
 * @example
 * ```tsx
 * const MyComponent = <NoWords />;
 * ```
 */
export const NoWords = ({ error }: { error: string | null }) => (
  <CenteredContainer>
    <GrayedMessage>
      You can choose the languages you want to translate into in the <SettingsLink href='/settings' $flash={!!error}>settings</SettingsLink> tab!
    </GrayedMessage>
    <LargeTranslateIcon size="16rem" />
  </CenteredContainer>
);

const CenteredContainer = styled.div`
  flex-direction: column;
  display: flex;
  align-items: center;
`;

const LargeTranslateIcon = styled(MdOutlineTranslate)`
  color: ${({theme}) => theme.colors.primaryAccentColor};
  width: 14rem;
  height: 14rem;
  animation: pulse 1.5s infinite ease-in-out;

  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 0.6;
    }
    50% {
      transform: scale(1.1);
      opacity: 0.4;
    }
    100% {
      transform: scale(1);
      opacity: 0.6;
    }
  }
`;

const GrayedMessage = styled.p`
  color: ${({theme}) => theme.colors.primaryAccentColor};
  font-weight: 400;
  margin: 2rem;
  text-align: center;
`;

const SettingsLink = styled(Link)<{ $flash?: boolean }>`
  color: ${({theme}) => theme.colors.primaryAccentFontColor};
  transition: 0.5s;

  ${({ $flash, theme }) => $flash && `
    animation: flash-red 0.6s 2;
    @keyframes flash-red {
      0% { color: ${theme.colors.primaryAccentFontColor}; }
      30% { color: ${theme.colors.error}; }
      70% { color: ${theme.colors.error}; }
      100% { color: ${theme.colors.primaryAccentFontColor}; }
    }
  `}

  &:hover {
    color: ${({theme}) => theme.colors.primaryAccentColor};
  }
`;