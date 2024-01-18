import { MdOutlineTranslate } from "react-icons/md";
import styled from "styled-components";
import { TranslatedWord } from "../../components/TranslatedWord";
import { useSubmitTranslate } from "./useSubmitTranslate";

/**
 * The `AddDeveloper` Component.
 *
 * @param props        The component props.
 * @param props.testId A unique identifier, usually in the form of a string, assigned to the component for testing purposes.
 * @returns A React element representing the `AddDeveloper` component.
 *
 * @example
 * ```tsx
 * const MyComponent = <AddDeveloper testId="myTestId">MyComponent</AddDeveloper>;
 * ```
 */
const TranslateModule = () => {
  const { handleSubmit } = useSubmitTranslate();

  return (
    <>
      <StyledForm onSubmit={handleSubmit}>
        <Input placeholder="word to translate" />
        <Button type="submit" style={{ padding: 0 }}>
          <MdOutlineTranslate size={"1.5rem"} />
        </Button>
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
  width: 100%;
  padding: 15px 20px;
  padding-left: 40px;
  box-shadow: inset 5px 5px 10px rgba(0, 0, 0, 0.1), inset -5px -5px 10px #fff;
  border: none;
  outline: none;
  background: transparent;
  border-radius: 10px;
  font-size: 1em;
  letter-spacing: 1px;

  ::placeholder {
    font-size: 0.8em;
    letter-spacing: 1px;
    font-weight: 400;
    color: #ccc;
  }

  :active {
    ::placeholder {
      visibility: hidden;
    }
  }
`;

const Button = styled.button`
  box-shadow: 5px 5px 10px rgb(0, 0, 0, 0.1), -5px -5px 10px #fff;
  width: 5rem;
  padding: 15px 20px;
  cursor: pointer;
  font-weight: 600;

  border: none;
  outline: none;
  background: transparent;
  border-radius: 10px;
  font-size: 1em;

  :active {
    box-shadow: inset 5px 5px 10px rgba(0, 0, 0, 0.1), inset -5px -5px 10px #fff;
  }
`;
