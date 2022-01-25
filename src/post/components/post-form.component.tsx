import {
  Button,
  chakra,
  Flex,
  HStack,
  IconButton,
  VStack,
} from '@chakra-ui/react';
import React, { useContext } from 'react';
import { RiFileUploadFill } from 'react-icons/ri';
import { HiLocationMarker } from 'react-icons/hi';
import TextArea from '../../shared/components/FormElements/TextArea';
import Avatar from '../../shared/components/UIElements/Avatar';
import { AuthContext } from '../../shared/context/auth.context';
import useForm from '../../shared/hooks/form-hook';
import { VALIDATOR_REQUIRE } from '../../shared/utils/validators';

const PostForm = () => {
  const { user, isLoggedIn } = useContext(AuthContext);

  const { formState, inputHandler } = useForm(
    {
      description: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(formState);
  };

  return isLoggedIn ? (
    <HStack spacing={3} alignItems='flex-start'>
      <Avatar username={user?.username!} avatar={user?.avatar!} />
      <chakra.form flex={1} onSubmit={submitHandler}>
        <VStack spacing={2}>
          <TextArea
            id='description'
            name='description'
            onInput={inputHandler}
            validators={[VALIDATOR_REQUIRE()]}
            placeholder='Wanna share something...'
          />
          <Flex justifyContent='space-between' alignSelf='stretch'>
            <HStack spacing={3}>
              <IconButton
                size='sm'
                icon={<RiFileUploadFill />}
                aria-label='upload-image'
              />
              <IconButton
                size='sm'
                icon={<HiLocationMarker />}
                aria-label='add-location'
              />
            </HStack>
            <Button type='submit' size='sm'>
              Share
            </Button>
          </Flex>
        </VStack>
      </chakra.form>
    </HStack>
  ) : null;
};

export default PostForm;
