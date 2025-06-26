import { ButtonIcons } from "@/client/ui/assets/images/icons";
import { TranslatedWord } from "@/client/ui/components/TranslatedWord";
import { Button } from "@/client/ui/components/action/buttons/Button";
import styled from "styled-components";
import { useSubmitTranslate } from "./useSubmitTranslate";

/**
 * A form module for translating words.
 *
 * This component renders a form with an input field and a submit button. 
 * It uses a custom hook `useSubmitTranslate` to handle form submissions.
 *
 * @component
 * @returns {JSX.Element} The TranslateModule component.
 */
const TranslateModule = (): JSX.Element => {
  const { handleSubmit, isLoading, error } = useSubmitTranslate();

  return (
    <>
      <StyledForm data-cy="translate-form" onSubmit={handleSubmit}>
        <Input placeholder="word to translate" type="text" />
        <Button
          icon={ButtonIcons.Translate}
          type="submit"
          width={6}
          isDisabled={isLoading}
        />
      </StyledForm>
      <Error $show={!!error}>{error || " "}</Error>
      <TranslatedWord error={error} />
    </>
  );
};

export default TranslateModule;

const StyledForm = styled.form`
  display: flex;
  margin: 3rem 0 2rem 0;
  gap: 1rem;
`;

const Input = styled.input`
  background: transparent;
  border: none;
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.shadows.inputShadow};
  color: ${({ theme }) => theme.colors.primaryFontColor};
  font-size: 1em;
  letter-spacing: 1px;
  outline: none;
  padding: 15px 20px;
  padding-left: 40px;
  width: 100%;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textPlaceholder};
    font-size: 0.8em;
    font-weight: 400;
    letter-spacing: 2px;
  }

  &:focus {
    ::placeholder {
      visibility: hidden;
    }
  }
`;

const Error = styled.p<{ $show: boolean }>`
  color: ${({ theme }) => theme.colors.error};
  font-size: 0.8em;
  font-weight: 400;
  letter-spacing: 1px;
  text-align: center;
  opacity: ${({ $show }) => ($show ? 1 : 0)};
  transform: translateY(${({ $show }) => ($show ? "0" : "-10px")});
  transition: opacity 0.3s ease, transform 0.3s ease;
  min-height: 1.2em;
`;