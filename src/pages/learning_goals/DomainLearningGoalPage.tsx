import gql from 'graphql-tag';
import { PageLayout } from '../../components/layout/PageLayout';
import { DomainData } from '../../graphql/domains/domains.fragments';
import { DomainDataFragment } from '../../graphql/domains/domains.fragments.generated';
import { LearningGoalData } from '../../graphql/learning_goals/learning_goals.fragments';
import { LearningGoalBelongsToDomain } from '../../graphql/types';
import { PageInfo } from '../PageInfo';
import { useGetLearningGoalDomainLearningGoalPageQuery } from './DomainLearningGoalPage.generated';

export const DomainLearningGoalPagePath = (domainKey: string, contextualLearningGoalKey: string) =>
  `/domains/${domainKey}/goals/${contextualLearningGoalKey}`;

export const DomainLearningGoalPageInfo = (
  domain: Pick<DomainDataFragment, 'key' | 'name'>,
  { contextualKey, contextualName }: Pick<LearningGoalBelongsToDomain, 'contextualKey' | 'contextualName'>
): PageInfo => ({
  name: `${domain.name} - ${contextualName}`,
  path: DomainLearningGoalPagePath(domain.key, contextualKey),
  routePath: DomainLearningGoalPagePath('[key]', '[learningGoalKey]'),
});

export const getLearningGoalDomainLearningGoalPage = gql`
  query getLearningGoalDomainLearningGoalPage($domainKey: String!, $contextualLearningGoalKey: String!) {
    getDomainLearningGoalByKey(domainKey: $domainKey, contextualLearningGoalKey: $contextualLearningGoalKey) {
      domain {
        ...DomainData
      }
      learningGoal {
        ...LearningGoalData
      }
    }
  }
  ${DomainData}
  ${LearningGoalData}
`;
export const DomainLearningGoalPage: React.FC<{ domainKey: string; contextualLearningGoalKey: string }> = ({
  contextualLearningGoalKey,
  domainKey,
}) => {
  const { data } = useGetLearningGoalDomainLearningGoalPageQuery({
    variables: { domainKey, contextualLearningGoalKey },
  });
  return <PageLayout>{data?.getDomainLearningGoalByKey.learningGoal.name}</PageLayout>;
};
