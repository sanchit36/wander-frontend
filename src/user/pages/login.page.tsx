import { chakra } from '@chakra-ui/react';
import { LoginForm } from '../components';

const LoginPage = () => {
  return (
    <chakra.main
      d='flex'
      flex-direction='column'
      justifyContent='center'
      alignItems='center'
      h='100vh'
    >
      <LoginForm />
    </chakra.main>
  );
};

export default LoginPage;
