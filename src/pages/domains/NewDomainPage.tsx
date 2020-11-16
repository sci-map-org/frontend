import { Button, ButtonGroup, Flex, Input, Stack, Textarea } from '@chakra-ui/react';
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
      <Stack spacing={4} w="100%">
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
          </ButtonGroup>
        </Flex>
      </Stack>
    </PageLayout>
  );
};
