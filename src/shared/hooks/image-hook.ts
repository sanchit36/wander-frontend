import React, { useRef, useState, useEffect } from 'react';

const useImageUpload = (
  id: string,
  onInput: (id: string, value: File | undefined, isValid: boolean) => void,
  value: any
) => {
  const [file, setFile] = useState<File | null>(value.value);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);
  const [isValid, setIsValid] = useState(value.isValid);
  const filePickerRef = useRef<HTMLInputElement>(null);

  const pickChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    let pickedFile;
    let isValid = true;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      isValid = true;
    } else {
      setFile(null);
      setIsValid(false);
      isValid = false;
    }
    onInput(id, pickedFile, isValid);
  };

  const pickImageHandler = () => {
    if (filePickerRef.current) {
      filePickerRef.current.click();
    }
  };

  useEffect(() => {
    if (!file) {
      return setPreviewUrl(undefined);
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result as string);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  return {
    filePickerRef,
    isValid,
    previewUrl,
    pickChangeHandler,
    pickImageHandler,
    setFile,
  };
};

export default useImageUpload;
