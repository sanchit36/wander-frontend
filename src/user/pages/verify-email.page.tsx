import React from 'react';
import { chakra, Heading, Stack, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const VerifyEmailPage = () => {
  return (
    <chakra.main
      d='flex'
      flex-direction='column'
      justifyContent='center'
      alignItems='center'
      h='92vh'
    >
      <Stack
        maxW='2xl'
        w='100%'
        p={{ sm: 10 }}
        spacing={{ md: 6 }}
        textAlign='center'
      >
        <Heading fontSize='4xl' fontWeight='bold'>
          Verify Your Email
        </Heading>
        <Text>
          A verification email has been sent to you. Please verify your email
          address to login
        </Text>
        <Text color='gray'>
          If you have not received your an email,{' '}
          <Link to='/resend-verification-email'>Click here</Link>
        </Text>
      </Stack>
    </chakra.main>
  );
};

export default VerifyEmailPage;
