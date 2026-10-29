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
const REPO_URL = "https://github.com/aghyadallogie/Persodict";

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
      <Spacer height={4} />
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
      <Footer
        animate="enter"
        exit="exit"
        initial="initial"
        variants={childrenAnimation}
      >
        <GithubLink
          href={REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Persodict on GitHub"
        >
          <svg viewBox="0 0 16 16" width="18" height="18" fill="currentColor" aria-hidden="true">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
          </svg>
        </GithubLink>
        <span>
          Made in Berlin by Aghyad Al Logie with <Heart aria-label="love">♥</Heart>
        </span>
      </Footer>
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

  @media (min-width: 476px) {
    margin: 0 5rem;
  }
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

const Footer = styled(motion.footer)`
  align-items: center;
  bottom: 1rem;
  color: ${({ theme }) => theme.colors.textPlaceholder};
  display: flex;
  font-size: 0.8em;
  gap: 0.75rem;
  justify-content: center;
  left: 0;
  opacity: 0.7;
  padding: 0.75rem 1rem calc(0.75rem + env(safe-area-inset-bottom, 0px));
  pointer-events: none; /* don't block taps on content underneath... */
  position: fixed;
  right: 0;
`;

const Heart = styled.span`
  color: ${({ theme }) => theme.colors.error};
  font-size: 1.8em;
  margin-left: 0.2rem;
`;

const GithubLink = styled.a`
  color: inherit;
  display: inline-flex;
  pointer-events: auto; /* ...but the link itself stays clickable */
  transition: opacity 0.2s ease;

  &:hover,
  &:focus-visible {
    opacity: 0.6;
  }
`;