import {
  AvatarGroup,
  Box,
  Button,
  Center,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  IconButton,
  Skeleton,
  Stack,
  Text,
} from '@chakra-ui/core';
import { EditIcon } from '@chakra-ui/icons';
import gql from 'graphql-tag';
import Router from 'next/router';
import { useState } from 'react';
import { Access } from '../../components/auth/Access';
import { RoleAccess } from '../../components/auth/RoleAccess';
import { PageLayout } from '../../components/layout/PageLayout';
import {
  LearningMaterialTagsEditor,
  SelectedTagsViewer,
} from '../../components/learning_materials/LearningMaterialTagsEditor';
import { LearningPathComplementaryResourcesManager } from '../../components/learning_paths/LearningPathComplementaryResourcesManager';
import {
  LearningPathCompletion,
  LearningPathCompletionData,
} from '../../components/learning_paths/LearningPathCompletion';
import { LearningPathResourceItemsManager } from '../../components/learning_paths/LearningPathResourceItems';
import { DeleteButtonWithConfirmation } from '../../components/lib/buttons/DeleteButtonWithConfirmation';
import { EditableTextarea } from '../../components/lib/inputs/EditableTextarea';
import { EditableDuration } from '../../components/resources/elements/Duration';
import { ResourceStarsRater, ResourceStarsRating } from '../../components/resources/elements/ResourceStarsRating';
import { LearningMaterialCoveredTopics } from '../../components/resources/LearningMaterialCoveredTopics';
import { UserAvatar, UserAvatarData } from '../../components/users/UserAvatar';
import { LearningMaterialWithCoveredConceptsByDomainData } from '../../graphql/learning_materials/learning_materials.fragments';
import {
  generateLearningPathData,
  LearningPathWithResourceItemsPreviewData,
} from '../../graphql/learning_paths/learning_paths.fragments';
import { LearningPathDataFragment } from '../../graphql/learning_paths/learning_paths.fragments.generated';
import { useDeleteLearningPath } from '../../graphql/learning_paths/learning_paths.hooks';
import { useUpdateLearningPathMutation } from '../../graphql/learning_paths/learning_paths.operations.generated';
import { ResourceData } from '../../graphql/resources/resources.fragments';
import { useCurrentUser } from '../../graphql/users/users.hooks';
import { PageInfo } from '../PageInfo';
import { GetLearningPathPageQuery, useGetLearningPathPageQuery } from './LearningPathPage.generated';

export const LearningPathPagePath = (learningPathKey: string = '[learningPathKey]') =>
  `/learning_paths/${learningPathKey}`;

export const LearningPathPageInfo = (learningPath: Pick<LearningPathDataFragment, 'key' | 'name'>): PageInfo => ({
  name: learningPath.name,
  path: LearningPathPagePath(learningPath.key),
  routePath: LearningPathPagePath(),
});

export const getLearningPathPage = gql`
  query getLearningPathPage($key: String!) {
    getLearningPathByKey(key: $key) {
      ...LearningPathWithResourceItemsPreviewData
      complementaryResources {
        ...ResourceData
      }
      rating
      tags {
        name
      }
      createdBy {
        ...UserAvatarData
      }
      startedBy(options: {}) {
        items {
          user {
            ...UserAvatarData
          }
        }
        count
      }
      ...LearningPathCompletionData
      ...LearningMaterialWithCoveredConceptsByDomainData
    }
  }
  ${LearningMaterialWithCoveredConceptsByDomainData}
  ${LearningPathWithResourceItemsPreviewData}
  ${ResourceData}
  ${LearningPathCompletionData}
  ${UserAvatarData}
`;

const learningPathPlaceholder: GetLearningPathPageQuery['getLearningPathByKey'] = {
  ...generateLearningPathData(),
};

