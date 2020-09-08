import { Button, Input, Stack, Textarea } from '@chakra-ui/core';
import Router from 'next/router';
import { useState } from 'react';
import { PageLayout } from '../../../components/layout/PageLayout';
import { useUpdateConcept } from '../../../graphql/concepts/concepts.hooks';
import { useGetConceptByKeyQuery } from '../../../graphql/concepts/concepts.operations.generated';
import { useGetDomainByKey } from '../../../graphql/domains/domains.hooks';
import { NotFoundPage } from '../../NotFoundPage';

export const EditConceptPage: React.FC<{ domainKey: string; conceptKey: string }> = ({ conceptKey, domainKey }) => {
  const { data } = useGetConceptByKeyQuery({ variables: { key: conceptKey } });
  const concept = data?.getConceptByKey;
  const { domain } = useGetDomainByKey(domainKey);
  if (!concept || !domain) return <NotFoundPage />;

  const { updateConcept } = useUpdateConcept();
  const [name, setName] = useState(concept.name);
  const [key, setKey] = useState(concept.key);
  const [description, setDescription] = useState(concept.description || '');
  return (
    <PageLayout
      mode="form"
      title={`Edit ${domain.name} - ${concept.name}`}
      accessRule="contributorOrAdmin"
      centerChildren
    >
      <Stack width="36rem" direction="column" spacing={3} alignItems="stretch">
        <Input
          placeholder="Concept Name"
          size="md"
          variant="flushed"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></Input>
        <Input
          placeholder="Concept Key"
          size="md"
          variant="flushed"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        ></Input>
        <Textarea
          placeholder="Description"
          size="md"
          variant="flushed"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
