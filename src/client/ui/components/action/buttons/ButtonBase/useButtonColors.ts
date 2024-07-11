import { useThemeColors } from "@/client/ui/hooks/useThemeColors";
import { shade } from "@/client/ui/utils";

export const useButtonColors = (
  variant: "primary" | "secondary",
  style: "dark" | "light",
  hasSlimBorder: boolean
) => {
  const colors = useThemeColors();
  let activeBorderColor: string;
  let buttonBaseColor: string;
  let buttonHoverColor: string;
  let buttonPressedColor: string;

  if (style === "light") {
    buttonBaseColor = colors.primaryActionColor;
    buttonHoverColor = shade(colors.primaryActionColor, 44, 'light');
    buttonPressedColor = shade(colors.primaryActionColor, 10, 'light');
    activeBorderColor = buttonPressedColor;
  } else {
    buttonBaseColor = shade(colors.pageBackground, 100, 'light');
    buttonHoverColor = shade(colors.pageBackground, 44, 'light');
    buttonPressedColor = shade(colors.pageBackground, 75, 'light');
    activeBorderColor = buttonPressedColor;
  }

  if (variant === 'secondary') {
    buttonBaseColor = 'transparent';
  }

  if (hasSlimBorder) {
    activeBorderColor = colors.buttonBorderColor
  }

  return {
    activeBorderColor,
    buttonBaseColor,
    buttonHoverColor,
    buttonPressedColor
  }
};
