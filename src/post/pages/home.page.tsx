import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Spinner from '../../shared/components/UIElements/Spinner';
import MainLayout from '../../shared/layout/main.layout';
import { useAppSelector } from '../../shared/state/hooks';
import { fetchPosts } from '../../shared/state/post/post.action-creators';
import { PostList } from '../components';

const HomePage = () => {
  const { isLoading, posts } = useAppSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <MainLayout>
      {!isLoading ? <PostList posts={posts} /> : <Spinner />}
    </MainLayout>
  );
};

export default HomePage;
