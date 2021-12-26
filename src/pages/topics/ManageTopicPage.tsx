import { Box, Button, Flex, Input, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { differenceBy, pick } from 'lodash';
import dynamic from 'next/dynamic';
import Router from 'next/router';
import { useState } from 'react';
import { PageLayout } from '../../components/layout/PageLayout';
import { DeleteButtonWithConfirmation } from '../../components/lib/buttons/DeleteButtonWithConfirmation';
import { EditableField } from '../../components/lib/fields/EditableField';
import { Field } from '../../components/lib/fields/Field';
import { FormFieldLabel, PageTitle } from '../../components/lib/Typography';
import { EditablePartOfTopics, EditablePartOfTopicsData } from '../../components/topics/EditablePartOfTopics';
import { EditableTopicPrerequisites } from '../../components/topics/EditableTopicPrerequisites';
import { TopicDescription, TopicDescriptionField } from '../../components/topics/fields/TopicDescription';
import { TopicLevelEditor, TopicLevelViewer } from '../../components/topics/fields/TopicLevel';
import { SelectContextTopic } from '../../components/topics/fields/TopicNameField';
import { TopicTypeField } from '../../components/topics/fields/TopicTypeField';
import { TopicTypesViewer } from '../../components/topics/fields/TopicTypeViewer';
import { TopicUrlKeyField, useCheckTopicKeyAvailability } from '../../components/topics/fields/TopicUrlKey';
import { SubTopicsTreeData, SubTopicsTreeProps } from '../../components/topics/tree/SubTopicsTree';
import { useGetTopicValidContextsQuery } from '../../components/topics/tree/SubTopicsTree.generated';
import { generateTopicData, TopicLinkData } from '../../graphql/topics/topics.fragments';
import { TopicLinkDataFragment } from '../../graphql/topics/topics.fragments.generated';
import {
  useDeleteTopicMutation,
  useUpdateTopicContextMutation,
  useUpdateTopicMutation,
} from '../../graphql/topics/topics.operations.generated';
import { TopicTypeFullData } from '../../graphql/topic_types/topic_types.fragments';
import { TopicType, UpdateTopicPayload } from '../../graphql/types';
import { routerPushToPage } from '../PageInfo';
import { ManageTopicPageInfo, ManageTopicPagePath, TopicPageInfo } from '../RoutesPageInfos';
import {
  GetTopicByKeyManageTopicPageQuery,
  useAddTopicTypesToTopicMutation,
  useGetTopicByKeyManageTopicPageQuery,
  useRemoveTopicTypesFromTopicMutation,
} from './ManageTopicPage.generated';

const SubTopicsTree = dynamic<SubTopicsTreeProps>(
  () =>
    import('../../components/topics/tree/SubTopicsTree').then((res) => {
      const { SubTopicsTree } = res;
      return SubTopicsTree;
    }),
  { ssr: false }
);

export const addTopicTypesToTopic = gql`
  mutation addTopicTypesToTopic($topicId: String!, $topicTypes: [String!]!) {
    addTopicTypesToTopic(topicId: $topicId, topicTypes: $topicTypes) {
      topicTypes {
        ...TopicTypeFullData
      }
    }
  }
  ${TopicTypeFullData}
`;

export const removeTopicTypesFromTopic = gql`
  mutation removeTopicTypesFromTopic($topicId: String!, $topicTypes: [String!]!) {
    removeTopicTypesFromTopic(topicId: $topicId, topicTypes: $topicTypes) {
      topicTypes {
        ...TopicTypeFullData
      }
    }
  }
  ${TopicTypeFullData}
`;

export const getTopicByKeyManageTopicPage = gql`
  query getTopicByKeyManageTopicPage($topicKey: String!) {
    getTopicByKey(topicKey: $topicKey) {
      ...TopicLinkData
      level
      description
      topicTypes {
        ...TopicTypeFullData
      }
      subTopics {
        index
        subTopic {
          ...TopicLinkData
        }
      }
      parentTopic {
        ...TopicLinkData
      }
      contextTopic {
        ...TopicLinkData
      }
      ...SubTopicsTreeData
      prerequisites {
        prerequisiteTopic {
          ...TopicLinkData
        }
      }
      ...EditablePartOfTopicsData
    }
  }
  ${TopicLinkData}
  ${SubTopicsTreeData}
  ${EditablePartOfTopicsData}
  ${TopicTypeFullData}
`;

const placeholderTopicData: GetTopicByKeyManageTopicPageQuery['getTopicByKey'] = generateTopicData();

export const ManageTopicPage: React.FC<{ topicKey: string }> = ({ topicKey }) => {
  const [updateTopicData, setUpdateTopicData] = useState<{
    name?: string;
    key?: string;
    description?: string | null;
    descriptionSourceUrl?: string | null;
    topicTypes?: TopicType[] | null;
    level?: number | null;
  }>({});
  const { isChecking, isAvailable } = useCheckTopicKeyAvailability(updateTopicData.key || '');
  const { data, loading, refetch } = useGetTopicByKeyManageTopicPageQuery({
    variables: { topicKey },
    onCompleted(data) {
      setUpdateTopicData(pick(data.getTopicByKey, ['key', 'name', 'description', 'topicTypes', 'level']));
    },
  });

  const [updateTopicMutation] = useUpdateTopicMutation();
  const [addTopicTypesToTopicMutation] = useAddTopicTypesToTopicMutation();
  const [removeTopicTypesFromTopicMutation] = useRemoveTopicTypesFromTopicMutation();
  const updateTopic = async () => {
    const payload: UpdateTopicPayload = {
      ...(updateTopicData.name && updateTopicData.name !== topic.name && { name: updateTopicData.name }),
      ...(updateTopicData.key && updateTopicData.key !== topic.key && { key: updateTopicData.key }),
      ...(updateTopicData.description !== topic.description && { description: updateTopicData.description || null }),
    };
    if (topic.topicTypes && updateTopicData.topicTypes) {
      const toAdd = differenceBy(updateTopicData.topicTypes, topic.topicTypes, (t) => t.name);
      const toRemove = differenceBy(topic.topicTypes, updateTopicData.topicTypes, (t) => t.name);
      toAdd.length &&
        (await addTopicTypesToTopicMutation({
          variables: {
            topicId: topic._id,
            topicTypes: toAdd.map(({ name }) => name),
          },
        }));
      toRemove.length &&
        (await removeTopicTypesFromTopicMutation({
          variables: {
            topicId: topic._id,
            topicTypes: toRemove.map(({ name }) => name),
          },
        }));
    }
    if (Object.keys(payload).length) {
      await updateTopicMutation({
        variables: {
          topicId: topic._id,
          payload,
        },
      });
    }
    if (payload.key) Router.push(ManageTopicPagePath(payload.key));
    else refetch();
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

                  {editMode ? (
                    <TopicDescriptionField
                      value={updateTopicData.description}
                      onChange={(newDescription) =>
                        setUpdateTopicData({ ...updateTopicData, description: newDescription })
                      }
                      pullDescriptionsQueryData={{ name: updateTopicData.name || '' }}
                      onSelectPulledDescription={(pulledDescription) =>
                        setUpdateTopicData({
                          ...updateTopicData,
                          description: pulledDescription.description,

                          // TODO
                          // descriptionSourceUrl: pulledDescription.sourceUrl,
                          // ...(pulledDescription.sourceName === PulledDescriptionSourceName.Wikipedia && {
                          //   wikipediaPageUrl: pulledDescription.sourceUrl,
                          // }),
                        })
                      }
                    />
                  ) : (
                    <Field label="Description">
                      <TopicDescription
                        topicDescription={topic.description || undefined}
                        placeholder="No description"
                      />
                    </Field>
                  )}
                  {editMode ? (
                    <TopicTypeField
                      value={updateTopicData.topicTypes || []}
                      onChange={(newTopicTypes) => setUpdateTopicData({ topicTypes: newTopicTypes })}
                    />
                  ) : (
                    <Field label="Topic Types">
                      {!!updateTopicData.topicTypes?.length && (
                        <TopicTypesViewer topicTypes={topic.topicTypes || []} maxShown={2} />
                      )}
                      {!updateTopicData.topicTypes?.length && <Text color="gray.600">None</Text>}
                    </Field>
                  )}
                  <Field label={<FormFieldLabel>Url Key</FormFieldLabel>}>
                    {editMode ? (
                      <TopicUrlKeyField
                        // different behaviour based on topic.contextTopic
                        value={updateTopicData.key || ''}
                        onChange={(newKeyValue) => setUpdateTopicData({ key: newKeyValue })}
                        isChecking={isChecking}
                        isAvailable={updateTopicData.key !== topic.key ? isAvailable : undefined}
                        fullTopicKey={updateTopicData.key || ''}
                      />
                    ) : (
                      topic.key
                    )}
                  </Field>
                  <EditableField
                    label="Level"
                    onSave={async () => {
                      await updateTopicMutation({
                        variables: {
                          topicId: topic._id,
                          payload: { level: updateTopicData.level },
                        },
                      });
                    }}
                    editModeChildren={
                      <TopicLevelEditor
                        value={updateTopicData.level || null}
                        onChange={(newLevelValue) => setUpdateTopicData({ level: newLevelValue })}
                        w="100%"
                      />
                    }
                    w="50%"
                  >
                    <Box alignSelf="flex-start">
                      <TopicLevelViewer topicId={topic._id} level={topic.level || undefined} showNotApplicable />
                    </Box>
                  </EditableField>
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
              <Flex direction="row" justifyContent="space-evenly">
                <EditableTopicPrerequisites topic={topic} editable={true} />
                <EditablePartOfTopics topic={topic} editable={true} align="center" />

                {topic.parentTopic && topic.contextTopic && (
                  <TopicContextEditor parentTopic={topic.parentTopic} contextTopic={topic.contextTopic} topic={topic} />
                )}
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

const TopicContextEditor: React.FC<{
  topic: TopicLinkDataFragment;
  parentTopic: TopicLinkDataFragment;
  contextTopic: TopicLinkDataFragment;
}> = ({ topic, parentTopic, contextTopic }) => {
  const { data } = useGetTopicValidContextsQuery({
    variables: { parentTopicId: parentTopic._id, topicId: topic._id },
    onCompleted(r) {
      if (!r.getTopicValidContexts.validContexts?.length) throw new Error(`No valid contexts found for ${topic._id}`);
    },
  });
  const [updateTopicContextMutation] = useUpdateTopicContextMutation();
  const [newContext, setNewContext] = useState<TopicLinkDataFragment>();

  return (
    <Stack alignItems="flex-end">
      <Stack direction="row" alignItems="baseline">
        <Text fontWeight={600} color="gray.500">
          Context:{' '}
        </Text>
        {data?.getTopicValidContexts.validContexts && (
          <>
            <SelectContextTopic
              contexts={data.getTopicValidContexts.validContexts}
              selectedContext={newContext || contextTopic}
              onSelect={(context) => setNewContext(context)}
            />
          </>
        )}
      </Stack>
      {newContext && newContext._id !== contextTopic?._id && (
        <Button
          colorScheme="blue"
          onClick={async () => {
            const { data } = await updateTopicContextMutation({
              variables: { topicId: topic._id, contextTopicId: newContext._id },
            });
            data && routerPushToPage(ManageTopicPageInfo(data.updateTopicContext));
            setNewContext(undefined);
          }}
          size="sm"
        >
          Save
        </Button>
      )}
    </Stack>
  );
};
