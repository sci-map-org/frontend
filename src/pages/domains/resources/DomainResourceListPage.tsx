import { Box } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { PageLayout } from '../../../components/layout/PageLayout';
import { ResourceList } from '../../../components/resources/ResourceList';
import { DomainData, generateDomainData } from '../../../graphql/domains/domains.fragments';
import { DomainDataFragment } from '../../../graphql/domains/domains.fragments.generated';
import { ResourceData } from '../../../graphql/resources/resources.fragments';
import { DomainResourcesSortingType } from '../../../graphql/types';
import { PageInfo } from '../../PageInfo';
import { DomainPageInfo } from '../DomainPage';
import {
  GetResourcesDomainResourceListPageQuery,
  useGetResourcesDomainResourceListPageQuery,
} from './DomainResourceListPage.generated';

export const getResourcesDomainResourceListPage = gql`
  query getResourcesDomainResourceListPage($domainKey: String!, $options: DomainResourcesOptions!) {
    getDomainByKey(key: $domainKey) {
      ...DomainData
      resources(options: $options) {
        items {
          ...ResourceData
        }
      }
    }
  }
  ${DomainData}
  ${ResourceData}
`;

export const DomainResourceListPagePath = (domainKey: string) => `/domains/${domainKey}/resources`;

export const DomainResourceListPageInfo = (domain: DomainDataFragment): PageInfo => ({
  name: 'Resources',
  path: DomainResourceListPagePath(domain.key),
  routePath: DomainResourceListPagePath('[key]'),
});

const domainDataPlaceholder: GetResourcesDomainResourceListPageQuery['getDomainByKey'] = generateDomainData();

export const DomainResourceListPage: React.FC<{ domainKey: string }> = ({ domainKey }) => {
  const { data, loading } = useGetResourcesDomainResourceListPageQuery({
    variables: {
      domainKey,
      options: {
        sortingType: DomainResourcesSortingType.Newest,
      },
    },
  });
  const domain = data?.getDomainByKey || domainDataPlaceholder;

  return (
    <PageLayout title={`${domain.name} - Resources`} breadCrumbsLinks={[DomainPageInfo(domain)]} isLoading={loading}>
      <Box width="80%" py={5}>
        <ResourceList resources={domain.resources?.items || []} />
      </Box>
    </PageLayout>
  );
};
