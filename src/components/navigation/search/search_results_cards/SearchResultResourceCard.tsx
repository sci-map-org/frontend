import gql from 'graphql-tag';
import { ResourceLinkData } from '../../../../graphql/resources/resources.fragments';
import { SearchResultCardContainer, SearchResultCardContainerProps } from './SearchResultCardContainer';
import { SearchResultResourceCardDataFragment } from './SearchResultResourceCard.generated';

export const SearchResultResourceCardData = gql`
  fragment SearchResultResourceCardData on Resource {
    ...ResourceLinkData
  }
  ${ResourceLinkData}
`;

export const SearchResultResourceCard: React.FC<
  { resource: SearchResultResourceCardDataFragment } & SearchResultCardContainerProps
> = ({ resource, ...props }) => {
  return <SearchResultCardContainer {...props}>{resource.name}</SearchResultCardContainer>;
};
