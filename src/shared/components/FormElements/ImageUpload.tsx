import {
  Box,
  BoxProps,
  chakra,
  FormControl,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import useImageUpload from '../../hooks/image-hook';

interface Props extends Omit<BoxProps, 'onInput'> {
  id: string;
  onInput: (id: string, value: File | undefined, isValid: boolean) => void;
  value: any;
  errorMessage?: string;
}

const ImageUpload: React.FC<Props> = ({
  id,
  onInput,
  value,
  errorMessage,
  ...props
}) => {
  const {
    filePickerRef,
    isValid,
    previewUrl,
    pickImageHandler,
    pickChangeHandler,
    setFile,
  } = useImageUpload(id, onInput, value);

  useEffect(() => {
    if (!value.value) setFile(null);
  }, [value, setFile]);

  return (
    <FormControl w='100%' h='100%' {...props}>
      <chakra.input
        id={id}
        ref={filePickerRef}
        display='none'
        type='file'
        accept='.jpg,.png,.jpeg'
        onChange={pickChangeHandler}
      />
      <Box
        textAlign='center'
        cursor='pointer'
        w='100%'
        h='100%'
        display='flex'
        flexDirection='column'
      >
        <Box
          width='100%'
          flex='1'
          rounded='lg'
          m='auto'
          border={`1px solid ${useColorModeValue(
            'var(--chakra-colors-gray-200)',
            'var(--chakra-colors-whiteAlpha-300)'
          )}`}
          overflow='hidden'
          d='flex'
          alignItems='center'
          justifyContent='center'
          onClick={pickImageHandler}
        >
          {previewUrl && (
            <chakra.img
              src={previewUrl}
              alt='Preview'
              width='100%'
              height='100%'
              objectFit='cover'
            />
          )}
          {!previewUrl && <p>Please pick an image.</p>}
        </Box>
        {!isValid && <chakra.p color='red.400'>{errorMessage}</chakra.p>}
      </Box>
    </FormControl>
  );
};

export default ImageUpload;
