import { Button, ButtonGroup, Flex, Input, Stack, Textarea } from '@chakra-ui/core';
import gql from 'graphql-tag';
import Router from 'next/router';
import { useState } from 'react';
import { PageLayout } from '../../components/layout/PageLayout';
import { DomainData, generateDomainData } from '../../graphql/domains/domains.fragments';
import { DomainDataFragment } from '../../graphql/domains/domains.fragments.generated';
import { useUpdateDomainMutation } from '../../graphql/domains/domains.operations.generated';
import { PageInfo } from '../PageInfo';
import { DomainPageInfo } from './DomainPage';
import { GetDomainByKeyEditDomainPageQuery, useGetDomainByKeyEditDomainPageQuery } from './EditDomainPage.generated';
import { ManageDomainPageInfo } from './ManageDomainPage';

export const EditDomainPagePath = (domainKey: string) => `/domains/${domainKey}/edit`;

export const EditDomainPageInfo = (domain: DomainDataFragment): PageInfo => ({
  name: 'Edit',
  path: EditDomainPagePath(domain.key),
  routePath: EditDomainPagePath('[key]'),
});

export const getDomainByKeyEditDomainPage = gql`
  query getDomainByKeyEditDomainPage($key: String!) {
    getDomainByKey(key: $key) {
      ...DomainData
    }
  }
  ${DomainData}
`;

const placeholderDomainData: GetDomainByKeyEditDomainPageQuery['getDomainByKey'] = generateDomainData();

export const EditDomainPage: React.FC<{ domainKey: string }> = ({ domainKey }) => {
  const { data, loading } = useGetDomainByKeyEditDomainPageQuery({ variables: { key: domainKey } });
  const [updateDomainMutation] = useUpdateDomainMutation();
  const domain = data?.getDomainByKey || placeholderDomainData;
  const [name, setName] = useState(domain.name);
  const [key, setKey] = useState(domain.key);
  const [description, setDescription] = useState(domain.description || '');

  return (
    <PageLayout
      title={`Edit ${domain.name}`}
      mode="form"
      isLoading={loading}
      breadCrumbsLinks={[DomainPageInfo(domain), ManageDomainPageInfo(domain), EditDomainPageInfo(domain)]}
      accessRule="contributorOrAdmin"
    >
      <Stack direction="column" spacing={6} alignItems="stretch">
        <Input
          placeholder="Domain Name"
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
                updateDomainMutation({ variables: { id: domain._id, payload: { name, description } } }).then(() =>
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
