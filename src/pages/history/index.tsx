/* eslint-disable import/no-unresolved */
import { useGetUserTranslations } from "@/client/application/useCases/useGetUserTranslations";
import type { Word } from "@/client/domain/entities/Word";
import { NoWords } from "@/client/ui/components/NoWords";
import { WordView } from "@/client/ui/components/WordView";
import { WordService } from "@/server/services/WordService";
import { AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { Wrapper } from "../index";

interface PageProps {
  words: Word[];
}

const History = ({ words }: PageProps) => {
  const { userTranslations } = useGetUserTranslations(words);
  const translations = userTranslations.data;
  let orderedTranslations: Word[] = translations;
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

export const getServerSideProps = async () => {
  const userWords = await WordService.getWords();

  return {
    props: {
      revalidate: 18000,
      words: userWords,
    },
  };
};
