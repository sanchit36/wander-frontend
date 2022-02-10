import React from 'react';
import { chakra, Container, Flex } from '@chakra-ui/react';
import Sidebar from '../components/Navigation/Sidebar';
import Footer from '../components/Navigation/Footer';

const MainLayout: React.FC = ({ children }) => {
  return (
    <Container
      h='92vh'
      pt='10'
      maxW={{ md: 'container.md', lg: 'container.lg' }}
    >
      <Flex h='92vh' height='100%'>
        <chakra.main flex='2' overflowY={'scroll'}>
          {children}
        </chakra.main>
        <chakra.aside
          flex='1'
          pl='10'
          display={{ sm: 'none', md: 'none', lg: 'block' }}
        >
          <Sidebar />
          <Footer />
        </chakra.aside>
      </Flex>
    </Container>
  );
};

export default MainLayout;
