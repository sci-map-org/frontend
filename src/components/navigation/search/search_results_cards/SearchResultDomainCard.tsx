import { Flex, Stack, Text } from '@chakra-ui/layout';
import gql from 'graphql-tag';
import { DomainLinkData } from '../../../../graphql/domains/domains.fragments';
import { ConceptIcon } from '../../../lib/icons/ConceptIcon';
import { DomainIcon3 } from '../../../lib/icons/DomainIcon3';
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
    <SearchResultCardContainer
      renderIcon={(props) => <DomainIcon3 {...props} />}
      {...props}
      borderLeftColor="gray.500"
      bgColor={props.isHighlighted ? 'gray.200' : 'gray.100'}
    >
      <Flex direction="row" justifyContent="space-between" w="100%">
        <Text fontWeight={600} color="gray.600" fontSize="md">
          {domain.name}
        </Text>
        <Stack direction="row" spacing={1} ml={8} alignItems="start">
          <Text fontWeight={500}>32</Text>
          <ConceptIcon boxSize={5} />
        </Stack>
      </Flex>
    </SearchResultCardContainer>
  );
};
