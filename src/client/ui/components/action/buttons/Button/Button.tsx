import React, { MouseEvent } from "react";
import styled from "styled-components";
import { ButtonBase } from "@/client/ui/components/action/buttons/ButtonBase";
import { useButton } from "./useButton";
import { ButtonIcons } from "@/client/ui/assets/images/icons";

interface ComponentProps {
  icon?: ButtonIcons;
  label?: string;
  onClick?(event: MouseEvent<HTMLButtonElement>): void;
  position?: "left" | "right";
  isDisabled?: boolean;
  size?: "large" | "small";
  style?: "dark" | "light";
  type?: "button" | "reset" | "submit";
  variant?: "primary" | "secondary";
  width?: number;
}

/**
 * The `Button` Component.
 * This component represents a customizable button element.
 *
 * @param {ButtonIcons} icon - The icon to display on the button.
 * @param {string} label - The text label of the button.
 * @param {function} onClick - The function to call on button click.
 * @param {"left" | "right"} position - The position of the icon relative to the label.
 * @param {boolean} isDisabled - Indicates if the button is disabled.
 * @param {"large" | "small"} size - The size of the button.
 * @param {"dark" | "light"} style - The style of the button.
 * @param {"button" | "reset" | "submit"} type - The type of the button.
 * @param {"primary" | "secondary"} variant - The variant of the button.
 * @param {number} width - The width of the button.
 * @returns A React element representing the `Button` component.
 *
 * @example
 * ```tsx
 * const MyButton = <Button label="Click Me" onClick={handleClick} />;
 * ```
 */
export const Button = ({
  icon,
  label,
  onClick,
  position = "left",
  isDisabled = false,
  size = "small",
  style = "light",
  type = "button",
  variant,
  width,
}: ComponentProps) => {
  const { foregroundColor, Icon, iconSize, textSize } = useButton(style, size, icon);

  return (
    <ButtonBase
      width={width}
      isDisabled={isDisabled}
      onClick={onClick ?? (() => { })}
      style={style}
      type={type}
      variant={variant} as={"button"} hasSlimBorder={false} isActive={false} isRounded={false}
    >
      {Icon && position === "left" && <Icon color={foregroundColor} height={iconSize} width={iconSize} />}
      {label && <P $size={textSize}>
        {size === 'large' ? (<strong>{label}</strong>) : label}
      </P>}
      {Icon && position === "right" && <Icon color={foregroundColor} height={iconSize} width={iconSize} />}
    </ButtonBase>
  );
};

const P = styled.p<{ $size: "large" | "small" }>`
  font-size: ${({ $size }) => $size === "large" ? "1.5rem" : "1rem"};
  font-family: 'Lexend', sans-serif;
`;