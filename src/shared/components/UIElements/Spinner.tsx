import { Flex, Spinner as ChakraSpinner } from '@chakra-ui/react';

const Spinner = () => {
  return (
    <Flex h='100%' w='100%' justifyContent='center' alignItems='center'>
      <ChakraSpinner size='xl' />
    </Flex>
  );
};

export default Spinner;
