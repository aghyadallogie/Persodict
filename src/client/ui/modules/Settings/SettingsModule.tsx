import { langs } from "@/client/shared/langs";
import React from "react";
import styled from "styled-components";
import { Flag } from "../../components/Flag";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { childrenAnimation } from "../../animations/actions";

/**
 * The `SettingsModule` Component.
 * This component displays language flags for language selection.
 *
 * @param {string[]} userLangs - Array of user chosen languages.
 * @returns A React element representing the `SettingsModule` component.
 *
 * @example
 * ```tsx
 * const MySettingsModule = <SettingsModule userLangs={['en', 'fr']} />;
 * ```
 */
export const SettingsModule = ({ userLangs }: { userLangs: string[] }) => {
  const { data: session } = useSession();

  return (
    <LanguagePicker
      animate="enter"
      exit="exit"
      initial="initial"
      variants={childrenAnimation}
    >
      {langs.map((lang) => (
        <Flag
          key={lang.code}
          picked={!!userLangs?.includes(lang.code) as boolean}
          langFlag={lang.flag}
          langCode={lang.code}
          userLangs={userLangs}
          userId={session?.user?.email as string}
        />
      ))}
    </LanguagePicker>
  );
};

const LanguagePicker = styled(motion.div)`
  display: grid;
  justify-items: center;
  cursor: pointer;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2rem;
  margin: 0 auto;
  margin-top: 5rem;
`;