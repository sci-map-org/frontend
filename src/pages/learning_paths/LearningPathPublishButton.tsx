import {
  Button,
  ButtonGroup,
  ButtonProps,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  UnorderedList,
  useDisclosure,
} from '@chakra-ui/react';
import { useUpdateLearningPathMutation } from '../../graphql/learning_paths/learning_paths.operations.generated';
import { LearningPath } from '../../graphql/types';
import { shortenString } from '../../util/utils';

export const LearningPathPublishButton: React.FC<{
  size?: ButtonProps['size'];
  learningPath: Pick<LearningPath, '_id' | 'name'>;
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
            <ModalHeader>Publish "{shortenString(learningPath.name, 28)}"?</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text textAlign="center" fontSize="xl" mt={1} color="blue.600">
                Thank you for sharing this path!
              </Text>
              <Text mt={4} fontSize="md" textAlign="center">
                By publishing your learning path, other learners will be able to see it and follow it.
              </Text>
              <Text mt={5} mb={1}>
                Here's are a few things to{' '}
                <Text as="span" fontWeight={600} color="teal.500">
                  check
                </Text>{' '}
                before doing so:
              </Text>
              <UnorderedList spacing={2} pl={2}>
                <ListItem>
                  Give it a descriptive and interesting <b>name</b>
                </ListItem>
                <ListItem>
                  Make sure to precisely enter the <b>covered topics</b>: this is important as it will allow your path
                  to be recommended to users at the right time
                </ListItem>
                <ListItem>
                  Add a <b>description</b>, the <b>estimated duration</b> and some <b>tags</b> for people to easily know
                  if it fits them
                </ListItem>
              </UnorderedList>
            </ModalBody>

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