export const LearningPathPage: React.FC<{ learningPathKey: string }> = ({ learningPathKey }) => {
  const [updateLearningPath] = useUpdateLearningPathMutation();
  const { data, loading, error } = useGetLearningPathPageQuery({ variables: { key: learningPathKey } });
  const learningPath = data?.getLearningPathByKey || learningPathPlaceholder;
  const { currentUser } = useCurrentUser();
  const [editMode, setEditMode] = useState(
    // false
    !!learningPath.createdBy && !!currentUser && learningPath.createdBy._id === currentUser._id
  );
  if (error) return null;
  return (
    <PageLayout
      isLoading={loading}
      centerChildren
      renderTopRight={<LearningPageRightIcons learningPath={learningPath} isDisabled={loading} />}
    >
      <Stack
        width={{ base: '100%', md: '80%' }}
        maxWidth={{
          base: '100%',
          md: '1800px',
        }}
      >
        <Flex direction="row">
          <Stack width="50%">
            <Skeleton isLoaded={!loading}>
              <Editable
                defaultValue={learningPath.name}
                fontSize="5xl"
                fontWeight={600}
                color="gray.700"
                isPreviewFocusable={false}
                lineHeight="52px"
                onSubmit={(newName) =>
                  updateLearningPath({ variables: { _id: learningPath._id, payload: { name: newName } } })
                }
                variant="solid"
                display="flex"
                isDisabled={!editMode}
              >
                {(props: any) => (
                  <>
                    <EditablePreview />
                    {!props.isEditing && editMode && (
                      <IconButton
                        aria-label="t"
                        icon={<EditIcon />}
                        onClick={props.onEdit}
                        size="xs"
                        color="gray.600"
                        variant="ghost"
                        alignSelf="end"
                      />
                    )}
                    <EditableInput />
                  </>
                )}
              </Editable>
            </Skeleton>
            <Stack direction="row" spacing={2} alignItems="center">
              <ResourceStarsRating value={learningPath.rating} />
              <RoleAccess accessRule="contributorOrAdmin">
                <ResourceStarsRater learningMaterialId={learningPath._id} isDisabled={loading} />
              </RoleAccess>
            </Stack>
            <Access
              condition={editMode}
              renderAccessDenied={() => <SelectedTagsViewer selectedTags={learningPath.tags || []} />}
            >
              <LearningMaterialTagsEditor
                size="sm"
                placeholder="Add tags"
                learningMaterial={learningPath}
                isDisabled={loading}
              />
            </Access>
            <EditableDuration
              defaultValue={learningPath.durationMs}
              onSubmit={(newDuration) =>
                newDuration !== learningPath.durationMs &&
                updateLearningPath({
                  variables: { _id: learningPath._id, payload: { durationMs: newDuration } },
                })
              }
            />
            <Skeleton isLoaded={!loading}>
              <EditableTextarea
                backgroundColor="white"
                fontSize="lg"
                fontWeight={300}
                color="gray.700"
                defaultValue={learningPath.description || ''}
                placeholder="Add a description..."
                onSubmit={(newDescription: any) =>
                  updateLearningPath({
                    variables: { _id: learningPath._id, payload: { description: (newDescription as string) || null } },
                  })
                }
                isDisabled={!editMode}
              />
            </Skeleton>
            <LearningPathCompletion learningPath={learningPath} />
          </Stack>
          <Flex width="50%" direction="column" alignItems="flex-end">
            <Stack w="300px" spacing={3}>
              {learningPath.createdBy && (
                <Center>
                  <Stack spacing={1}>
                    <Text fontWeight={300}>Created By</Text>
                    <Center>
                      <UserAvatar size="sm" user={learningPath.createdBy} />
                    </Center>
                  </Stack>
                </Center>
              )}
              {learningPath.startedBy?.items.length && (
                <Center>
                  <Stack spacing={1}>
                    <Text fontWeight={300}>Path taken by {learningPath.startedBy?.items.length} people</Text>
                    <AvatarGroup alignSelf="center" spacing={-3} size="sm" max={3}>
                      {learningPath.startedBy.items.map(({ user }) => (
                        <UserAvatar user={user} />
                      ))}
                    </AvatarGroup>
                  </Stack>
                </Center>
              )}
              <Box>
                <LearningMaterialCoveredTopics
                  editMode={editMode}
                  isLoading={loading}
                  learningMaterial={learningPath}
                />
              </Box>
            </Stack>
          </Flex>
        </Flex>
        <LearningPathResourceItemsManager editMode={editMode} learningPath={learningPath} />
        <LearningPathComplementaryResourcesManager
          editMode={editMode}
          learningPathId={learningPath._id}
          complementaryResources={learningPath.complementaryResources || []}
        />
        <Flex>
          {!learningPath.public && (
            <Button
              size="lg"
              colorScheme="blue"
              onClick={() => updateLearningPath({ variables: { _id: learningPath._id, payload: { public: true } } })}
            >
              Publish
            </Button>
          )}
        </Flex>
      </Stack>
    </PageLayout>
  );
};

const LearningPageRightIcons: React.FC<{ learningPath: LearningPathDataFragment; isDisabled?: boolean }> = ({
  learningPath,
  isDisabled,
}) => {
  const { deleteLearningPath } = useDeleteLearningPath();
  return (
    <DeleteButtonWithConfirmation
      modalHeaderText="Delete Learning Path"
      modalBodyText={`Confirm deleting the learning path "${learningPath.name}" ?`}
      isDisabled={isDisabled}
      onConfirmation={() => deleteLearningPath({ variables: { _id: learningPath._id } }).then(() => Router.back())}
    />
  );
};
