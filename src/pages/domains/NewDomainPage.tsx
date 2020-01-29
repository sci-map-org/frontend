import { Box, Button, Input, Stack, Text, Textarea } from '@chakra-ui/core';
import { NextPage } from 'next';
import Router from 'next/router';
import React from 'react';

import { useCreateDomain } from '../../graphql/domains/domains.hooks';

export const NewDomainPage: NextPage = () => {
  const [name, setName] = React.useState('');
  const [key, setKey] = React.useState('');

  const [description, setDescription] = React.useState<string>();
  const { createDomain } = useCreateDomain();
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" width="100%" pt="2rem">
      <Box width="46rem">
        <Text fontSize="4xl" textAlign="center">
          New Domain
        </Text>
        <Stack spacing={4}>
          <Input
            placeholder="Name"
            size="md"
            variant="flushed"
            value={name}
            onChange={(e: any) => setName(e.target.value)}
          ></Input>
          <Input
            placeholder="Key"
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
    </Box>
  );
};
