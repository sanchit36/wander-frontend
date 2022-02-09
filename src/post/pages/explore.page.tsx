import { Box } from '@chakra-ui/react';
import { PostList, Search } from '../components';
import SingleColumn from '../../shared/layout/single-column.layout';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { useEffect, useState } from 'react';
import Post from '../post.interface';

const ExplorePage = () => {
  const { sendRequest } = useHttpClient();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await sendRequest('/posts');
      setPosts(data.payload);
    };
    fetchData();
  }, [sendRequest]);

  return (
    <SingleColumn>
      <Box mt={10}>
        <Search />
        <Box h={10} />
        <PostList posts={posts} cols={2} />
      </Box>
    </SingleColumn>
  );
};

export default ExplorePage;
