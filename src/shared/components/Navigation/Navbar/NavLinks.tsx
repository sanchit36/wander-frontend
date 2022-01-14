import React from 'react';
import { Button } from '@chakra-ui/react';
import { AiFillHome, AiOutlineInbox } from 'react-icons/ai';
import { FaHashtag } from 'react-icons/fa';

const NavLinks = () => {
  return (
    <React.Fragment>
      <Button w='full' variant='ghost' leftIcon={<AiFillHome />}>
        Home
      </Button>
      <Button w='full' variant='ghost' leftIcon={<FaHashtag />}>
        Explore
      </Button>
      <Button w='full' variant='solid' leftIcon={<AiOutlineInbox />}>
        Inbox
      </Button>
    </React.Fragment>
  );
};

export default NavLinks;
