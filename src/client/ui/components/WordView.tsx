import type { Translation } from "@/client/domain/entities/Word";
import { childrenAnimation, deleteAnimation } from "@/client/ui/animations/actions";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useDeleteWord } from "./useDeleteWord";
import { renderCorrectFlag, shade } from "@/client/ui/utils";

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

  if (!Array.isArray(data)) return ;

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
  background: ${({ theme }) => theme.gradients.viewBackground};
  border: 1px solid ${({ theme }) => theme.colors.pageBackground};
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.shadows.buttonShadow};
  color: ${({ theme }) => theme.colors.primaryFontColor};
  margin-bottom: 1rem;
  text-align: center;
  width: 100%;

  &:hover {
    outline: 1px solid ${({ theme }) => theme.shadows.inputShadow};

    div {
      opacity: 1;
    }
  }
`;

const Row = styled(motion.div)`
  border-bottom: 1px dotted ${({ theme }) => shade(theme.colors.hoverColor, 5, "light")};
  display: flex;
  gap: 2rem;
  justify-content: space-between;
  margin: 1rem 2rem;
`;

const DeleteTranslation = styled.div`
  background-color: ${({ theme }) => theme.colors.pageBackground};
  border-bottom-left-radius: 10px;
  border-top-right-radius: 10px;
  cursor: pointer;
  float: inline-end;
  margin: 0 10px;
  opacity: 1;
  padding-top: 5px;
  right: -3px;
  top: 0px;
  transition: 0.3s;
  color: ${({ theme }) => shade(theme.colors.tertiaryActionColor, 30, "light")};

  &:hover {
    color: ${({ theme }) => theme.colors.tertiaryActionColor};
  }
  &:active {
    color: ${({ theme }) => theme.colors.tertiaryActionColor};
  }

  @media (min-width: 476px) {
    opacity: 0;

    &:hover {
      opacity: 1;
    }
  }
`;