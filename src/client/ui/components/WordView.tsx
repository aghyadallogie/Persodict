import type { Translation } from "@/client/domain/entities/Word";
import { childrenAnimation, deleteAnimation } from "@/client/ui/animations/actions";
import { renderCorrectFlag } from "@/client/ui/utils/helpers";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useDeleteWord } from "./useDeleteWord";

interface ComponentProps {
  data: Translation[];
  wordId: string | undefined;
}

/**
 * The `WordView` Component.
 * This component displays a table of translations with delete functionality.
 *
 * @param {Translation[]} data - An array of translations to display.
 * @param {string | undefined} wordId - The ID of the word being viewed.
 * @returns A React element representing the `WordView` component.
 *
 * @example
 * ```tsx
 * const MyComponent = <WordView data={translationsArray} wordId="123" />;
 * ```
 */
export const WordView = ({ data, wordId }: ComponentProps) => {
  const { handleDeleteWord } = useDeleteWord(wordId!);

  return (
    <Table
      animate="enter"
      exit="exit"
      initial="initial"
      variants={deleteAnimation}
      layout
    >
      <DeleteTranslation onClick={handleDeleteWord}>
        x
      </DeleteTranslation>
      {data.map((trans: Translation) => (
        <Row key={trans.lang} variants={childrenAnimation}>
          <span className={`fi fi-${renderCorrectFlag(trans.lang)}`} />
          <span>{trans.lingo}</span>
        </Row>
      ))}
    </Table>
  );
};

const Table = styled(motion.div)`
  backdrop-filter: blur(8px);
  background: linear-gradient(
      rgba(255, 255, 255, 0.25),
      rgba(255, 255, 255, 0.1)
    );
  border: 1px solid white;
  border-radius: 10px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1), -5px -5px 10px #fffb;
  color: ${({ theme }) => theme.colors.primaryFontColor};
  margin-bottom: 1rem;
  text-align: center;
  width: 100%;

  &:hover {
    outline: 1px solid #fff;

    div {
      opacity: 1;
    }
  }
`;

const Row = styled(motion.div)`
  border-bottom: 1px dotted #d8d8d83b;
  display: flex;
  gap: 2rem;
  justify-content: space-between;
  margin: 1rem 2rem;
`;

const DeleteTranslation = styled.div`
  background-color: white;
  border-bottom-left-radius: 10px;
  border-top-right-radius: 10px;
  cursor: pointer;
  margin: 0 10px;
  opacity: 1;
  padding-top: 5px;
  position: absolute;
  right: -3px;
  top: 0px;
  transition: 0.3s;
  color: #a8a8a891;

  &:hover {
    color: #e47373;
  }
  &:active {
    color: #e47373;
  }

  @media (min-width: 476px) {
    opacity: 0;

    &:hover {
      opacity: 1;
    }
  }
`;