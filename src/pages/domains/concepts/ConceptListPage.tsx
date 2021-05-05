import { Box, Button, Flex, IconButton, Stack } from '@chakra-ui/react';
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
import SortableTree, { getVisibleNodeCount, TreeItem } from 'react-sortable-tree';
import { useMemo, useState } from 'react';
import { EditIcon } from '@chakra-ui/icons';

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

type SubTopicItem = {
  index: number;
  subTopic: {
    _id: string;
    name: string;
    description?: string | null;
    subTopics?: SubTopicItem[] | null;
  };
};
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
  const transformSubTopics = (subTopicItems: SubTopicItem[]): TreeItem[] => {
    return subTopicItems.map((subTopicItem) => ({
      ...subTopicItem.subTopic,
      title: subTopicItem.subTopic.name,
      subtitle: subTopicItem.subTopic.description,
      children: subTopicItem.subTopic.subTopics ? transformSubTopics(subTopicItem.subTopic.subTopics) : undefined,
      expanded: true,
    }));
  };
  const subTopicsData = useMemo(() => {
    return data && data.getDomainByKey.subTopics ? transformSubTopics(data.getDomainByKey.subTopics) : [];
  }, [data]);

  const editSubTopic = (subTopicId: string) => {};
  const [treeData, setTreeData] = useState<TreeItem[]>(subTopicsData);
  const count = getVisibleNodeCount({ treeData });

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
          <Box h={`${count * 62 + 10}px`}>
            <SortableTree
              treeData={treeData}
              generateNodeProps={(data) => ({
                buttons: [
                  <IconButton
                    aria-label="Edit SubTopic"
                    icon={<EditIcon />}
                    onClick={() => editSubTopic(data.node._id)}
                    size="xs"
                    variant="ghost"
                  >
                    Test
                  </IconButton>,
                ],
              })}
              onChange={(treeData) => setTreeData(treeData)}
              getNodeKey={({ node }) => node._id}
            />
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
