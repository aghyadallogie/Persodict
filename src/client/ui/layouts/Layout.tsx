import type {ReactNode} from 'react';
import React from 'react';

import {Rubik} from 'next/font/google';

import {Navigation} from '../modules/Head/Navigation';

const rubik = Rubik({subsets: ['latin']});

interface ComponentProps {
    children: ReactNode;
}

const Layout = ({children}: ComponentProps) => (
    <div className={rubik.className} style={{margin: '0 2rem'}}>
        <Navigation />
        {children}
    </div>
);

export default Layout;