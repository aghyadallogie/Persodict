import { ButtonIcons } from "@/client/ui/assets/images/icons";
import { Google } from "@/client/ui/assets/images/icons/Google";
import { Translate } from "@/client/ui/assets/images/icons/Translate";
import { useThemeColors } from "@/client/ui/hooks/useThemeColors";
import { Colors } from "@/client/ui/utils/globalStyles";
import { shade } from "@/lib";

const Icons = {
  Google,
  Translate
};

export const getIcon = (icon?: ButtonIcons) =>
  icon === undefined ? null : Icons[icon];

export const getIconSize = (size: 'large' | 'small', single: boolean = false) =>
  size === 'large' || single ? 24 : 16;

export const getIconPosition = (position: 'left' | 'right') =>
  position === 'left' ? 'row-reverse' as const : 'row' as const;

export const getButtonTextSize = (size: 'large' | 'medium' | 'small') =>
  size === 'large' ? 'large' as const : 'small' as const;

export const useForgroundColor = (style: 'light' | 'dark', overWriteColor?: Colors) => {
  const colors = useThemeColors();
  let foregroundColor = style === 'dark' ? shade(colors.primaryFontColor, 100, "light") : colors.primaryActionColor;

  if (overWriteColor) {
    foregroundColor = overWriteColor;
  }

  return foregroundColor as Colors;
}