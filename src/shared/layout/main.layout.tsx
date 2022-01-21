import React from 'react';
import { chakra, Container, Flex } from '@chakra-ui/react';

const MainLayout: React.FC = ({ children }) => {
  return (
    <Container maxW='container.xl' minH='92vh' mt='5'>
      <Flex flexDirection='row' minH='92vh' height='100%'>
        <chakra.main flex='2'>{children}</chakra.main>
        <chakra.aside flex='1'>
          Side bar
          {/* sidebar */}
          {/* footer */}
        </chakra.aside>
      </Flex>
    </Container>
  );
};

export default MainLayout;
