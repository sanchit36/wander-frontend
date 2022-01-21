import React from 'react';
import MainLayout from '../../shared/layout/main.layout';
import { PostList, PostForm } from '../components';
import IPost from '../post.interface';

const POSTS_DATA: IPost[] = [
  {
    _id: '1',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, doloribus!',

    image:
      'https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',

    user: {
      _id: '1',
      avatar:
        'https://images.unsplash.com/photo-1586287011575-a23134f797f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=48&q=60',
      bio: '',
      email: '',
      username: 'janedoe',
      followers: [],
      following: [],
    },
  },
];

const HomePage = () => {
  return (
    <MainLayout>
      <PostForm />
      <PostList posts={POSTS_DATA} />
    </MainLayout>
  );
};

export default HomePage;
