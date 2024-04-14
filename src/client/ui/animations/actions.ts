import type {Variants} from 'framer-motion';

export const deleteAnimation: Variants = {
    enter: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
            staggerDirection: 1,
            // when: 'beforeChildren'
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

export const childrenAnimation: Variants = {
    enter: {
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