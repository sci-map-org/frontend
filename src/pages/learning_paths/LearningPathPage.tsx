import { EditIcon } from '@chakra-ui/icons';
import {
  AvatarGroup,
  Badge,
  Box,
  Center,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Heading,
  IconButton,
  SimpleGrid,
  Skeleton,
  SlideFade,
  Stack,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import gql from 'graphql-tag';
import Router from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import { RoleAccess } from '../../components/auth/RoleAccess';
import { PageLayout } from '../../components/layout/PageLayout';
import {
  LearningMaterialStarsRater,
  StarsRatingViewer,
} from '../../components/learning_materials/LearningMaterialStarsRating';
import { EditableLearningMaterialTags } from '../../components/learning_materials/LearningMaterialTagsEditor';
import { LearningPathComplementaryResourcesManager } from '../../components/learning_paths/LearningPathComplementaryResourcesManager';
import {
  LearningPathCompletion,
  LearningPathCompletionData,
} from '../../components/learning_paths/LearningPathCompletion';
import { LearningPathResourceItemsManager } from '../../components/learning_paths/LearningPathResourceItems';
import { DeleteButtonWithConfirmation } from '../../components/lib/buttons/DeleteButtonWithConfirmation';
import { EditableTextarea } from '../../components/lib/inputs/EditableTextarea';
import { EditableDuration } from '../../components/resources/elements/Duration';
import { LearningMaterialCoveredTopics } from '../../components/resources/LearningMaterialCoveredTopics';
import { SquareResourceCardData } from '../../components/resources/SquareResourceCard';
import { UserAvatar, UserAvatarData } from '../../components/users/UserAvatar';
import { generateConceptData } from '../../graphql/concepts/concepts.fragments';
import { generateDomainData } from '../../graphql/domains/domains.fragments';
import { LearningMaterialWithCoveredConceptsByDomainData } from '../../graphql/learning_materials/learning_materials.fragments';
import {
  generateLearningPathData,
  LearningPathWithResourceItemsPreviewData,
} from '../../graphql/learning_paths/learning_paths.fragments';
import { LearningPathDataFragment } from '../../graphql/learning_paths/learning_paths.fragments.generated';
import { useDeleteLearningPath } from '../../graphql/learning_paths/learning_paths.hooks';
import { useUpdateLearningPathMutation } from '../../graphql/learning_paths/learning_paths.operations.generated';
import { generateResourcePreviewData } from '../../graphql/resources/resources.fragments';
import { UserRole } from '../../graphql/types';
import { useCurrentUser } from '../../graphql/users/users.hooks';
import { PageInfo } from '../PageInfo';
import { GetLearningPathPageQuery, useGetLearningPathPageQuery } from './LearningPathPage.generated';
import { LearningPathPublishButton } from './LearningPathPublishButton';

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
        ...SquareResourceCardData
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
  ${SquareResourceCardData}
  ${LearningPathCompletionData}
  ${UserAvatarData}
`;

const learningPathPlaceholder: GetLearningPathPageQuery['getLearningPathByKey'] = {
  ...generateLearningPathData(),
  durationMs: 100000,
  tags: [{ name: 'tag 1' }],
  public: true,
  rating: 4.5,
  coveredConceptsByDomain: [
    {
      domain: generateDomainData(),
      coveredConcepts: [generateConceptData(), generateConceptData(), generateConceptData()],
    },
  ],
  resourceItems: [
    {
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
      resource: generateResourcePreviewData(),
      learningPathId: 'id',
    },
    {
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
      resource: generateResourcePreviewData(),
      learningPathId: 'id',
    },
    {
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
      resource: generateResourcePreviewData(),
      learningPathId: 'id',
    },
  ],
};

export const LearningPathPage: React.FC<{ learningPathKey: string }> = ({ learningPathKey }) => {
  const [updateLearningPath] = useUpdateLearningPathMutation();
  const { data, loading, error } = useGetLearningPathPageQuery({
    variables: { key: learningPathKey },
  });
  const learningPath = data?.getLearningPathByKey || learningPathPlaceholder;
  const { currentUser } = useCurrentUser();
  const currentUserIsOwner = useMemo(
    () => !!learningPath.createdBy && !!currentUser && learningPath.createdBy._id === currentUser._id,
    [learningPath, currentUser]
  );

  const currentUserStartedPath = useMemo(() => !!learningPath.started, [learningPath]); // always true ?

  const currentUserCompletedPath = useMemo(
    () =>
      currentUserStartedPath &&
      !!learningPath.resourceItems?.length &&
      learningPath.resourceItems.every(({ resource }) => resource.consumed?.consumedAt),
    [currentUserStartedPath, learningPath.resourceItems]
  );
  const otherUsersInPath = useMemo(
    () =>
      learningPath.startedBy && currentUser
        ? learningPath.startedBy.items.filter(({ user }) => user._id !== currentUser._id)
        : [],
    [currentUser, learningPath.startedBy]
  );
  const [editMode, setEditMode] = useState(currentUserIsOwner);
  if (error) return null;
  return (
    <PageLayout
      isLoading={loading}
      centerChildren
      renderTopRight={
        <LearningPageRightIcons
          learningPath={learningPath}
          currentUserIsOwner={currentUserIsOwner}
          isDisabled={loading}
          editMode={editMode}
          setEditMode={setEditMode}
        />
      }
    >
      <Stack
        width={{ base: '96%', md: '86%' }}
        maxWidth={{
          base: '100%',
          md: '1800px',
        }}
      >
        <Center>
          <LearningPathEditableName
            name={learningPath.name}
            isLoading={loading}
            onChange={(newName) =>
              updateLearningPath({ variables: { _id: learningPath._id, payload: { name: newName } } })
            }
            editMode={editMode}
          />
        </Center>
        <Flex direction="row">
          <Stack width="25%" spacing={4} minWidth="260px">
            <Center>
              <EditableDuration
                defaultValue={learningPath.durationMs}
                onSubmit={(newDuration) =>
                  newDuration !== learningPath.durationMs &&
                  updateLearningPath({
                    variables: { _id: learningPath._id, payload: { durationMs: newDuration } },
                  })
                }
                placeholder="Estimated Duration"
                isDisabled={!editMode}
                isLoading={loading}
              />
            </Center>
            <Center>
              <EditableLearningMaterialTags
                justify="center"
                learningMaterial={learningPath}
                isLoading={loading}
                isDisabled={!editMode}
                placeholder="Add tags"
              />
            </Center>
          </Stack>
          <Stack flexGrow={1}>
            <Stack direction="row" justifyContent="center" spacing={2} alignItems="center">
              <StarsRatingViewer value={learningPath.rating} isLoading={loading} />
              <RoleAccess accessRule="contributorOrAdmin">
                <LearningMaterialStarsRater learningMaterialId={learningPath._id} isDisabled={loading} />
              </RoleAccess>
            </Stack>
            <Skeleton isLoaded={!loading}>
              <EditableTextarea
                textAlign="center"
                justifyContent="center"
                px={4}
                backgroundColor="backgroundColor.0"
                fontSize="lg"
                fontWeight={300}
                color="gray.700"
                defaultValue={learningPath.description || ''}
                placeholder="Add a description..."
                onSubmit={(newDescription: any) =>
                  updateLearningPath({
                    variables: {
                      _id: learningPath._id,
                      payload: { description: (newDescription as string) || null },
                    },
                  })
                }
                isDisabled={!editMode}
              />
            </Skeleton>
          </Stack>
          <Flex width="25%" minWidth="260px" direction="column" alignItems="flex-end">
            <Stack w="260px" spacing={3}>
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
        <Flex justifyContent="space-between">
          <LearningPathCompletion learningPath={learningPath} isLoading={loading} />
          <Stack>
            {learningPath.createdBy && (
              <Center>
                {currentUserIsOwner ? (
                  <Center flexDirection="column">
                    <Text fontWeight={300}>You are the owner</Text>

                    {learningPath.public ? (
                      <Badge colorScheme="green">PUBLIC</Badge>
                    ) : (
                      <LearningPathPublishButton size="md" learningPath={learningPath} />
                    )}
                  </Center>
                ) : (
                  <Stack spacing={1}>
                    <Text fontWeight={300}>Created By</Text>
                    <Center>
                      <UserAvatar size="sm" user={learningPath.createdBy} />
                    </Center>
                    {currentUserIsOwner && <Badge colorScheme="green">PUBLIC</Badge>}
                  </Stack>
                )}
              </Center>
            )}
            {otherUsersInPath.length && (currentUserIsOwner || otherUsersInPath.length > 4) && (
              <Center>
                <Stack spacing={1}>
                  <Text fontWeight={300}>
                    Path taken by {otherUsersInPath.length} {otherUsersInPath.length === 1 ? 'user' : 'users'}
                  </Text>
                  <AvatarGroup alignSelf="center" spacing={-3} size="sm" max={3}>
                    {otherUsersInPath.map(({ user }) => (
                      <UserAvatar key={user._id} user={user} />
                    ))}
                  </AvatarGroup>
                </Stack>
              </Center>
            )}
          </Stack>
        </Flex>
        <LearningPathResourceItemsManager
          editMode={editMode}
          learningPath={learningPath}
          isLoading={loading}
          currentUserStartedPath={currentUserStartedPath}
        />
        <SimpleGrid pt={5} columns={{ base: 1, md: currentUserCompletedPath ? 2 : 1 }} spacing={10}>
          {currentUserCompletedPath && (
            <SlideFade in={currentUserCompletedPath}>
              <Stack direction="column">
                <Heading color="teal.500" size="md" textAlign="center">
                  Congratulations!
                </Heading>
                <Text textAlign="center">You just finished this learning path!</Text>
                {!currentUserIsOwner && (
                  <>
                    <Text textAlign="center" mt={3}>
                      Let the creator know if this was useful for you by leaving a rating:
                    </Text>
                    <Center pt={3}>
                      <Stack direction="row" alignItems="center" spacing={3}>
                        <StarsRatingViewer value={learningPath.rating} isLoading={loading} />
                        <LearningMaterialStarsRater
                          buttonText="Rate this path"
                          learningMaterialId={learningPath._id}
                          isDisabled={loading}
                          size="md"
                        />
                      </Stack>
                    </Center>
                  </>
                )}
              </Stack>
            </SlideFade>
          )}

          <LearningPathComplementaryResourcesManager
            editMode={editMode}
            learningPathId={learningPath._id}
            complementaryResources={learningPath.complementaryResources || []}
            isLoading={loading}
          />
        </SimpleGrid>

        <Flex>{!learningPath.public && <LearningPathPublishButton learningPath={learningPath} />}</Flex>
      </Stack>
    </PageLayout>
  );
};

const LearningPageRightIcons: React.FC<{
  learningPath: LearningPathDataFragment;
  isDisabled?: boolean;
  currentUserIsOwner: boolean;
  setEditMode: (editMode: boolean) => void;
  editMode: boolean;
}> = ({ learningPath, isDisabled, currentUserIsOwner, editMode, setEditMode }) => {
  const { deleteLearningPath } = useDeleteLearningPath();
  const { currentUser } = useCurrentUser();
  return currentUser && (currentUserIsOwner || currentUser.role === UserRole.Admin) ? (
    <Stack direction="row" spacing={3}>
      <Stack direction="row" spacing={0}>
        <Tooltip label="Preview Mode" aria-label="preview learning path">
          <IconButton
            aria-label="view mode"
            size="md"
            variant="ghost"
            onClick={() => setEditMode(false)}
            isActive={!editMode}
            icon={<AiOutlineEye />}
            _focus={{}}
          />
        </Tooltip>
        <Tooltip label="Edit Mode" aria-label="edit learning path">
          <IconButton
            aria-label="edit mode"
            size="md"
            onClick={() => setEditMode(true)}
            variant="ghost"
            isActive={editMode}
            icon={<EditIcon />}
            _focus={{}}
          />
        </Tooltip>
      </Stack>

      <DeleteButtonWithConfirmation
        variant="outline"
        size="md"
        modalHeaderText="Delete Learning Path"
        modalBodyText={`Confirm deleting the learning path "${learningPath.name}" ?`}
        isDisabled={isDisabled}
        onConfirmation={() => deleteLearningPath({ variables: { _id: learningPath._id } }).then(() => Router.back())}
      />
    </Stack>
  ) : null;
};

const LearningPathEditableName: React.FC<{
  name: string;
  isLoading?: boolean;
  onChange: (newName: string) => void;
  editMode?: boolean;
}> = ({ name, isLoading, onChange, editMode }) => {
  const [updatedName, setUpdatedName] = useState(name);
  useEffect(() => {
    setUpdatedName(name);
  }, [name]);
  return (
    <Skeleton isLoaded={!isLoading}>
      <Editable
        value={updatedName}
        onChange={setUpdatedName}
        fontSize="5xl"
        fontWeight={600}
        color="gray.700"
        isPreviewFocusable={false}
        lineHeight="52px"
        onSubmit={onChange}
        textAlign="center"
        variant="solid"
        display="flex"
        isDisabled={!editMode}
      >
        {(props: any) => (
          <>
            {!props.isEditing && editMode && (
              <Box w="24px" /> // used to center the title properly. Change when changing the size of the edit icon button
            )}
            <EditablePreview />
            {!props.isEditing && editMode && (
              <IconButton
                aria-label="t"
                icon={<EditIcon />}
                onClick={props.onEdit}
                size="xs"
                color="gray.700"
                variant="ghost"
                alignSelf="end"
              />
            )}
            <EditableInput />
          </>
        )}
      </Editable>
    </Skeleton>
  );
};
