import { useGetUserSettings } from "@/client/application/useCases/useGetUserSettings";
import { langs } from "@/client/shared/langs";
import { childrenAnimation } from "@/client/ui/animations/actions";
import { Flag } from "@/client/ui/components/Flag";
import { P } from "@/client/ui/components/layout/Text";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import styled from "styled-components";
import { Spacer } from "../../components/layout/Spacer";
import { useUpdateSettings } from "./useUpdateSettings";

const languageNames = new Intl.DisplayNames(["en"], { type: "language" });

/**
 * The `SettingsModule` Component.
 * This component displays language flags for language selection.
 *
 * @returns A React element representing the `SettingsModule` component.
 *
 * @example
 * ```tsx
 * const MySettingsModule = <SettingsModule />;
 * ```
 */
export const SettingsModule = () => {
  const { data: session } = useSession();
  const userId = session?.user?.email as string;
  const { userSettings } = useGetUserSettings(userId);
  const { handleUpdateSettings, isLoading, error } = useUpdateSettings(userId);
  const userLangs = userSettings?.data?.userLangs ?? [];

  return (
    <Container
      animate="enter"
      exit="exit"
      initial="initial"
      variants={childrenAnimation}
    >
      <Spacer height={2} />
      <Title $align="center" $size="large">
        Please select at least one language
      </Title>
      <Spacer height={2} />
      <LanguagePicker>
        {langs.map((lang) => (
          <Flag
            key={lang.code}
            langFlag={lang.flag}
            langCode={lang.code}
            langName={languageNames.of(lang.code) ?? lang.code}
            picked={userLangs.includes(lang.code)}
            isLoading={isLoading}
            onToggle={handleUpdateSettings}
          />
        ))}
      </LanguagePicker>
      <Error $show={!!error} role="alert">
        {error ? "Couldn't update languages. Try again." : " "}
      </Error>
    </Container>
  );
};

const Title = styled(P)`
  color: ${({ theme }) => theme.colors.primaryFontColor};
`;

const LanguagePicker = styled.div`
  display: grid;
  justify-items: center;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2rem;
  margin: 0 auto;
`;

const Container = styled(motion.div)`
  text-align: center;
`;

const Error = styled.p<{ $show: boolean }>`
  color: ${({ theme }) => theme.colors.error};
  font-size: 0.8em;
  font-weight: 400;
  letter-spacing: 1px;
  text-align: center;
  opacity: ${({ $show }) => ($show ? 1 : 0)};
  transform: translateY(${({ $show }) => ($show ? "0" : "-10px")});
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
  min-height: 1.2rem;
  margin-top: 1.5rem;
`;
