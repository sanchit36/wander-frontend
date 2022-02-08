import React from 'react';
import { Avatar, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';

import ColorModeSwitcher from './ColorModeSwitcher';
import { HiOutlineLogout } from 'react-icons/hi';
import { Methods, useHttpClient } from '../../../hooks/http-hook';
import useAuth from '../../../hooks/useAuth';

const NavIcons = () => {
  const { isLoggedIn, user, logoutUser: logout } = useAuth();
  const { sendRequest } = useHttpClient();
  const dispatch = useDispatch();

  const logoutUser = () => {
    sendRequest('/users/logout', Methods.POST);
    dispatch(logout());
  };

  return (
    <React.Fragment>
      <ColorModeSwitcher rounded='full' />
      {isLoggedIn && (
        <Menu>
          <MenuButton>
            <Avatar size='sm' name={user?.username} src={user?.avatar} />
          </MenuButton>
          <MenuList>
            <MenuItem icon={<HiOutlineLogout />} onClick={() => logoutUser()}>
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      )}
    </React.Fragment>
  );
};

export default NavIcons;
