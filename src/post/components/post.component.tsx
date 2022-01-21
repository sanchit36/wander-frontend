import React from 'react';
import {
  chakra,
  Image,
  Flex,
  useColorModeValue,
  Link,
  IconButton,
  HStack,
} from '@chakra-ui/react';
import { FiMoreVertical } from 'react-icons/fi';
import { FaBookmark, FaHeart, FaShare } from 'react-icons/fa';
import { BiComment } from 'react-icons/bi';
import IPost from '../post.interface';

interface PostProps {
  post: IPost;
}

const Post: React.FC<PostProps> = ({ post }) => {
  return (
    <chakra.article
      m='auto'
      rounded='lg'
      shadow='md'
      bg={useColorModeValue('white', 'gray.800')}
      border={`1px solid ${useColorModeValue('grey', '#444')}`}
      maxW='3xl'
    >
      <chakra.header
        p={4}
        borderBottom={`1px solid ${useColorModeValue('grey', '#444')}`}
        display='flex'
        alignItems='center'
        justifyContent='space-between'
      >
        <Flex alignItems='center'>
          <Image
            h={10}
            fit='cover'
            rounded='full'
            src={post.user.avatar}
            alt={post.user.username}
          />
          <Link
            mx={2}
            fontWeight='bold'
            color={useColorModeValue('gray.700', 'gray.200')}
          >
            {post.user.username}
          </Link>
        </Flex>
        <IconButton
          variant='ghost'
          icon={<FiMoreVertical />}
          aria-label='settings'
        />
      </chakra.header>

      <Image w='full' h='400px' fit='cover' src={post.image} alt='Article' />

      <chakra.main p={4}>
        <chakra.p
          fontSize='sm'
          color={useColorModeValue('gray.600', 'gray.400')}
        >
          {post.description.substring(0, 120)}...
        </chakra.p>
      </chakra.main>

      <chakra.footer
        px={4}
        py={1}
        borderTop={`1px solid ${useColorModeValue('grey', '#444')}`}
        display='flex'
        alignItems='center'
        justifyContent='space-between'
      >
        <HStack alignItems='center' spacing={2}>
          <IconButton
            variant='ghost'
            fontSize='20'
            icon={<FaHeart />}
            aria-label='like'
          />
          <IconButton
            variant='ghost'
            fontSize='20'
            icon={<BiComment />}
            aria-label='comment'
          />
          <IconButton
            variant='ghost'
            fontSize='20'
            icon={<FaShare />}
            aria-label='share'
          />
        </HStack>
        <Flex alignItems='center'>
          <IconButton
            variant='ghost'
            fontSize='20'
            icon={<FaBookmark />}
            aria-label='save'
          />
        </Flex>
      </chakra.footer>
    </chakra.article>
  );
};

export default Post;
