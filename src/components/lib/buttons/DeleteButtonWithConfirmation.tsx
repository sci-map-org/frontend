import {
  Button,
  ButtonProps,
  IconButton,
  IconButtonProps,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/core';
import { DeleteIcon } from '@chakra-ui/icons';

type DeleteButtonWithConfirmationProps = (
  | ({ mode?: 'iconButton' } & Omit<IconButtonProps, 'aria-label'>)
  | ({ mode: 'button' } & Omit<ButtonProps, 'aria-label'>)
) & {
  modalBodyText: string;
  modalHeaderText: string;
  onConfirmation: () => void | Promise<any>;
  isDisabled?: boolean;
};
export const DeleteButtonWithConfirmation: React.FC<DeleteButtonWithConfirmationProps> = ({
  modalBodyText,
  modalHeaderText,
  onConfirmation,
  isDisabled,
  children,
  ...props
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {props.mode === 'button' ? (
        <Button aria-label={modalHeaderText} size="sm" onClick={onOpen} isDisabled={isDisabled} {...props}>
          {children}
        </Button>
      ) : (
        <IconButton
          aria-label={modalHeaderText}
          icon={<DeleteIcon />}
          size="sm"
          onClick={onOpen}
          isDisabled={isDisabled}
          {...props}
        />
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>
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
        </ModalOverlay>
      </Modal>
    </>
  );
};
