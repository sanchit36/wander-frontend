import {
  Box,
  Button,
  chakra,
  Divider,
  Link,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { Link as RouterLink } from 'react-router-dom';
import { Input } from '../../shared/components';
import useForm from '../../shared/hooks/form-hook';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/utils/validators';

const LoginForm = () => {
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

  const [showPassword, setShowPassword] = useState(false);

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
          <Button
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
