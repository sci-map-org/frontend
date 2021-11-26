import { Box, Stack, Text } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { PageLayout } from '../../components/layout/PageLayout';
import { generateTopicData, TopicLinkData } from '../../graphql/topics/topics.fragments';
import {
  useAttachTopicIsSubTopicOfTopicMutation,
  useDetachTopicIsSubTopicOfTopicMutation,
} from '../../graphql/topics/topics.operations.generated';
import { ManageTopicPageInfo, TopicPageInfo } from '../RoutesPageInfos';
import { GetTopicByKeyManageTopicPageQuery, useGetTopicByKeyManageTopicPageQuery } from './ManageTopicPage.generated';

export const getTopicByKeyManageTopicPage = gql`
  query getTopicByKeyManageTopicPage($topicKey: String!) {
    getTopicByKey(topicKey: $topicKey) {
      ...TopicLinkData
      description
      subTopics {
        index
        subTopic {
          ...TopicLinkData
        }
      }
      parentTopic {
        ...TopicLinkData
      }
    }
  }
  ${TopicLinkData}
`;

export const ManageTopicPage: React.FC<{ topicKey: string }> = ({ topicKey }) => {
  return null;
};

const placeholderTopicData: GetTopicByKeyManageTopicPageQuery['getTopicByKey'] = generateTopicData();

export const ManageDomainPage: React.FC<{ topicKey: string }> = ({ topicKey }) => {
  const { data, loading } = useGetTopicByKeyManageTopicPageQuery({ variables: { topicKey } });
  const [attachTopicIsSubTopicOfTopicMutation] = useAttachTopicIsSubTopicOfTopicMutation();
  const [detachTopicIsSubTopicOfTopicMutation] = useDetachTopicIsSubTopicOfTopicMutation();

  if (!data && !loading) return <Box>Topic not found !</Box>;

  const topic = data?.getTopicByKey || placeholderTopicData;

  return (
    <PageLayout
      isLoading={loading}
      title={`Manage Topic - ${topic.name}`}
      breadCrumbsLinks={[TopicPageInfo(topic), ManageTopicPageInfo(topic)]}
      // renderTopRight={
      //   <RoleAccess accessRule="contributorOrAdmin">
      //     <IconButton
      //       aria-label="edit area"
      //       size="sm"
      //       variant="outline"
      //       icon={<EditIcon />}
      //       onClick={() => routerPushToPage(EditDomainPageInfo(domain))}
      //     />
      //   </RoleAccess>
      // }
      accessRule="contributorOrAdmin"
    >
      <Stack spacing={4}>
        <Box>
          {/* <PageLink pageInfo={DomainResourceListPageInfo(domain)}>
            <Text fontSize="lg">
              Full Resource List
              <ExternalLinkIcon />
            </Text>
          </PageLink> */}
        </Box>
        <Box>
          <b>Description</b>
          <Text>{topic.description}</Text>
        </Box>
        <Box>
          {/* <DomainsPicker
            title="Sub Areas"
            pickedDomainList={
              (domain.subTopics || [])
                .map((subDomainItem) => subDomainItem.subTopic)
                .filter((topic) => topic.__typename === 'Domain') as DomainDataFragment[]
            }
            onSelect={(domainToAdd) =>
              attachTopicIsSubTopicOfTopicMutation({
                variables: { parentTopicId: domain._id, subTopicId: domainToAdd._id, payload: {} },
              })
            }
            onRemove={(domainToRemove) =>
              detachTopicIsSubTopicOfTopicMutation({
                variables: { parentTopicId: domain._id, subTopicId: domainToRemove._id },
              })
            }
          /> */}
        </Box>
        <Box>
          {/* <DomainsPicker
            title="Parent Areas"
            pickedDomainList={
              (domain.parentTopics || [])
                .map((parentDomainItem) => parentDomainItem.parentTopic)
                .filter((topic) => topic.__typename === 'Domain') as DomainDataFragment[]
            }
            onSelect={(domainToAdd) =>
              attachTopicIsSubTopicOfTopicMutation({
                variables: { parentTopicId: domainToAdd._id, subTopicId: domain._id, payload: {} },
              })
            }
            onRemove={(domainToRemove) =>
              detachTopicIsSubTopicOfTopicMutation({
                variables: { parentTopicId: domainToRemove._id, subTopicId: domain._id },
              })
            }
          /> */}
        </Box>
      </Stack>
    </PageLayout>
  );
};
