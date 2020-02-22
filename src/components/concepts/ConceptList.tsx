import { Box, Link, Text, Editable, EditablePreview, EditableInput, Flex } from '@chakra-ui/core';
import NextLink from 'next/link';

import { useCurrentUser } from '../../graphql/users/users.hooks';
import {
  UserRole,
  DomainConceptSortingEntities,
  SortingDirection,
  DomainConceptSortingFields,
} from '../../graphql/types';
import gql from 'graphql-tag';
import {
  useUpdateConceptBelongsToDomainIndexMutation,
  useListDomainConceptsQuery,
  ListDomainConceptsQuery,
} from './ConceptList.generated';
import { ConceptData } from '../../graphql/concepts/concepts.fragments';
import { useState } from 'react';
import { ConceptDataFragment } from '../../graphql/concepts/concepts.fragments.generated';

interface ConceptListProps {
  domainKey: string;
}

export const updateConceptBelongsToDomainIndex = gql`
  mutation updateConceptBelongsToDomainIndex($conceptId: String!, $domainId: String!, $index: Float!) {
    updateConceptBelongsToDomain(conceptId: $conceptId, domainId: $domainId, payload: { index: $index }) {
      index
    }
  }
`;

export const listDomainConcepts = gql`
  query listDomainConcepts($domainKey: String!, $options: DomainConceptsOptions!) {
    getDomainByKey(key: $domainKey) {
      _id
      name
      concepts(options: $options) {
        items {
          concept {
            ...ConceptData
          }
          relationship {
            index
          }
        }
      }
    }
  }
  ${ConceptData}
`;

export const ConceptList: React.FC<ConceptListProps> = ({ domainKey }) => {
  const { data, refetch } = useListDomainConceptsQuery({
    variables: {
      domainKey,
      options: {
        sorting: {
          field: DomainConceptSortingFields.Index,
          entity: DomainConceptSortingEntities.Relationship,
          direction: SortingDirection.Asc,
        },
      },
    },
  });

  const [updateIndex] = useUpdateConceptBelongsToDomainIndexMutation();

  const items = data?.getDomainByKey.concepts?.items;
  return (
    <Box borderWidth={1} borderColor="gray.200" borderBottomWidth={0} p={0} width="100%">
      {data && items && items.length ? (
        items.map(({ concept, relationship }) => (
          <ConceptListItem
            key={concept._id}
            concept={concept}
            relationship={relationship}
            domainKey={domainKey}
            onIndexSubmit={async index => {
              await updateIndex({
                variables: {
                  domainId: data.getDomainByKey._id,
                  conceptId: concept._id,
                  index: index,
                },
              });
              refetch();
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
  domainKey: string;
  onIndexSubmit: (index: number) => void;
}
const ConceptListItem: React.FC<ConceptListItemProps> = ({ concept, relationship, domainKey, onIndexSubmit }) => {
  const [indexValue, setIndexValue] = useState(relationship.index);
  const { currentUser } = useCurrentUser();
  return (
    <Flex direction="row" key={concept._id} p={2} borderBottomWidth={1}>
      <Box flexGrow={1}>
        <NextLink href={`/domains/${domainKey}/concepts/${concept.key}`}>
          <Link fontSize="l" fontWeight={500}>
            {concept.name}
          </Link>
        </NextLink>
        {concept.description && <Text>{concept.description}</Text>}
      </Box>
      {!!currentUser && currentUser.role === UserRole.Admin && (
        <Box flexBasis="100px">
          Idx
          <Editable
            value={indexValue.toString()}
            onChange={(value: any) => {
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
        </Box>
      )}
    </Flex>
  );
};
