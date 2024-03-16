/* eslint-disable import/no-unresolved */
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";

import { Wrapper } from "../index";
import { NoWords } from "@/client/ui/components/NoWords";
import { WordView } from "@/client/ui/components/WordView";

import type { Word } from "@/client/domain/entities/Word";

import { WordService } from "@/server/services/WordService";
import { useGetUserTranslations } from "@/client/application/useCases/useGetUserTranslations";

interface PageProps {
  words: Word[] | [];
}

const History = ({ words }: PageProps) => {
  const { userTranslations } = useGetUserTranslations(words);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Wrapper>
          {userTranslations.data.length ? (
            <WordsWrapper>
              {userTranslations.data.reverse().map((word: Word) => (
                <WordView data={word.translations} wordId={word.id} />
              ))}
            </WordsWrapper>
          ) : (
            <NoWords />
          )}
        </Wrapper>
      </motion.div>
    </AnimatePresence>
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
