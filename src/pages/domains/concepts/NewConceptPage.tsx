import { Box, Flex, Input, Text, Textarea, Button } from '@chakra-ui/core';
import Router, { useRouter } from 'next/router';
import { useState } from 'react';

import { useAddConceptToDomain } from '../../../graphql/concepts/concepts.hooks';
import { useGetDomainByKey } from '../../../graphql/domains/domains.hooks';

export const NewConceptPage: React.FC<{ domainKey: string }> = ({ domainKey }) => {
  const { domain } = useGetDomainByKey(domainKey);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  if (!domain) return <Box>Domain not found !</Box>;
  const { addConceptToDomain, loading, error } = useAddConceptToDomain();
  return (
    <Flex direction="column" alignItems="center">
      <Text fontSize="3xl">Add concept to {domain.name}</Text>
      <Box width="46rem">
        <Input
          placeholder="Concept Name"
          size="md"
          variant="flushed"
          value={name}
          onChange={(e: any) => setName(e.target.value)}
        ></Input>

        <Textarea
          placeholder="Description"
          size="md"
          variant="flushed"
          value={description}
          onChange={(e: any) => setDescription(e.target.value)}
        ></Textarea>

        <Button
          size="lg"
          variant="solid"
          onClick={() =>
            addConceptToDomain({ variables: { domainId: domain._id, payload: { name, description } } }).then(() => {
              Router.push(`/domains/${domain.key}/concepts`);
            })
          }
        >
          Add
        </Button>
      </Box>
    </Flex>
  );
};
