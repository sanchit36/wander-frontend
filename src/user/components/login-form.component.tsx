import {
  Box,
  Button,
  chakra,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { Link as RouterLink } from 'react-router-dom';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Stack maxW='2xl' w='100%' p={{ sm: 10 }} spacing={{ md: 6 }}>
      <Box px={[4, 0]} textAlign='center'>
        <Heading fontSize='4xl' fontWeight='bold'>
          Welcome back
        </Heading>
      </Box>

      <Stack
        px={4}
        py={5}
        p={[null, 6]}
        rounded={5}
        bg={useColorModeValue('white', 'gray.700')}
        spacing={3}
      >
        <chakra.form
          spacing={6}
          as={Stack}
          method='POST'
          shadow='base'
          rounded={[null, 'md']}
          overflow={{ sm: 'hidden' }}
        >
          <FormControl>
            <FormLabel
              htmlFor='email'
              fontSize='sm'
              fontWeight='md'
              color={useColorModeValue('gray.700', 'gray.50')}
            >
              Email address
            </FormLabel>
            <Input
              type='text'
              name='email'
              id='email'
              autoComplete='email'
              mt={1}
              focusBorderColor='brand.400'
              shadow='sm'
              size='sm'
              w='full'
              rounded='md'
            />
          </FormControl>

          <FormControl>
            <FormLabel
              htmlFor='password'
              fontSize='sm'
              fontWeight='md'
              color={useColorModeValue('gray.700', 'gray.50')}
            >
              Password
            </FormLabel>
            <InputGroup>
              <InputRightElement onClick={() => setShowPassword((p) => !p)}>
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </InputRightElement>
              <Input
                type={showPassword ? 'text' : 'password'}
                name='password'
                id='password'
                autoComplete='none'
                mt={1}
                shadow='sm'
                size='sm'
                w='full'
                rounded='md'
              />
            </InputGroup>
          </FormControl>
          <Button
            w='full'
            type='submit'
            colorScheme='purple'
            variant='solid'
            fontWeight='md'
          >
            Login
          </Button>
        </chakra.form>

        <Divider />
        <Box textAlign='center'>
          Don't have an account?{' '}
          <Link as={RouterLink} to='/sign-up'>
            Sign Up
          </Link>
        </Box>
      </Stack>
    </Stack>
  );
};

export default LoginForm;
