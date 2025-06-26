import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme extends Theme { }
}

export interface Theme {
    colors: Record<string, string>;
    shadows: Record<string, string>;
    gradients: Record<string, string>;
}

export const lightTheme: Theme = {
    colors: {
        pageBackground: "whitesmoke",
        textPlaceholder: "#989898bf",
        primaryFontColor: "#000000ae",
        primaryAccentFontColor: "#00000088",
        primaryActionColor: "#f0f0f0",
        secondaryActionColor: "#aa0002",
        tertiaryActionColor: "#e47373",
        primaryAccentColor: "#aaa6",
        darkSelected: "#333",
        hoverColor: "#ddd",
        error: "#bb3137"
    } as const,
    shadows: {
        inputShadow: "inset 5px 5px 10px rgba(0, 0, 0, 0.1), inset -5px -5px 10px #fff",
        buttonShadow: "5px 5px 10px rgb(0, 0, 0, 0.1), -5px -5px 10px #fff"
    },
    gradients: {
        viewBackground: 'linear-gradient(rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.1))',
    },
};

export const darkTheme: Theme = {
    colors: {
        pageBackground: "#111",
        textPlaceholder: "#6e6e73",
        primaryFontColor: "#ddddddd9",
        primaryAccentFontColor: "#ffffff88",
        primaryActionColor: "#2c2c2e",
        secondaryActionColor: "#bb3137",
        tertiaryActionColor: "#99292d",
        primaryAccentColor: "#555",
        darkSelected: "#444",
        hoverColor: "#232323",
        error: "#bb3137"
    } as const,
    shadows: {
        inputShadow: "inset 5px 5px 10px rgba(0, 0, 0, 0.1), inset -5px -5px 10px #000",
        buttonShadow: "3px 3px 10px rgb(0, 0, 0, 0.1), -3px -3px 10px #000"
    },
    gradients: {
        viewBackground: 'linear-gradient(rgba(11, 11, 11, 0.25), rgba(11, 11, 11, 0.1))',
    },
};