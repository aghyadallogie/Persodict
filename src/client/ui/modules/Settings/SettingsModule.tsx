import { langs } from "@/client/shared/langs";
import React from "react";
import styled from "styled-components";
import { Flag } from "../../components/Flag";

export const SettingsModule = ({ userLangs }: { userLangs: string[] }) => (
  <LanguagePicker>
    {langs.map((lang) => (
      <Flag
        key={lang.code}
        picked={userLangs?.includes(lang.code)}
        langFlag={lang.flag}
        langCode={lang.code}
        userLangs={userLangs}
      />
    ))}
  </LanguagePicker>
);

const LanguagePicker = styled.div`
  display: grid;
  justify-items: center;
  cursor: pointer;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2rem;
  margin: 0 auto;
  margin-top: 5rem;
`;