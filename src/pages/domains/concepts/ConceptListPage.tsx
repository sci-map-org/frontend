import { Box, Flex, Stack } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { RoleAccess } from '../../../components/auth/RoleAccess';
import { ConceptList } from '../../../components/concepts/ConceptList';
import { VerticalConceptMappingVisualisation } from '../../../components/concepts/ConceptMappingVisualisation';
import { PageLayout } from '../../../components/layout/PageLayout';
import { InternalButtonLink } from '../../../components/navigation/InternalLink';
import { ConceptWithDependenciesData } from '../../../graphql/concepts/concepts.fragments';
import { DomainConceptSortingEntities, DomainConceptSortingFields, SortingDirection } from '../../../graphql/types';
import { ConceptListPageInfo, DomainPageInfo } from '../../RoutesPageInfos';
import { useListConceptsConceptListPageQuery } from './ConceptListPage.generated';

export const listConceptsConceptListPage = gql`
  query listConceptsConceptListPage($domainKey: String!, $options: DomainConceptsOptions!) {
    getDomainByKey(key: $domainKey) {
      _id
      key
      name
      concepts(options: $options) {
        items {
          concept {
            ...ConceptWithDependenciesData
          }
          relationship {
            index
          }
        }
      }
    }
  }
  ${ConceptWithDependenciesData}
`;

export const ConceptListPage: React.FC<{ domainKey: string }> = ({ domainKey }) => {
  const { data, loading, refetch } = useListConceptsConceptListPageQuery({
    variables: {
      domainKey,
      options: {
        sorting: {
          field: DomainConceptSortingFields.Index,
          entity: DomainConceptSortingEntities.Relationship,
          direction: SortingDirection.Asc,
        },
      },
    },
  });

  if (!data) return <Box>Domain not found !</Box>;
  const domain = data.getDomainByKey;
  return (
    <PageLayout
      breadCrumbsLinks={[DomainPageInfo(domain), ConceptListPageInfo(domain)]}
      title={domain.name + ' - Concepts'}
      centerChildren
    >
      <Flex direction="row" mt={4}>
        <Stack spacing={4} width="36rem">
          <Box>
            <ConceptList
              domain={domain}
              domainConceptItems={domain.concepts?.items || []}
              onUpdateConceptIndex={() => refetch()}
            />
          </Box>
          <RoleAccess accessRule="contributorOrAdmin">
            <InternalButtonLink
              variant="outline"
              routePath="/areas/[key]/concepts/new"
              asHref={`/areas/${domain.key}/concepts/new`}
            >
              + Add concept
            </InternalButtonLink>
          </RoleAccess>
        </Stack>
        <Box width="20px"></Box>
        <VerticalConceptMappingVisualisation
          domainKey={domainKey}
          isLoading={loading}
          concepts={domain.concepts?.items.map((i) => i.concept) || []}
          width="36rem"
        />
      </Flex>
    </PageLayout>
  );
};

export default ConceptListPage;
