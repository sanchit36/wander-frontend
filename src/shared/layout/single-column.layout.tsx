import React from 'react';
import { chakra, Container, Flex } from '@chakra-ui/react';

const SingleColumn: React.FC = ({ children }) => {
  return (
    <Container maxW='container.xl' minH='92vh'>
      <Flex minH='92vh' height='100%'>
        <chakra.main flex='1'>{children}</chakra.main>
      </Flex>
    </Container>
  );
};

export default SingleColumn;
