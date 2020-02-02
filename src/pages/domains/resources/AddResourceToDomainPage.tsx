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
  if (!data) return <Box>Domain not found</Box>;

  const [addResourceToDomain] = useAddResourceToDomainMutation({
    onCompleted: data => {
      Router.push(`/resources/${data.addResourceToDomain._id}`);
    },
  });
  return (
    <PageLayout>
      <NewResource
        domain={data.getDomainByKey}
        onCreate={payload =>
          addResourceToDomain({
            variables: {
              domainId: data.getDomainByKey._id,
              payload,
            },
          })
        }
      />
    </PageLayout>
  );
};
