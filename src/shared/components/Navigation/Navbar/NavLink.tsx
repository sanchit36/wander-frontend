import React from 'react';
import { IconButton } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';

interface NavLinkProps {
  to: string;
  icon: React.ReactElement;
  text: string;
}

const NavLink: React.FC<NavLinkProps> = ({ to, icon, text }) => {
  const { pathname } = useLocation();

  return (
    <IconButton
      as={Link}
      to={to}
      w='full'
      variant={pathname === to ? 'solid' : 'ghost'}
      colorScheme={pathname === to ? 'purple' : 'inherit'}
      icon={icon}
      aria-label={text}
    />
  );
};

export default NavLink;
