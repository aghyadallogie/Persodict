import { useGetUserSettings } from "@/client/application/useCases/useGetUserSettings";
import { useUpdateSettings } from "@/client/ui/modules/Settings/useUpdateSettings";
import styled from "styled-components";

interface ComponentProps {
  langCode: string;
  langFlag: string;
  userId: string;
}

/**
 * The `Flag` Component.
 * This component represents a flag element with interactive functionality.
 *
 * @param {boolean} picked - Indicates if the flag is picked.
 * @param {string} langCode - The language code associated with the flag.
 * @param {string} langFlag - The flag icon for the language.
 * @param {string[]} userLangs - Array of user languages.
 * @param {string} userId - The ID of the user.
 * @returns A React element representing the `Flag` component.
 *
 * @example
 * ```tsx
 * const MyFlag = <Flag picked={true} langCode="en" langFlag="us" userLangs={['en', 'fr']} userId="123" />;
 * ```
 */
export const Flag = ({ langCode, langFlag, userId }: ComponentProps) => {
  const { userSettings } = useGetUserSettings(userId);
  const { handleUpdateSettings, isLoading, error } = useUpdateSettings(
    langCode,
    userId
  );

  const picked = userSettings?.data?.userLangs.includes(langCode) || false;

  const handleClick = () => {
    handleUpdateSettings();
  };

  return (
    <FlagWrapper
      onClick={isLoading ? undefined : handleClick}
      className={`${isLoading ? "loading" : langFlag}`}
      $picked={picked}
      $isLoading={isLoading}
      $hasError={!!error}
    />
  );
};

interface WrapperProps {
  $picked: boolean;
  $isLoading: boolean;
  $hasError: boolean;
}

const FlagWrapper = styled.div<WrapperProps>`
  border-radius: 10px;
  width: 4rem;
  height: 3rem;
  position: relative;
  cursor: pointer;
  transition: all 0.2s ease;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  
  /* Picked state with badge */
  border: ${({ $picked, theme }) =>
    $picked ? `2px solid ${theme.colors.primary}` : '2px solid transparent'};
  
  /* Checkmark badge in corner */
  &::after {
    content: ${({ $picked }) => $picked ? "'✓'" : "''"};
    position: absolute;
    top: -5px;
    right: -5px;
    width: 20px;
    height: 20px;
    background: black;
    color: white;
    border-radius: 50%;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    opacity: ${({ $picked }) => $picked ? '1' : '0'};
    transform: ${({ $picked }) => $picked ? 'scale(1)' : 'scale(0)'};
    transition: all 0.3s ease;
    z-index: 2;
  }

  /* Dim effect for non-picked flags */
  filter: ${({ $picked }) => $picked ? 'none' : 'brightness(0.80)'};
  
  &:hover {
    filter: brightness(1);
    transform: translateY(-2px);
  }
`;
