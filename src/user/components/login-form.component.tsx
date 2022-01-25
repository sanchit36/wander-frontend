import {
  Box,
  Button,
  chakra,
  Divider,
  Link,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { Link as RouterLink } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Input } from '../../shared/components';
import { AuthContext } from '../../shared/context/auth.context';
import useForm from '../../shared/hooks/form-hook';
import { Methods, useHttpClient } from '../../shared/hooks/http-hook';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/utils/validators';
import { User } from '../user.interface';

const LoginForm = () => {
  const auth = useContext(AuthContext);
  const { colorMode } = useColorMode();

  const { formState, inputChangeHandler, inputBlurHandler } = useForm(
    {
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
    },
    false
  );

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [showPassword, setShowPassword] = useState(false);

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    clearError();
    try {
      const data = await sendRequest('/users/login', Methods.POST, {
        email: formState.inputs.email.value,
        password: formState.inputs.password.value,
      });
      auth.login(data.payload.user as User, data.payload.accessToken as string);
    } catch (error: any) {}
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
      <chakra.form
        method='POST'
        rounded={[null, 'md']}
        overflow={{ sm: 'hidden' }}
        onSubmit={submitHandler}
      >
        <Stack spacing={6}>
          <Input
            label='Email'
            id='email'
            name='email'
            type='email'
            autoComplete='email'
            value={formState.inputs.email}
            onChange={inputChangeHandler}
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
            onChange={inputChangeHandler}
            onBlur={inputBlurHandler}
            errorMessage={formState.errors.password}
          />
          <Text color='gray' textAlign='right'>
            <RouterLink to='/reset-password'>Forgot Password?</RouterLink>
          </Text>
          <Button
            isLoading={isLoading}
            w='full'
            type='submit'
            colorScheme='purple'
            variant='solid'
            fontWeight='md'
            disabled={!formState.isFormValid}
          >
            Login
          </Button>
        </Stack>
      </chakra.form>

      <Divider />
      <Box textAlign='center'>
        Don't have an account?{' '}
        <Link as={RouterLink} to='/sign-up'>
          Sign Up
        </Link>
      </Box>
    </Stack>
  );
};

export default LoginForm;
