import { chakra } from '@chakra-ui/react';
import React from 'react';
import Post from './post.component';
import IPost from '../post.interface';

interface PostListProps {
  posts: IPost[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <chakra.div mt={4}>
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </chakra.div>
  );
};

export default PostList;
