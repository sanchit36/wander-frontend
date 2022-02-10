import React from 'react';

import {
  chakra,
  Flex,
  useColorModeValue,
  HStack,
  useDisclosure,
  Heading,
  Container,
} from '@chakra-ui/react';

import MobileNavbar from './MobileNavbar';
import NavLinks from './NavLinks';
import NavIcons from './NavIcons';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const bg = useColorModeValue('white', 'var(--chakra-colors-gray-800)');
  const mobileNav = useDisclosure();

  return (
    <React.Fragment>
      <chakra.header
        bg={bg}
        h='8vh'
        px={{ base: 2, sm: 4 }}
        shadow='md'
        position='sticky'
        top='0'
        zIndex={'50'}
      >
        <Container maxW={{ md: 'container.md', lg: 'container.lg' }} h='8vh'>
          <Flex
            alignItems='center'
            justifyContent='space-between'
            mx='auto'
            h='100%'
          >
            <HStack display='flex' spacing={5} alignItems='center'>
              <Heading as='h3' fontSize='xl' title='Wander Home Page'>
                <Link to='/'>Wanderers</Link>
              </Heading>
              {/* Mobile Navbar */}
              <MobileNavbar mobileNav={mobileNav} bg={bg} />
            </HStack>

            <HStack display='flex' alignItems='center' spacing={3}>
              {/* Desktop Navbar */}
              <HStack spacing={3} display={{ base: 'none', md: 'inline-flex' }}>
                <NavLinks />
              </HStack>

              {/* Nav Right */}
              <HStack
                spacing={3}
                display={mobileNav.isOpen ? 'none' : 'flex'}
                alignItems='center'
              >
                <NavIcons />
              </HStack>
            </HStack>
          </Flex>
        </Container>
      </chakra.header>
    </React.Fragment>
  );
};

export default Navbar;
