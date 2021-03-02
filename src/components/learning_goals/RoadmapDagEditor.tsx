import { useApolloClient } from '@apollo/client';
import { CloseIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
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
import { useMemo, useState } from 'react';
import {
  useAttachLearningGoalDependencyMutation,
  useDetachLearningGoalDependencyMutation,
  useDetachLearningGoalRequiresSubGoalMutation,
} from '../../graphql/learning_goals/learning_goals.operations.generated';
import { DeleteButtonWithConfirmation } from '../lib/buttons/DeleteButtonWithConfirmation';
import { DagreViewer } from '../lib/DagreViewer';
import { EntitySelector } from '../lib/selectors/EntitySelector';
import { LearningGoalSubGoalCardData, LearningGoalSubGoalCardEditor } from './SubGoalCard';
import { LearningGoalSubGoalCardDataFragment, SubGoalCardDataFragment } from './SubGoalCard.generated';

interface RoadmapDagEditorProps {
  learningGoalId: string;
  subGoalsItems: SubGoalCardDataFragment[];
}

export const RoadmapDagEditor: React.FC<RoadmapDagEditorProps> = ({ learningGoalId, subGoalsItems }) => {
  const [detachLearningGoalRequiresSubGoal] = useDetachLearningGoalRequiresSubGoalMutation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedSubGoalItem, setSelectedSubGoalItem] = useState<SubGoalCardDataFragment>();
  const editSubGoal = (subGoalId: string) => {
    const item = subGoalsItems.find(({ subGoal }) => subGoal._id === subGoalId);
    if (!item) throw new Error('subGoal ' + subGoalId + ' not found');
    setSelectedSubGoalItem(item);
    onOpen();
  };
  const edges = useMemo(() => {
    return subGoalsItems.reduce((edges, subGoalItem) => {
      if (subGoalItem.subGoal.__typename === 'LearningGoal') {
        const e = (subGoalItem.subGoal.dependsOnLearningGoals || []).map((d) => ({
          from: d.learningGoal._id,
          to: subGoalItem.subGoal._id,
          meta: {},
        }));
        return edges.concat(e);
      }
      return edges;
    }, [] as { from: string; to: string; meta: any }[]);
  }, [subGoalsItems]);
  return (
    <Box>
      <DagreViewer
        nodes={subGoalsItems.map((item) => ({
          id: item.subGoal._id,
          label: item.subGoal.name,
          meta: { data: item },
        }))}
        edges={edges}
        renderNode={({ meta }) => {
          if (meta.data.subGoal.__typename === 'LearningGoal') {
            return (
              <Box w="300px" h="160px" key={meta.data.subGoal._id}>
                <LearningGoalSubGoalCardEditor
                  learningGoal={meta.data.subGoal}
                  onRemove={(subGoalId) =>
                    detachLearningGoalRequiresSubGoal({
                      variables: { learningGoalId: learningGoalId, subGoalId: subGoalId },
                    })
                  }
                  onEdit={(subGoalId) => editSubGoal(subGoalId)}
                />
              </Box>
            );
          } else {
            return <Box />;
          }
        }}
      />
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit SubGoal</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedSubGoalItem ? (
              <SubGoalItemEditor
                parentLearningGoalId={learningGoalId}
                subGoalItem={selectedSubGoalItem}
                subGoalsItems={subGoalsItems}
              />
            ) : (
              <Text>No subGoal selected</Text>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

const SubGoalItemEditor: React.FC<{
  parentLearningGoalId: string;
  subGoalItem: SubGoalCardDataFragment;
  subGoalsItems: SubGoalCardDataFragment[];
}> = ({ parentLearningGoalId, subGoalItem, subGoalsItems }) => {
  const client = useApolloClient();
  const [attachLearningGoalDependency] = useAttachLearningGoalDependencyMutation();
  const [detachLearningGoalDependency] = useDetachLearningGoalDependencyMutation();
  const onRemoveDependency = (lgDependencyId: string) => {
    detachLearningGoalDependency({
      variables: {
        parentLearningGoalId,
        learningGoalId: subGoalItem.subGoal._id,
        learningGoalDependencyId: lgDependencyId,
      },
    });
  };
  if (subGoalItem.subGoal.__typename !== 'LearningGoal') {
    console.error('Expected selected subgoal to be a Learning Goal');
    return null;
  }

  const dependsOnLearningGoals = (subGoalItem.subGoal.dependsOnLearningGoals || []).map((dependency) =>
    client.readFragment<LearningGoalSubGoalCardDataFragment>({
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
        <EntitySelector
          entitySuggestions={subGoalsItems
            .filter(({ subGoal }) => !dependsOnLearningGoals.find((dependency) => dependency?._id === subGoal._id))
            .map(({ subGoal }) => ({ name: subGoal.name, _id: subGoal._id }))}
          fetchEntitySuggestions={() => {}}
          onSelect={(selected) =>
            attachLearningGoalDependency({
              variables: {
                parentLearningGoalId,
                learningGoalId: subGoalItem.subGoal._id,
                learningGoalDependencyId: selected._id,
              },
            })
          }
          placeholder="Select subgoal"
          width="120px"
        />
      </Stack>
      <Stack>
        {dependsOnLearningGoals.map((dependency) =>
          dependency ? (
            <Stack direction="row" key={dependency._id} alignItems="center">
              <DeleteButtonWithConfirmation
                modalBodyText={`Confirm removing "${dependency.name}" as a dependency of "${subGoalItem.subGoal.name}" ?`}
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
