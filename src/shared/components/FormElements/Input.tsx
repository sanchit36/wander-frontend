import React from 'react';
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
import { InputValue } from '../../hooks/form-hook';

interface IInputProps extends Omit<InputProps, 'onInput' | 'value'> {
  id: string;
  name: string;
  type: string;
  value: InputValue;
  isValid?: boolean;
  isTouched?: boolean;
  label?: string;
  errorMessage?: string;
  inputLeftElement?: React.ReactNode;
  inputLeftElementOnClick?: () => void;
  inputRightElement?: React.ReactNode;
  inputRightElementOnClick?: () => void;
  onInput: (id: string, value: any, isValid: boolean) => void;
}

const Input: React.FC<IInputProps> = ({
  value,
  label,
  inputLeftElement,
  inputLeftElementOnClick,
  inputRightElement,
  inputRightElementOnClick,
  errorMessage,
  onInput,
  ...props
}) => {
  const labelColor = useColorModeValue('gray.700', 'gray.50');

  return (
    <FormControl isInvalid={!value.isValid && value.isTouched}>
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
          value={value.value}
          onChange={(event) =>
            onInput(event.target.id, event.target.value, value.isValid)
          }
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
