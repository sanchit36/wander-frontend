import { Box, chakra, Heading, Stack } from '@chakra-ui/react';
import { ResetPasswordForm } from '../components';

const ResetPasswordConfirm = () => {
  return (
    <chakra.main
      d='flex'
      flex-direction='column'
      justifyContent='center'
      alignItems='center'
      h='92vh'
    >
      <Stack maxW='2xl' w='100%' p={{ sm: 10 }} spacing={{ md: 6 }}>
        <Box px={[4, 0]} textAlign='center'>
          <Heading fontSize='4xl' fontWeight='bold'>
            Reset Password
          </Heading>
        </Box>
        <ResetPasswordForm />
      </Stack>
    </chakra.main>
  );
};

export default ResetPasswordConfirm;
