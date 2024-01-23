import type {ReactNode} from 'react';
import React from 'react';

import {Navigation} from '../modules/Head/Navigation';

interface ComponetnProps {
    children: ReactNode;
}

const Layout = ({children}: ComponetnProps) => (
    <>
        <Navigation />
        {children}
    </>
);

export default Layout;