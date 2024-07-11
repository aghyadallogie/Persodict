import { ButtonIcons } from "@/client/ui/assets/images/icons";
import { getButtonTextSize, getIcon, getIconSize, useForgroundColor } from "../../utils";

export const useButton= (
    style: 'dark' | 'light',
    size: 'large' | 'small' | undefined,
    icon?: ButtonIcons | undefined
) => {
    const foregroundColor = useForgroundColor(style);
    const Icon = getIcon(icon);
    const iconSize = getIconSize(size);
    const textSize = getButtonTextSize(size);

    return {
        foregroundColor,
        Icon,
        iconSize,
        textSize
    }
}