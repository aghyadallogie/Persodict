import { ButtonIcons } from "@/client/ui/assets/images/icons";
import { getButtonTextSize, getIcon, getIconSize, useForegroundColor } from "@/client/ui/components/action/utils";

/**
 * Custom hook to retrieve button properties based on style, size, and icon.
 *
 * @param {('dark' | 'light')} style - The style of the button, either 'dark' or 'light'.
 * @param {('large' | 'small' | undefined)} size - The size of the button, either 'large' or 'small'. Can be undefined.
 * @param {ButtonIcons | undefined} icon - Optional icon for the button. If not provided, no icon will be used.
 * @returns {{ foregroundColor: string, Icon: React.ComponentType, iconSize: number, textSize: number }} - An object containing the button's foreground color, icon component, icon size, and text size.
 */
export const useButton = (
    style: 'dark' | 'light',
    size: 'large' | 'small' | undefined,
    icon?: ButtonIcons | undefined
) => {
    const foregroundColor = useForegroundColor(style);
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