import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Spinner,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import gql from 'graphql-tag';
import { differenceBy, pick } from 'lodash';
import dynamic from 'next/dynamic';
import Router from 'next/router';
import { ReactNode, useMemo, useState } from 'react';
import { EditableField } from '../../components/lib/fields/EditableField';
import { Field } from '../../components/lib/fields/Field';
import { PageTitle } from '../../components/lib/Typography';
import { EditablePartOfTopics, EditablePartOfTopicsData } from '../../components/topics/EditablePartOfTopics';
import { EditableTopicPrerequisites } from '../../components/topics/EditableTopicPrerequisites';
import { TopicAliasesField, TopicNameAlias } from '../../components/topics/fields/TopicAliases';
import { TopicDescription, TopicDescriptionField } from '../../components/topics/fields/TopicDescription';
import { TopicLevelEditor, TopicLevelViewer } from '../../components/topics/fields/TopicLevel';
import { SelectContextTopic } from '../../components/topics/fields/TopicNameField';
import { TopicTypeField } from '../../components/topics/fields/TopicTypeField';
import { TopicTypesViewer } from '../../components/topics/fields/TopicTypeViewer';
import { TopicUrlKeyField, useCheckTopicKeyAvailability } from '../../components/topics/fields/TopicUrlKey';
import { SubTopicsTreeData, SubTopicsTreeProps } from '../../components/topics/tree/SubTopicsTree';
import { useGetTopicValidContextsQuery } from '../../components/topics/tree/SubTopicsTree.generated';
import { TopicFullData, TopicLinkData } from '../../graphql/topics/topics.fragments';
import { TopicLinkDataFragment } from '../../graphql/topics/topics.fragments.generated';
import {
  useDeleteTopicMutation,
  useUpdateTopicContextMutation,
  useUpdateTopicMutation,
} from '../../graphql/topics/topics.operations.generated';
import { TopicTypeFullData } from '../../graphql/topic_types/topic_types.fragments';
import { PulledDescriptionSourceName, TopicType, UserRole } from '../../graphql/types';
import { useCurrentUser } from '../../graphql/users/users.hooks';
import { routerPushToPage } from '../../pages/PageInfo';
import {
  ManageTopicPageInfo,
  ManageTopicPagePath,
  TopicPageInfo,
  UserProfilePageInfo,
} from '../../pages/RoutesPageInfos';
import { generateUrlKey } from '../../services/url.service';
import { RoleAccess } from '../auth/RoleAccess';
import { ButtonWithConfirmationDialog } from '../lib/buttons/ButtonWithConfirmationDialog';
import { PageLink } from '../navigation/InternalLink';
import { UserAvatar, UserAvatarData } from '../users/UserAvatar';
import {
  GetTopicByKeyManageTopicPageQuery,
  useAddTopicTypesToTopicMutation,
  useGetTopicByKeyManageTopicPageQuery,
  useRemoveTopicTypesFromTopicMutation,
} from './ManageTopic.generated';

export enum ManageTopicTabIndex {
  Data = 0,
  SubTopics = 1,
}

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
      _id
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
      _id
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
      ...TopicFullData
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
      createdBy {
        ...UserAvatarData
      }
    }
  }
  ${TopicFullData}
  ${TopicLinkData}
  ${SubTopicsTreeData}
  ${EditablePartOfTopicsData}
  ${TopicTypeFullData}
  ${UserAvatarData}
