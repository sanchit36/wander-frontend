import React from 'react';
import { AiFillHome } from 'react-icons/ai';
import { FaHashtag, FaUserAlt } from 'react-icons/fa';
import { HiOutlineLogout } from 'react-icons/hi';
import { BsPlusSquareFill } from 'react-icons/bs';

import NavLink from './NavLink';
import useAuth from '../../../hooks/useAuth';

const NavLinks = () => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? (
    <React.Fragment>
      <NavLink to='/home' icon={<AiFillHome />} text='Home' />
      <NavLink
        to='/create-post'
        icon={<BsPlusSquareFill />}
        text='Create Post'
      />
      <NavLink to='/explore' icon={<FaHashtag />} text='Explore' />
    </React.Fragment>
  ) : (
    <React.Fragment>
      <NavLink to='/login' icon={<HiOutlineLogout />} text='Login' />
      <NavLink to='/sign-up' icon={<FaUserAlt />} text='Sign Up' />
    </React.Fragment>
  );
};

export default NavLinks;
