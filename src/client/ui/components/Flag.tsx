import styled from "styled-components";

interface ComponentProps {
  langCode: string;
  langFlag: string;
  langName: string;
  picked: boolean;
  isLoading: boolean;
  onToggle: (langCode: string) => void;
}

/**
 * A presentational language flag used to toggle a language on or off.
 *
 * @param langCode - Language code passed to `onToggle` (for example `"en"`).
 * @param langFlag - Flag-icons CSS classes that paint the flag background.
 * @param langName - Accessible language name announced to assistive tech.
 * @param picked - Whether this language is currently selected.
 * @param isLoading - Disables the control while a settings update is in flight.
 * @param onToggle - Called with `langCode` when the flag is activated.
 *
 * @example
 * ```tsx
 * <Flag
 *   langCode="fr"
 *   langFlag="fi fi-fr"
 *   langName="French"
 *   picked
 *   isLoading={false}
 *   onToggle={handleToggle}
 * />
 * ```
 */
export const Flag = ({
  langCode,
  langFlag,
  langName,
  picked,
  isLoading,
  onToggle,
}: ComponentProps) => (
  <FlagButton
    type="button"
    className={langFlag}
    aria-label={langName}
    aria-pressed={picked}
    disabled={isLoading}
    $picked={picked}
    $isLoading={isLoading}
    onClick={() => onToggle(langCode)}
  />
);

interface ButtonStyleProps {
  $picked: boolean;
  $isLoading: boolean;
}

const FlagButton = styled.button<ButtonStyleProps>`
  appearance: none;
  padding: 0;
  font: inherit;
  border-radius: 10px;
  width: 4rem;
  height: 3rem;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  background-color: transparent;
  background-size: cover;
  background-position: center;
  transition: transform 0.2s ease, filter 0.2s ease, opacity 0.2s ease;
  border: none;

  &::after {
    content: ${({ $picked }) => ($picked ? "'✓'" : "''")};
    position: absolute;
    top: -5px;
    right: -5px;
    width: 1.32rem;
    height: 1.32rem;
    background: grey;
    color: white;
    border-radius: 50%;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    opacity: ${({ $picked }) => ($picked ? "1" : "0")};
    transform: ${({ $picked }) => ($picked ? "scale(1)" : "scale(0)")};
    transition: opacity 0.3s ease, transform 0.3s ease;
    z-index: 2;
  }

  filter: ${({ $picked }) => ($picked ? "none" : "brightness(0.80)")};
  opacity: ${({ $isLoading }) => ($isLoading ? 0.7 : 1)};

  &:hover:enabled {
    filter: brightness(1);
    transform: translateY(-2px);
  }

  &:disabled {
    cursor: not-allowed;
  }
`;
