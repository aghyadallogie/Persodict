import { useTheme } from '@/client/context/ThemeContext';
import { RiMoonFill, RiSunFill } from 'react-icons/ri';
import styled from 'styled-components';

export const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <ToggleButton onClick={toggleTheme}>
      {isDarkMode ? <RiSunFill /> : <RiMoonFill />}
    </ToggleButton>
  );
};

const ToggleButton = styled.div`
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