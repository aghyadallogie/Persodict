import Link from "next/link";
import { ReactNode } from "react"
import styled from "styled-components";

interface ComponentProps {
  children: ReactNode
  $isActive: boolean
  href: string
}

/**
 * NavLink component for navigation links.
 *
 * @param {Object} props - Component props.
 * @param {ReactNode} props.children - The content to be displayed inside the link.
 * @param {string} props.href - The URL the link points to.
 * @param {boolean} props.$isActive - Indicates if the link is active.
 * @returns {JSX.Element} The rendered NavLink component.
 */
export const NavLink = ({ children, href, $isActive }: ComponentProps) => (
  <Link href={href}>
    <NavLinkElement $isActive={$isActive}>
      {children}
    </NavLinkElement>
  </Link>
)

const NavLinkElement = styled.span<{ $isActive: boolean }>`
  color: ${({ $isActive, theme }) => $isActive ? theme.colors.darkSelected : theme.colors.textPlaceholder};
  display: flex;
  flex-direction: column;
  text-decoration: none;

  svg {
    fill: ${({ $isActive, theme }) => $isActive ? theme.colors.darkSelected : theme.colors.textPlaceholder};
    height: 2.2rem;
    padding: 5px 0;
    width: 4rem;
    transition: 0.5s;

    &:hover {
      fill: ${({ theme }) => theme.colors.darkSelected};
    }
  }
`;