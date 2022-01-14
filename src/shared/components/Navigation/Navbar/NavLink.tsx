import React from 'react';
import { Button } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';

interface NavLinkProps {
  to: string;
  icon: React.ReactElement;
  text: string;
}

const NavLink: React.FC<NavLinkProps> = ({ to, icon, text }) => {
  const { pathname } = useLocation();

  return (
    <Button
      as={Link}
      to={to}
      w='full'
      variant={pathname === to ? 'solid' : 'ghost'}
      colorScheme={pathname === to ? 'purple' : 'inherit'}
      leftIcon={icon}
    >
      {text}
    </Button>
  );
};

export default NavLink;
