import React from 'react';
import { chakra, Container, Flex } from '@chakra-ui/react';

const MainLayout: React.FC = ({ children }) => {
  return (
    <Container maxW='container.xl' minH='92vh' my='10'>
      <Flex minH='92vh' height='100%' alignItems='stretch'>
        <chakra.main flex='2'>{children}</chakra.main>
        <chakra.aside flex='1' px='10' display={{ sm: 'none', lg: 'block' }}>
          Side bar
          {/* sidebar */}
          {/* footer */}
        </chakra.aside>
      </Flex>
    </Container>
  );
};

export default MainLayout;
