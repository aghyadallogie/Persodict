import { langs } from "@/client/shared/langs";
import { childrenAnimation } from "@/client/ui/animations/actions";
import { Flag } from "@/client/ui/components/Flag";
import { P } from "@/client/ui/components/layout/Text";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import styled from "styled-components";
import { Spacer } from "../../components/layout/Spacer";

/**
 * The `SettingsModule` Component.
 * This component displays language flags for language selection.
 *
 * @returns A React element representing the `SettingsModule` component.
 *
 * @example
 * ```tsx
 * const MySettingsModule = <SettingsModule userLangs={['en', 'fr']} />;
 * ```
 */
export const SettingsModule = () => {
  const { data: session } = useSession();

  return (
    <Container
      animate="enter"
      exit="exit"
      initial="initial"
      variants={childrenAnimation}
    >
      <Spacer height={2} />
      <Title $align="center" $size="large">Please select at least one language</Title>
      <Spacer height={2} />
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
    </Container>
  );
};

const Title = styled(P)`
  padding: 3rem;
  color: ${({ theme }) => theme.colors.primaryFontColor};
`;

const LanguagePicker = styled.div`
  display: grid;
  justify-items: center;
  cursor: pointer;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2rem;
  margin: 0 auto;
`;

const Container = styled(motion.div)`
  text-align: center;
`
