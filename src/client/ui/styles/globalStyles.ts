import LexendLight from '@/client/ui/assets/fonts/LexendDeca-Light.ttf';
import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    @font-face {
        font-family: 'Lexend';
        src: url(${LexendLight}) format('truetype');
        font-weight: 300;
        font-style: normal;
    }

    body {
        background: ${({ theme }) => theme.colors.pageBackground};
        color: ${({ theme }) => theme.colors.primaryFontColor};
        transition: all 0.2s linear;
    }
`;