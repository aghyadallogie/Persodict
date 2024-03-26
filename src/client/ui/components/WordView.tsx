/* eslint-disable @typescript-eslint/no-unsafe-member-access, import/no-unresolved */
import {motion} from 'framer-motion';
import {MdDelete} from 'react-icons/md';
import styled from 'styled-components';

import {renderCorrectFlag} from '../utils/helpers';

import {useDeleteWord} from './useDeleteWord';

import type {Translation} from '@/client/domain/entities/Word';
import type {Variants} from 'framer-motion';

interface ComponentProps {
    data: Translation[];
    wordId: string | undefined;
}

const deleteAnimation: Variants = {
    bla: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
            staggerDirection: 1,
            when: 'beforeChildren'
        },
        y: 0
    },
    exit: {
        opacity: 0,
        transition: {
            staggerChildren: 0.05,
            staggerDirection: -1,
            when: 'afterChildren'
        },
        x: -20
    },
    initial: {
        opacity: 0,
        y: -20
    }
};

const childrenAnimation: Variants = {
    bla: {
        opacity: 1,
        y: 0
    },
    exit: {
        opacity: 0,
        x: -20
    },
    initial: {
        opacity: 0,
        y: -20
    }
};

export const WordView = ({data, wordId}: ComponentProps) => {
    const {handleDeleteWord} = useDeleteWord(wordId!);

    return (
        <Table
            animate="bla"
            exit="exit"
            initial="initial"
            variants={deleteAnimation}
            layout
        >
            <DeleteTranslation onClick={handleDeleteWord}>
                <MdDelete />
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
  opacity: 0;
  padding-top: 3px;
  position: absolute;
  right: -10px;
  top: 0px;
  transition: 0.3s;
`;