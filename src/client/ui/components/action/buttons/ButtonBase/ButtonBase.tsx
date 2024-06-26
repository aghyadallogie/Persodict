import React, { MouseEvent } from "react";
import { WithChildren } from "../../../../../../../types/global";
import styled from "styled-components";
import { useButtonColors } from "./useButtonColors";

interface ComponentProps {
  as: "button" | "div";
  hasSlimBorder: boolean;
  isActive: boolean;
  isDisabled: boolean;
  isRounded: boolean;
  onClick(event: MouseEvent<HTMLButtonElement>): void;
  style: "dark" | "light";
  type: "button" | "reset" | "submit";
  variant: "primary" | "secondary";
}

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
}

const Wrapper = styled.button<WrapperProps>`
  background: transparent;
  border: none;
  border-radius: 10px;
  box-shadow: 5px 5px 10px rgb(0, 0, 0, 0.1), -5px -5px 10px #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 1em;
  font-weight: 600;
  gap: 1rem;
  outline: none;
  min-width: 5rem;
  padding: 0 1rem;

  &:active {
    box-shadow: 1px 1px 10px rgb(0, 0, 0, 0.1), -5px -5px 10px #fff;
  }

  &:hover {
    background-color: ${({ $buttonHoverColor }) => $buttonHoverColor};
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