`;

export const ManageTopic: React.FC<{
  topic: GetTopicByKeyManageTopicPageQuery['getTopicByKey'];
  refetch: () => void;
  tab: ManageTopicTabIndex;
  onChangeTab: (tab: ManageTopicTabIndex) => void;
}> = ({ topic, tab, onChangeTab, refetch }) => {
  const [updateTopicData, setUpdateTopicData] = useState<{
    name?: string;
    key?: string;
    description?: string | null;
    descriptionSourceUrl?: string | null;
    topicTypes?: TopicType[] | null;
    level?: number | null;
    wikipediaPageUrl?: string | null;
    aliases?: TopicNameAlias[] | null;
  }>({
    ...pick(topic, ['key', 'name', 'description', 'descriptionSourceUrl', 'wikipediaPageUrl', 'topicTypes', 'level']),
    aliases: topic.aliases?.map((alias) => ({ value: alias, id: Math.random().toString() })),
  });

  const topicCreatedAt: Date = useMemo(() => new Date(topic.createdAt), [topic.createdAt]);
  const { isChecking, isAvailable } = useCheckTopicKeyAvailability(updateTopicData.key || '');

  const { currentUser } = useCurrentUser();
  const [updateTopicMutation] = useUpdateTopicMutation();
  const [addTopicTypesToTopicMutation] = useAddTopicTypesToTopicMutation();
  const [removeTopicTypesFromTopicMutation] = useRemoveTopicTypesFromTopicMutation();

  const [deleteTopicMutation] = useDeleteTopicMutation();

  return (
    <>
      <Flex direction="row-reverse" h={16}>
        <RoleAccess accessRule="admin">
          <ButtonWithConfirmationDialog
            renderButton={(onClick) => (
              <Button size="sm" colorScheme="red" onClick={onClick}>
                Delete
              </Button>
            )}
            dialogHeaderText="Delete Topic ?"
            dialogBodyText={`Do you confirm deleting the topic "${topic.name}" ?`}
            confirmButtonText="Delete"
            confirmButtonColorScheme="red"
            onConfirmation={async () => {
              await deleteTopicMutation({ variables: { topicId: topic._id } });
              topic.parentTopic ? routerPushToPage(TopicPageInfo(topic.parentTopic)) : Router.push('/');
            }}
          />
        </RoleAccess>
      </Flex>
      <PageTitle mb={12}>
        Manage{' '}
        <Text color="blue.600" as="span">
          {topic.name}
        </Text>
      </PageTitle>
      <Tabs size="lg" isFitted variant="line" isLazy index={tab} onChange={onChangeTab}>
        <TabList mb={6}>
          <Tab fontSize="2xl" fontWeight={600}>
            Edit Topic
          </Tab>
          <Tab fontSize="2xl" fontWeight={600}>
            SubTopics Tree
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Stack alignItems="stretch" spacing={8}>
              <Stack w="100%" spacing={12} flexGrow={1}>
                <Flex justifyContent="space-between">
                  {currentUser && currentUser.role === UserRole.Admin ? (
                    <EditableField
                      label="Name"
                      w="50%"
                      editModeChildren={
                        <Input
                          value={updateTopicData.name}
                          onChange={(e) =>
                            e.target.value &&
                            setUpdateTopicData({
                              ...updateTopicData,
                              name: e.target.value,
                            })
                          }
                        ></Input>
                      }
                      onSave={async () => {
                        await updateTopicMutation({
                          variables: {
                            topicId: topic._id,
                            payload: {
                              name: updateTopicData.name,
                            },
                          },
                        });
                      }}
                    >
                      <Text>{topic.name}</Text>
                    </EditableField>
                  ) : (
                    <Field label="Name" w="50%">
                      <Text>{topic.name}</Text>
                    </Field>
                  )}
                  <EditableField
                    w="50%"
                    label="Aliases"
                    editModeChildren={
                      <TopicAliasesField
                        aliases={updateTopicData.aliases || []}
                        onChange={(aliases) => setUpdateTopicData({ ...updateTopicData, aliases })}
                      />
                    }
                    onSave={async () => {
                      await updateTopicMutation({
                        variables: {
                          topicId: topic._id,
                          payload: {
                            aliases: updateTopicData.aliases?.length
                              ? updateTopicData.aliases.map(({ value }) => value)
                              : null,
                          },
                        },
                      });
                    }}
                  >
                    {topic.aliases?.length ? (
                      <Text>{topic.aliases.join(', ')}</Text>
                    ) : (
                      <Text color="gray.600">None</Text>
                    )}
                  </EditableField>
                </Flex>
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
                      onChange={(newLevelValue) => setUpdateTopicData({ ...updateTopicData, level: newLevelValue })}
                      w="100%"
                    />
                  }
                  w="50%"
                >
                  <Box alignSelf="flex-start">
                    <TopicLevelViewer topicId={topic._id} level={topic.level || undefined} showNotApplicable />
                  </Box>
                </EditableField>
                <EditableField
                  label="Topic Types"
                  editModeRenderField={
                    <TopicTypeField
                      value={updateTopicData.topicTypes || []}
                      onChange={(newTopicTypes) =>
                        setUpdateTopicData({ ...updateTopicData, topicTypes: newTopicTypes })
                      }
                    />
                  }
                  onSave={async () => {
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
                    } else console.error('bla');
                  }}
                >
                  {topic.topicTypes?.length ? (
                    <TopicTypesViewer topicTypes={topic.topicTypes || []} />
                  ) : (
                    <Text color="gray.600">None</Text>
                  )}
                </EditableField>
                <EditableField
                  label="Description"
                  editModeRenderField={
                    <TopicDescriptionField
                      value={updateTopicData.description}
                      onChange={(newDescription) =>
                        setUpdateTopicData({
                          ...updateTopicData,
                          description: newDescription,
                        })
                      }
                      pullDescriptionsQueryData={{ name: topic.name }}
                      onSelectPulledDescription={(pulledDescription) =>
                        setUpdateTopicData({
                          ...updateTopicData,
                          description: pulledDescription.description,
                          descriptionSourceUrl: pulledDescription.sourceUrl,
                          ...(pulledDescription.sourceName === PulledDescriptionSourceName.Wikipedia && {
                            wikipediaPageUrl: pulledDescription.sourceUrl,
                          }),
                        })
                      }
                      w="100%"
                    />
                  }
                  onSave={async () => {
                    await updateTopicMutation({
                      variables: {
                        topicId: topic._id,
                        payload: {
                          description: updateTopicData.description,
                          descriptionSourceUrl: updateTopicData.descriptionSourceUrl,
                          wikipediaPageUrl: updateTopicData.wikipediaPageUrl,
                        },
                      },
                    });
                  }}
                >
                  {<TopicDescription topicDescription={topic.description || undefined} placeholder="No description" />}
                </EditableField>
                <Flex justifyContent="space-between">
                  <EditableField
                    label="Wikipedia Page"
                    w="50%"
                    editModeChildren={
                      <Input
                        value={updateTopicData.wikipediaPageUrl || ''}
                        onChange={(e) =>
                          setUpdateTopicData({ ...updateTopicData, wikipediaPageUrl: e.target.value || null })
                        }
                      />
                    }
                    onSave={async () => {
                      await updateTopicMutation({
                        variables: {
                          topicId: topic._id,
                          payload: {
                            wikipediaPageUrl: updateTopicData.wikipediaPageUrl,
                          },
                        },
                      });
                    }}
                  >
                    {topic.wikipediaPageUrl ? (
                      <Link href={topic.wikipediaPageUrl} isExternal color="blue.500" fontWeight={500}>
                        {topic.wikipediaPageUrl}
                      </Link>
                    ) : (
                      <Text color="gray.500">Unset</Text>
                    )}
                  </EditableField>
                  <EditableField
                    label="Description Source Url"
                    w="50%"
                    editModeChildren={
                      <Input
                        value={updateTopicData.descriptionSourceUrl || ''}
                        onChange={(e) =>
                          setUpdateTopicData({ ...updateTopicData, descriptionSourceUrl: e.target.value || null })
                        }
                      />
                    }
                    onSave={async () => {
                      await updateTopicMutation({
                        variables: {
                          topicId: topic._id,
                          payload: {
                            descriptionSourceUrl: updateTopicData.descriptionSourceUrl,
                          },
                        },
                      });
                    }}
                  >
                    {topic.descriptionSourceUrl ? (
                      <Link href={topic.descriptionSourceUrl} isExternal color="blue.500" fontWeight={500}>
                        {topic.descriptionSourceUrl}
                      </Link>
                    ) : (
                      <Text color="gray.500">Unset</Text>
                    )}
                  </EditableField>
                </Flex>
                <Flex justifyContent="space-between">
                  <EditableField
                    label="Url Key"
                    w="50%"
                    disableSaveButton={!updateTopicData.key || isChecking || !isAvailable}
                    onSave={async () => {
                      if (updateTopicData.key && isAvailable) {
                        await updateTopicMutation({
                          variables: {
                            topicId: topic._id,
                            payload: {
                              key: updateTopicData.key,
                            },
                          },
                        });
                        Router.push(ManageTopicPagePath(updateTopicData.key));
                      }
                    }}
                    editModeChildren={
                      <TopicUrlKeyField
                        // different behaviour based on topic.contextTopic
                        value={(updateTopicData.key || '').replace(`_(${topic.contextTopic?.key})`, '')}
                        onChange={(newKeyValue) =>
                          setUpdateTopicData({
                            ...updateTopicData,
                            key: topic.contextTopic?.key
                              ? generateUrlKey(newKeyValue) + `_(${topic.contextTopic.key})`
                              : generateUrlKey(newKeyValue),
                          })
                        }
                        isChecking={isChecking}
                        isAvailable={updateTopicData.key !== topic.key ? isAvailable : undefined}
                        fullTopicKey={updateTopicData.key || ''}
                      />
                    }
                  >
                    <Text as="span" fontWeight={500} color="gray.700" letterSpacing="0.1em">
                      <Text as="span" color="gray.400">
                        /topics/
                      </Text>
                      {topic.key}
                    </Text>
                  </EditableField>
                  {topic.createdBy && (
                    <Field label="Created By" w="50%">
                      <Stack direction="row" alignItems="center">
                        <UserAvatar size="sm" user={topic.createdBy} />
                        <Text>
                          <PageLink pageInfo={UserProfilePageInfo(topic.createdBy)} color="gray.800" fontWeight={500}>
                            {topic.createdBy.displayName},{' '}
                          </PageLink>
                          the {topicCreatedAt.toLocaleString('fr-FR').split(',')[0]}
                        </Text>
                      </Stack>
                    </Field>
                  )}
                </Flex>
              </Stack>
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
              // isLoading={loading}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
    // </PageLayout>
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

export const ManageTopicModal: React.FC<{ topicKey: string; renderButton: (openModal: () => void) => ReactNode }> = ({
  topicKey,
  renderButton,
}) => {
  const [tab, setTab] = useState(ManageTopicTabIndex.Data);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, loading, refetch } = useGetTopicByKeyManageTopicPageQuery({
    variables: { topicKey },
  });

  const topic = data?.getTopicByKey;
  return (
    <>
      {renderButton(onOpen)}
      {isOpen && (
        <Modal onClose={onClose} size="6xl" isOpen={isOpen}>
          <ModalOverlay>
            <ModalContent position="relative">
              <Image
                position="absolute"
                src="/images/topostain_red_manage_topic_page.svg"
                zIndex={-1}
                right="0"
                h={{ base: '200px', sm: '240px', md: '300px' }}
              />
              <ModalBody pt={8} pb={12} px={10}>
                {topic ? (
                  <ManageTopic topic={topic} refetch={refetch} tab={tab} onChangeTab={setTab} />
                ) : (
                  <Spinner m={20} />
                )}
              </ModalBody>
            </ModalContent>
          </ModalOverlay>
        </Modal>
      )}
    </>
  );
};
