import {
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/core';
import { useUpdateLearningPathMutation } from '../../graphql/learning_paths/learning_paths.operations.generated';
import { LearningPath } from '../../graphql/types';

export const LearningPathPublishButton: React.FC<{ learningPath: Pick<LearningPath, '_id'> }> = ({ learningPath }) => {
  const [updateLearningPath] = useUpdateLearningPathMutation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button size="lg" colorScheme="blue" onClick={onOpen}>
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
                  onClick={() =>
                    updateLearningPath({ variables: { _id: learningPath._id, payload: { public: true } } })
                  }
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
