import { Checkbox, Flex, IconButton, Link, Stack } from '@chakra-ui/core';
import NextLink from 'next/link';
import Router from 'next/router';

import { ConceptDataFragment } from '../../graphql/concepts/concepts.fragments.generated';
import { DomainDataFragment } from '../../graphql/domains/domains.fragments.generated';
import { UserRole } from '../../graphql/types';
import { useCurrentUser } from '../../graphql/users/users.hooks';

export const DomainConceptList: React.FC<{ domain: DomainDataFragment; concepts: ConceptDataFragment[] }> = ({
  domain,
  concepts,
}) => {
  const { currentUser } = useCurrentUser();
  return (
    <Flex borderWidth={0} borderColor="gray.200" mr={8} direction="column">
      <Stack direction="row" spacing={2}>
        <NextLink href={`/domains/${domain.key}/concepts`}>
          <Link fontSize="2xl">Concepts</Link>
        </NextLink>
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
        {concepts.map(concept => (
          <Flex key={concept._id} direction="row" alignItems="center">
            <Checkbox mr={4} />
            <NextLink href={`/domains/${domain.key}/concepts/${concept.key}`}>
              <Link>{concept.name}</Link>
            </NextLink>
          </Flex>
        ))}
      </Stack>
    </Flex>
  );
};
