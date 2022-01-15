import React, { useEffect } from 'react';
import { chakra, Heading, Spinner, Stack, Text } from '@chakra-ui/react';
import { Link, useParams } from 'react-router-dom';
import { Methods, useHttpClient } from '../../shared/hooks/http-hook';

const VerifyEmailConfirm = () => {
  const { token } = useParams();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    clearError();
    sendRequest(`/users/verify-email/${token}`, Methods.PATCH);
  }, [sendRequest, token, clearError]);

  return (
    <chakra.main
      d='flex'
      flex-direction='column'
      justifyContent='center'
      alignItems='center'
      h='92vh'
    >
      {isLoading ? (
        <Spinner size='3xl' />
      ) : error ? (
        <Stack
          maxW='2xl'
          w='100%'
          p={{ sm: 10 }}
          spacing={{ md: 6 }}
          textAlign='center'
        >
          <Heading fontSize='4xl' fontWeight='bold'>
            Invalid/Expired token, please try agin with new token.
          </Heading>
          <Text>
            you can request a new token{' '}
            <Link to='/resend-verification-email'>here</Link>
          </Text>
        </Stack>
      ) : (
        <Stack
          maxW='2xl'
          w='100%'
          p={{ sm: 10 }}
          spacing={{ md: 6 }}
          textAlign='center'
        >
          <Heading fontSize='4xl' fontWeight='bold'>
            Email is confirmed
          </Heading>
          <Text>
            your has been confirmed, you can please{' '}
            <Link to='/login'>login</Link> now.
          </Text>
        </Stack>
      )}
    </chakra.main>
  );
};

export default VerifyEmailConfirm;
