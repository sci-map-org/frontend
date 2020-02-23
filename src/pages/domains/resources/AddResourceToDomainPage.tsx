import { Box } from '@chakra-ui/core';
import gql from 'graphql-tag';
import Router from 'next/router';

import { PageLayout } from '../../../components/layout/PageLayout';
import { NewResource } from '../../../components/resources/NewResource';
import { DomainWithConceptsData } from '../../../graphql/domains/domains.fragments';
import { ResourceData } from '../../../graphql/resources/resources.fragments';
import {
  useAddResourceToDomainMutation,
  useGetDomainByKeyWithConceptsQuery,
} from './AddResourceToDomainPage.generated';
import { DomainPageInfo } from '../DomainPage';
import { DomainResourceListPageInfo } from './DomainResourceListPage';

export const getDomainByKeyWithConcepts = gql`
  query getDomainByKeyWithConcepts($key: String!) {
    getDomainByKey(key: $key) {
      ...DomainWithConceptsData
    }
  }
  ${DomainWithConceptsData}
`;

export const addResourceToDomain = gql`
  mutation addResourceToDomain($domainId: String!, $payload: CreateResourcePayload!) {
    addResourceToDomain(domainId: $domainId, payload: $payload) {
      ...ResourceData
    }
  }
  ${ResourceData}
`;

export const AddResourceToDomainPage: React.FC<{ domainKey: string }> = ({ domainKey }) => {
  const { data } = useGetDomainByKeyWithConceptsQuery({ variables: { key: domainKey } });

  const [addResourceToDomain] = useAddResourceToDomainMutation();
  if (!data) return <Box>Domain not found</Box>;
  const domain = data.getDomainByKey;
  return (
    <PageLayout
      mode="form"
      breadCrumbsLinks={[DomainPageInfo(domain), DomainResourceListPageInfo(domain)]}
      title={`Add resource  to ${domain.name}`}
    >
      <NewResource
        domain={data.getDomainByKey}
        onCreate={async payload => {
          const { data: result } = await addResourceToDomain({
            variables: {
              domainId: data.getDomainByKey._id,
              payload,
            },
          });
          if (result) {
            Router.push(`/resources/${result.addResourceToDomain._id}`);
          }
        }}
      />
    </PageLayout>
  );
};
