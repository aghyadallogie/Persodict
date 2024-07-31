import React, { useState } from "react";
import styled from "styled-components";
import { useUpdateSettings } from "@/client/ui/modules/Settings/useUpdateSettings";

interface ComponentProps {
  picked: boolean;
  langCode: string;
  langFlag: string;
  userLangs: string[];
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
  picked = false,
  langCode,
  langFlag,
  userLangs,
  userId
}: ComponentProps) => {
  const [isPicked, setIsPicked] = useState(picked); // Manage picked state
  const { handleUpdateSettings } = useUpdateSettings(langCode, userLangs, userId);

  const handleClick = () => {
    setIsPicked(prev => !prev); // Toggle picked state
    handleUpdateSettings(); // Call the update settings function
  };

  return (
    <FlagWrapper
      onClick={handleClick}
      className={langFlag}
      $picked={isPicked}
    />
  );
};

const FlagWrapper = styled.div<{ $picked: boolean }>`
  outline: ${({ $picked, theme }) => ($picked ? `5px solid ${theme.colors.textPlaceholder}` : "none")};
  background-color: ${({ $picked, theme }) => ($picked ? theme.colors.textPlaceholder : "none")};
  line-height: 2rem;
  width: 3rem;
  border-radius: 2pt;
`;