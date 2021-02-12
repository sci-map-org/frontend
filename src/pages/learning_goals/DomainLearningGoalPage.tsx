import gql from 'graphql-tag';
import { useMemo, useState } from 'react';
import { PageLayout } from '../../components/layout/PageLayout';
import {
  ConceptGroupLearningGoal,
  ConceptGroupLearningGoalData,
} from '../../components/learning_goals/ConceptGroupLearningGoal';
import { RoadmapLearningGoal, RoadmapLearningGoalData } from '../../components/learning_goals/RoadmapLearningGoal';
import { DomainLinkData } from '../../graphql/domains/domains.fragments';
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
  query getLearningGoalDomainLearningGoalPage($domainKey: String!, $learningGoalKey: String!) {
    getDomainLearningGoalByKey(domainKey: $domainKey, learningGoalKey: $learningGoalKey) {
      learningGoal {
        ...RoadmapLearningGoalData
        ...ConceptGroupLearningGoalData
        domain {
          domain {
            ...DomainLinkData
          }
        }
      }
    }
  }
  ${DomainLinkData}
  ${RoadmapLearningGoalData}
  ${ConceptGroupLearningGoalData}
`;

const placeholderData: GetLearningGoalDomainLearningGoalPageQuery['getDomainLearningGoalByKey'] = {
  learningGoal: generateLearningGoalData(),
};

export const DomainLearningGoalPage: React.FC<{ domainKey: string; learningGoalKey: string }> = ({
  learningGoalKey,
  domainKey,
}) => {
  const { data, loading } = useGetLearningGoalDomainLearningGoalPageQuery({
    variables: { domainKey, learningGoalKey },
  });
  const learningGoal = data?.getDomainLearningGoalByKey.learningGoal || placeholderData.learningGoal;
  const domainItem = data?.getDomainLearningGoalByKey.learningGoal.domain || placeholderData.learningGoal.domain;
  const { currentUser } = useCurrentUser();
  const currentUserIsOwner = useMemo(
    () => !!learningGoal.createdBy && !!currentUser && learningGoal.createdBy._id === currentUser._id,
    [learningGoal, currentUser]
  );
  if (data && !domainItem) throw new Error('no domain found');
  const [editMode, setEditMode] = useState(!!currentUser && currentUser.role === UserRole.Admin);

  if (!loading && !data) return <NotFoundPage />;
  return (
    <PageLayout
      breadCrumbsLinks={domainItem ? [DomainPageInfo(domainItem.domain)] : undefined}
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
      {learningGoal.type === LearningGoalType.SubGoal && domainItem && (
        <ConceptGroupLearningGoal
          domain={domainItem.domain}
          learningGoal={learningGoal}
          isLoading={loading}
          editMode={editMode}
        />
      )}
    </PageLayout>
  );
};
