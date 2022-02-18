import { CloseIcon, EditIcon, InfoIcon } from '@chakra-ui/icons';
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  ButtonGroup,
  Center,
  Flex,
  FormErrorMessage,
  Heading,
  IconButton,
  Image,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Stack,
  Text,
  Tooltip,
  useDisclosure,
  useOutsideClick,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import gql from 'graphql-tag';
import { omit, pick, uniq, uniqBy } from 'lodash';
import React, { ReactElement, useMemo, useRef, useState } from 'react';
import { ResourceData } from '../../graphql/resources/resources.fragments';
import { ResourceDataFragment } from '../../graphql/resources/resources.fragments.generated';
import { TopicLinkDataFragment } from '../../graphql/topics/topics.fragments.generated';
import { CreateResourcePayload, CreateSubResourcePayload, LearningMaterialTag } from '../../graphql/types';
import { BoxBlockDefaultClickPropagation } from '../lib/BoxBlockDefaultClickPropagation';
import { CollapsedField } from '../lib/fields/CollapsedField';
import { Field } from '../lib/fields/Field';
import { HeartIcon } from '../lib/icons/HeartIcon';
import { useErrorToast } from '../lib/Toasts/ErrorToast';
import { useSuccessfulCreationToast } from '../lib/Toasts/SuccessfulCreationToast';
import { EditLinkStyleProps, FormTitle, ShowedInTopicHeading, ShowedInTopicLink } from '../lib/Typography';
import { TopicBadge } from '../topics/TopicBadge';
import { TopicSelector } from '../topics/TopicSelector';
import { DurationViewer } from './elements/Duration';
import {
  LearningMaterialDescriptionInput,
  RESOURCE_DESCRIPTION_MAX_LENGTH,
} from '../learning_materials/LearningMaterialDescription';
import { ResourceTypeBadge } from './elements/ResourceType';
import { ResourceUrlInput, useAnalyzeResourceUrl } from './elements/ResourceUrl';
import { LearningMaterialDurationField } from './fields/LearningMaterialDurationField';
import { LearningMaterialTagsField } from './fields/LearningMaterialTagsField';
import { ResourceCoveredSubTopicsField } from './fields/ResourceCoveredSubTopicsField';
import { ResourcePrerequisitesField } from './fields/ResourcePrerequisitesField';
import { ResourceTypeField, ResourceTypeSuggestions } from './fields/ResourceTypeField';
import { useCreateResourceMutation } from './NewResource.generated';
import { ResourceListBasicLayout } from './ResourceList';

type SubResourceCreationData = Omit<
  CreateResourcePayload,
  'tags' | 'subResourceSeries' | 'description' | 'showInTopicsIds' | 'coveredSubTopicsIds' | 'prerequisitesTopicsIds'
> & {
  description?: string;
  tags: LearningMaterialTag[];
  showInTopics: TopicLinkDataFragment[];
  coveredSubTopics: TopicLinkDataFragment[];
  prerequisites: TopicLinkDataFragment[];
};

type ResourceCreationData = SubResourceCreationData & {
  subResourceSeries?: SubResourceCreationData[];
};

type FormErrors = { [key in 'name' | 'url' | 'description' | 'types' | 'showInTopics']?: string };

const resourceCreationDataToPayload = (resourceCreationData: ResourceCreationData): CreateResourcePayload => {
  const subResourceSeries: CreateSubResourcePayload[] | undefined = resourceCreationData.subResourceSeries?.map(
    (subResource) => ({
      ...omit(subResource, ['showInTopics', 'prerequisites', 'coveredSubTopics']),
      tags: resourceCreationData.tags.map((t) => t.name),
      showInTopicsIds: subResource.showInTopics.map(({ _id }) => _id),
      prerequisitesTopicsIds: subResource.prerequisites.map(({ _id }) => _id),
      coveredSubTopicsIds: subResource.coveredSubTopics.map(({ _id }) => _id),
    })
  );
  return {
    ...omit(resourceCreationData, ['showInTopics', 'prerequisites', 'coveredSubTopics']),
    tags: resourceCreationData.tags.map((t) => t.name),
    subResourceSeries,
    showInTopicsIds: resourceCreationData.showInTopics.map(({ _id }) => _id),
    prerequisitesTopicsIds: resourceCreationData.prerequisites.map(({ _id }) => _id),
    coveredSubTopicsIds: resourceCreationData.coveredSubTopics.map(({ _id }) => _id),
  };
};
interface StatelessNewResourceFormProps {
  resourceCreationData: SubResourceCreationData;
  updateResourceCreationData: (data: Partial<ResourceCreationData>) => void;
  formErrors: FormErrors;
  showFormErrors: boolean;
  analyzeUrl?: boolean;
}

