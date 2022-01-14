import {
  Box,
  Button,
  chakra,
  Divider,
  Link,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { Link as RouterLink } from 'react-router-dom';

import useForm from '../../shared/hooks/form-hook';
import { Input } from '../../shared/components';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/utils/validators';

const SignUpForm = () => {
  const { formState, inputHandler } = useForm(
    {
      username: {
        value: '',
        isValid: false,
      },
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
      passwordConfirmation: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(formState);
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
      <chakra.form px={2} method='POST' onSubmit={submitHandler}>
        <Stack spacing={6}>
          <Input
            label='Username'
            id='username'
            name='username'
            type='text'
            onInput={inputHandler}
            autoComplete='username'
            validators={[VALIDATOR_REQUIRE()]}
            errorMessage='username is required'
          />

          <Input
            label='Email'
            id='email'
            name='email'
            type='email'
            onInput={inputHandler}
            autoComplete='email'
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
            errorMessage='email is required'
          />

          <Input
            label='Password'
            id='password'
            name='password'
            type={showPassword ? 'text' : 'password'}
            onInput={inputHandler}
            autoComplete='none'
            validators={[VALIDATOR_MINLENGTH(6)]}
            inputRightElement={
              showPassword ? <AiFillEyeInvisible /> : <AiFillEye />
            }
            inputRightElementOnClick={() => {
              setShowPassword((p) => !p);
            }}
            errorMessage='password should be at least 6 characters'
          />

          <Input
            label='Confirm Password'
            id='passwordConfirmation'
            name='passwordConfirmation'
            type={showPassword ? 'text' : 'password'}
            onInput={inputHandler}
            autoComplete='none'
            validators={[VALIDATOR_MINLENGTH(6)]}
            inputRightElement={
              showPasswordConfirmation ? <AiFillEyeInvisible /> : <AiFillEye />
            }
            inputRightElementOnClick={() => {
              setShowPasswordConfirmation((p) => !p);
            }}
            errorMessage='passwords does not match'
          />

          <Button
            w='full'
            type='submit'
            colorScheme='purple'
            variant='solid'
            fontWeight='md'
            disabled={!formState.isValid}
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
