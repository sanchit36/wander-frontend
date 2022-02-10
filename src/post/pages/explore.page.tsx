import { useEffect } from 'react';
import { Box } from '@chakra-ui/react';

import { PostList, Search } from '../components';
import SingleColumn from '../../shared/layout/single-column.layout';
import { useAppSelector } from '../../shared/state/hooks';
import { useDispatch } from 'react-redux';
import { fetchPosts } from '../../shared/state/post/post.action-creators';
import Spinner from '../../shared/components/UIElements/Spinner';

const ExplorePage = () => {
  const { isLoading, posts } = useAppSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <SingleColumn>
      <Box mt={10}>
        <Search />
        <Box h={10} />
        {!isLoading ? <PostList posts={posts} cols={2} /> : <Spinner />}
      </Box>
    </SingleColumn>
  );
};

export default ExplorePage;
