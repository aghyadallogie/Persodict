import { useTheme } from "styled-components";

export const useThemeColors = () => {
  const theme = useTheme();

  return theme.colors;
};
