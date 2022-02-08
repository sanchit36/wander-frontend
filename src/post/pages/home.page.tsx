import React, { useEffect, useState } from 'react';
import { useHttpClient } from '../../shared/hooks/http-hook';
import MainLayout from '../../shared/layout/main.layout';
import { PostList } from '../components';
import IPost from '../post.interface';

const HomePage = () => {
  const { sendRequest } = useHttpClient();
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await sendRequest('/posts');
      setPosts(data.payload);
    };
    fetchData();
  }, [sendRequest]);

  return (
    <MainLayout>
      <PostList posts={posts} />
    </MainLayout>
  );
};

export default HomePage;
