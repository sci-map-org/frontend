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
import { useAttachResourceCoversConceptsMutation } from '../../../graphql/resources/resources.operations.generated';
import { ResourceDataFragment } from '../../../graphql/resources/resources.fragments.generated';
import { CreateResourcePayload } from '../../../graphql/types';

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

const useAddResourceToDomainAndAddCoveredConcepts = (options: {
  onCompleted: (resource: ResourceDataFragment) => {};
}) => {
  const [attachResourceCoveredConcepts] = useAttachResourceCoversConceptsMutation();
  const [createResource] = useAddResourceToDomainMutation();

  const addResourceToDomainAndAddCoveredConcepts = async (
    domainId: string,
    resourcePayload: CreateResourcePayload,
    coveredConceptsIds: string[]
  ) => {
    const { data } = await createResource({ variables: { domainId, payload: resourcePayload } });
    if (!data) throw new Error('Resource Creation failed');

    let res = undefined;
    if (coveredConceptsIds.length) {
      res = await attachResourceCoveredConcepts({
        variables: { resourceId: data.addResourceToDomain._id, conceptIds: coveredConceptsIds },
      });

      if (!res.data) throw new Error('Attaching concepts failed');
    }
    options.onCompleted &&
      options.onCompleted({ ...data.addResourceToDomain, ...(res?.data?.attachResourceCoversConcepts || {}) });
  };
  return [addResourceToDomainAndAddCoveredConcepts];
};

export const AddResourceToDomainPage: React.FC<{ domainKey: string }> = ({ domainKey }) => {
  const { data } = useGetDomainByKeyWithConceptsQuery({ variables: { key: domainKey } });
  const [addResourceToDomainAndAddCoveredConcepts] = useAddResourceToDomainAndAddCoveredConcepts({
    onCompleted: (resource) => Router.push(`/resources/${resource._id}`),
  });

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
        onCreate={(payload, conceptIds) =>
          addResourceToDomainAndAddCoveredConcepts(data.getDomainByKey._id, payload, conceptIds)
        }
      />
    </PageLayout>
  );
};
