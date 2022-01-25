import React, { useEffect } from 'react';
import { Validator } from '../../utils/validators';
import {
  FormControl,
  FormLabel,
  Input as ChakraInput,
  InputGroup,
  InputLeftElement,
  InputProps,
  InputRightElement,
  useColorModeValue,
  FormErrorMessage,
} from '@chakra-ui/react';
import useFormInput from '../../hooks/form-input';

interface IInputProps extends Omit<InputProps, 'onInput'> {
  id: string;
  name: string;
  type: string;
  onInput: (id: string, value: string, isValid: boolean) => void;
  validators: Validator[];
  label?: string;
  initialValue?: string;
  initialValid?: boolean;
  inputLeftElement?: React.ReactNode;
  inputLeftElementOnClick?: () => void;
  inputRightElement?: React.ReactNode;
  inputRightElementOnClick?: () => void;
  errorMessage?: string;
}

const Input: React.FC<IInputProps> = ({
  initialValue,
  initialValid,
  validators,
  inputLeftElement,
  inputLeftElementOnClick,
  inputRightElement,
  inputRightElementOnClick,
  label,
  onInput,
  errorMessage,
  ...props
}) => {
  const { inputState, dispatch } = useFormInput(initialValue, initialValid);

  const labelColor = useColorModeValue('gray.700', 'gray.50');

  const { id } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, isValid, onInput, value]);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'CHANGE',
      val: event.target.value,
      validators,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: 'TOUCH',
    });
  };

  return (
    <FormControl isInvalid={!inputState.isValid && inputState.isTouched}>
      {label && (
        <FormLabel
          htmlFor={props.id}
          fontSize='sm'
          fontWeight='md'
          color={labelColor}
        >
          {label}
        </FormLabel>
      )}
      <InputGroup>
        {inputLeftElement && (
          <InputLeftElement
            onClick={
              inputLeftElementOnClick ? inputLeftElementOnClick : () => {}
            }
          >
            {inputLeftElement}
          </InputLeftElement>
        )}
        <ChakraInput
          mt={1}
          shadow='sm'
          size='sm'
          w='full'
          rounded='md'
          onChange={changeHandler}
          onBlur={touchHandler}
          value={inputState.value}
          {...props}
        />
        {inputRightElement && (
          <InputRightElement
            onClick={
              inputRightElementOnClick ? inputRightElementOnClick : () => {}
            }
          >
            {inputRightElement}
          </InputRightElement>
        )}
      </InputGroup>
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
};

export default Input;
