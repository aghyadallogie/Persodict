import { ButtonIcons } from "@/client/ui/assets/images/icons";
import { Google } from "@/client/ui/assets/images/icons/Google";
import { Translate } from "@/client/ui/assets/images/icons/Translate";
import { Facebook } from "@/client/ui/assets/images/icons/Facebook";
import { useThemeColors } from "@/client/ui/hooks/useThemeColors";
import { Colors } from "@/client/ui/utils/globalStyles";
import { shade } from "@/client/ui/utils";

const Icons = {
  Google,
  Translate,
  Facebook
};

export const getIcon = (icon?: ButtonIcons) =>
  icon === undefined ? null : Icons[icon];

export const getIconSize = (size: 'large' | 'small' | undefined, single: boolean = false) =>
  size === 'large' || single ? 48 : 24;

export const getButtonTextSize = (size: 'large' | undefined | 'small') =>
  size === 'large' ? 'large' as const : 'small' as const;

export const useForgroundColor = (style: 'light' | 'dark', overWriteColor?: Colors) => {
  const colors = useThemeColors();
  let foregroundColor = style === 'dark' ? shade(colors.primaryFontColor, 100, "light") : colors.primaryActionColor;

  if (overWriteColor) {
    foregroundColor = overWriteColor;
  }

  return foregroundColor as Colors;
}