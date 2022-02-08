import { chakra } from '@chakra-ui/react';
import React from 'react';
import Post from './post.component';
import IPost from '../post.interface';

interface PostListProps {
  posts: IPost[] | null;
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  return posts ? (
    <chakra.div>
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </chakra.div>
  ) : null;
};

export default PostList;
