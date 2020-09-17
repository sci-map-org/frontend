import { Button, ButtonGroup, Flex, Input, Stack, Textarea } from '@chakra-ui/core';
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
      <Stack direction="column" spacing={4} alignItems="stretch" w="100%">
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
        <Flex direction="row" justifyContent="flex-end">
          <ButtonGroup spacing={8}>
            <Button w="16rem" size="lg" variant="outline" onClick={() => Router.back()}>
              Cancel
            </Button>
            <Button
              w="16rem"
              size="lg"
              colorScheme="brand"
              variant="solid"
              onClick={() =>
                updateConcept({ variables: { _id: concept._id, payload: { name, description } } }).then(() =>
                  Router.back()
                )
              }
            >
              Update
            </Button>
          </ButtonGroup>
        </Flex>
      </Stack>
    </PageLayout>
  );
};
