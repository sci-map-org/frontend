import { Box, Flex, Stack } from '@chakra-ui/react';
import gql from 'graphql-tag';
import dynamic from 'next/dynamic';
import { RoleAccess } from '../../../components/auth/RoleAccess';
import { VerticalConceptMappingVisualisation } from '../../../components/concepts/ConceptMappingVisualisation';
import { PageLayout } from '../../../components/layout/PageLayout';
import { PageButtonLink } from '../../../components/navigation/InternalLink';
import { ManageSubTopicsTreeProps } from '../../../components/topics/ManageSubTopicsTree';
import { ConceptWithDependenciesData } from '../../../graphql/concepts/concepts.fragments';
import { DomainConceptSortingEntities, DomainConceptSortingFields, SortingDirection } from '../../../graphql/types';
import { ConceptListPageInfo, DomainPageInfo, NewConceptPageInfo } from '../../RoutesPageInfos';
import { useListConceptsConceptListPageQuery } from './ConceptListPage.generated';

const ManageSubTopicsTree = dynamic<ManageSubTopicsTreeProps>(
  () =>
    import('../../../components/topics/ManageSubTopicsTree').then((res) => {
      const { ManageSubTopicsTree } = res;
      return ManageSubTopicsTree;
    }),
  { ssr: false }
);

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
      subTopics(options: { sorting: { type: index, direction: ASC } }) {
        index
        subTopic {
          _id
          name
          description
          subTopics(options: { sorting: { type: index, direction: ASC } }) {
            index
            subTopic {
              _id
              name
              description
            }
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
  console.log(data?.getDomainByKey.subTopics);

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
          {data.getDomainByKey.subTopics && <ManageSubTopicsTree subTopics={data.getDomainByKey.subTopics} />}
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
