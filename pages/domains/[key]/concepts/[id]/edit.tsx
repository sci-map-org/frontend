import { Box, Text, Input, Textarea, Button, Stack } from '@chakra-ui/core';
import Router, { useRouter } from 'next/router';
import { useGetConcept, useUpdateConcept } from '../../../../../src/graphql/concepts/concepts.hooks';
import { useState } from 'react';
import { useGetDomainByKey } from '../../../../../src/graphql/domains/domains.hooks';

const EditConceptPage: React.FC = () => {
  const router = useRouter();

  const { id, key } = router.query;

  if (!id || typeof id !== 'string') return null;
  if (!key || typeof key !== 'string') return null;
  const { concept } = useGetConcept(id);

  const { domain } = useGetDomainByKey(key);
  if (!concept || !domain) return null;

  const { updateConcept } = useUpdateConcept();
  const [name, setName] = useState(concept.name);
  const [description, setDescription] = useState(concept.description || '');
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" width="100%" pt="1rem">
      <Text fontSize="3xl">
        Edit {domain.name} - {concept.name}
      </Text>
      <Stack width="80%">
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
            updateConcept({ variables: { _id: concept._id, payload: { name, description } } }).then(() => Router.back())
          }
        >
          Update
        </Button>
      </Stack>
    </Box>
  );
};

export default EditConceptPage;
