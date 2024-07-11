import styled from "styled-components";

import { TranslatedWord } from "../../components/TranslatedWord";
import { Button } from "../../components/action/buttons/Button";
import { useSubmitTranslate } from "./useSubmitTranslate";

/**
 * The `TranslateModule` Component.
 *
 * @returns A React element representing the `TranslateModule` component.
 *
 * @example
 * ```tsx
 * const MyComponent = <TranslateModule />;
 * ```
 */
const TranslateModule = () => {
  const { handleSubmit } = useSubmitTranslate();

  return (
    <>
      <StyledForm data-cy="translate-form" onSubmit={handleSubmit}>
        <Input placeholder="word to translate" type="text" />
        <Button
          icon={'Translate'}
          type="submit"
          width={6}
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
