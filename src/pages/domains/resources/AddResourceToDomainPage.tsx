import { Box } from '@chakra-ui/core';
import gql from 'graphql-tag';

import { PageLayout } from '../../../components/layout/PageLayout';
import { NewResource } from '../../../components/resources/NewResource';
import { DomainWithConceptsData } from '../../../graphql/domains/domains.fragments';
import { useGetDomainByKeyWithConceptsQuery } from './AddResourceToDomainPage.generated';

export const getDomainByKeyWithConcepts = gql`
  query getDomainByKeyWithConcepts($key: String!) {
    getDomainByKey(key: $key) {
      ...DomainWithConceptsData
    }
  }
  ${DomainWithConceptsData}
`;

export const AddResourceToDomainPage: React.FC<{ domainKey: string }> = ({ domainKey }) => {
  const { data } = useGetDomainByKeyWithConceptsQuery({ variables: { key: domainKey } });
  if (!data) return <Box>Domain not found</Box>;

  return (
    <PageLayout>
      <NewResource domain={data.getDomainByKey} />
    </PageLayout>
  );
};
