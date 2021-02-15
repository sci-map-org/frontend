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
import gql from 'graphql-tag';
import {
  useIndexLearningGoalMutation,
  usePublishLearningGoalMutation,
} from '../../graphql/learning_goals/learning_goals.operations.generated';
import { shortenString } from '../../util/utils';
import { LearningGoalPublishButtonDataFragment } from './LearningGoalPublishButton.generated';

export const LearningGoalPublishButtonData = gql`
  fragment LearningGoalPublishButtonData on LearningGoal {
    _id
    name
    publishedAt
    hidden
  }
`;
interface LearningGoalPublishButtonProps {
  size?: 'sm' | 'md' | 'lg';
  learningGoal: LearningGoalPublishButtonDataFragment;
}
export const LearningGoalPublishButton: React.FC<LearningGoalPublishButtonProps> = ({ learningGoal, size = 'md' }) => {
  const [publishLearningGoal] = usePublishLearningGoalMutation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button size={size} colorScheme="blue" onClick={onOpen}>
        Publish
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>Publish "{shortenString(learningGoal.name, 28)}"?</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text textAlign="center" fontSize="xl" mt={1} color="blue.600">
                Thank you for sharing this learning goal!
              </Text>
              <Text mt={4} fontSize="md" textAlign="center">
                By publishing your learning goal, other learners will be able to see it and start learning from it.
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

                {/* TODO */}
                <ListItem>
                  Make sure to precisely enter the <b>sub goals</b> and to select in which domain it should be
                  displayed. The sub goals will also be published but won't be directly accessible (e.g. not appear in
                  search results) except from this learning goal.
                </ListItem>
                {/* <ListItem>
                  Add a <b>description</b>, the <b>estimated duration</b> and some <b>tags</b> for people to easily know
                  if it fits them
                </ListItem> */}
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
                    await publishLearningGoal({ variables: { learningGoalId: learningGoal._id } });
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

interface LearningGoalIndexButtonProps extends ButtonProps {
  learningGoal: LearningGoalPublishButtonDataFragment;
}
export const LearningGoalIndexButton: React.FC<LearningGoalIndexButtonProps> = ({ learningGoal, ...buttonProps }) => {
  const [indexLearningGoal] = useIndexLearningGoalMutation();
  return (
    <Button {...buttonProps} onClick={() => indexLearningGoal({ variables: { learningGoalId: learningGoal._id } })}>
      Share with community
    </Button>
  );
};
