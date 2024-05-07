import { DefaultTheme, createGlobalStyle } from "styled-components";

export enum Colors {
    pageBackground = "#aa0000",
    textPlaceholder = "#989898bf",
}

export const theme: DefaultTheme = {
    colors: Colors,
};

export const GlobalStyles = createGlobalStyle`
    * {
    outline: 1px solid red;
    }
`;
