import React from 'react';
import { chakra, Container, HStack } from '@chakra-ui/react';

const MainLayout: React.FC = ({ children }) => {
  return (
    <Container maxW='container.xl' minH='92vh' my='10'>
      <HStack minH='92vh' height='100%' alignItems='stretch'>
        <chakra.main flex='2' pr='5'>
          {children}
        </chakra.main>
        <chakra.aside flex='1'>
          Side bar
          {/* sidebar */}
          {/* footer */}
        </chakra.aside>
      </HStack>
    </Container>
  );
};

export default MainLayout;
