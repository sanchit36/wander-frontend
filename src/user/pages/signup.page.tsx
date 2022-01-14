import { Box, chakra, Heading, Stack } from '@chakra-ui/react';
import React from 'react';
import { SignUpForm } from '../components';

const SignUpPage = () => {
  return (
    <chakra.main
      d='flex'
      flex-direction='column'
      justifyContent='center'
      alignItems='center'
      h='92vh'
    >
      <Stack maxW='2xl' w='100%' p={{ sm: 10 }} spacing={{ md: 6 }}>
        <Box my={2} textAlign='center'>
          <Heading fontSize={{ sm: '3xl', md: '5xl' }} fontWeight='bold'>
            SIGN UP
          </Heading>
        </Box>
        <SignUpForm />
      </Stack>
    </chakra.main>
  );
};

export default SignUpPage;
