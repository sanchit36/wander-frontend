import React from 'react';

import {
  chakra,
  Flex,
  useColorModeValue,
  HStack,
  useDisclosure,
  Avatar,
} from '@chakra-ui/react';

import MobileNavbar from './MobileNavbar';
import NavLinks from './NavLinks';
import NavSearch from './NavSearch';
import NavIcons from './NavIcons';

const Navbar = () => {
  const bg = useColorModeValue('white', 'gray.800');
  const mobileNav = useDisclosure();

  return (
    <React.Fragment>
      <chakra.header
        bg={bg}
        w='full'
        px={{ base: 2, sm: 4 }}
        py={4}
        shadow='md'
      >
        <Flex alignItems='center' justifyContent='space-between' mx='auto'>
          <HStack display='flex' spacing={3} alignItems='center'>
            <chakra.a
              href='/'
              title='Wander Home Page'
              display='flex'
              alignItems='center'
            >
              Wander
            </chakra.a>
            {/* Mobile Navbar */}
            <MobileNavbar mobileNav={mobileNav} bg={bg} />

            {/* Desktop Navbar */}
            <HStack spacing={3} display={{ base: 'none', md: 'inline-flex' }}>
              <NavLinks />
            </HStack>
          </HStack>

          {/* Nav Right */}
          <HStack
            spacing={3}
            display={mobileNav.isOpen ? 'none' : 'flex'}
            alignItems='center'
          >
            <NavSearch />
            <NavIcons />
            <Avatar
              size='sm'
              name='Dan Abrahmov'
              src='https://bit.ly/dan-abramov'
            />
          </HStack>
        </Flex>
      </chakra.header>
    </React.Fragment>
  );
};

export default Navbar;
