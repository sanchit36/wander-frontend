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
import { useContext, useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { Link as RouterLink } from 'react-router-dom';
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

  const { formState, inputHandler } = useForm(
    {
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
    },
    false
  );
  const { isLoading, sendRequest } = useHttpClient();

  const [showPassword, setShowPassword] = useState(false);

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const data = await sendRequest('/users/login', Methods.POST, {
        email: formState.inputs.email.value,
        password: formState.inputs.password.value,
      });
      console.log(data);
      auth.login(data.payload.user as User, data.payload.accessToken as string);
    } catch (error) {
      console.log(error);
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
            disabled={!formState.isValid}
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
