import { darkTheme, lightTheme } from "@/client/ui/styles/theme";
import React, { createContext, useContext, useEffect, useState } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    setIsDarkMode(savedTheme === "dark" || (!savedTheme && prefersDark));
  }, []);

  useEffect(() => {
    if (isDarkMode) document.getElementById("theme-preload")?.remove();
  }, [isDarkMode]);

  const toggleTheme = () => {
    document.getElementById("theme-preload")?.remove();
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("theme", !isDarkMode ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <StyledThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
