import React, { MouseEvent } from "react";
import styled from "styled-components";
import { ButtonBase } from "../ButtonBase";
import { useButton } from "./useButton";

interface ComponentProps {
  icon?: any;
  label: string;
  onClick?(event: MouseEvent<HTMLButtonElement>): void;
  position: "left" | "right";
  isDisabled: boolean;
  size: "large" | "small";
  style: "dark" | "light";
  type: "button" | "reset" | "submit";
  variant: "primary" | "secondary";
}

export const Button = ({
  icon,
  label,
  onClick,
  position,
  isDisabled,
  size,
  style,
  type,
  variant,
}: ComponentProps) => {
  const { foregroundColor, Icon, iconPosition, iconSize, textSize } = useButton(style, size, position, icon);
  return <ButtonBase
    isDisabled={isDisabled}
    onClick={onClick ? onClick : () => { }}
    style={style}
    type={type}
    variant={variant} as={"button"} hasSlimBorder={false} isActive={false} isRounded={false}>
    {Icon && <Icon color={foregroundColor} height={iconSize} width={iconSize} />}
    {label && <P $size={textSize}>
      {size === 'large' ? (<strong>{label}</strong>) : label}
    </P>}
  </ButtonBase>;
};

const P = styled.p<{ $size: "large" | "small" }>`
  font-size: ${({ $size }) => $size === "large" ? "1.5rem" : "1rem"};
`;