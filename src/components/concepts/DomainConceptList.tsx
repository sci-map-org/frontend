import { Checkbox, Flex, Link, Stack, Text } from '@chakra-ui/core';

import { DomainDataFragment } from '../../graphql/domains/domains.fragments.generated';

export const DomainConceptList: React.FC<{ domain: DomainDataFragment }> = ({ domain }) => {
  const concepts = [
    {
      _id: 'frget',
      name: 'Pure Functions',
    },
    {
      _id: 'frgrget',
      name: 'Side effects',
    },
    {
      _id: 'frggeopet',
      name: 'Currying',
    },
    {
      _id: 'frgeerfdvdt',
      name: 'Composition',
    },
    {
      _id: 'frgrneovfiet',
      name: 'Higher Order Functions',
    },
    {
      _id: 'gthrgf',
      name: 'Immutability',
    },
    {
      _id: 'fwretert',
      name: 'Functors',
    },
  ];
  return (
    <Flex borderWidth={0} borderColor="gray.200" mr={8} direction="column">
      <Text fontSize="2xl">Concepts</Text>
      <Link color="gray.600">...show hidden</Link>
      <Stack direction="column" spacing={1}>
        {concepts.map(concept => (
          <Flex key={concept._id} direction="row" alignItems="center">
            <Checkbox mr={4} />
            <Link>{concept.name}</Link>
          </Flex>
        ))}
      </Stack>
    </Flex>
  );
};
