import {
  Button,
  chakra,
  HStack,
  Text,
  useColorMode,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { HiLocationMarker } from 'react-icons/hi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import useForm from '../../shared/hooks/form-hook';
import { TextArea, Avatar, Input, ImageUpload } from '../../shared/components';
import { Methods, useHttpClient } from '../../shared/hooks/http-hook';
import { VALIDATOR_REQUIRE } from '../../shared/utils/validators';
import useAuth from '../../shared/hooks/useAuth';

const initialValue = {
  description: {
    value: '',
    isValid: false,
    validators: [VALIDATOR_REQUIRE('description is required')],
  },
  image: {
    value: null,
    isValid: false,
  },
  address: {
    value: '',
    isValid: true,
  },
};

const PostForm = () => {
  const { colorMode } = useColorMode();
  const { formState, inputHandler, resetForm } = useForm(initialValue, false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const { user } = useAuth();

  const navigate = useNavigate();

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!formState.isFormValid) {
      return toast.error('Please enter a the caption.', {
        theme: colorMode,
      });
    }

    clearError();
    try {
      const formData = new FormData();
      formData.append('description', formState.inputs.description.value);
      formData.append('address', formState.inputs.address.value);
      formData.append('image', formState.inputs.image.value);
      await sendRequest('/posts', Methods.POST, formData);
      resetForm(initialValue);
      toast.success('Post was successfully posted', {
        theme: colorMode,
      });
      navigate('/home');
    } catch (error: any) {}
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        theme: colorMode,
      });
    }
    return () => {
      clearError();
    };
  }, [error, colorMode, clearError]);

  return (
    <chakra.form
      minW={350}
      maxW={900}
      minH={'50vh'}
      maxH={'60vh'}
      width={'100%'}
      height={'100%'}
      rounded='lg'
      shadow='xl'
      border={`1px solid ${useColorModeValue(
        'var(--chakra-colors-gray-200)',
        'var(--chakra-colors-whiteAlpha-300)'
      )}`}
      mb='5'
      display='flex'
      flexDirection='column'
      onSubmit={submitHandler}
    >
      <chakra.header
        px={4}
        py={2}
        borderBottom={`1px solid ${useColorModeValue(
          'var(--chakra-colors-gray-200)',
          'var(--chakra-colors-whiteAlpha-300)'
        )}`}
        display='flex'
        alignItems='center'
        justifyContent='space-between'
      >
        <Text>Create new post</Text>
        <Button
          colorScheme='purple'
          type='submit'
          size='xs'
          isLoading={isLoading}
        >
          Create
        </Button>
      </chakra.header>

      <chakra.main flex='1' p={4} display='flex'>
        <ImageUpload
          flex='4'
          id='image'
          value={formState.inputs.image}
          onInput={inputHandler}
          errorMessage={'Please select a image'}
        />
        <VStack flex='3' pl='5' spacing={3} alignItems='start'>
          <HStack spacing={3}>
            <Avatar username={user?.username!} avatar={user?.avatar!} />
            <Text>{user?.username}</Text>
          </HStack>
          <TextArea
            id='description'
            placeholder='Write a caption...'
            value={formState.inputs.description}
            onChange={(event) =>
              inputHandler(
                event.target.id,
                event.target.value,
                formState.inputs.description.isValid
              )
            }
          />
          <Input
            id='address'
            name='address'
            type='text'
            placeholder='Add Location'
            value={formState.inputs.address}
            onInput={inputHandler}
            errorMessage={formState.errors.address}
            inputLeftElement={<HiLocationMarker />}
          />
        </VStack>
      </chakra.main>
    </chakra.form>
  );
};

export default PostForm;
