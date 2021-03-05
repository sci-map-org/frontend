import { Box, Stack } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { PageLayout } from '../../../components/layout/PageLayout';
import { StarsRatingViewer } from '../../../components/lib/StarsRating';
import { InternalLink } from '../../../components/navigation/InternalLink';
import { DurationViewer } from '../../../components/resources/elements/Duration';
import { ResourceTypeIcon } from '../../../components/resources/elements/ResourceType';
import { ResourceListBasicLayout } from '../../../components/resources/ResourceList';
import { DomainData, generateDomainData } from '../../../graphql/domains/domains.fragments';
import { ResourceData } from '../../../graphql/resources/resources.fragments';
import { DomainResourcesSortingType } from '../../../graphql/types';
import { DomainPageInfo } from '../../RoutesPageInfos';
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

const domainDataPlaceholder: GetResourcesDomainResourceListPageQuery['getDomainByKey'] = generateDomainData();

export const DomainResourceListPage: React.FC<{ domainKey: string }> = ({ domainKey }) => {
  const { data, loading } = useGetResourcesDomainResourceListPageQuery({
    variables: {
      domainKey,
      options: {
        sortingType: DomainResourcesSortingType.Newest,
        filter: { consumedByUser: false }, // TODO fix that: should show all the resources
      },
    },
  });
  const domain = data?.getDomainByKey || domainDataPlaceholder;

  return (
    <PageLayout title={`${domain.name} - Resources`} breadCrumbsLinks={[DomainPageInfo(domain)]} isLoading={loading}>
      <Box width="80%" py={5}>
        <ResourceListBasicLayout
          resources={domain.resources?.items || []}
          renderTop={(resource) => (
            <Stack direction="row" alignItems="center" spacing={2}>
              <ResourceTypeIcon resourceType={resource.type} boxSize={5} />
              <InternalLink routePath="/resources/[_id]" asHref={`/resources/${resource._id}`}>
                {resource.name}
              </InternalLink>
              <Stack direction="row" alignItems="center" spacing={1}>
                <StarsRatingViewer value={resource.rating} pxSize={14} />

                <DurationViewer value={resource.durationSeconds} />
              </Stack>
            </Stack>
          )}
        />
      </Box>
    </PageLayout>
  );
};
