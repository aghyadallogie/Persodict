import { Translation } from "@/client/domain/entities/Word";
import { MdDelete } from "react-icons/md";
import styled from "styled-components";
import { renderCorrectFlag } from "../utils/helpers";

interface ComponentProps {
  data: Translation[];
}

export const WordView = ({ data }: ComponentProps) => {
  return (
    <Table>
      <DeleteTranslation onClick={() => {}}>
        <MdDelete />
      </DeleteTranslation>
      {data.map((trans: Translation) => (
        <Row key={trans.lang}>
          <span className={`fi fi-${renderCorrectFlag(trans.lang)}`}></span>
          <span>{trans.lingo}</span>
        </Row>
      ))}
    </Table>
  );
};

const Table = styled.div`
  padding: 0.1rem;
  background: #111;
  margin-bottom: 1rem;
  width: 100%;

  background: linear-gradient(
      rgba(255, 255, 255, 0.25),
      rgba(255, 255, 255, 0.1)
    ),
    url("background-image.jpg");
  backdrop-filter: blur(8px);
  border: 1px solid white;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1), -5px -5px 10px #fffb;
  border-radius: 10px;
  padding: 20px;
  color: #777;
  text-align: center;

  &:hover {
    outline: 1px solid #fff;

    div {
      visibility: visible;
    }
  }
`;

const Row = styled.div`
  border-bottom: 1px solid #fffb;
  margin: 1rem;
  display: flex;
  justify-content: start;
  gap: 2rem;
`;

const DeleteTranslation = styled.div`
  position: absolute;
  right: -10px;
  top: 0px;
  margin: 0 10px;
  visibility: hidden;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;
  padding-top: 3px;
  cursor: pointer;
  background-color: white;
`;
