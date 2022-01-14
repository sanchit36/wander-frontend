import React, { useContext } from 'react';
import {
  Avatar,
  chakra,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorModeValue,
} from '@chakra-ui/react';
import { AiFillBell } from 'react-icons/ai';
import ColorModeSwitcher from './ColorModeSwitcher';
import { AuthContext } from '../../../context/auth.context';
import { HiOutlineLogout } from 'react-icons/hi';

const NavIcons = () => {
  const { isLoggedIn, user, logout } = useContext(AuthContext);
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
        <Menu>
          <MenuButton>
            <Avatar size='sm' name={user?.username} src={user?.avatar} />
          </MenuButton>
          <MenuList>
            <MenuItem icon={<HiOutlineLogout />} onClick={() => logout()}>
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      )}
    </React.Fragment>
  );
};

export default NavIcons;
