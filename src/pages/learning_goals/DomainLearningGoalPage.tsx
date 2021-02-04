import gql from 'graphql-tag';
import { useMemo, useState } from 'react';
import { PageLayout } from '../../components/layout/PageLayout';
import {
  ConceptGroupLearningGoal,
  ConceptGroupLearningGoalData,
} from '../../components/learning_goals/ConceptGroupLearningGoal';
import { RoadmapLearningGoal, RoadmapLearningGoalData } from '../../components/learning_goals/RoadmapLearningGoal';
import { DomainData, generateDomainData } from '../../graphql/domains/domains.fragments';
import { generateLearningGoalData } from '../../graphql/learning_goals/learning_goals.fragments';
import { LearningGoalType, UserRole } from '../../graphql/types';
import { useCurrentUser } from '../../graphql/users/users.hooks';
import { NotFoundPage } from '../NotFoundPage';
import { DomainPageInfo } from '../RoutesPageInfos';
import {
  GetLearningGoalDomainLearningGoalPageQuery,
  useGetLearningGoalDomainLearningGoalPageQuery,
} from './DomainLearningGoalPage.generated';
import { LearningGoalPageRightIcons } from './LearningGoalPage';

export const getLearningGoalDomainLearningGoalPage = gql`
  query getLearningGoalDomainLearningGoalPage($domainKey: String!, $contextualLearningGoalKey: String!) {
    getDomainLearningGoalByKey(domainKey: $domainKey, contextualLearningGoalKey: $contextualLearningGoalKey) {
      domain {
        ...DomainData
      }

      learningGoal {
        ...RoadmapLearningGoalData
        ...ConceptGroupLearningGoalData
      }
    }
  }
  ${DomainData}
  ${RoadmapLearningGoalData}
  ${ConceptGroupLearningGoalData}
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
  const { currentUser } = useCurrentUser();
  const currentUserIsOwner = useMemo(
    () => !!learningGoal.createdBy && !!currentUser && learningGoal.createdBy._id === currentUser._id,
    [learningGoal, currentUser]
  );

  const [editMode, setEditMode] = useState(!!currentUser && currentUser.role === UserRole.Admin);

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
      {learningGoal.type === LearningGoalType.Roadmap && (
        <RoadmapLearningGoal learningGoal={learningGoal} isLoading={loading} editMode={editMode} />
      )}
      {learningGoal.type === LearningGoalType.SubGoal && (
        <ConceptGroupLearningGoal learningGoal={learningGoal} isLoading={loading} editMode={editMode} />
      )}
      {/* <Stack w="100%">
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
        <RoadmapSubGoalsWrapper
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
      </Stack> */}
    </PageLayout>
  );
};
