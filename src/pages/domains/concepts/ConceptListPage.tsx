import { Box, Flex, Stack } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { RoleAccess } from '../../../components/auth/RoleAccess';
import { ConceptList } from '../../../components/concepts/ConceptList';
import { VerticalConceptMappingVisualisation } from '../../../components/concepts/ConceptMappingVisualisation';
import { PageLayout } from '../../../components/layout/PageLayout';
import { PageButtonLink } from '../../../components/navigation/InternalLink';
import { ConceptWithDependenciesData } from '../../../graphql/concepts/concepts.fragments';
import { DomainConceptSortingEntities, DomainConceptSortingFields, SortingDirection } from '../../../graphql/types';
import { ConceptListPageInfo, DomainPageInfo, NewConceptPageInfo } from '../../RoutesPageInfos';
import { useListConceptsConceptListPageQuery } from './ConceptListPage.generated';
import SortableTree, { TreeItem } from 'react-sortable-tree';
import { useState } from 'react';

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

  const [treeData, setTreeData] = useState<TreeItem[]>([
    { title: 'Chicken', children: [{ title: 'Egg' }] },
    { title: 'Fish', children: [{ title: 'fingerline' }] },
  ]);

  if (!data) return <Box>Area not found !</Box>;
  const domain = data.getDomainByKey;
  return (
    <PageLayout
      breadCrumbsLinks={[DomainPageInfo(domain), ConceptListPageInfo(domain)]}
      title={domain.name + ' - SubTopics'}
      centerChildren
      isLoading={loading}
    >
      <Flex direction="column" mt={4}>
        <Stack spacing={4} width="36rem">
          <Box h="400px">
            <SortableTree treeData={treeData} onChange={(treeData) => setTreeData(treeData)} />
            {/* <ConceptList
              domain={domain}
              domainConceptItems={domain.concepts?.items || []}
              onUpdateConceptIndex={() => refetch()}
            /> */}
          </Box>
          <RoleAccess accessRule="contributorOrAdmin">
            <PageButtonLink variant="outline" pageInfo={NewConceptPageInfo(domain)}>
              + Add concept
            </PageButtonLink>
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
