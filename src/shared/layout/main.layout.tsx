import React from 'react';
import { chakra, Container, Divider, Flex } from '@chakra-ui/react';
import Sidebar from '../components/Navigation/Sidebar';
import Footer from '../components/Navigation/Footer';

const MainLayout: React.FC = ({ children }) => {
  return (
    <Container pt='10' maxW={{ md: 'container.md', lg: 'container.lg' }}>
      <Flex>
        <chakra.main h='86vh' flex='2' overflowY={'scroll'} margin='auto'>
          {children}
        </chakra.main>
        <chakra.aside pl='6' display={{ sm: 'none', lg: 'block' }} flex='1'>
          <Sidebar />
          <Divider />
          <Footer />
        </chakra.aside>
      </Flex>
    </Container>
  );
};

export default MainLayout;
