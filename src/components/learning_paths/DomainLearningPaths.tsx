import { Flex, Text } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { DomainDataFragment } from '../../graphql/domains/domains.fragments.generated';
import { useGetDomainLearningPathsQuery } from './DomainLearningPaths.generated';
import { LearningPathPreviewCardData } from './LearningPathPreviewCard';
import { LearningPathPreviewCardList } from './LearningPathPreviewCardList';

export const getDomainLearningPaths = gql`
  query getDomainLearningPaths($domainKey: String!) {
    getDomainByKey(key: $domainKey) {
      _id
      learningPaths(options: { sorting: { field: createdAt, direction: DESC } }) {
        items {
          ...LearningPathPreviewCardData
        }
      }
    }
  }
  ${LearningPathPreviewCardData}
`;
export const DomainLearningPaths: React.FC<{ domain: DomainDataFragment }> = ({ domain }) => {
  const { data } = useGetDomainLearningPathsQuery({ variables: { domainKey: domain.key } });
  const learningPaths = data?.getDomainByKey.learningPaths?.items;
  if (!learningPaths) return null;
  return (
    <Flex direction="column">
      <Text fontSize="xl" mb={2}>
        Curated Learning Paths
      </Text>
      <LearningPathPreviewCardList h="300px" learningPaths={learningPaths} />
    </Flex>
  );
};
