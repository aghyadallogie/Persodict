import {MdOutlineTranslate} from 'react-icons/md';
import styled from 'styled-components';

import {TranslatedWord} from '../../components/TranslatedWord';

import {useSubmitTranslate} from './useSubmitTranslate';

/**
 * The `AddDeveloper` Component.
 *
 * @param props.testId A unique identifier, usually in the form of a string, assigned to the component for testing purposes.
 * @returns A React element representing the `AddDeveloper` component.
 *
 * @example
 * ```tsx
 * const MyComponent = <AddDeveloper testId="myTestId">MyComponent</AddDeveloper>;
 * ```
 */
const TranslateModule = () => {
    const {handleSubmit} = useSubmitTranslate();

    return (
        <>
            <StyledForm data-cy="translate-form" onSubmit={handleSubmit}>
                <Input placeholder="word to translate" />
                <Button style={{padding: 0}} type="submit">
                    <MdOutlineTranslate size="1.5rem" />
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

  ::placeholder {
    color: #ccc;
    font-size: 0.8em;
    font-weight: 400;
    letter-spacing: 1px;
  }

  :active {
    ::placeholder {
      visibility: hidden;
    }
  }
`;

const Button = styled.button`
  background: transparent;
  border: none;
  border-radius: 10px;
  box-shadow: 5px 5px 10px rgb(0, 0, 0, 0.1), -5px -5px 10px #fff;
  cursor: pointer;

  font-size: 1em;
  font-weight: 600;
  outline: none;
  padding: 15px 20px;
  width: 5rem;

  :active {
    box-shadow: inset 5px 5px 10px rgba(0, 0, 0, 0.1), inset -5px -5px 10px #fff;
  }
`;