import { Box, Button, Flex, Input, Text, Textarea } from '@chakra-ui/core';
import Router from 'next/router';
import { useState } from 'react';
import { useAddConceptToDomain } from '../../../graphql/concepts/concepts.hooks';
import { useGetDomainByKey } from '../../../graphql/domains/domains.hooks';
import { generateUrlKey } from '../../../services/url.service';

export const NewConceptPage: React.FC<{ domainKey: string }> = ({ domainKey }) => {
  const { domain } = useGetDomainByKey(domainKey);
  const [name, setName] = useState('');
  const [key, setKey] = useState('');
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
          onChange={(e: any) => {
            if (key === generateUrlKey(name)) setKey(generateUrlKey(e.target.value));
            setName(e.target.value);
          }}
        ></Input>
        <Input
          placeholder="Concept Url Key"
          size="md"
          variant="flushed"
          value={key}
          onChange={(e: any) => setKey(e.target.value)}
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
