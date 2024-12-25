import { TranslatedWord } from "@/client/ui/components/TranslatedWord";
import { Button } from "@/client/ui/components/action/buttons/Button";
import styled from "styled-components";
import { useSubmitTranslate } from "./useSubmitTranslate";
import { ButtonIcons } from "@/client/ui/assets/images/icons";

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
  const { handleSubmit, isLoading } = useSubmitTranslate();

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
      <TranslatedWord />
    </>
  );
};

export default TranslateModule;

const StyledForm = styled.form`
  display: flex;
  margin: 3rem 0 1rem 0;
`;

const Input = styled.input`
  background: transparent;
  border: none;
  border-radius: 10px;
  box-shadow: inset 5px 5px 10px rgba(0, 0, 0, 0.1), inset -5px -5px 10px #fff;
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