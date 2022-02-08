import { Button, chakra, Stack, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Input } from '../../shared/components';
import useForm from '../../shared/hooks/form-hook';
import { Methods, useHttpClient } from '../../shared/hooks/http-hook';
import { VALIDATOR_MINLENGTH } from '../../shared/utils/validators';

const ResetPasswordForm = () => {
  const { userId, token } = useParams();

  const { formState, inputHandler, inputBlurHandler } = useForm(
    {
      password: {
        value: '',
        isValid: false,
        validators: [
          VALIDATOR_MINLENGTH(
            6,
            'Password should be at least 6 characters long'
          ),
        ],
      },
    },
    false
  );
  const { isLoading, sendRequest } = useHttpClient();

  const navigate = useNavigate();

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await sendRequest(
        `/users/reset-password/${userId}/${token}`,
        Methods.PATCH,
        {
          password: formState.inputs.password.value,
        }
      );
      navigate('/login');
    } catch (error: any) {}
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
      <chakra.form
        method='POST'
        rounded={[null, 'md']}
        overflow={{ sm: 'hidden' }}
        onSubmit={submitHandler}
        p={[2]}
      >
        <Stack spacing={6}>
          <Input
            label='Password'
            id='password'
            name='password'
            type='password'
            autoComplete='password'
            value={formState.inputs.password}
            onInput={inputHandler}
            onBlur={inputBlurHandler}
            errorMessage={formState.errors.username}
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
            Submit
          </Button>
        </Stack>
      </chakra.form>
    </Stack>
  );
};

export default ResetPasswordForm;
