import { langs } from "@/client/shared/langs";
import React from "react";
import styled from "styled-components";
import { Flag } from "@/client/ui/components/Flag";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { childrenAnimation } from "@/client/ui/animations/actions";
import { P } from "@/client/ui/components/layout/Text";

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
    <motion.div
      animate="enter"
      exit="exit"
      initial="initial"
      variants={childrenAnimation}
    >
      <Title $align="center" $size="large">Select your prefered languages</Title>
      <LanguagePicker>
        {langs.map((lang) => (
          <Flag
            key={lang.code}
            langFlag={lang.flag}
            langCode={lang.code}
            userId={session?.user?.email as string}
          />
        ))}
      </LanguagePicker>
    </motion.div>
  );
};

const Title = styled(P)`
  margin-top: 5rem;
  margin-bottom: 3rem;
`;

const LanguagePicker = styled.div`
  display: grid;
  justify-items: center;
  cursor: pointer;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2rem;
  margin: 0 auto;
`;