import {
  Button,
  chakra,
  Flex,
  HStack,
  IconButton,
  useColorMode,
  VStack,
} from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { RiFileUploadFill } from 'react-icons/ri';
import { HiLocationMarker } from 'react-icons/hi';
import { toast } from 'react-toastify';

import { AuthContext } from '../../shared/context/auth.context';
import useForm from '../../shared/hooks/form-hook';
import {
  TextArea,
  Avatar,
  Modal,
  Input,
  ImageUpload,
} from '../../shared/components';
import { Methods, useHttpClient } from '../../shared/hooks/http-hook';
import { VALIDATOR_REQUIRE } from '../../shared/utils/validators';

const initialValue = {
  description: {
    value: '',
    isValid: false,
    validators: [VALIDATOR_REQUIRE('description is required')],
  },
  address: {
    value: '',
    isValid: true,
  },
  image: {
    value: null,
    isValid: true,
  },
};

const PostForm = () => {
  const { colorMode } = useColorMode();
  const { user, isLoggedIn } = useContext(AuthContext);
  const { formState, inputHandler, inputChangeHandler, resetForm } = useForm(
    initialValue,
    false
  );
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(formState);
    if (!formState.isFormValid) {
      return toast.error('Please enter a the description.', {
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

  return isLoggedIn ? (
    <React.Fragment>
      <Modal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        title='Upload Image'
      >
        <ImageUpload
          id='image'
          initialValue={formState.inputs.image.value}
          onInput={inputHandler}
        />
      </Modal>

      <Modal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        title='Add Address'
      >
        <Input
          id='address'
          name='address'
          type='text'
          placeholder='Please enter a valid address'
          value={formState.inputs.address}
          onChange={inputChangeHandler}
          errorMessage={formState.errors.password}
        />
      </Modal>

      <HStack spacing={3} alignItems='flex-start'>
        <Avatar username={user?.username!} avatar={user?.avatar!} />
        <chakra.form flex={1} onSubmit={submitHandler}>
          <VStack spacing={2}>
            <TextArea
              id='description'
              placeholder='Wanna share something...'
              value={formState.inputs.description}
              onChange={inputChangeHandler}
              errorMessage={formState.errors.password}
            />
            <Flex justifyContent='space-between' alignSelf='stretch'>
              <HStack spacing={3}>
                <IconButton
                  size='sm'
                  icon={<RiFileUploadFill />}
                  onClick={() => setIsImageModalOpen(true)}
                  aria-label='upload-image'
                />
                <IconButton
                  size='sm'
                  icon={<HiLocationMarker />}
                  onClick={() => setIsAddressModalOpen(true)}
                  aria-label='add-location'
                />
              </HStack>
              <Button type='submit' size='sm' isLoading={isLoading}>
                Share
              </Button>
            </Flex>
          </VStack>
        </chakra.form>
      </HStack>
    </React.Fragment>
  ) : null;
};

export default PostForm;
