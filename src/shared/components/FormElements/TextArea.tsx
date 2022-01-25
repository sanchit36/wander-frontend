import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea,
  TextareaProps,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import useFormInput from '../../hooks/form-input';
import { Validator } from '../../utils/validators';

interface Props extends Omit<TextareaProps, 'onInput'> {
  id: string;
  validators: Validator[];
  onInput: (id: string, value: string, isValid: boolean) => void;
  label?: string;
  errorMessage?: string;
}

const TextArea: React.FC<Props> = ({
  label,
  onInput,
  validators,
  errorMessage,
  ...props
}) => {
  const { inputState, dispatch } = useFormInput();
  const labelColor = useColorModeValue('gray.700', 'gray.50');
  const { id } = props;
  const { value, isValid } = inputState;

  const changeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({
      type: 'CHANGE',
      val: event.target.value,
      validators,
    });
  };

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, isValid, onInput, value]);

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
      <Textarea value={value} onChange={changeHandler} size='sm' {...props} />
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
};

export default TextArea;
