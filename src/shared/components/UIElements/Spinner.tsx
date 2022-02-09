import { Flex, Spinner as ChakraSpinner } from '@chakra-ui/react';

const Spinner = () => {
  return (
    <Flex minH='100vh' justifyContent='center' alignItems='center'>
      <ChakraSpinner size='xl' />
    </Flex>
  );
};

export default Spinner;
