import { Box, Button, Flex, Input, Stack, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { pick } from 'lodash';
import dynamic from 'next/dynamic';
import Router from 'next/router';
import { useState } from 'react';
import { PageLayout } from '../../components/layout/PageLayout';
import { DeleteButtonWithConfirmation } from '../../components/lib/buttons/DeleteButtonWithConfirmation';
import { Field } from '../../components/lib/Field';
import { FormFieldLabel, PageTitle } from '../../components/lib/Typography';
import { EditableTopicPrerequisites } from '../../components/topics/EditableTopicPrerequisites';
import { TopicDescription, TopicDescriptionField } from '../../components/topics/fields/TopicDescription';
import { TopicUrlKeyField, useCheckTopicKeyAvailability } from '../../components/topics/fields/TopicUrlKey';
import { SubTopicsTreeData, SubTopicsTreeProps } from '../../components/topics/SubTopicsTree';
import { generateTopicData, TopicLinkData } from '../../graphql/topics/topics.fragments';
import { useDeleteTopicMutation, useUpdateTopicMutation } from '../../graphql/topics/topics.operations.generated';
import { UpdateTopicPayload } from '../../graphql/types';
import { routerPushToPage } from '../PageInfo';
import { ManageTopicPageInfo, ManageTopicPagePath, TopicPageInfo } from '../RoutesPageInfos';
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
  const [updateTopicData, setUpdateTopicData] = useState<{ name?: string; key?: string; description?: string | null }>(
    {}
  );
  const { isChecking, isAvailable } = useCheckTopicKeyAvailability(updateTopicData.key || '');
  const { data, loading, refetch } = useGetTopicByKeyManageTopicPageQuery({
    variables: { topicKey },
    onCompleted(data) {
      setUpdateTopicData(pick(data.getTopicByKey, ['key', 'name', 'description']));
    },
  });

  const [updateTopicMutation] = useUpdateTopicMutation();
  const updateTopic = async () => {
    const payload: UpdateTopicPayload = {
      ...(updateTopicData.name && updateTopicData.name !== topic.name && { name: updateTopicData.name }),
      ...(updateTopicData.key && updateTopicData.key !== topic.key && { key: updateTopicData.key }),
      ...(updateTopicData.description !== topic.description && { description: updateTopicData.description || null }),
    };
    await updateTopicMutation({
      variables: {
        topicId: topic._id,
        payload,
      },
    });
    payload.key && Router.push(ManageTopicPagePath(payload.key));
  };
  const [deleteTopicMutation] = useDeleteTopicMutation();
  const [editMode, setEditMode] = useState(false);
  if (!data && !loading) return <Box>Topic not found !</Box>;

  const topic = data?.getTopicByKey || placeholderTopicData;

  return (
    <PageLayout
      isLoading={loading}
      breadCrumbsLinks={[TopicPageInfo(topic), ManageTopicPageInfo(topic)]}
      renderTopRight={
        <Stack direction="row">
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
      {/* <Stack spacing={4} alignItems="stretch"> */}
      <PageTitle mb={12}>Manage {topic.name}</PageTitle>
      <Tabs size="lg" isFitted variant="line" isLazy>
        <TabList mb="1em">
          <Tab fontWeight={500}>Edit Topic</Tab>
          <Tab fontWeight={500}>SubTopics Tree</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Stack alignItems="stretch" spacing={8}>
              <Flex direction="row" w="100%">
                <Stack spacing={6} flexGrow={1}>
                  <Field label={<FormFieldLabel>Name</FormFieldLabel>}>
                    {editMode ? (
                      <Input
                        value={updateTopicData.name}
                        onChange={(e) => setUpdateTopicData({ ...updateTopicData, name: e.target.value })}
                      />
                    ) : (
                      topic.name
                    )}
                  </Field>
                  <Field label={<FormFieldLabel>Description</FormFieldLabel>}>
                    {editMode ? (
                      <TopicDescriptionField
                        value={updateTopicData.description}
                        onChange={(newDescription) =>
                          setUpdateTopicData({ ...updateTopicData, description: newDescription })
                        }
                      />
                    ) : (
                      <TopicDescription
                        topicDescription={topic.description || undefined}
                        placeholder="No description"
                      />
                    )}
                  </Field>
                  <Field label={<FormFieldLabel>Url Key</FormFieldLabel>}>
                    {editMode ? (
                      <TopicUrlKeyField
                        value={updateTopicData.key || ''}
                        onChange={(newKeyValue) => setUpdateTopicData({ key: newKeyValue })}
                        isChecking={isChecking}
                        isAvailable={updateTopicData.key !== topic.key ? isAvailable : undefined}
                      />
                    ) : (
                      topic.key
                    )}
                  </Field>
                </Stack>
                <Stack spacing={4} pl={10} pt={4} minW="200px">
                  {editMode ? (
                    <>
                      <Button
                        colorScheme="blue"
                        onClick={async () => {
                          await updateTopic();
                          setEditMode(false);
                        }}
                      >
                        Save
                      </Button>
                      <Button onClick={() => setEditMode(false)}>Cancel</Button>
                    </>
                  ) : (
                    <Button colorScheme="blue" onClick={() => setEditMode(true)}>
                      Edit
                    </Button>
                  )}
                </Stack>
              </Flex>
              <Flex justifyContent="center">
                <EditableTopicPrerequisites topic={topic} editable={true} />
              </Flex>
            </Stack>
          </TabPanel>
          <TabPanel display="flex" justifyContent="center">
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
    </PageLayout>
  );
};
