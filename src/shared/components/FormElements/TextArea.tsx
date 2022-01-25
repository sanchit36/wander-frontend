import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea,
  TextareaProps,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import { InputValue } from '../../hooks/form-hook';

interface Props extends Omit<TextareaProps, 'onInput' | 'value'> {
  id: string;
  value: InputValue;
  label?: string;
  errorMessage?: string;
}

const TextArea: React.FC<Props> = ({
  value,
  label,
  errorMessage,
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
      <Textarea size='sm' value={value.value} {...props} />
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
};

export default TextArea;
