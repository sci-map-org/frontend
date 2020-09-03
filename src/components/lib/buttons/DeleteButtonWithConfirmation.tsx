import {
  useDisclosure,
  IconButton,
  ModalOverlay,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  ModalFooter,
  Button,
  IconButtonProps,
} from '@chakra-ui/core';

interface DeleteButtonWithConfirmationProps extends Omit<IconButtonProps, 'aria-label'> {
  modalBodyText: string;
  modalHeaderText: string;
  onConfirmation: () => void | Promise<any>;
  isDisabled?: boolean;
}
export const DeleteButtonWithConfirmation: React.FC<DeleteButtonWithConfirmationProps> = ({
  modalBodyText,
  modalHeaderText,
  onConfirmation,
  isDisabled,
  ...props
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <IconButton
        aria-label={modalHeaderText}
        icon="delete"
        size="sm"
        onClick={onOpen}
        isDisabled={isDisabled}
        {...props}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="white">
          <ModalHeader>{modalHeaderText}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{modalBodyText}</Text>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={async () => {
                await onConfirmation();
                onClose();
              }}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
