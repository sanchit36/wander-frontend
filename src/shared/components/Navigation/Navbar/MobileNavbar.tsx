import {
  Box,
  CloseButton,
  IconButton,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { AiOutlineMenu } from 'react-icons/ai';

import NavLinks from './NavLinks';

interface MobileNavbarProps {
  mobileNav: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onToggle: () => void;
    isControlled: boolean;
    getButtonProps: (props?: any) => any;
    getDisclosureProps: (props?: any) => any;
  };
  bg: string;
}

const MobileNavbar: React.FC<MobileNavbarProps> = ({ mobileNav, bg }) => {
  return (
    <Box display={{ base: 'inline-flex', md: 'none' }}>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        aria-label='Open menu'
        fontSize='20px'
        color={useColorModeValue('gray.800', 'inherit')}
        variant='ghost'
        icon={<AiOutlineMenu />}
        onClick={mobileNav.onOpen}
      />
      <VStack
        pos='absolute'
        top={0}
        left={0}
        right={0}
        display={mobileNav.isOpen ? 'flex' : 'none'}
        flexDirection='column'
        p={2}
        pb={4}
        m={2}
        bg={bg}
        spacing={3}
        rounded='sm'
        shadow='sm'
      >
        <CloseButton
          aria-label='Close menu'
          justifySelf='self-start'
          onClick={mobileNav.onClose}
        />
        <NavLinks />
      </VStack>
    </Box>
  );
};

export default MobileNavbar;
