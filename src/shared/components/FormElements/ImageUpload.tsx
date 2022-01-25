import { Box, BoxProps, FormControl } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import useImageUpload from '../../hooks/image-hook';

interface Props extends Omit<BoxProps, 'onInput'> {
  id: string;
  onInput: (id: string, value: File | undefined) => void;
  initialValue: File | null;
  errorMessage?: string;
  reset?: boolean;
}

const ImageUpload: React.FC<Props> = (props) => {
  const {
    filePickerRef,
    isValid,
    previewUrl,
    pickImageHandler,
    pickChangeHandler,
    setFile,
  } = useImageUpload(props.id, props.onInput, props.initialValue);
  const { reset } = props;

  useEffect(() => {
    if (reset) setFile(null);
  }, [reset, setFile]);

  return (
    <FormControl>
      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: 'none' }}
        type='file'
        accept='.jpg,.png,.jpeg'
        onChange={pickChangeHandler}
      />
      <Box textAlign='center' cursor='pointer'>
        <Box
          m='auto'
          border='1px solid #eee'
          w='200px'
          h='200px'
          d='flex'
          alignItems='center'
          justifyContent='center'
          onClick={pickImageHandler}
        >
          {previewUrl && <img src={previewUrl} alt='Preview' />}
          {!previewUrl && <p>Please pick an image.</p>}
        </Box>
        {!isValid && <p>{props.errorMessage}</p>}
      </Box>
    </FormControl>
  );
};

export default ImageUpload;
