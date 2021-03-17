import { Flex, Text } from '@chakra-ui/layout';
import gql from 'graphql-tag';
import { ResourceLinkData } from '../../../../graphql/resources/resources.fragments';
import { StarsRatingViewer } from '../../../lib/StarsRating';
import { ResourceTypeIcon } from '../../../resources/elements/ResourceType';
import { SearchResultCardContainer, SearchResultCardContainerProps } from './SearchResultCardContainer';
import { SearchResultResourceCardDataFragment } from './SearchResultResourceCard.generated';

export const SearchResultResourceCardData = gql`
  fragment SearchResultResourceCardData on Resource {
    ...ResourceLinkData
    resourceType: type
    rating
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
      renderIcon={(props) => <ResourceTypeIcon resourceType={resource.resourceType} {...props} />}
      borderLeftColor="blue.300"
      {...props}
    >
      <Flex direction="row" alignItems="baseline" justifyContent="space-between" w="100%">
        <Text noOfLines={2}>{resource.name}</Text>
        <StarsRatingViewer value={resource.rating} pxSize={14} />
      </Flex>
    </SearchResultCardContainer>
  );
};
