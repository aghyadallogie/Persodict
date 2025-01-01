import React, { MouseEvent } from "react";
import { WithChildren } from "@/types/global";
import styled from "styled-components";
import { useButtonColors } from "./useButtonColors";

interface ComponentProps {
  as?: "button" | "div";
  hasSlimBorder?: boolean;
  isActive?: boolean;
  isDisabled?: boolean;
  isRounded?: boolean;
  onClick(event: MouseEvent<HTMLButtonElement>): void;
  style?: "dark" | "light";
  type?: "button" | "reset" | "submit";
  variant?: "primary" | "secondary";
  width?: number;
}

/**
 * The `ButtonBase` Component.
 * This component serves as the base button element with customizable styles.
 *
 * @param {string} as - The HTML tag to render as.
 * @param {boolean} hasSlimBorder - Indicates if the button has a slim border.
 * @param {boolean} isActive - Indicates if the button is active.
 * @param {boolean} isDisabled - Indicates if the button is disabled.
 * @param {boolean} isRounded - Indicates if the button is rounded.
 * @param {function} onClick - The function to call on button click.
 * @param {"dark" | "light"} style - The style of the button.
 * @param {"button" | "reset" | "submit"} type - The type of the button.
 * @param {"primary" | "secondary"} variant - The variant of the button.
 * @param {number} width - The width of the button.
 * @returns A React element representing the `ButtonBase` component.
 *
 * @example
 * ```tsx
 * const MyButton = <ButtonBase onClick={handleClick} />;
 * ```
 */
export const ButtonBase = ({
  as = "button",
  children,
  hasSlimBorder = false,
  isActive = false,
  isDisabled = false,
  isRounded = false,
  onClick,
  style = "light",
  type = "button",
  variant = "primary",
  width = 16,
}: WithChildren<ComponentProps>) => {
  const {
    activeBorderColor,
    buttonBaseColor,
    buttonHoverColor,
    buttonPressedColor,
  } = useButtonColors(variant, style, hasSlimBorder);
  return (
    <Wrapper
      $activeBorderColor={activeBorderColor}
      $buttonBaseColor={buttonBaseColor}
      $buttonHoverColor={buttonHoverColor}
      $buttonPressedColor={buttonPressedColor}
      $hasSlimBorder={hasSlimBorder}
      $isRounded={isRounded}
      as={as}
      className={isActive ? "active" : ""}
      disabled={isDisabled}
      type={type}
      onClick={onClick}
      width={width}
    >
      {children}
    </Wrapper>
  );
};

interface WrapperProps {
  $activeBorderColor: string;
  $buttonBaseColor: string;
  $buttonHoverColor: string;
  $buttonPressedColor: string;
  $hasSlimBorder: boolean;
  $isRounded: boolean;
  width: number;
}

const Wrapper = styled.button<WrapperProps>`
  background: transparent;
  border: none;
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.shadows.buttonShadow};
  color: ${({ theme }) => theme.colors.primaryAccentFontColor};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2em;
  letter-spacing: 0.05em;
  font-weight: 600;
  font-family: "Lexend", sans-serif;
  gap: 1rem;
  outline: none;
  width: ${({ width }) => width}rem;
  padding: 0 1rem;

  &:active {
    box-shadow: 1px 1px 10px rgb(0, 0, 0, 0.1), -5px -5px 10px #fff;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.hoverColor};
    border: ${({ $hasSlimBorder }) => ($hasSlimBorder ? "1px" : "0px")} solid
      ${({ $buttonHoverColor }) => $buttonHoverColor};
    outline: none;
    transition: border 0.3s 0s ease-in-out, background-color 0.3s 0s ease-in-out;
  }
  &:active,
  &.active {
    background-color: ${({ $buttonPressedColor }) => $buttonPressedColor};
    border: ${({ $hasSlimBorder }) => ($hasSlimBorder ? "1px" : "0px")} solid
      ${({ $activeBorderColor }) => $activeBorderColor};
    outline: none;
    transition: border 0.3s 0s ease-in-out, background-color 0.3s 0s ease-in-out;
  }
  &:focus {
    border: ${({ $hasSlimBorder }) => ($hasSlimBorder ? "1px" : "0px")} solid
      ${({ theme }) => theme.colors.buttonBorderColor};
    outline: none;
    transition: border 0.3s 0s ease-in-out;
  }
  &:disabled {
    opacity: 0.3;
    outline: none;
    transition: opacity 0.3s 0s ease-in-out;
  }
`;