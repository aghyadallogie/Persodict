import { useGetUserTranslations } from "@/client/application/useCases/useGetUserTranslations";
import type { Word } from "@/client/domain/entities/Word";
import { NoWords } from "@/client/ui/components/layout/NoWords";
import { WordView } from "@/client/ui/components/WordView";
import { WordService } from "@/server/services/WordService";
import { AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { Wrapper } from "../index";
import { NextPageWithLayout } from "../../../types/global";
import SessionLayout from "@/client/ui/layouts/Layout";
import { getSession, useSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";
import { SettingsService } from "@/server/services/SettingsService";
import { Settings } from "@/server/domain/entities/Settings";

interface PageProps {
  words: Word[];
}

const History: NextPageWithLayout = ({ words }: PageProps) => {
  const { data: session } = useSession();
  const { userTranslations } = useGetUserTranslations(session?.user?.email as string);

  const translations = userTranslations?.data || [];
  let orderedTranslations: Word[] = translations || words || [];

  if (typeof translations.toReversed === "function")
    orderedTranslations = translations.toReversed();

  return (
    <Wrapper>
      {orderedTranslations.length ? (
        <WordsWrapper>
          <AnimatePresence mode="sync">
            {orderedTranslations?.map((word: Word) => (
              <WordView
                key={word.id}
                data={word?.translations || words}
                wordId={word.id}
              />
            ))}
          </AnimatePresence>
        </WordsWrapper>
      ) : (
        <NoWords />
      )}
    </Wrapper>
  );
};

export default History;

const WordsWrapper = styled.div`
  margin-top: 1rem;
`;

History.getLayout = (router, pageProps, PageComponent) => (
  <SessionLayout title="History">
    <PageComponent router={router} {...pageProps} />
  </SessionLayout>
);

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const session = await getSession(context);
  const userEmail = session?.user?.email;

  const settings = await SettingsService.getSettings(userEmail!);
  const userLangs = (settings as Settings)?.userLangs;
  const userWords = await WordService.getWords(userEmail!) as Word[];
  console.log('ww', userWords);
  
  if (!userWords[0]?.translations[0]?.lang) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      revalidate: 18000,
      words: userWords || [],
    },
  };
};