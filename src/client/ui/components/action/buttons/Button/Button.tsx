import React, { MouseEvent } from "react";
import styled from "styled-components";
import { ButtonBase } from "../ButtonBase";
import { useButton } from "./useButton";

interface ComponentProps {
  icon?: any;
  label?: string;
  onClick?(event: MouseEvent<HTMLButtonElement>): void;
  position?: "left" | "right";
  isDisabled?: boolean;
  size?: "large" | "small";
  style?: "dark" | "light";
  type: "button" | "reset" | "submit";
  variant?: "primary" | "secondary";
  width?: number;
}

export const Button = ({
  icon,
  label,
  onClick,
  position = "left",
  isDisabled,
  size,
  style = "light",
  type,
  variant,
  width,
}: ComponentProps) => {
  const { foregroundColor, Icon, iconSize, textSize } = useButton(style, size, icon);
  return <ButtonBase
    width={width}
    isDisabled={isDisabled}
    onClick={onClick ? onClick : () => { }}
    style={style}
    type={type}
    variant={variant} as={"button"} hasSlimBorder={false} isActive={false} isRounded={false}>
    {Icon && position === "left" && <Icon color={foregroundColor} height={iconSize} width={iconSize} />}
    {label && <P $size={textSize}>
      {size === 'large' ? (<strong>{label}</strong>) : label}
    </P>}
    {Icon && position === "right" && <Icon color={foregroundColor} height={iconSize} width={iconSize} />}
  </ButtonBase>;
};

const P = styled.p<{ $size: "large" | "small" }>`
  font-size: ${({ $size }) => $size === "large" ? "1.5rem" : "1rem"};
`;