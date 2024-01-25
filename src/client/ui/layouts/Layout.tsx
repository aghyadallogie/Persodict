import type {ReactNode} from 'react';
import React from 'react';
import {Navigation} from '../modules/Head/Navigation';
import {Rubik} from 'next/font/google';

const rubik = Rubik({subsets: ['latin']});

interface ComponentProps {
    children: ReactNode;
}

const Layout = ({children}: ComponentProps) => (
    <div className={rubik.className}>
        <Navigation />
        {children}
    </div>
);

export default Layout;