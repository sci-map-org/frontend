import { EditIcon } from '@chakra-ui/icons';
import { Box, IconButton, Stack, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import gql from 'graphql-tag';
import dynamic from 'next/dynamic';
import Router from 'next/router';
import { useState } from 'react';
import { RoleAccess } from '../../components/auth/RoleAccess';
import { PageLayout } from '../../components/layout/PageLayout';
import { DeleteButtonWithConfirmation } from '../../components/lib/buttons/DeleteButtonWithConfirmation';
import { EditableTopicPrerequisites } from '../../components/topics/EditableTopicPrerequisites';
import { SubTopicsTreeData, SubTopicsTreeProps } from '../../components/topics/SubTopicsTree';
import { generateTopicData, TopicLinkData } from '../../graphql/topics/topics.fragments';
import { useDeleteTopicMutation } from '../../graphql/topics/topics.operations.generated';
import { routerPushToPage } from '../PageInfo';
import { ManageTopicPageInfo, TopicPageInfo } from '../RoutesPageInfos';
import { GetTopicByKeyManageTopicPageQuery, useGetTopicByKeyManageTopicPageQuery } from './ManageTopicPage.generated';

const SubTopicsTree = dynamic<SubTopicsTreeProps>(
  () =>
    import('../../components/topics/SubTopicsTree').then((res) => {
      const { SubTopicsTree } = res;
      return SubTopicsTree;
    }),
  { ssr: false }
);

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
      ...SubTopicsTreeData
      prerequisites {
        prerequisiteTopic {
          ...TopicLinkData
        }
      }
    }
  }
  ${TopicLinkData}
  ${SubTopicsTreeData}
`;

const placeholderTopicData: GetTopicByKeyManageTopicPageQuery['getTopicByKey'] = generateTopicData();

export const ManageTopicPage: React.FC<{ topicKey: string }> = ({ topicKey }) => {
  const { data, loading, refetch } = useGetTopicByKeyManageTopicPageQuery({ variables: { topicKey } });
  const [deleteTopicMutation] = useDeleteTopicMutation();
  const [editMode, setEditMode] = useState(false);

  if (!data && !loading) return <Box>Topic not found !</Box>;

  const topic = data?.getTopicByKey || placeholderTopicData;

  return (
    <PageLayout
      isLoading={loading}
      title={`Manage Topic - ${topic.name}`}
      breadCrumbsLinks={[TopicPageInfo(topic), ManageTopicPageInfo(topic)]}
      renderTopRight={
        <Stack direction="row">
          <RoleAccess accessRule="contributorOrAdmin">
            <IconButton
              aria-label="edit topic"
              size="sm"
              variant="outline"
              icon={<EditIcon />}
              onClick={() => setEditMode(true)}
            />
          </RoleAccess>
          <DeleteButtonWithConfirmation
            variant="outline"
            size="sm"
            modalHeaderText="Delete Topic"
            modalBodyText={`Confirm deleting the topic "${topic.name}" ?`}
            isDisabled={loading}
            onConfirmation={async () => {
              await deleteTopicMutation({ variables: { topicId: topic._id } });
              topic.parentTopic ? routerPushToPage(TopicPageInfo(topic.parentTopic)) : Router.push('/');
            }}
          />
        </Stack>
      }
      accessRule="contributorOrAdmin"
    >
      <Stack spacing={4}>
        {/* <Box>
          <b>Description</b>
          {editMode ? (
            <Textarea
              placeholder="Description"
              size="md"
              variant="flushed"
              value={topic.description || ''}
              // onChange={(e) => updateTopicCreationData({ description: e.target.value })}
            />
          ) : (
            <Text>{topic.description}</Text>
          )}
        </Box> */}
        <Tabs isFitted variant="line">
          <TabList mb="1em">
            <Tab>Prequisites</Tab>
            <Tab>SubTopics Tree</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <EditableTopicPrerequisites topic={topic} editable={true} />
            </TabPanel>
            <TabPanel>
              <SubTopicsTree
                topic={topic}
                onUpdated={() => {
                  refetch();
                }}
                updatable={true}
                isLoading={loading}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Stack>
    </PageLayout>
  );
};
