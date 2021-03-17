import { Flex, Stack, Text } from '@chakra-ui/layout';
import gql from 'graphql-tag';
import { ConceptLinkData } from '../../../../graphql/concepts/concepts.fragments';
import { DomainLink } from '../../../domains/DomainLink';
import { BoxBlockDefaultClickPropagation } from '../../../lib/BoxBlockDefaultClickPropagation';
import { SearchResultCardContainer, SearchResultCardContainerProps } from './SearchResultCardContainer';
import { SearchResultConceptCardDataFragment } from './SearchResultConceptCard.generated';
import { ConceptIcon } from '../../../lib/icons/ConceptIcon';

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
    <SearchResultCardContainer
      renderIcon={(props) => <ConceptIcon {...props} />}
      {...props}
      borderLeftColor="yellow.200"
    >
      <Flex direction="row" alignItems="baseline" justifyContent="space-between" w="100%">
        <Text fontWeight={500}>{concept.name}</Text>
        {concept.domain && (
          <BoxBlockDefaultClickPropagation fontSize="xs">
            <DomainLink domain={concept.domain}>In: {concept.domain?.name}</DomainLink>
          </BoxBlockDefaultClickPropagation>
        )}
      </Flex>
    </SearchResultCardContainer>
  );
};
