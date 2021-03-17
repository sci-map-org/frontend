import gql from 'graphql-tag';
import { ResourceLinkData } from '../../../../graphql/resources/resources.fragments';
import { ResourceTypeIcon } from '../../../resources/elements/ResourceType';
import { SearchResultCardContainer, SearchResultCardContainerProps } from './SearchResultCardContainer';
import { SearchResultResourceCardDataFragment } from './SearchResultResourceCard.generated';

export const SearchResultResourceCardData = gql`
  fragment SearchResultResourceCardData on Resource {
    ...ResourceLinkData
    resourceType: type
  }
  ${ResourceLinkData}
`;

export const SearchResultResourceCard: React.FC<
  { resource: SearchResultResourceCardDataFragment } & SearchResultCardContainerProps
> = ({ resource, ...props }) => {
  return (
    <SearchResultCardContainer
      renderIcon={(props) => <ResourceTypeIcon resourceType={resource.resourceType} {...props} />}
      borderLeftColor="blue.300"
      {...props}
    >
      {resource.name}
    </SearchResultCardContainer>
  );
};
