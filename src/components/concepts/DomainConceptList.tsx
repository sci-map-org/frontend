import { Box, Checkbox, Flex, IconButton, Link, Stack } from '@chakra-ui/core';
import gql from 'graphql-tag';
import NextLink from 'next/link';
import Router from 'next/router';

import { ConceptData } from '../../graphql/concepts/concepts.fragments';
import { ConceptDataFragment } from '../../graphql/concepts/concepts.fragments.generated';
import { DomainDataFragment, DomainWithConceptsDataFragment } from '../../graphql/domains/domains.fragments.generated';
import { UserRole } from '../../graphql/types';
import { useCurrentUser } from '../../graphql/users/users.hooks';
import { useSetConceptsKnownMutation, useSetConceptsUnknownMutation } from './DomainConceptList.generated';
import { useUnauthentificatedModal } from '../auth/UnauthentificatedModal';

export const setConceptsKnown = gql`
  mutation setConceptsKnown($payload: SetConceptKnownPayload!) {
    setConceptsKnown(payload: $payload) {
      ...ConceptData
    }
  }
  ${ConceptData}
`;

export const setConceptsUnknown = gql`
  mutation setConceptsUnknown($conceptIds: [String!]!) {
    setConceptsUnknown(conceptIds: $conceptIds) {
      ...ConceptData
    }
  }
  ${ConceptData}
`;

export const DomainConceptList: React.FC<{ domain: DomainWithConceptsDataFragment }> = ({ domain }) => {
  const { currentUser } = useCurrentUser();
  const [setConceptKnown] = useSetConceptsKnownMutation();
  const [setConceptUnknown] = useSetConceptsUnknownMutation();

  const domainConceptItems = domain.concepts?.items;
  const unauthentificatedModalDisclosure = useUnauthentificatedModal();
  const toggleConceptKnown = async (concept: ConceptDataFragment) => {
    if (!currentUser) return unauthentificatedModalDisclosure.onOpen();
    if (!concept.known) {
      await setConceptKnown({
        variables: {
          payload: {
            concepts: [
              {
                conceptId: concept._id,
              },
            ],
          },
        },
      });
    } else {
      await setConceptUnknown({ variables: { conceptIds: [concept._id] } });
    }
  };
  if (!domainConceptItems) return null;
  return (
    <Flex borderWidth={0} borderColor="gray.200" mr={8} direction="column">
      <Stack direction="row" spacing={2}>
        <Box>
          <NextLink href={`/domains/${domain.key}/concepts`}>
            <Link fontSize="2xl">Concepts</Link>
          </NextLink>
        </Box>
        {!!currentUser && currentUser.role === UserRole.Admin && (
          <IconButton
            aria-label="add-concept"
            variant="ghost"
            icon="add"
            size="sm"
            alignSelf="center"
            borderRadius={16}
            onClick={() => Router.push(`/domains/${domain.key}/concepts/new`)}
          ></IconButton>
        )}
      </Stack>
      <Stack direction="column" spacing={1} alignItems="flex-start">
        {domainConceptItems.map(({ concept }) => (
          <Flex key={concept._id} direction="row" alignItems="center">
            <Checkbox mr={4} onChange={() => toggleConceptKnown(concept)} isChecked={!!concept.known} />
            <NextLink href={`/domains/${domain.key}/concepts/${concept.key}`}>
              <Link>{concept.name}</Link>
            </NextLink>
          </Flex>
        ))}
      </Stack>
    </Flex>
  );
};
