import {
  Button,
  ButtonGroup,
  ButtonProps,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { useUpdateLearningPathMutation } from '../../graphql/learning_paths/learning_paths.operations.generated';
import { LearningPath } from '../../graphql/types';

export const LearningPathPublishButton: React.FC<{
  size?: ButtonProps['size'];
  learningPath: Pick<LearningPath, '_id'>;
}> = ({ learningPath, size = 'lg' }) => {
  const [updateLearningPath] = useUpdateLearningPathMutation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button size={size} colorScheme="blue" onClick={onOpen}>
        Publish
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>Publish </ModalHeader>
            <ModalCloseButton />
            <ModalBody>Confirm publish - Content</ModalBody>

            <ModalFooter>
              <ButtonGroup spacing={3}>
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  colorScheme="blue"
                  onClick={async () => {
                    await updateLearningPath({ variables: { _id: learningPath._id, payload: { public: true } } });
                    onClose();
                  }}
                >
                  Publish
                </Button>
              </ButtonGroup>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
};
