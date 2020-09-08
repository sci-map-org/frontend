import { Box, Button, Input, Stack, Textarea } from '@chakra-ui/core';
import { NextPage } from 'next';
import Router from 'next/router';
import React from 'react';
import { PageLayout } from '../../components/layout/PageLayout';
import { useCreateDomain } from '../../graphql/domains/domains.hooks';
import { generateUrlKey } from '../../services/url.service';

export const NewDomainPage: NextPage = () => {
  const [name, setName] = React.useState('');
  const [key, setKey] = React.useState('');

  const [description, setDescription] = React.useState<string>();
  const { createDomain } = useCreateDomain();
  return (
    <PageLayout title="New Domain" mode="form" accessRule="contributorOrAdmin" centerChildren>
      <Box width="46rem">
        <Stack spacing={4}>
          <Input
            placeholder="Name"
            size="md"
            variant="flushed"
            value={name}
            onChange={(e) => {
              if (key === generateUrlKey(name)) setKey(generateUrlKey(e.target.value));
              setName(e.target.value);
            }}
          ></Input>
          <Input
            placeholder="Key"
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
        </Stack>
        <Box py={8} width="100%"></Box>
        <Box>
          <Button
            size="lg"
            variant="solid"
            onClick={async () => {
              createDomain({
                variables: { payload: { name, key, description } },
              }).then(({ data }) => {
                data && Router.push(`/domains/${data.createDomain.key}`);
              });
            }}
          >
            Create
          </Button>
        </Box>
      </Box>
    </PageLayout>
  );
};
