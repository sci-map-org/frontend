import { Button, Input, Stack, Text, Textarea } from '@chakra-ui/core';
import Router from 'next/router';
import { useState } from 'react';

import { useGetConcept, useUpdateConcept } from '../../../graphql/concepts/concepts.hooks';
import { useGetDomainByKey } from '../../../graphql/domains/domains.hooks';
import { PageLayout } from '../../../components/layout/PageLayout';

export const EditConceptPage: React.FC<{ domainKey: string; conceptId: string }> = ({ conceptId, domainKey }) => {
  const { concept } = useGetConcept(conceptId);

  const { domain } = useGetDomainByKey(domainKey);
  if (!concept || !domain) return null;

  const { updateConcept } = useUpdateConcept();
  const [name, setName] = useState(concept.name);
  const [description, setDescription] = useState(concept.description || '');
  return (
    <PageLayout>
      <Text fontSize="3xl">
        Edit {domain.name} - {concept.name}
      </Text>
      <Stack>
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
    </PageLayout>
  );
};
