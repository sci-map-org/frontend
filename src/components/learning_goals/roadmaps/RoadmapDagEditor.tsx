import { useApolloClient } from '@apollo/client';
import { CloseIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import {
  useAttachLearningGoalDependencyMutation,
  useAttachLearningGoalRequiresSubGoalMutation,
  useDetachLearningGoalDependencyMutation,
  useDetachLearningGoalRequiresSubGoalMutation,
} from '../../../graphql/learning_goals/learning_goals.operations.generated';
import { LearningGoalType } from '../../../graphql/types';
import { DeleteButtonWithConfirmation } from '../../lib/buttons/DeleteButtonWithConfirmation';
import { EntitySelector } from '../../lib/selectors/EntitySelector';
import { LearningGoalSelector } from '../LearningGoalSelector';
import { LearningGoalSubGoalCardData, LearningGoalSubGoalCardEditor } from '../SubGoalCard';
import { LearningGoalSubGoalCardDataFragment, SubGoalCardDataFragment } from '../SubGoalCard.generated';
import { RoadmapDag } from './RoadmapDag';

interface RoadmapDagEditorProps {
  learningGoalId: string;
  subGoalsItems: SubGoalCardDataFragment[];
}

export const RoadmapDagEditor: React.FC<RoadmapDagEditorProps> = ({ learningGoalId, subGoalsItems }) => {
  const [detachLearningGoalRequiresSubGoal] = useDetachLearningGoalRequiresSubGoalMutation();
  const [renderingStage, setRenderingStage] = useState(0);

  const rerenderDag = () => setRenderingStage(renderingStage + 1);

  const { isOpen, onOpen, onClose } = useDisclosure({
    onClose() {
      rerenderDag();
    },
  });
  const [selectedSubGoalId, setSelectedSubGoalId] = useState<string>();

  const editSubGoal = (subGoalId: string) => {
    setSelectedSubGoalId(subGoalId);
    onOpen();
  };

  const [attachLearningGoalRequiresSubGoal] = useAttachLearningGoalRequiresSubGoalMutation();
  return (
    <Box>
      <RoadmapDag
        subGoalsItems={subGoalsItems}
        renderingStage={renderingStage}
        renderNode={({ meta }, { nodePxWidth, nodePxHeight }, size) => {
          // if (meta.data.subGoal.__typename === 'LearningGoal') {
          //   return (
          //     <Box w={`${nodePxWidth}px`} h={`${nodePxHeight}px`} key={meta.data.subGoal._id}>
          //       {/* <LearningGoalSubGoalCardEditor
          //         learningGoal={meta.data.subGoal}
          //         status={meta.status}
          //         size={size}
          //         onRemove={async (subGoalId) => {
          //           await detachLearningGoalRequiresSubGoal({
          //             variables: { learningGoalId: learningGoalId, subGoalId: subGoalId },
          //           });
          //           rerenderDag();
          //         }}
          //         onEdit={(subGoalId) => editSubGoal(subGoalId)}
          //       /> */}
          //     </Box>
          //   );
          // } else {
          return <Box />;
          // }
        }}
      />
      <Center mt={3}>
        <Box w="300px" h="160px">
          <Center
            w="100%"
            h="100%"
            py={2}
            borderWidth={2}
            borderColor="blue.600"
            borderRadius={5}
            flexDirection="column"
          >
            <Text fontWeight={600} color="gray.600">
              Add new SubGoal
            </Text>
            <LearningGoalSelector
              placeholder="Select or Create SubGoal"
              createLGDefaultData={{ type: LearningGoalType.SubGoal, public: false }}
              onSelect={async (selected) => {
                await attachLearningGoalRequiresSubGoal({
                  variables: {
                    learningGoalId: learningGoalId,
                    subGoalId: selected._id,
                    payload: {},
                  },
                });
                rerenderDag();
              }}
            />
          </Center>
        </Box>
      </Center>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit SubGoal</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedSubGoalId ? (
              <SubGoalItemEditor
                parentLearningGoalId={learningGoalId}
                subGoalId={selectedSubGoalId}
                subGoalsItems={subGoalsItems}
              />
            ) : (
              <Text>No subGoal selected</Text>
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                rerenderDag();
                onClose();
              }}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

const SubGoalItemEditor: React.FC<{
  parentLearningGoalId: string;
  subGoalId: string;
  subGoalsItems: SubGoalCardDataFragment[];
}> = ({ parentLearningGoalId, subGoalId, subGoalsItems }) => {
  const client = useApolloClient();
  const [attachLearningGoalDependency] = useAttachLearningGoalDependencyMutation();
  const [detachLearningGoalDependency] = useDetachLearningGoalDependencyMutation();

  /**
   * Necessary in order to see the updated dependencies in the UI
   */
  const subGoal = client.readFragment<LearningGoalSubGoalCardDataFragment>({
    id: `LearningGoal:${subGoalId}`,
    fragment: LearningGoalSubGoalCardData,
    fragmentName: 'LearningGoalSubGoalCardData',
  });
  if (!subGoal) return null;
  const onRemoveDependency = (lgDependencyId: string) => {
    detachLearningGoalDependency({
      variables: {
        parentLearningGoalId,
        learningGoalId: subGoalId,
        learningGoalDependencyId: lgDependencyId,
      },
    });
  };

  const dependsOnLearningGoals = (subGoal.dependsOnLearningGoals || []).map((dependency) =>
    client.readFragment<LearningGoalSubGoalCardDataFragment>({
      id: `LearningGoal:${dependency.learningGoal._id}`,
      fragment: LearningGoalSubGoalCardData,
      fragmentName: 'LearningGoalSubGoalCardData',
    })
  );

  return (
    <Stack>
      <Stack direction="row" alignItems="baseline">
        <Text fontWeight={600} color="gray.500">
          Depends On:
        </Text>
        {/* <EntitySelector
          entitySuggestions={subGoalsItems
            .filter(
              ({ subGoal: suggestedSubGoal }) =>
                subGoalId !== suggestedSubGoal._id &&
                !dependsOnLearningGoals.find((dependency) => dependency?._id === suggestedSubGoal._id)
            )
            .map(({ subGoal: suggestedSubGoal }) => ({ name: suggestedSubGoal.name, _id: suggestedSubGoal._id }))}
          fetchEntitySuggestions={() => {}}
          onSelect={(selected) =>
            attachLearningGoalDependency({
              variables: {
                parentLearningGoalId,
                learningGoalId: subGoal._id,
                learningGoalDependencyId: selected._id,
              },
            })
          }
          placeholder="Select subgoal"
          width="120px"
        /> */}
      </Stack>
      <Stack>
        {dependsOnLearningGoals.map((dependency) =>
          dependency ? (
            <Stack direction="row" key={dependency._id} alignItems="center">
              <DeleteButtonWithConfirmation
                modalBodyText={`Confirm removing "${dependency.name}" as a dependency of "${subGoal.name}" ?`}
                modalHeaderText="Confirm removing dependency ?"
                mode="iconButton"
                onConfirmation={() => onRemoveDependency(dependency._id)}
                size="xs"
                variant="ghost"
                icon={<CloseIcon />}
                confirmButtonText="Remove"
              />
              <Text fontSize="sm">{dependency.name}</Text>
            </Stack>
          ) : null
        )}
      </Stack>
    </Stack>
  );
};
