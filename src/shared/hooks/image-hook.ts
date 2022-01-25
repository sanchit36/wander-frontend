import React, { useRef, useState, useEffect } from 'react';

const useImageUpload = (
  id: string,
  onInput: (id: string, value: File | undefined) => void,
  initialValue: File | null
) => {
  const [file, setFile] = useState<File | null>(initialValue);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);
  const [isValid, setIsValid] = useState(true);
  const filePickerRef = useRef<HTMLInputElement>(null);

  const pickChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    let pickedFile;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
    } else {
      setFile(null);
      setIsValid(false);
    }
    onInput(id, pickedFile);
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
