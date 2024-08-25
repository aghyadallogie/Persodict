import React from "react";
import styled from "styled-components";
import { useUpdateSettings } from "@/client/ui/modules/Settings/useUpdateSettings";
import { useGetUserSettings } from "@/client/application/useCases/useGetUserSettings";

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
export const Flag = ({
  langCode,
  langFlag,
  userId
}: ComponentProps) => {
  const { userSettings } = useGetUserSettings(userId);
  const { handleUpdateSettings, isLoading } = useUpdateSettings(langCode, userId);

  const picked = userSettings?.data?.userLangs.includes(langCode) || false;

  const handleClick = () => {
    handleUpdateSettings();
  };

  return (
    <FlagWrapper
      onClick={isLoading ? undefined : handleClick}
      className={`${isLoading ? 'loading' : langFlag}`}
      $picked={picked}
      $isLoading={isLoading}
    />
  );
};

const FlagWrapper = styled.div<{ $picked: boolean, $isLoading: boolean }>`
  outline: ${({ $picked, theme }) => ($picked ? `5px solid ${theme.colors.textPlaceholder}` : "none")};
  background-color: ${({ $picked, theme }) => ($picked ? theme.colors.textPlaceholder : "none")};
  transition: outline 0.1s ease-out;
  line-height: 2rem;
  width: 3rem;
  border-radius: 2pt;

  &.loading {
    border: 4px solid rgba(247, 247, 247, 0.113);
    border-top: ${({ theme }) => `4px solid ${theme.colors.textPlaceholder}`};
    border-radius: 50%;
    width: 22px;
    height: 22px;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;