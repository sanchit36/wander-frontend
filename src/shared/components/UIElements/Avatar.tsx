import { Avatar as ChakraAvatar, AvatarProps } from '@chakra-ui/react';
import React from 'react';

interface IAvatarProps extends AvatarProps {
  username: string;
  avatar: string;
}

const Avatar: React.FC<IAvatarProps> = ({ username, avatar, ...props }) => {
  return (
    <ChakraAvatar
      size='sm'
      {...props}
      cursor='pointer'
      src={avatar}
      name={username}
    />
  );
};

export default Avatar;
