import React from 'react';
import { chakra, IconButton, useColorModeValue } from '@chakra-ui/react';
import { AiFillBell } from 'react-icons/ai';
import { ColorModeSwitcher } from '..';

const NavIcons = () => {
  return (
    <React.Fragment>
      <IconButton
        size='md'
        fontSize='lg'
        variant='ghost'
        color={useColorModeValue('gray.800', 'inherit')}
        aria-label='Notifications'
        icon={
          <>
            <AiFillBell />
            <chakra.span
              pos='absolute'
              top='8px'
              right='8px'
              p='5px'
              fontSize='xs'
              fontWeight='bold'
              lineHeight='none'
              color='red.100'
              transform='translate(50%,-50%)'
              bg='red.600'
              rounded='full'
            >
              10
            </chakra.span>
          </>
        }
        rounded='full'
      />
      <ColorModeSwitcher rounded='full' />
    </React.Fragment>
  );
};

export default NavIcons;
