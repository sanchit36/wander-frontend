import { Avatar, Box, Button, Flex, Text } from '@chakra-ui/react';
import useAuth from '../../hooks/useAuth';

const Sidebar = () => {
  const { user } = useAuth();

  return (
    <Box mb={3} width='100%'>
      <Flex alignItems='center' justifyContent='space-between'>
        <Flex alignItems='center'>
          <Avatar src={user?.avatar} name={user?.username} size='md' />
          <Box ml='3'>
            <Text fontWeight='bold'>{user?.username}</Text>
            <Text color='gray.500' noOfLines={1}>
              {user?.bio}
            </Text>
          </Box>
        </Flex>
        <Button variant='ghost' size='sm' color='purple.300'>
          Switch
        </Button>
      </Flex>

      <Flex mt='3' justifyContent='space-between'>
        <Text fontWeight='bold'>Suggestions For You</Text>
        <Button variant='ghost' size='sm'>
          See all
        </Button>
      </Flex>

      <Flex my='2' alignItems='center' justifyContent='space-between'>
        <Flex alignItems='center'>
          <Avatar src={user?.avatar} name={user?.username} size='sm' />
          <Text ml='3' fontWeight='bold'>
            {user?.username}
          </Text>
        </Flex>
        <Button variant='ghost' size='sm' color='purple.300'>
          Follow
        </Button>
      </Flex>
      <Flex my='2' alignItems='center' justifyContent='space-between'>
        <Flex alignItems='center'>
          <Avatar src={user?.avatar} name={user?.username} size='sm' />
          <Text ml='3' fontWeight='bold'>
            {user?.username}
          </Text>
        </Flex>
        <Button variant='ghost' size='sm' color='purple.300'>
          Follow
        </Button>
      </Flex>
      <Flex my='2' alignItems='center' justifyContent='space-between'>
        <Flex alignItems='center'>
          <Avatar src={user?.avatar} name={user?.username} size='sm' />
          <Text ml='3' fontWeight='bold'>
            {user?.username}
          </Text>
        </Flex>
        <Button variant='ghost' size='sm' color='purple.300'>
          Follow
        </Button>
      </Flex>
      <Flex my='2' alignItems='center' justifyContent='space-between'>
        <Flex alignItems='center'>
          <Avatar src={user?.avatar} name={user?.username} size='sm' />
          <Text ml='3' fontWeight='bold'>
            {user?.username}
          </Text>
        </Flex>
        <Button variant='ghost' size='sm' color='purple.300'>
          Follow
        </Button>
      </Flex>
      <Flex my='2' alignItems='center' justifyContent='space-between'>
        <Flex alignItems='center'>
          <Avatar src={user?.avatar} name={user?.username} size='sm' />
          <Text ml='3' fontWeight='bold'>
            {user?.username}
          </Text>
        </Flex>
        <Button variant='ghost' size='sm' color='purple.300'>
          Follow
        </Button>
      </Flex>
      <Flex my='2' alignItems='center' justifyContent='space-between'>
        <Flex alignItems='center'>
          <Avatar src={user?.avatar} name={user?.username} size='sm' />
          <Text ml='3' fontWeight='bold'>
            {user?.username}
          </Text>
        </Flex>
        <Button variant='ghost' size='sm' color='purple.300'>
          Follow
        </Button>
      </Flex>
    </Box>
  );
};

export default Sidebar;
