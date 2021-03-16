import { Stack, Text } from '@chakra-ui/layout';
import gql from 'graphql-tag';
import { ConceptLinkData } from '../../../../graphql/concepts/concepts.fragments';
import { SearchResultCardContainer, SearchResultCardContainerProps } from './SearchResultCardContainer';
import { SearchResultConceptCardDataFragment } from './SearchResultConceptCard.generated';

export const SearchResultConceptCardData = gql`
  fragment SearchResultConceptCardData on Concept {
    ...ConceptLinkData
  }
  ${ConceptLinkData}
`;

export const SearchResultConceptCard: React.FC<
  { concept: SearchResultConceptCardDataFragment } & SearchResultCardContainerProps
> = ({ concept, ...props }) => {
  return (
    <SearchResultCardContainer {...props}>
      <Stack direction="row" alignItems="baseline" spacing={1}>
        <Text fontWeight={500}>{concept.name}</Text>
        <Text fontWeight={600} color="gray.400" fontSize="xs">
          ({concept.domain?.name})
        </Text>
      </Stack>
    </SearchResultCardContainer>
  );
};
