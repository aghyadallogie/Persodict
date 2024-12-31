import Link from "next/link";
import { ReactNode } from "react"
import styled from "styled-components";

interface ComponentProps {
  children: ReactNode
  $isActive: boolean
  href: string
}

export const NavLink = ({ children, href, $isActive }: ComponentProps) => (
  <Link href={href}>
    <NavLinkElement $isActive={$isActive}>
      {children}
    </NavLinkElement>
  </Link>
)

const NavLinkElement = styled.span<{ $isActive: boolean }>`
  color: #333;
  display: flex;
  flex-direction: column;
  text-decoration: none;

  svg {
    fill: ${({ $isActive, theme }) => $isActive ? "#333" : theme.colors.textPlaceholder};
    height: 2.2rem;
    padding: 5px 0;
    width: 4rem;
    transition: 0.5s;

    &:hover {
      fill: #333;
    }
  }
`;