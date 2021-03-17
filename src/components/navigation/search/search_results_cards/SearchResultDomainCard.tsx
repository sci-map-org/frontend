import { Text } from '@chakra-ui/layout';
import gql from 'graphql-tag';
import { DomainLinkData } from '../../../../graphql/domains/domains.fragments';
import { DomainIcon2 } from '../../../lib/icons/DomainIcon2';
import { SearchResultCardContainer, SearchResultCardContainerProps } from './SearchResultCardContainer';
import { SearchResultDomainCardDataFragment } from './SearchResultDomainCard.generated';

export const SearchResultDomainCardData = gql`
  fragment SearchResultDomainCardData on Domain {
    ...DomainLinkData
  }
  ${DomainLinkData}
`;

export const SearchResultDomainCard: React.FC<
  { domain: SearchResultDomainCardDataFragment } & SearchResultCardContainerProps
> = ({ domain, ...props }) => {
  return (
    <SearchResultCardContainer renderIcon={(props) => <DomainIcon2 {...props} />} {...props}>
      <Text fontWeight={600} color="gray.600" fontSize="md">
        {domain.name}
      </Text>
    </SearchResultCardContainer>
  );
};
