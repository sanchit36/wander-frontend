import React, { useContext } from 'react';
import { AiFillHome } from 'react-icons/ai';
import { FaHashtag, FaUserAlt } from 'react-icons/fa';
import { HiOutlineLogout } from 'react-icons/hi';
import { AuthContext } from '../../../context/auth.context';

import NavLink from './NavLink';

const NavLinks = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return isLoggedIn ? (
    <React.Fragment>
      <NavLink to='/home' icon={<AiFillHome />} text='Home' />
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
