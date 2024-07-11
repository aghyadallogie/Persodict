import { DefaultTheme, createGlobalStyle } from "styled-components";
import LexendLight from '../assets/fonts/LexendDeca-Light.ttf';

export enum Colors {
    pageBackground = "#aa0000",
    textPlaceholder = "#989898bf",
    primaryFontColor = "#000000ae",
    primaryAccentFontColor = "#00000088",
    primaryActionColor = "whitesmoke",
    secondaryActionColor = "#aa0000",
    tertiaryActionColor = "#aa0000",
    primaryAccentColor = "#aaa3"
}

export const theme: DefaultTheme = {
    colors: Colors,
};

export const GlobalStyles = createGlobalStyle`
    @font-face {
        font-family: 'Lexend';
        src: url(${LexendLight}) format('truetype');
        font-weight: 300;
        font-style: normal;
    }
`;
