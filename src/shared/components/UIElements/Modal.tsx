import React from 'react';
import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
}

const Modal: React.FC<Props> = ({
  title,
  isOpen,
  onClose,
  children,
  footer,
}) => {
  return (
    <>
      <ChakraModal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent py={2}>
          {title && <ModalHeader>{title}</ModalHeader>}
          <ModalCloseButton />
          {children && <ModalBody>{children}</ModalBody>}
          {footer && <ModalFooter>{footer}</ModalFooter>}
        </ModalContent>
      </ChakraModal>
    </>
  );
};

export default Modal;