const StatelessNewResourceForm: React.FC<StatelessNewResourceFormProps> = ({
  resourceCreationData,
  updateResourceCreationData,
  formErrors,
  showFormErrors,
  analyzeUrl,
}) => {
  const { isOpen: prerequisitesFieldIsOpen, onToggle: prerequisitesFieldOnToggle } = useDisclosure();
  const { isOpen: coveredSubTopicsFieldIsOpen, onToggle: coveredSubTopicsFieldOnToggle } = useDisclosure();
  const [selectableResourceTypes, setSelectableResourceTypes] = useState(ResourceTypeSuggestions);
  const [editShowedInTopics, setEditShowedInTopics] = useState(false);
  const formHasErrors = useMemo(() => Object.keys(formErrors).length > 0, [formErrors]);
  const showedInTopicFieldRef = useRef<HTMLDivElement>(null);

  const {
    existingResource,
    isAnalysing,
    isValidUrl,
    reset: resetExistingResource,
  } = useAnalyzeResourceUrl({
    value: resourceCreationData.url,
    enabled: analyzeUrl,
    onAnalyzed: ({ resourceData: analyzedResourceData }) => {
      if (analyzedResourceData) {
        updateResourceCreationData({
          ...(!!analyzedResourceData.name && !resourceCreationData.name && { name: analyzedResourceData.name }),
          ...(!!analyzedResourceData.types && { types: analyzedResourceData.types }),
          ...(!!analyzedResourceData.description &&
            !resourceCreationData.description && { description: analyzedResourceData.description }),
          ...(!!analyzedResourceData.durationSeconds && {
            durationSeconds: analyzedResourceData.durationSeconds,
          }),
          ...(!!analyzedResourceData.subResourceSeries && {
            subResourceSeries: analyzedResourceData.subResourceSeries.map((sub) => ({
              ...pick(sub, ['name', 'url', 'types', 'durationSeconds']),
              tags: [],
              description: sub.description || undefined,
              prerequisites: [],
              coveredSubTopics: [],
              showInTopics: [],
            })),
          }),
        });
        if (analyzedResourceData.types)
          setSelectableResourceTypes(uniq([...selectableResourceTypes, ...analyzedResourceData.types]));
      }
    },
  });

  useOutsideClick({
    ref: showedInTopicFieldRef,
    handler: () => {
      setEditShowedInTopics(false);
    },
    enabled: !!editShowedInTopics,
  });

  return (
    <Flex direction="column" w="100%">
      <Stack spacing={10} alignItems="stretch">
        <Center>
          <Field label="Resource Url" isInvalid={!!formErrors.url && showFormErrors} w="500px" zIndex={1}>
            <ResourceUrlInput
              value={resourceCreationData.url}
              onChange={(url) => updateResourceCreationData({ url })}
              isInvalid={showFormErrors && !!formErrors.url}
              existingResource={existingResource}
              isAnalysing={isAnalysing}
              isValidUrl={!!isValidUrl}
              resetExistingResource={resetExistingResource}
            />
            <FormErrorMessage>The resource's Url is required</FormErrorMessage>
          </Field>
        </Center>
        <Center>
          <Field isInvalid={showFormErrors && !!formErrors.name} label="Title" w="500px">
            <Input
              placeholder="What's the name of this resource ?"
              bgColor="white"
              zIndex={2}
              size="md"
              value={resourceCreationData.name}
              onChange={(e) => updateResourceCreationData({ name: e.target.value })}
              isInvalid={!!formErrors.name && showFormErrors}
            ></Input>
            <FormErrorMessage>You must give a title to the resource</FormErrorMessage>
          </Field>
        </Center>
        <Field label="Description" isInvalid={!!formErrors.description && showFormErrors}>
          <LearningMaterialDescriptionInput
            value={resourceCreationData.description}
            onChange={(d) => updateResourceCreationData({ description: d })}
            isInvalid={!!formErrors.description && showFormErrors}
          />
          <FormErrorMessage>
            Resource Description is too long (max {RESOURCE_DESCRIPTION_MAX_LENGTH} characters)
          </FormErrorMessage>
        </Field>
        <ResourceTypeField
          value={resourceCreationData.types}
          onChange={(types) => updateResourceCreationData({ types })}
          selectableResourceTypes={selectableResourceTypes}
          isInvalid={!!formErrors.types && showFormErrors}
          errorMessage={formErrors.types}
        />
        <LearningMaterialTagsField
          value={resourceCreationData.tags}
          onChange={(tags) => updateResourceCreationData({ tags })}
        />

        <Flex justifyContent="space-between" flexDir="row">
          <Box w="45%">
            <Field label="Show In" isInvalid={!!formErrors.showInTopics && showFormErrors}>
              <Stack pl={3}>
                {editShowedInTopics ? (
                  <Stack ref={showedInTopicFieldRef} w="80%">
                    {resourceCreationData.showInTopics.map((showedInTopic) => (
                      <Stack key={showedInTopic._id} direction="row" alignItems="center">
                        <IconButton
                          size="xs"
                          variant="icon"
                          icon={<CloseIcon />}
                          aria-label="Remove"
                          onClick={() =>
                            updateResourceCreationData({
                              showInTopics: resourceCreationData.showInTopics.filter(
                                (showInTopic) => showInTopic._id !== showedInTopic._id
                              ),
                            })
                          }
                        />
                        <ShowedInTopicHeading pb={1}>{showedInTopic.name}</ShowedInTopicHeading>
                      </Stack>
                    ))}
                    <TopicSelector
                      placeholder="Select a Topic..."
                      onSelect={(selectedTopic) => {
                        updateResourceCreationData({
                          showInTopics: uniqBy(resourceCreationData.showInTopics.concat([selectedTopic]), '_id'),
                        });
                      }}
                    />
                  </Stack>
                ) : (
                  <>
                    {resourceCreationData.showInTopics.map((showedInTopic) => (
                      <ShowedInTopicHeading key={showedInTopic._id} pb={1}>
                        - {showedInTopic.name}
                      </ShowedInTopicHeading>
                    ))}
                    {!resourceCreationData.showInTopics.length && (
                      <Text color="red.500" fontWeight={500}>
                        No Topic selected
                      </Text>
                    )}
                  </>
                )}
              </Stack>
              {!editShowedInTopics && (
                <Link {...EditLinkStyleProps} mt="8px" onClick={() => setEditShowedInTopics(true)} ml="2px">
                  (change)
                </Link>
              )}
              <FormErrorMessage>{formErrors.showInTopics}</FormErrorMessage>
            </Field>
          </Box>
          <Box w="45%">
            <LearningMaterialDurationField
              value={resourceCreationData.durationSeconds}
              onChange={(durationSeconds) => updateResourceCreationData({ durationSeconds })}
            />
          </Box>
        </Flex>
        <Flex justifyContent="space-between" direction="row" pt={4}>
          <Box w="45%">
            <CollapsedField
              label="Select Prerequisites"
              alignLabel="left"
              isOpen={prerequisitesFieldIsOpen}
              onToggle={prerequisitesFieldOnToggle}
            >
              <ResourcePrerequisitesField
                prerequisites={resourceCreationData.prerequisites}
                onAdded={(prereq) =>
                  updateResourceCreationData({
                    prerequisites: uniqBy([...resourceCreationData.prerequisites, prereq], '_id'),
                  })
                }
                onRemove={(prereqIdToRemove) =>
                  updateResourceCreationData({
                    prerequisites: resourceCreationData.prerequisites.filter(
                      (prereq) => prereq._id !== prereqIdToRemove
                    ),
                  })
                }
              />
            </CollapsedField>
          </Box>
          <Box w="45%">
            <CollapsedField
              label="Select SubTopics covered by this Resource"
              isOpen={coveredSubTopicsFieldIsOpen}
              onToggle={coveredSubTopicsFieldOnToggle}
            >
              <ResourceCoveredSubTopicsField
                showedInTopics={resourceCreationData.showInTopics}
                coveredSubTopics={resourceCreationData.coveredSubTopics}
                onAdded={(topic) =>
                  updateResourceCreationData({
                    coveredSubTopics: uniqBy([...resourceCreationData.coveredSubTopics, topic], '_id'),
                  })
                }
                onRemove={(topicId) =>
                  updateResourceCreationData({
                    coveredSubTopics: resourceCreationData.coveredSubTopics.filter(
                      (coveredTopic) => coveredTopic._id !== topicId
                    ),
                  })
                }
              />
            </CollapsedField>
          </Box>
        </Flex>
        {showFormErrors && formHasErrors && (
          <Stack>
            {Object.keys(formErrors).map((formErrorKey) => (
              <Alert key={formErrorKey} status="error">
                <AlertIcon />
                {/* @ts-ignore */}
                {formErrors[formErrorKey]}
              </Alert>
            ))}
          </Stack>
        )}
      </Stack>
    </Flex>
  );
};

