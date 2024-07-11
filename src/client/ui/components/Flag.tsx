import React from "react";
import styled from "styled-components";
import { useUpdateSettings } from "../modules/Settings/useUpdateSettings";

interface ComponentProps {
  picked: boolean;
  langCode: string;
  langFlag: string;
  userLangs: string[];
  userId: string;
}

export const Flag = ({
  picked,
  langCode,
  langFlag,
  userLangs,
  userId
}: ComponentProps) => {
  const { handleUpdateSettings } = useUpdateSettings(langCode, userLangs, userId);

  return (
    <FlagWrapper
      onClick={handleUpdateSettings}
      className={langFlag}
      picked={picked}
    />
  );
};

const FlagWrapper = styled.div<{ picked: boolean }>`
  outline: ${({ picked }) => (picked ? "5px solid silver" : "none")};
  background-color: ${({ picked }) => (picked ? "silver" : "none")};
  line-height: 2rem;
  width: 3rem;
  border-radius: 2pt;
`;
