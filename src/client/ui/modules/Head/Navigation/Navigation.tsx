import Link from "next/link";
import {
  RiFolderHistoryFill,
  RiHome4Fill,
  RiLogoutBoxRFill,
  RiQuestionnaireFill,
  RiSettings2Fill,
} from "react-icons/ri";
import styled from "styled-components";

export const Navigation = () => {
  return (
    <Nav>
      <NavLink href="/">
        <RiHome4Fill />
      </NavLink>
      <NavLink href="/history">
        <RiFolderHistoryFill />
      </NavLink>
      <NavLink href="/quiz">
        <RiQuestionnaireFill />
      </NavLink>
      <NavLink href="/settings">
        <RiSettings2Fill />
      </NavLink>
      <span style={{ cursor: "pointer" }}>
        <RiLogoutBoxRFill />
      </span>
    </Nav>
  );
};

const Nav = styled.nav`
  top: 0;
  position: sticky;
  width: 100%;
  min-height: 70px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--main-bg);
  border-bottom: 1px solid silver;

  a,
  span {
    color: #333;
    text-decoration: none;
    display: flex;
    flex-direction: column;

    &.active svg {
      min-height: 2.6rem;
      width: 3rem;
      margin-bottom: 10px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      border-radius: 5px;
      color: #333;
    }

    svg {
      width: 4rem;
      height: 2.2rem;
      padding: 5px 0;
      color: #3338;

      &:hover {
        color: #333;
      }
    }
  }
`;

const NavLink = styled(Link)`
  color: #333;
  text-decoration: none;
  display: flex;
  flex-direction: column;

  &.active svg {
    min-height: 2.6rem;
    width: 3rem;
    margin-bottom: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    color: #333;
  }

  svg {
    width: 4rem;
    height: 2.2rem;
    padding: 5px 0;
    color: #3338;

    &:hover {
      color: #333;
    }
  }
`;