type NewResourceValidationRules = 'at least one showIn Topic';
interface NewResourceFormProps {
  createResource: (payload: CreateResourcePayload, options: { recommend: boolean }) => Promise<ResourceDataFragment>;
  onResourceCreated?: (createdResource: ResourceDataFragment) => void;
  onCancel?: () => void;
  defaultResourceCreationData?: Partial<ResourceCreationData>;
  validationRules?: NewResourceValidationRules[];
}

const defaultResourceData: ResourceCreationData = {
  name: '',
  types: [],
  url: '',
  durationSeconds: null,
  tags: [],
  showInTopics: [],
  prerequisites: [],
  coveredSubTopics: [],
};

const computeFormErrors = (
  resourceCreationData: SubResourceCreationData,
  rules: NewResourceValidationRules[]
): FormErrors => {
  let errors: FormErrors = {};
  if (!resourceCreationData.name) errors.name = 'Resource Title is required';
  if (!resourceCreationData.url) errors.url = 'The Url of the resource is required';
  if (resourceCreationData.description && resourceCreationData.description.length > RESOURCE_DESCRIPTION_MAX_LENGTH)
    errors.description = `Resource Description is too long (max ${RESOURCE_DESCRIPTION_MAX_LENGTH} characters)`;
  if (resourceCreationData.types.length < 1) errors.types = 'At least one Resource Type must be selected';
  if (resourceCreationData.types.length > 3) errors.types = 'Maximum 3 Resource Types can be selected';
  if (rules.includes('at least one showIn Topic') && resourceCreationData.showInTopics.length <= 0)
    errors.showInTopics = 'The resource must be shown in at least one Topic';

  return errors;
};
export const NewResourceForm: React.FC<NewResourceFormProps> = ({
  defaultResourceCreationData,
  createResource,
  onResourceCreated,
  onCancel,
  validationRules,
}) => {
  const [isCreating, setIsCreating] = useState<false | 'creating' | 'creating and recommending'>(false);
  const [resourceCreationData, setResourceCreationData] = useState<ResourceCreationData>({
    ...defaultResourceData,
    ...defaultResourceCreationData,
  });
  const [selectedSubResourceIndex, selectSubResourceIndex] = useState<number>();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [showFormErrors, setShowFormErrors] = useState(false);

  const resourceFormErrors = useMemo(
    () => computeFormErrors(resourceCreationData, validationRules || []),
    [
      resourceCreationData.name,
      resourceCreationData.url,
      resourceCreationData.description,
      resourceCreationData.types,
      resourceCreationData.showInTopics,
    ]
  );

  const subResourcesFormErrors = useMemo(
    () => (resourceCreationData.subResourceSeries || []).map((subResource) => computeFormErrors(subResource, [])),
    [resourceCreationData.subResourceSeries]
  );

  const subResourcesHasErrors = useMemo(
    () => subResourcesFormErrors.map((e) => Object.keys(e).length > 0).includes(true),
    [subResourcesFormErrors]
  );

  const hasErrors = useMemo(() => {
    return Object.keys(resourceFormErrors).length > 0 || subResourcesHasErrors;
  }, [resourceFormErrors, subResourcesHasErrors]);

  const onCreate = async (recommend: boolean) => {
    if (hasErrors) return setShowFormErrors(true);
    setIsCreating(recommend ? 'creating and recommending' : 'creating');
    const createdResource = await createResource(resourceCreationDataToPayload(resourceCreationData), {
      recommend,
    });
    setIsCreating(false);
    onResourceCreated && onResourceCreated(createdResource);
  };
  return (
    <Stack spacing={16}>
      <Center pt={16}>
        <FormTitle position="relative" zIndex={1} textAlign="center">
          {!!defaultResourceCreationData?.showInTopics?.length ? (
            <>
              Add Resource to{' '}
              <Text fontWeight={500} color="gray.400">
                {defaultResourceCreationData?.showInTopics[0].name}
              </Text>
            </>
          ) : (
            'New Resource'
          )}
          <Image
            position="absolute"
            src="/images/topostain_teal_add_resource.svg"
            w="220px"
            maxW="220px"
            left="-240px"
            top="-50px"
            zIndex={-1}
          />
        </FormTitle>
      </Center>
      <StatelessNewResourceForm
        resourceCreationData={resourceCreationData}
        updateResourceCreationData={(newData) =>
          setResourceCreationData({
            ...resourceCreationData,
            ...newData,
          })
        }
        formErrors={resourceFormErrors}
        showFormErrors={showFormErrors}
        analyzeUrl
      />
      {resourceCreationData.subResourceSeries && (
        <>
          <ResourceListBasicLayout
            resources={resourceCreationData.subResourceSeries}
            renderTop={(subResource, index) => (
              <Stack direction="row" alignItems="center" spacing={2}>
                <Text fontWeight={500}>{subResource.name}</Text>
                {subResource.types.map((type) => (
                  <ResourceTypeBadge key={type} type={type} />
                ))}
                <DurationViewer value={subResource.durationSeconds} />
              </Stack>
            )}
            renderBottom={(subResource) => (
              <Wrap spacing={2}>
                {subResource.coveredSubTopics.map((topic) => (
                  <WrapItem key={topic._id}>
                    <TopicBadge topic={topic} />
                  </WrapItem>
                ))}
              </Wrap>
            )}
            renderRight={(subResource, index) => (
              <Stack direction="row" alignItems="center" spacing={2}>
                {Object.keys(subResourcesFormErrors[index]).length > 0 && (
                  <Tooltip label="This resource is invalid. Please fix the issues in order to create.">
                    <InfoIcon color="red.500" />
                  </Tooltip>
                )}
                <BoxBlockDefaultClickPropagation display="flex" justifyContent="center" alignItems="center">
                  <IconButton
                    size="xs"
                    aria-label="remove resource"
                    icon={<EditIcon />}
                    onClick={() => {
                      selectSubResourceIndex(index);
                      onOpen();
                    }}
                  />
                </BoxBlockDefaultClickPropagation>
                <BoxBlockDefaultClickPropagation display="flex" justifyContent="center" alignItems="center">
                  <IconButton
                    size="xs"
                    aria-label="remove resource"
                    icon={<CloseIcon />}
                    onClick={() => {
                      const newSubResourceSeries = [
                        ...(resourceCreationData.subResourceSeries as SubResourceCreationData[]),
                      ];
                      newSubResourceSeries.splice(index, 1);
                      setResourceCreationData({ ...resourceCreationData, subResourceSeries: newSubResourceSeries });
                    }}
                  />
                </BoxBlockDefaultClickPropagation>
              </Stack>
            )}
          />
          {typeof selectedSubResourceIndex !== 'undefined' && (
            <Modal onClose={onClose} size="4xl" isOpen={isOpen}>
              <ModalOverlay>
                <ModalContent>
                  <ModalCloseButton />
                  <ModalBody pb={5}>
                    <StatelessNewResourceForm
                      resourceCreationData={resourceCreationData.subResourceSeries[selectedSubResourceIndex]}
                      updateResourceCreationData={(newData) => {
                        const newSubResourceSeries = [
                          ...(resourceCreationData.subResourceSeries as SubResourceCreationData[]),
                        ];
                        newSubResourceSeries[selectedSubResourceIndex] = {
                          ...newSubResourceSeries[selectedSubResourceIndex],
                          ...newData,
                        };
                        setResourceCreationData({ ...resourceCreationData, subResourceSeries: newSubResourceSeries });
                      }}
                      formErrors={subResourcesFormErrors[selectedSubResourceIndex]}
                      showFormErrors={showFormErrors}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button variant="solid" colorScheme="blue" size="lg" onClick={onClose}>
                      Close
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </ModalOverlay>
            </Modal>
          )}
        </>
      )}
      {subResourcesHasErrors && showFormErrors && (
        <Stack>
          {subResourcesFormErrors.map((subResourceFormErrors, subResourceIndex) =>
            Object.keys(subResourceFormErrors).map((formErrorKey) => (
              <Alert key={`${subResourceIndex}_${formErrorKey}`} status="error" overflowWrap="break-word">
                <AlertIcon />
                <Text>
                  <Text fontWeight={500} as="span">
                    SubResource {subResourceIndex + 1}{' '}
                    {resourceCreationData.subResourceSeries &&
                      !!resourceCreationData.subResourceSeries[subResourceIndex]?.name && (
                        <i>({resourceCreationData.subResourceSeries[subResourceIndex].name})</i>
                      )}
                    :{' '}
                  </Text>
                  <Text as="span">
                    {/* @ts-ignore */}
                    {subResourceFormErrors[formErrorKey]}
                  </Text>
                </Text>
              </Alert>
            ))
          )}
        </Stack>
      )}
      <Flex direction="column" alignItems="stretch">
        {hasErrors && showFormErrors && (
          <Text color="red.500" pb={3}>
            Unable to create this Resource. Please fix the errors and try again.
          </Text>
        )}

        <ButtonGroup size="lg" spacing={8} justifyContent="flex-end">
          {!!onCancel && (
            <Button variant="outline" minW="12rem" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button
            isLoading={isCreating === 'creating'}
            minW="12rem"
            px={5}
            colorScheme="blue"
            variant="solid"
            isDisabled={showFormErrors && hasErrors}
            onClick={async () => onCreate(false)}
          >
            Add Resource
          </Button>

          <Button
            isLoading={isCreating === 'creating and recommending'}
            leftIcon={<HeartIcon />}
            minW="12rem"
            colorScheme="teal"
            variant="solid"
            isDisabled={showFormErrors && hasErrors}
            onClick={() => onCreate(true)}
          >
            Add and Recommend
          </Button>
        </ButtonGroup>
      </Flex>
    </Stack>
  );
};

export const createResource = gql`
  mutation createResource($payload: CreateResourcePayload!, $options: CreateResourceOptions) {
    createResource(payload: $payload, options: $options) {
      ...ResourceData
    }
  }
  ${ResourceData}
`;

interface NewResourceProps {
  onResourceCreated?: (createdResource: ResourceDataFragment) => void;
  onCancel?: () => void;
  defaultResourceCreationData?: Partial<ResourceCreationData>;
  validationRules?: NewResourceValidationRules[];
}

export const NewResource: React.FC<NewResourceProps> = ({
  onResourceCreated,
  onCancel,
  defaultResourceCreationData,
  validationRules,
}) => {
  const [createResource] = useCreateResourceMutation();

  const successToast = useSuccessfulCreationToast();
  const errorToast = useErrorToast();
  return (
    <NewResourceForm
      createResource={async (payload, { recommend }) => {
        const { data } = await createResource({ variables: { payload, options: { recommend } } });
        if (!data) {
          errorToast({ title: 'Failed to create the resource. Please try again.' });
          throw new Error('failed to create resource');
        }
        successToast({ title: 'Resource successfully created!' });
        return data.createResource;
      }}
      onResourceCreated={onResourceCreated}
      onCancel={onCancel}
      defaultResourceCreationData={defaultResourceCreationData}
      validationRules={validationRules}
    />
  );
};

export const NewResourceModal: React.FC<{ renderButton: (onClick: () => void) => ReactElement } & NewResourceProps> = ({
  defaultResourceCreationData,
  onResourceCreated,
  renderButton,
  onCancel,
  validationRules,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {renderButton(onOpen)}
      <Modal onClose={onClose} size="5xl" isOpen={isOpen}>
        <ModalOverlay>
          <ModalContent>
            <ModalCloseButton />
            <ModalBody pb={5}>
              <NewResource
                defaultResourceCreationData={defaultResourceCreationData}
                onResourceCreated={(resourceCreated) => {
                  onClose();
                  onResourceCreated && onResourceCreated(resourceCreated);
                }}
                onCancel={() => {
                  onClose();
                  onCancel && onCancel();
                }}
                validationRules={validationRules}
              />
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
};
