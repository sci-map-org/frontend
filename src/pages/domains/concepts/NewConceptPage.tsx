import { Box, Button, Flex, Input, Text, Textarea, Stack } from '@chakra-ui/core';
import Router from 'next/router';
import { useState } from 'react';
import { useAddConceptToDomain } from '../../../graphql/concepts/concepts.hooks';
import { useGetDomainByKey } from '../../../graphql/domains/domains.hooks';
import { generateUrlKey } from '../../../services/url.service';
import { PageLayout } from '../../../components/layout/PageLayout';
import { DomainPageInfo } from '../DomainPage';
import { ConceptListPageInfo } from './ConceptListPage';

export const NewConceptPage: React.FC<{ domainKey: string }> = ({ domainKey }) => {
  const { domain } = useGetDomainByKey(domainKey);
  const [name, setName] = useState('');
  const [key, setKey] = useState('');
  const [description, setDescription] = useState('');
  if (!domain) return <Box>Domain not found !</Box>;
  const { addConceptToDomain, loading, error } = useAddConceptToDomain();
  return (
    <PageLayout
      mode="form"
      title={`Add concept to ${domain.name}`}
      breadCrumbsLinks={[DomainPageInfo(domain), ConceptListPageInfo(domain)]}
    >
      <Stack spacing={4} direction="column" alignItems="center">
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
      </Stack>
    </PageLayout>
  );
};
