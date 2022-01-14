import { chakra } from '@chakra-ui/react';
import React from 'react';
import { SignUpForm } from '../components';

const SignUpPage = () => {
  return (
    <chakra.main
      d='flex'
      flex-direction='column'
      justifyContent='center'
      alignItems='center'
      h='100vh'
    >
      <SignUpForm />
    </chakra.main>
  );
};

export default SignUpPage;
