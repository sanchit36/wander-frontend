import {
  Box,
  Button,
  chakra,
  Divider,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Input } from '../../shared/components';
import useForm from '../../shared/hooks/form-hook';
import { Methods, useHttpClient } from '../../shared/hooks/http-hook';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
} from '../../shared/utils/validators';

const ResetPasswordEmailFrom = () => {
  const { formState, inputHandler, inputBlurHandler } = useForm(
    {
      email: {
        value: '',
        isValid: false,
        validators: [
          VALIDATOR_REQUIRE('email is required'),
          VALIDATOR_EMAIL('please provide a valid email address'),
        ],
      },
    },
    false
  );
  const { isLoading, sendRequest } = useHttpClient();

  const [message, setMessage] = useState('');

  const clearMessage = () => {
    setMessage('');
  };

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    clearMessage();
    try {
      await sendRequest('/users/reset-password', Methods.POST, {
        email: formState.inputs.email.value,
      });
      setMessage('Email has been sent successfully.');
    } catch (error: any) {
      setMessage(error.message!);
    }
  };

  return (
    <Stack
      px={4}
      py={5}
      p={[null, 6]}
      rounded={5}
      bg={useColorModeValue('white', 'gray.700')}
      spacing={3}
      shadow='base'
    >
      {message ? (
        <Text>{message}</Text>
      ) : (
        <chakra.form
          method='POST'
          rounded={[null, 'md']}
          overflow={{ sm: 'hidden' }}
          onSubmit={submitHandler}
          p={[2]}
        >
          <Stack spacing={6}>
            <Input
              label='Email'
              id='email'
              name='email'
              type='email'
              autoComplete='email'
              value={formState.inputs.email}
              onInput={inputHandler}
              onBlur={inputBlurHandler}
              errorMessage={formState.errors.email}
            />

            <Button
              isLoading={isLoading}
              w='full'
              type='submit'
              colorScheme='purple'
              variant='solid'
              fontWeight='md'
              disabled={!formState.isFormValid}
            >
              Send Email
            </Button>
          </Stack>
        </chakra.form>
      )}

      <Divider />
      <Box textAlign='center'>
        Don't have an account?{' '}
        <Link as={RouterLink} to='/sign-up'>
          Sign Up
        </Link>
      </Box>
      <Box textAlign='center'>
        Already have an account?{' '}
        <Link as={RouterLink} to='/login'>
          Login
        </Link>
      </Box>
    </Stack>
  );
};

export default ResetPasswordEmailFrom;
