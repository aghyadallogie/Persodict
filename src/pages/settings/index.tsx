import { Wrapper } from "..";
import styled from "styled-components";
import { SettingsService } from "@/server/services/SettingsService";
import type { Settings } from "@/server/domain/entities/Settings";

interface PageProps {
  userLangs: string[];
}

const langs = [
  { code: "de", flag: "fi fi-de" },
  { code: "fr", flag: "fi fi-fr" },
  { code: "it", flag: "fi fi-it" },
  { code: "es", flag: "fi fi-es" },
  { code: "sv", flag: "fi fi-se" },
  { code: "bg", flag: "fi fi-bg" },
  { code: "pt", flag: "fi fi-pt" },
  { code: "ru", flag: "fi fi-ru" },
  { code: "tr", flag: "fi fi-tr" },
  { code: "hu", flag: "fi fi-hu" },
  { code: "el", flag: "fi fi-gr" },
  { code: "pl", flag: "fi fi-pl" },
  { code: "nl", flag: "fi fi-nl" },
  { code: "ar", flag: "fi fi-sy" },
  { code: "ja", flag: "fi fi-jp" },
];

const Settings = ({ userLangs }: PageProps) => {
  return (
    <Wrapper>
      <LanguagePicker>
        {langs.map((lang) => (
          <Flag
            picked={userLangs.includes(lang.code) ? true : false}
            onClick={() => console.log(lang.code)}
            className={lang.flag}
          />
        ))}
      </LanguagePicker>
    </Wrapper>
  );
};

export default Settings;

const LanguagePicker = styled.div`
  display: grid;
  justify-items: center;
  cursor: pointer;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2rem;
  margin: 0 auto;
  margin-top: 5rem;
`;

const Flag = styled.div<{ picked: any }>`
  outline: ${(props) => (props.picked ? "5px solid silver" : "none")};
  background-color: ${(props) => (props.picked ? "silver" : "none")};
  line-height: 2rem;
  width: 3rem;
  border-radius: 2pt;
`;

export const getServerSideProps = async () => {
  const settings = await SettingsService.getSettings();

  return {
    props: {
      revalidate: 18000,
      userLangs: (settings as Settings).userLangs,
    },
  };
};
