import Head from 'next/head';
import {ReactNode} from 'react';

interface ComponentProps {
    children: ReactNode;
    title?: string;
}

export const LoginLayout = ({children, title = 'Login'}: ComponentProps) => (
    <div>
        <Head>{title}</Head>
        {children}
    </div>
);