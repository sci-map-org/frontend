import { Center, Stack } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { useMemo, useState } from 'react';
import { SubTopicSelector } from '../../components/domains/SubTopicSelector';
import { PageLayout } from '../../components/layout/PageLayout';
import { SubGoalCardData } from '../../components/learning_goals/SubGoalCard';
import { SubGoalsWrapper } from '../../components/learning_goals/SubGoalsWrapper';
import { EditableTextarea } from '../../components/lib/inputs/EditableTextarea';
import { EditableTextInput } from '../../components/lib/inputs/EditableTextInput';
import { DomainData, generateDomainData } from '../../graphql/domains/domains.fragments';
import { generateLearningGoalData, LearningGoalData } from '../../graphql/learning_goals/learning_goals.fragments';
import {
  useAttachLearningGoalRequiresSubGoalMutation,
  useUpdateLearningGoalMutation,
} from '../../graphql/learning_goals/learning_goals.operations.generated';
import { TopicType, UserRole } from '../../graphql/types';
import { useCurrentUser } from '../../graphql/users/users.hooks';
import { NotFoundPage } from '../NotFoundPage';
import { DomainPageInfo } from '../RoutesPageInfos';
import {
  GetLearningGoalDomainLearningGoalPageQuery,
  useGetLearningGoalDomainLearningGoalPageQuery,
} from './DomainLearningGoalPage.generated';
import { LearningGoalPageRightIcons } from './LearningGoalPage';
import { StartLearningGoalButton, StartLearningGoalButtonData } from './StartLearningGoalButton';

export const getLearningGoalDomainLearningGoalPage = gql`
  query getLearningGoalDomainLearningGoalPage($domainKey: String!, $contextualLearningGoalKey: String!) {
    getDomainLearningGoalByKey(domainKey: $domainKey, contextualLearningGoalKey: $contextualLearningGoalKey) {
      domain {
        ...DomainData
      }

      learningGoal {
        ...LearningGoalData
        createdBy {
          _id
        }
        requiredSubGoals {
          ...SubGoalCardData
        }
        ...StartLearningGoalButtonData
      }
    }
  }
  ${DomainData}
  ${LearningGoalData}
  ${SubGoalCardData}
  ${StartLearningGoalButtonData}
`;

const placeholderData: GetLearningGoalDomainLearningGoalPageQuery['getDomainLearningGoalByKey'] = {
  learningGoal: generateLearningGoalData(),
  domain: generateDomainData(),
};

export const DomainLearningGoalPage: React.FC<{ domainKey: string; contextualLearningGoalKey: string }> = ({
  contextualLearningGoalKey,
  domainKey,
}) => {
  const { data, loading } = useGetLearningGoalDomainLearningGoalPageQuery({
    variables: { domainKey, contextualLearningGoalKey },
  });
  const learningGoal = data?.getDomainLearningGoalByKey.learningGoal || placeholderData.learningGoal;
  const domain = data?.getDomainLearningGoalByKey.domain || placeholderData.domain;
  const [updateLearningGoal] = useUpdateLearningGoalMutation();
  const { currentUser } = useCurrentUser();
  const currentUserIsOwner = useMemo(
    () => !!learningGoal.createdBy && !!currentUser && learningGoal.createdBy._id === currentUser._id,
    [learningGoal, currentUser]
  );
  const [editMode, setEditMode] = useState(!!currentUser && currentUser.role === UserRole.Admin);
  const [attachLearningGoalRequiresSubGoal] = useAttachLearningGoalRequiresSubGoalMutation();
  if (!loading && !data) return <NotFoundPage />;
  return (
    <PageLayout
      breadCrumbsLinks={[DomainPageInfo(domain)]}
      renderTopRight={
        <LearningGoalPageRightIcons
          learningGoal={learningGoal}
          currentUserIsOwner={currentUserIsOwner}
          isDisabled={loading}
          editMode={editMode}
          setEditMode={setEditMode}
        />
      }
    >
      <Stack w="100%">
        <Stack direction="row" spacing={3} alignItems="center">
          <EditableTextInput
            value={learningGoal.name}
            centered
            editMode={false} // ? If overriding, the contextualName won't work anymore :/
            isLoading={loading}
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
        <EditableTextarea
          textAlign="center"
          isLoading={loading}
          justifyContent="center"
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
        <SubGoalsWrapper
          learningGoal={learningGoal}
          editMode={editMode}
          renderLastItem={
            editMode && (
              <Center py={2}>
                <SubTopicSelector
                  domain={domain}
                  onSelect={(selected) =>
                    attachLearningGoalRequiresSubGoal({
                      variables: { learningGoalId: learningGoal._id, subGoalId: selected._id, payload: {} },
                    })
                  }
                  placeholder="Select or Create SubGoals"
                  allowedSubTopicTypes={[TopicType.Concept, TopicType.LearningGoal]}
                />
              </Center>
            )
          }
        />
      </Stack>
    </PageLayout>
  );
};
