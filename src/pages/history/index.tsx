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

interface PageProps {
  words: Word[];
}

const History: NextPageWithLayout = ({ words }: PageProps) => {
  const { data: session } = useSession();
  const { userTranslations } = useGetUserTranslations(session?.user?.email as string);

  const translations = userTranslations?.data || [];
  let orderedTranslations: Word[] = translations || [];

  if (typeof translations.toReversed === "function")
    orderedTranslations = translations.toReversed();

  return (
    <Wrapper>
      {orderedTranslations.length ? (
        <WordsWrapper>
          <AnimatePresence mode="sync">
            {orderedTranslations.map((word: Word) => (
              <WordView
                key={word.id}
                data={word.translations}
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
  const session = await getSession();
  const userEmail = session?.user?.email;

  const userWords = await WordService.getWords(userEmail || "zenlogie@gmail.com");

  return {
    props: {
      revalidate: 18000,
      words: userWords,
    },
  };
};
