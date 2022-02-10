import { Link, Text } from '@chakra-ui/react';
import React from 'react';

const Footer = () => {
  return (
    <div>
      <Link fontSize='11px' fontWeight='light' color='gray.300' mr='2'>
        About
      </Link>
      <Link fontSize='11px' fontWeight='light' color='gray.300' mr='2'>
        Help
      </Link>
      <Link fontSize='11px' fontWeight='light' color='gray.300' mr='2'>
        Terms and Conditions
      </Link>
      <Link fontSize='11px' fontWeight='light' color='gray.300' mr='2'>
        Privacy
      </Link>

      <Text fontSize='12px' color='gray.300'>
        © {new Date().getFullYear()} WANDERERS
      </Text>

      <Text fontSize='12px' color='gray.300'>
        BUILD BY SANCHIT BAHDGAL
      </Text>
    </div>
  );
};

export default Footer;
