import React from 'react';
import SinglePost from './single-post.component';
import Post from '../post.interface';
import { Grid, GridItem } from '@chakra-ui/react';

interface PostListProps {
  posts: Post[] | null;
  cols?: number;
}

const PostList: React.FC<PostListProps> = ({ posts, cols }) => {
  return posts ? (
    <Grid templateColumns={`repeat(${cols || 1}, minmax(250px, 1fr))`} gap={6}>
      {posts.map((post) => (
        <GridItem key={post._id}>
          <SinglePost post={post} />
        </GridItem>
      ))}
    </Grid>
  ) : null;
};

export default PostList;
