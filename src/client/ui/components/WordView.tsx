import {MdDelete} from 'react-icons/md';
import styled from 'styled-components';

import {renderCorrectFlag} from '../utils/helpers';

import type {Translation} from '@/client/domain/entities/Word';

interface ComponentProps {
    data: Translation[];
}

export const WordView = ({data}: ComponentProps) => (
    <Table>
        <DeleteTranslation onClick={() => {}}>
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
      visibility: visible;
    }
  }
`;

const Row = styled.div`
  border-bottom: 1px solid #fffb;
  display: flex;
  gap: 2rem;
  justify-content: start;
  margin: 1rem;
`;

const DeleteTranslation = styled.div`
  background-color: white;
  border-bottom-left-radius: 10px;
  border-top-right-radius: 10px;
  cursor: pointer;
  margin: 0 10px;
  padding-top: 3px;
  position: absolute;
  right: -10px;
  top: 0px;
  visibility: hidden;
`;