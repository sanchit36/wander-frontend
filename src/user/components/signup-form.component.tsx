import {
  Box,
  Button,
  chakra,
  Divider,
  Link,
  Stack,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import useForm from '../../shared/hooks/form-hook';
import { Input } from '../../shared/components';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/utils/validators';
import { Methods, useHttpClient } from '../../shared/hooks/http-hook';
import { toast } from 'react-toastify';

const SignUpForm = () => {
  const { colorMode } = useColorMode();

  const { formState, inputHandler, inputBlurHandler } = useForm(
    {
      username: {
        value: '',
        isValid: false,
        validators: [VALIDATOR_REQUIRE('username is required')],
      },
      email: {
        value: '',
        isValid: false,
        validators: [VALIDATOR_REQUIRE('email is required'), VALIDATOR_EMAIL()],
      },
      password: {
        value: '',
        isValid: false,
        validators: [
          VALIDATOR_MINLENGTH(6, 'password should be at least 6 characters'),
        ],
      },
      passwordConfirmation: {
        value: '',
        isValid: false,
        validators: [
          VALIDATOR_MINLENGTH(6, 'password should be at least 6 characters'),
        ],
      },
    },
    false
  );
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

  const navigate = useNavigate();

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const data = await sendRequest('/users/signup', Methods.POST, {
        username: formState.inputs.username.value,
        email: formState.inputs.email.value,
        password: formState.inputs.password.value,
        passwordConfirmation: formState.inputs.passwordConfirmation.value,
      });
      toast.info(data.message);
      navigate('/verify-email');
    } catch (error) {}
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        theme: colorMode,
      });
    }
    return () => {
      clearError();
    };
  }, [error, colorMode, clearError]);

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
      <chakra.form px={2} method='POST' onSubmit={submitHandler}>
        <Stack spacing={6}>
          <Input
            label='Username'
            id='username'
            name='username'
            type='text'
            autoComplete='username'
            value={formState.inputs.username}
            onInput={inputHandler}
            onBlur={inputBlurHandler}
            errorMessage={formState.errors.username}
          />

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

          <Input
            label='Password'
            id='password'
            name='password'
            type={showPassword ? 'text' : 'password'}
            autoComplete='none'
            inputRightElement={
              showPassword ? <AiFillEyeInvisible /> : <AiFillEye />
            }
            inputRightElementOnClick={() => {
              setShowPassword((p) => !p);
            }}
            value={formState.inputs.password}
            onInput={inputHandler}
            onBlur={inputBlurHandler}
            errorMessage={formState.errors.password}
          />

          <Input
            label='Confirm Password'
            id='passwordConfirmation'
            name='passwordConfirmation'
            type={showPassword ? 'text' : 'password'}
            autoComplete='none'
            inputRightElement={
              showPasswordConfirmation ? <AiFillEyeInvisible /> : <AiFillEye />
            }
            inputRightElementOnClick={() => {
              setShowPasswordConfirmation((p) => !p);
            }}
            value={formState.inputs.passwordConfirmation}
            onInput={inputHandler}
            onBlur={inputBlurHandler}
            errorMessage={formState.errors.passwordConfirmation}
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
            Sign Up
          </Button>
        </Stack>
      </chakra.form>

      <Divider />
      <Box textAlign='center'>
        Already have an account?{' '}
        <Link as={RouterLink} to='/login'>
          Login
        </Link>
      </Box>
    </Stack>
  );
};

export default SignUpForm;
