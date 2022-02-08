import React from 'react';
import { Flex } from '@chakra-ui/react';
import SingleColumn from '../../shared/layout/single-column.layout';
import { CreatePostForm } from '../components';

const CreatePost = () => {
  return (
    <SingleColumn>
      <Flex height='100%' alignItems='center' justifyContent='center'>
        <CreatePostForm />
      </Flex>
    </SingleColumn>
  );
};

export default CreatePost;
