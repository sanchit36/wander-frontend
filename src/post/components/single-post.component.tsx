import React from 'react';
import {
  chakra,
  Image,
  Flex,
  useColorModeValue,
  Link,
  IconButton,
  Box,
  Input,
  Divider,
  Button,
} from '@chakra-ui/react';
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineComment,
  AiOutlineMore,
  AiOutlineShareAlt,
} from 'react-icons/ai';
import { RiBookmarkFill, RiBookmarkLine } from 'react-icons/ri';
import Post from '../post.interface';
import Avatar from '../../shared/components/UIElements/Avatar';
import useAuth from '../../shared/hooks/useAuth';

interface PostProps {
  post: Post;
}

const SinglePost: React.FC<PostProps> = ({ post }) => {
  const { isLoggedIn } = useAuth();

  return (
    <chakra.article
      rounded='lg'
      shadow='md'
      bg={useColorModeValue('white', 'gray.800')}
      border={`1px solid ${useColorModeValue('grey', '#444')}`}
      mb='5'
    >
      <chakra.header
        px={4}
        py={2}
        borderBottom={`1px solid ${useColorModeValue('grey', '#444')}`}
        display='flex'
        alignItems='center'
        justifyContent='space-between'
      >
        <Flex alignItems='center'>
          <Avatar
            username={post.creator.username}
            avatar={post.creator.avatar}
          />
          <Link
            mx={2}
            fontWeight='bold'
            color={useColorModeValue('gray.700', 'gray.200')}
          >
            {post.creator.username}
          </Link>
        </Flex>
        <IconButton
          variant='ghost'
          fontSize='22'
          icon={<AiOutlineMore />}
          aria-label='settings'
        />
      </chakra.header>

      <chakra.main>
        {post.image && (
          <Image
            w='full'
            h='400px'
            fit='cover'
            src={post.image}
            alt='Article'
          />
        )}
        <Box px={2} py={1}>
          <Flex justifyContent='space-between'>
            <Box>
              <IconButton
                variant='ghost'
                fontSize='22'
                icon={<AiOutlineHeart />}
                aria-label='like'
              />
              <IconButton
                variant='ghost'
                fontSize='22'
                icon={<AiOutlineComment />}
                aria-label='comment'
              />
              <IconButton
                variant='ghost'
                fontSize='22'
                icon={<AiOutlineShareAlt />}
                aria-label='share'
              />
            </Box>
            <Box>
              <IconButton
                variant='ghost'
                fontSize='22'
                icon={<RiBookmarkLine />}
                aria-label='save'
                justifySelf={'flex-end'}
              />
            </Box>
          </Flex>
          <Box mx='2'>
            <chakra.p
              fontWeight='bold'
              fontSize='sm'
              mb='1'
              color={useColorModeValue('gray.600', 'gray.400')}
            >
              100 Likes
            </chakra.p>
            <chakra.p
              fontSize='sm'
              mb='1'
              color={useColorModeValue('gray.600', 'gray.400')}
            >
              <Link
                mr='3'
                fontWeight='bold'
                color={useColorModeValue('gray.700', 'gray.200')}
              >
                {post.creator.username}
              </Link>
              {post.description.substring(0, 120)}...
            </chakra.p>
            <chakra.p
              mb='3'
              fontSize='sm'
              color={useColorModeValue('gray.600', 'gray.400')}
            >
              see all 50 comments
            </chakra.p>
          </Box>
        </Box>
      </chakra.main>

      {isLoggedIn && (
        <chakra.footer>
          <Divider />
          <Flex p={3}>
            <Input variant='unstyled' placeholder='Write a comment...' />
            <Button size='sm' variant='ghost'>
              Post
            </Button>
          </Flex>
        </chakra.footer>
      )}
    </chakra.article>
  );
};

export default SinglePost;
