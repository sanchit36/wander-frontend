import { Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { AiOutlineSearch } from 'react-icons/ai';

const NavSearch = () => {
  return (
    <InputGroup display={{ base: 'none', md: 'inline-flex' }}>
      <InputRightElement pointerEvents='none' children={<AiOutlineSearch />} />
      <Input type='search' placeholder='Search...' />
    </InputGroup>
  );
};

export default NavSearch;
