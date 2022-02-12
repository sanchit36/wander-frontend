import React, { useRef, useState } from 'react';
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
import { useDispatch } from 'react-redux';
import { commentPost, likePost, unlikePost } from '../../shared/state/post/post.action-creators';

interface PostProps {
  post: Post;
}

const SinglePost: React.FC<PostProps> = ({ post }) => {
  const { isLoggedIn } = useAuth();
  const [isSaved, setIsSaved] = useState(false);
  const dispatch = useDispatch();

  const commentContent = useRef<HTMLInputElement>(null);

  const handleLike = () => {
    if(post.isLiked){
      dispatch(unlikePost(post._id));
    }else{
      dispatch(likePost(post._id));
    }
  };

  const handleComment = (event: React.FormEvent) => {
    event.preventDefault();
    if(commentContent.current){
      dispatch(commentPost(post._id, commentContent.current.value));
    }else{
      alert("Please enter a comment");
    }
  }

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
                onClick={handleLike}
                variant='ghost'
                fontSize='22'
                icon={
                  post.isLiked ? <AiFillHeart color='red' /> : <AiOutlineHeart />
                }
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
                onClick={() => setIsSaved((p) => !p)}
                variant='ghost'
                fontSize='22'
                icon={isSaved ? <RiBookmarkFill /> : <RiBookmarkLine />}
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
              {post.likeCount} Like{post.likeCount > 1 && 's'}
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
              see all {post.comments.length} comments
            </chakra.p>
          </Box>
        </Box>
      </chakra.main>

      {isLoggedIn && (
        <chakra.footer>
          <Divider />
          <chakra.form p={3} onSubmit={handleComment}>
            <Input variant='unstyled' placeholder='Write a comment...' ref={commentContent} />
            <Button size='sm' variant='ghost' type='submit'>
              Post
            </Button>
          </chakra.form>
        </chakra.footer>
      )}
    </chakra.article>
  );
};

export default SinglePost;
