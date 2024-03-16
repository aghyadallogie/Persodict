// const Layout = ({children}: ComponentProps) => (
//     <div className={rubik.className} style={{margin: '0 2rem'}}>
//         <Navigation />
//         {children}
//     </div>
// );

import type { ReactNode } from 'react';
import React from 'react';
import { motion } from 'framer-motion'; // Import motion from Framer Motion

import { Rubik } from 'next/font/google';

import { Navigation } from '../modules/Head/Navigation';

const rubik = Rubik({ subsets: ['latin'] });

interface ComponentProps {
  children: ReactNode;
}

const Layout = ({ children }: ComponentProps) => (
  <div className={rubik.className} style={{ margin: '0 2rem' }}>
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
    >
      <Navigation />
    </motion.nav>
    {children}
  </div>
);

export default Layout;
