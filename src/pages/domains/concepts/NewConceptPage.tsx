import { Box, Button, ButtonGroup, Flex, Input, Stack, Textarea } from '@chakra-ui/core';
import Router from 'next/router';
import { useState } from 'react';
import { PageLayout } from '../../../components/layout/PageLayout';
import { useAddConceptToDomain } from '../../../graphql/concepts/concepts.hooks';
import { useGetDomainByKey } from '../../../graphql/domains/domains.hooks';
import { generateUrlKey } from '../../../services/url.service';
import { DomainPageInfo } from '../DomainPage';
import { ConceptListPageInfo } from './ConceptListPage';

export const NewConceptPage: React.FC<{ domainKey: string }> = ({ domainKey }) => {
  const { domain } = useGetDomainByKey(domainKey);
  const [name, setName] = useState('');
  const [key, setKey] = useState('');
  const [description, setDescription] = useState('');
  const { addConceptToDomain } = useAddConceptToDomain();

  if (!domain) return <Box>Domain not found !</Box>;
  return (
    <PageLayout
      mode="form"
      title={`Add concept to ${domain.name}`}
      breadCrumbsLinks={[DomainPageInfo(domain), ConceptListPageInfo(domain)]}
      accessRule="contributorOrAdmin"
    >
      <Stack spacing={4} direction="column" alignItems="stretch">
        <Input
          placeholder="Concept Name"
          size="md"
          variant="flushed"
          value={name}
          onChange={(e) => {
            if (key === generateUrlKey(name)) setKey(generateUrlKey(e.target.value));
            setName(e.target.value);
          }}
        ></Input>
        <Input
          placeholder="Concept Url Key"
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
        <Flex justifyContent="flex-end">
          <ButtonGroup spacing={8}>
            <Button size="lg" w="18rem" variant="outline" onClick={() => Router.back()}>
              Cancel
            </Button>
            <Button
              size="lg"
              w="18rem"
              variant="solid"
              colorScheme="brand"
              onClick={() =>
                addConceptToDomain({ variables: { domainId: domain._id, payload: { name, description } } }).then(() => {
                  Router.push(`/domains/${domain.key}/concepts`);
                })
              }
            >
              Add
            </Button>
          </ButtonGroup>
        </Flex>
      </Stack>
    </PageLayout>
  );
};
