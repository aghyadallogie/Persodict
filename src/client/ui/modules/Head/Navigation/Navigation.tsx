import { ThemeToggle } from "@/client/ui/components/action/buttons/ThemeToggle";
import { NavLink } from "@/client/ui/components/action/NavLink";
import { Tooltip } from "@/client/ui/components/action/Tooltip";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import {
  RiFolderHistoryFill,
  RiHome4Fill,
  RiLogoutBoxRFill,
  RiQuestionnaireFill,
  RiSettings2Fill
} from "react-icons/ri";
import styled from "styled-components";

/**
 * Navigation component that renders the main navigation bar for the application.
 * It includes links to the home, history, quiz, and settings pages, as well as a logout button.
 * The active link is highlighted based on the current route.
 *
 * @component
 * @returns {JSX.Element} The rendered navigation bar.
 */
export const Navigation = () => {
  const { asPath } = useRouter();
  return (
    <Nav>
      <NavLink href="/" $isActive={asPath === '/'}>
        <Tooltip content="Translate">
          <RiHome4Fill />
        </Tooltip>
      </NavLink>
      <NavLink href="/history" $isActive={asPath === '/history'}>
        <Tooltip content="History">
          <RiFolderHistoryFill />
        </Tooltip>
      </NavLink>
      <NavLink href="/quiz" $isActive={asPath === '/quiz'}>
        <Tooltip content="Quiz">
          <RiQuestionnaireFill />
        </Tooltip>
      </NavLink>
      <NavLink href="/settings" $isActive={asPath === '/settings'}>
        <Tooltip content="Settings">
          <RiSettings2Fill />
        </Tooltip>
      </NavLink>
      <Tooltip content="Theme">
        <ThemeToggle />
      </Tooltip>
      <LogoutButton>
        <Tooltip content="Logout">
          <RiLogoutBoxRFill
            onClick={async () => signOut({ callbackUrl: "/login" })}
          />
        </Tooltip>
      </LogoutButton>
    </Nav>
  )
};

const Nav = styled.nav`
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.hoverColor};
  display: flex;
  justify-content: center;
  min-height: 70px;
  position: sticky;
  text-align: center;
  top: 0;
  width: 100%;
  z-index: 9;

  a,
  div {
    color: ${({ theme }) => theme.colors.darkSelected};
    display: flex;
    flex-direction: column;
    text-decoration: none;

    &.active svg {
      border-radius: 5px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      color: ${({ theme }) => theme.colors.darkSelected};
      margin-bottom: 10px;
      min-height: 2.6rem;
      width: 3rem;
    }

    svg {
      height: 2.2rem;
      padding: 5px 0;
      width: 4rem;

      &:hover {
        color: ${({ theme }) => theme.colors.darkSelected};
      }
    }
  }
`;

const LogoutButton = styled.div`
  cursor: pointer;
  svg {
    fill: ${({ theme }) => theme.colors.textPlaceholder};
    height: 2.2rem;
    padding: 5px 0;
    transition: 0.5s;
    width: 4rem;

    &:hover {
      fill: ${({ theme }) => theme.colors.darkSelected};
    }
  }
`;