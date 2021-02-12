import { Badge, Box, Button, Center, Flex, Stack, Text } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { useMemo, useState } from 'react';
import { DomainDataFragment } from '../../graphql/domains/domains.fragments.generated';
import { LearningGoalData } from '../../graphql/learning_goals/learning_goals.fragments';
import {
  useAttachLearningGoalRequiresSubGoalMutation,
  useUpdateLearningGoalMutation,
  useAttachLearningGoalToDomainMutation,
  useDetachLearningGoalFromDomainMutation,
} from '../../graphql/learning_goals/learning_goals.operations.generated';
import { LearningGoalType } from '../../graphql/types';
import { useCurrentUser } from '../../graphql/users/users.hooks';
import { routerPushToPage } from '../../pages/PageInfo';
import { DomainLearningGoalPageInfo } from '../../pages/RoutesPageInfos';
import { DomainLink } from '../domains/DomainLink';
import { DomainSelector } from '../domains/DomainSelector';
import { EditableTextarea } from '../lib/inputs/EditableTextarea';
import { EditableTextInput } from '../lib/inputs/EditableTextInput';
import { OtherLearnersViewer, OtherLearnersViewerUserData } from '../lib/OtherLearnersViewer';
import { UserAvatar, UserAvatarData } from '../users/UserAvatar';
import { LearningGoalLinearProgress, LearningGoalLinearProgressData } from './LearningGoalLinearProgress';
import { LearningGoalPublishButton, LearningGoalPublishButtonData } from './LearningGoalPublishButton';
import { LearningGoalSelector } from './LearningGoalSelector';
import { RoadmapLearningGoalDataFragment } from './RoadmapLearningGoal.generated';
import { RoadmapSubGoalsWrapper, RoadmapSubGoalsWrapperData } from './RoadmapSubGoalsWrapper';
import { StartLearningGoalButton, StartLearningGoalButtonData } from './StartLearningGoalButton';

export const RoadmapLearningGoalData = gql`
  fragment RoadmapLearningGoalData on LearningGoal {
    _id
    ...LearningGoalData
    createdBy {
      ...UserAvatarData
    }
    startedBy(options: {}) {
      items {
        user {
          ...OtherLearnersViewerUserData
        }
      }
      count
    }
    domain {
      domain {
        ...DomainLinkData
      }
    }
    ...LearningGoalPublishButtonData
    ...RoadmapSubGoalsWrapperData
    ...StartLearningGoalButtonData
    ...LearningGoalLinearProgressData
  }
  ${LearningGoalData}
  ${LearningGoalPublishButtonData}
  ${RoadmapSubGoalsWrapperData}
  ${StartLearningGoalButtonData}
  ${OtherLearnersViewerUserData}
  ${LearningGoalLinearProgressData}
  ${UserAvatarData}
`;

