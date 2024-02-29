import {MdDelete} from 'react-icons/md';
import styled from 'styled-components';

import {renderCorrectFlag} from '../utils/helpers';

import {useDeleteWord} from './useDeleteWord';

import type {Translation} from '@/client/domain/entities/Word';

interface ComponentProps {
    data: Translation[];
    wordId: string | undefined;
}

export const WordView = ({data, wordId}: ComponentProps) => {
    // const {removeWord} = useDeleteWord(wordId);
    const {handleDeleteWord} = useDeleteWord(wordId!);

    return (
        <Table>
            <DeleteTranslation onClick={handleDeleteWord}>
                <MdDelete />
            </DeleteTranslation>
            {data.map((trans: Translation) => (
                <Row key={trans.lang}>
                    <span className={`fi fi-${renderCorrectFlag(trans.lang)}`} />
                    <span>{trans.lingo}</span>
                </Row>
            ))}
        </Table>
    );
};

const Table = styled.div`
  backdrop-filter: blur(8px);
  background: linear-gradient(
      rgba(255, 255, 255, 0.25),
      rgba(255, 255, 255, 0.1)
    ),
    url("background-image.jpg");
  border: 1px solid white;
  border-radius: 10px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1), -5px -5px 10px #fffb;
  color: #777;
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

const Row = styled.div`
  border-bottom: 1px dotted #D8D8D83B;
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
  opacity: 0;
  padding-top: 3px;
  position: absolute;
  right: -10px;
  top: 0px;
  transition: 0.3s;
`;