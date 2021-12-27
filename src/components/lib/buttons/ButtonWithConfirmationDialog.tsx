import {
  ButtonProps,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from '@chakra-ui/react';
import { ReactNode, useRef, useState } from 'react';

export const ButtonWithConfirmationDialog: React.FC<{
  renderButton: (onClick: () => void) => ReactNode;
  dialogHeaderText: string;
  dialogBodyText: string;
  confirmButtonText?: string;
  confirmButtonColorScheme?: ButtonProps['colorScheme'];
  onConfirmation: () => void | Promise<any>;
}> = ({
  renderButton,
  dialogHeaderText,
  dialogBodyText,
  confirmButtonText,
  confirmButtonColorScheme,
  onConfirmation,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      {renderButton(() => setIsOpen(true))}
      <AlertDialog isOpen={isOpen} onClose={onClose} leastDestructiveRef={cancelRef}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {dialogHeaderText}
            </AlertDialogHeader>

            <AlertDialogBody>{dialogBodyText}</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme={confirmButtonColorScheme} onClick={() => onConfirmation()} ml={3}>
                {confirmButtonText}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
