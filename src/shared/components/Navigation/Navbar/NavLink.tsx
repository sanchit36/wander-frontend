import React from 'react';
import { Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

interface NavLinkProps {
  to: string;
  icon: React.ReactElement;
  text: string;
}

const NavLink: React.FC<NavLinkProps> = ({ to, icon, text }) => {
  return (
    <Button as={Link} to={to} w='full' variant='ghost' leftIcon={icon}>
      {text}
    </Button>
  );
};

export default NavLink;
