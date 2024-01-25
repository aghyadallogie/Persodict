import Link from 'next/link';
import {
    RiFolderHistoryFill,
    RiHome4Fill,
    RiLogoutBoxRFill,
    RiQuestionnaireFill,
    RiSettings2Fill
} from 'react-icons/ri';
import styled from 'styled-components';

export const Navigation = () => (
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
        <span style={{cursor: 'pointer'}}>
            <RiLogoutBoxRFill />
        </span>
    </Nav>
);

const Nav = styled.nav`
  align-items: center;
  background-color: white;
  border-bottom: 2px solid #f0f0f0;
  display: flex;
  justify-content: center;
  min-height: 70px;
  position: sticky;
  text-align: center;
  top: 0;
  width: 100%;
  z-index: 9;

  a,
  span {
    color: #333;
    display: flex;
    flex-direction: column;
    text-decoration: none;

    &.active svg {
      border-radius: 5px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      color: #333;
      margin-bottom: 10px;
      min-height: 2.6rem;
      width: 3rem;
    }

    svg {
      color: #3338;
      height: 2.2rem;
      padding: 5px 0;
      width: 4rem;

      &:hover {
        color: #333;
      }
    }
  }
`;

const NavLink = styled(Link)`
  color: #333;
  display: flex;
  flex-direction: column;
  text-decoration: none;

  &.active svg {
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    color: #333;
    margin-bottom: 10px;
    min-height: 2.6rem;
    width: 3rem;
  }

  svg {
    color: #3338;
    height: 2.2rem;
    padding: 5px 0;
    width: 4rem;

    &:hover {
      color: #333;
    }
  }
`;