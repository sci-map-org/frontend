import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import { PageLayout } from '../../components/layout/PageLayout';
import {
  ConceptGroupLearningGoal,
  ConceptGroupLearningGoalData,
} from '../../components/learning_goals/ConceptGroupLearningGoal';
import { LearningGoalRoadmap, LearningGoalRoadmapData } from '../../components/learning_goals/LearningGoalRoadmap';
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
        ...LearningGoalRoadmapData
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
  ${LearningGoalRoadmapData}
  ${ConceptGroupLearningGoalData}
`;

const placeholderData: GetLearningGoalDomainLearningGoalPageQuery['getDomainLearningGoalByKey'] = {
  learningGoal: generateLearningGoalData(),
};

export const DomainLearningGoalPage: React.FC<{ domainKey: string; learningGoalKey: string }> = ({
  learningGoalKey,
  domainKey,
}) => {
  const { data, loading, refetch } = useGetLearningGoalDomainLearningGoalPageQuery({
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
  const router = useRouter();
  const [editMode, setEditMode] = useState(router.query.editMode === 'true');

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
        <LearningGoalRoadmap learningGoal={learningGoal} isLoading={loading} editMode={editMode} />
      )}
      {learningGoal.type === LearningGoalType.SubGoal && domainItem && (
        <ConceptGroupLearningGoal
          domain={domainItem.domain}
          learningGoal={learningGoal}
          isLoading={loading}
          editMode={editMode}
          refetch={() => refetch()}
        />
      )}
    </PageLayout>
  );
};
