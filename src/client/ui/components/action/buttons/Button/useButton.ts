import { ButtonIcons } from "@/client/ui/assets/images/icons";
import { getButtonTextSize, getIcon, getIconPosition, getIconSize, useForgroundColor } from "../../utils";

export const useButton= (
    style: 'dark' | 'light',
    size: 'large' | 'small',
    position: 'left' | 'right',
    icon?: ButtonIcons
) => {
    const foregroundColor = useForgroundColor(style);
    const Icon = getIcon(icon);
    const iconSize = getIconSize(size);
    const iconPosition = getIconPosition(position);
    const textSize = getButtonTextSize(size);

    return {
        foregroundColor,
        Icon,
        iconPosition,
        iconSize,
        textSize
    }
}