import { Box, Editable, EditableInput, EditablePreview, Flex, Stack } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { useState } from 'react';
import { ConceptDataFragment } from '../../graphql/concepts/concepts.fragments.generated';
import { DomainDataFragment } from '../../graphql/domains/domains.fragments.generated';
import { ConceptBelongsToDomain } from '../../graphql/types';
import { ConceptPageInfo } from '../../pages/RoutesPageInfos';
import { RoleAccess } from '../auth/RoleAccess';
import { InternalLink, PageLink } from '../navigation/InternalLink';
import { useUpdateConceptBelongsToDomainIndexMutation } from './ConceptList.generated';

interface ConceptListProps {
  domain: DomainDataFragment;
  domainConceptItems: {
    concept: ConceptDataFragment;
    relationship: ConceptBelongsToDomain;
  }[];
  onUpdateConceptIndex?: (concept: ConceptDataFragment) => void;
}

export const updateConceptBelongsToDomainIndex = gql`
  mutation updateConceptBelongsToDomainIndex($conceptId: String!, $domainId: String!, $index: Float!) {
    updateConceptBelongsToDomain(conceptId: $conceptId, domainId: $domainId, payload: { index: $index }) {
      index
    }
  }
`;

export const ConceptList: React.FC<ConceptListProps> = ({ domain, domainConceptItems, onUpdateConceptIndex }) => {
  const [updateIndex] = useUpdateConceptBelongsToDomainIndexMutation();

  const items = domainConceptItems;
  return (
    <Box borderWidth={1} borderColor="gray.200" borderBottomWidth={0}>
      {items && items.length ? (
        items.map(({ concept, relationship }) => (
          <ConceptListItem
            key={concept._id}
            concept={concept}
            relationship={relationship}
            domain={domain}
            onIndexSubmit={async (index) => {
              await updateIndex({
                variables: {
                  domainId: domain._id,
                  conceptId: concept._id,
                  index: index,
                },
              });
              onUpdateConceptIndex && onUpdateConceptIndex(concept);
            }}
          />
        ))
      ) : (
        <Box>No concepts</Box>
      )}
    </Box>
  );
};

interface ConceptListItemProps {
  concept: ConceptDataFragment;
  relationship: { index: number };
  domain: DomainDataFragment;
  onIndexSubmit: (index: number) => void;
}
const ConceptListItem: React.FC<ConceptListItemProps> = ({ concept, relationship, domain, onIndexSubmit }) => {
  const [indexValue, setIndexValue] = useState(relationship.index);
  return (
    <Flex
      direction="row"
      key={concept._id}
      p={2}
      borderBottomWidth={1}
      alignItems="center"
      py={2}
      px={4}
      backgroundColor="backgroundColor.0"
    >
      <Box>
        <PageLink fontSize="l" fontWeight={500} pageInfo={ConceptPageInfo(domain, concept)}>
          {concept.name}
        </PageLink>
      </Box>
      <Box flexGrow={1}></Box>
      <RoleAccess accessRule="contributorOrAdmin">
        <Stack spacing={2} flexBasis="150px" flexShrink={0} direction="row">
          <Box>Idx</Box>
          <Box flexGrow={1}></Box>
          <Editable
            value={indexValue.toString()}
            onChange={(value) => {
              const idxNumber = Number(value);
              !isNaN(idxNumber) && setIndexValue(idxNumber);
            }}
            onSubmit={() => {
              onIndexSubmit(indexValue);
            }}
          >
            <EditablePreview />
            <EditableInput />
          </Editable>
        </Stack>
      </RoleAccess>
    </Flex>
  );
};
