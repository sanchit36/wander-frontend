import React, { useContext } from 'react';
import {
  Avatar,
  chakra,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react';
import { AiFillBell } from 'react-icons/ai';
import ColorModeSwitcher from './ColorModeSwitcher';
import { AuthContext } from '../../../context/auth.context';

const NavIcons = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const color = useColorModeValue('gray.800', 'inherit');

  return (
    <React.Fragment>
      {isLoggedIn && (
        <IconButton
          size='md'
          fontSize='lg'
          variant='ghost'
          color={color}
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
      )}
      <ColorModeSwitcher rounded='full' />
      {isLoggedIn && (
        <Avatar
          size='sm'
          name='Dan Abrahmov'
          src='https://bit.ly/dan-abramov'
        />
      )}
    </React.Fragment>
  );
};

export default NavIcons;
