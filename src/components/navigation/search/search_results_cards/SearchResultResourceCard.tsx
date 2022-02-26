import { Flex, Text } from '@chakra-ui/layout';
import gql from 'graphql-tag';
import { ResourceLinkData } from '../../../../graphql/resources/resources.fragments';
import { LearningMaterialRecommendationsCountViewer } from '../../../learning_materials/LearningMaterialRecommendationsCountViewer';
import { LearningMaterialTypeIcon } from '../../../learning_materials/LearningMaterialTypeBadge';
import { SearchResultCardContainer, SearchResultCardContainerProps } from './SearchResultCardContainer';
import { SearchResultResourceCardDataFragment } from './SearchResultResourceCard.generated';

export const SearchResultResourceCardData = gql`
  fragment SearchResultResourceCardData on Resource {
    ...ResourceLinkData
    resourceTypes: types
    rating
    recommendationsCount
  }
  ${ResourceLinkData}
`;

export const SearchResultResourceCard: React.FC<
  { resource: SearchResultResourceCardDataFragment } & Omit<
    SearchResultCardContainerProps,
    'borderLeftColor' | 'resource'
  >
> = ({ resource, ...props }) => {
  return (
    <SearchResultCardContainer
      // TODO
      renderIcon={(props) => <LearningMaterialTypeIcon type={resource.resourceTypes[0]} {...props} />}
      borderLeftColor="blue.300"
      {...props}
    >
      <Flex direction="row" alignItems="center" justifyContent="space-between" w="100%">
        <Text noOfLines={2}>{resource.name}</Text>
        {typeof resource.recommendationsCount === 'number' && (
          <LearningMaterialRecommendationsCountViewer
            recommendationsTotalCount={resource.recommendationsCount}
            size="2xs"
            isLoading={false}
          />
        )}
      </Flex>
    </SearchResultCardContainer>
  );
};
