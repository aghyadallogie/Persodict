import { DefaultTheme, createGlobalStyle } from "styled-components";

export enum Colors {
    pageBackground = "#aa0000",
    textPlaceholder = "#989898bf",
    primaryFontColor = "#aa0000",
    primaryActionColor = "whitesmoke",
    secondaryActionColor = "#aa0000",
    tertiaryActionColor = "#aa0000",
}

export const theme: DefaultTheme = {
    colors: Colors,
};

export const GlobalStyles = createGlobalStyle`
    * {
        outline: 1px solid red;
    }
`;