interface RoadmapLearningGoalProps {
  learningGoal: RoadmapLearningGoalDataFragment;
  editMode?: boolean;
  isLoading?: boolean;
}
export const RoadmapLearningGoal: React.FC<RoadmapLearningGoalProps> = ({ learningGoal, editMode, isLoading }) => {
  const [updateLearningGoal] = useUpdateLearningGoalMutation();
  const { currentUser } = useCurrentUser();
  const currentUserIsOwner = useMemo(
    () => !!learningGoal.createdBy && !!currentUser && learningGoal.createdBy._id === currentUser._id,
    [learningGoal, currentUser]
  );
  const currentUserStartedGoal = useMemo(() => !!learningGoal.started, [learningGoal]);
  const [attachLearningGoalRequiresSubGoal] = useAttachLearningGoalRequiresSubGoalMutation();

  return (
    <Flex direction="column" w="100%" alignItems="stretch">
      <Stack direction="row" alignItems="center">
        <EditableTextInput
          value={learningGoal.name}
          fontSize="4xl"
          editMode={editMode}
          isLoading={isLoading}
          onChange={(newName) =>
            updateLearningGoal({
              variables: {
                _id: learningGoal._id,
                payload: { name: (newName as string) || null },
              },
            })
          }
        />
        <StartLearningGoalButton learningGoal={learningGoal} />
      </Stack>
      <Stack direction="row">
        {learningGoal.createdBy && (
          <Center>
            {currentUserIsOwner ? (
              <Stack direction="column" alignItems="center">
                <Text fontWeight={300} color="gray.500">
                  You are the owner
                </Text>
              </Stack>
            ) : (
              <Stack spacing={1} direction="row">
                <Center>
                  <UserAvatar size="xs" user={learningGoal.createdBy} />
                </Center>
                <Text fontWeight={300} color="gray.500">
                  Created By{' '}
                  <Text as="span" fontWeight={500}>
                    @{learningGoal.createdBy.key}
                  </Text>
                </Text>
              </Stack>
            )}
          </Center>
        )}
      </Stack>
      <Box mt={3}>
        <EditableTextarea
          isLoading={isLoading}
          backgroundColor="backgroundColor.0"
          fontSize="lg"
          fontWeight={300}
          color="gray.700"
          defaultValue={learningGoal.description || ''}
          placeholder="Add a description..."
          onSubmit={(newDescription: any) =>
            updateLearningGoal({
              variables: {
                _id: learningGoal._id,
                payload: { description: (newDescription as string) || null },
              },
            })
          }
          isDisabled={!editMode}
        />
      </Box>
      {learningGoal.startedBy && (
        <Center>
          <OtherLearnersViewer
            title={() => `Learning now`}
            users={learningGoal.startedBy.items.map(({ user }) => user)}
            totalCount={learningGoal.startedBy.count}
            currentUserIsLearner={currentUserStartedGoal}
            minUsers={currentUserIsOwner ? 1 : 4}
          />
        </Center>
      )}

      <Flex direction="row" justifyContent="space-between" alignItems="center" mt={5} mb={5}>
        {(currentUserStartedGoal || (learningGoal.progress && learningGoal.progress.level > 0)) && (
          <Box w="60%" mt={5} mb={5}>
            <LearningGoalLinearProgress learningGoal={learningGoal} size="lg" hasStripe />
          </Box>
        )}
        {currentUserIsOwner &&
          (learningGoal.publishedAt ? (
            <Badge colorScheme="green" fontSize="lg">
              PUBLIC
            </Badge>
          ) : (
            <LearningGoalPublishButton learningGoal={learningGoal} />
          ))}
      </Flex>

      <RoadmapSubGoalsWrapper
        learningGoal={learningGoal}
        editMode={editMode}
        renderLastItem={
          editMode && (
            <Center w="100%" h="100%" py={2} borderWidth={1}>
              <LearningGoalSelector
                placeholder="Add a SubGoal..."
                createLGDefaultPayload={{ type: LearningGoalType.SubGoal }}
                onSelect={(selected) =>
                  attachLearningGoalRequiresSubGoal({
                    variables: {
                      learningGoalId: learningGoal._id,
                      subGoalId: selected._id,
                      payload: {},
                    },
                  })
                }
              />
            </Center>
          )
        }
      />
      {editMode && <LearningGoalDomainEditor learningGoal={learningGoal} />}
    </Flex>
  );
};

interface LearningGoalDomainEditorProps {
  learningGoal: RoadmapLearningGoalDataFragment;
}
const LearningGoalDomainEditor: React.FC<LearningGoalDomainEditorProps> = ({ learningGoal }) => {
  const [selectedDomain, setSelectedDomain] = useState<DomainDataFragment>();
  const [attachLearningGoalToDomain] = useAttachLearningGoalToDomainMutation();
  const [detachLearningGoalFromDomain] = useDetachLearningGoalFromDomainMutation();
  return (
    <Stack mt={10}>
      <Text fontSize="lg" fontWeight={600}>
        Change domain:{' '}
      </Text>
      <Stack direction="row">
        {learningGoal.domain ? (
          <>
            <Text>Current domain: </Text>
            <DomainLink domain={learningGoal.domain.domain} />
          </>
        ) : (
          `No domain selected`
        )}
      </Stack>
      <Stack direction="row" alignItems="baseline">
        <DomainSelector onSelect={(domain) => setSelectedDomain(domain)} />
        {selectedDomain && (
          <>
            <Text>Selected: </Text>
            <DomainLink domain={selectedDomain} />
          </>
        )}
      </Stack>
      {selectedDomain && (
        <Box py={2}>
          <Button
            colorScheme="blue"
            size="sm"
            onClick={async () => {
              if (learningGoal.domain) {
                await detachLearningGoalFromDomain({
                  variables: { learningGoalId: learningGoal._id, domainId: learningGoal.domain?.domain._id },
                });
              }
              await attachLearningGoalToDomain({
                variables: { learningGoalId: learningGoal._id, domainId: selectedDomain._id, payload: {} },
              });
              setSelectedDomain(undefined);
              routerPushToPage(DomainLearningGoalPageInfo(selectedDomain, learningGoal));
            }}
          >
            Confirm change
          </Button>
        </Box>
      )}
    </Stack>
  );
};
