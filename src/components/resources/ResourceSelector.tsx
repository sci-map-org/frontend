import {
  Center,
  Divider,
  Flex,
  Heading,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { PropsWithChildren, ReactElement } from 'react';
import {
  ResourceDataFragment,
  ResourcePreviewCardDataFragment,
} from '../../graphql/resources/resources.fragments.generated';
import { NewResourceModal } from './NewResource';
import { ResourceFinder } from './ResourceFinder';
import { useApolloClient } from '@apollo/client';
import {
  GetResourcePreviewDataQuery,
  GetResourcePreviewDataQueryVariables,
  useGetResourcePreviewDataQuery,
} from '../../graphql/resources/resources.operations.generated';
import { getResourcePreviewData } from '../../graphql/resources/resources.operations';

interface GenericResourceSelectorProps<ResourceFragmentType> {
  onSelect: (resource: ResourceFragmentType) => void;
  increaseResourceType: (resourceData: ResourceDataFragment) => ResourceFragmentType | Promise<ResourceFragmentType>;
}
export function GenericResourceSelector<ResourceFragmentType>({
  onSelect,
  increaseResourceType,
}: PropsWithChildren<GenericResourceSelectorProps<ResourceFragmentType>>) {
  return (
    <Flex direction="column" alignItems="stretch">
      <ResourceFinder
        width="100%"
        onSelect={async (resourceData) => onSelect(await increaseResourceType(resourceData))}
      />
      <Divider my={4} />
      <Center>
        <Stack spacing={2} alignItems="center">
          <Heading size="sm">Create New Resource</Heading>
          <NewResourceModal
            renderButton={(onClick) => (
              <IconButton aria-label="Create resource" icon={<AddIcon />} size="lg" isRound mb={3} onClick={onClick} />
            )}
            onResourceCreated={async (resourceData) => onSelect(await increaseResourceType(resourceData))}
          />
        </Stack>
      </Center>
    </Flex>
  );
}

interface GenericResourceSelectorModalProps<ResourceFragmentType>
  extends GenericResourceSelectorProps<ResourceFragmentType> {
  modalHeaderTitle?: string;
  renderTrigger: (args: { openModal: () => void }) => ReactElement;
}
export function GenericResourceSelectorModal<ResourceFragmentType>({
  modalHeaderTitle = 'Add a resource',
  renderTrigger,
  children,
  onSelect,
  ...resourceSelectorProps
}: PropsWithChildren<GenericResourceSelectorModalProps<ResourceFragmentType>>) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {renderTrigger({ openModal: onOpen })}
      <Modal onClose={onClose} size="xl" isOpen={isOpen}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>{modalHeaderTitle}</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={5}>
              <GenericResourceSelector<ResourceFragmentType>
                {...resourceSelectorProps}
                onSelect={(...args) => {
                  onClose();
                  onSelect(...args);
                }}
              />
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
}

export const ResourceSelectorModal: React.FC<Omit<
  GenericResourceSelectorModalProps<ResourceDataFragment>,
  'increaseResourceType'
>> = ({ ...props }) => {
  return <GenericResourceSelectorModal<ResourceDataFragment> {...props} increaseResourceType={(r) => r} />;
};

export const PreviewResourceSelectorModal: React.FC<Omit<
  GenericResourceSelectorModalProps<ResourcePreviewCardDataFragment>,
  'increaseResourceType'
>> = ({ ...props }) => {
  const client = useApolloClient();

  return (
    <GenericResourceSelectorModal<ResourcePreviewCardDataFragment>
      {...props}
      increaseResourceType={async (resourceData) => {
        const { data } = await client.query<GetResourcePreviewDataQuery, GetResourcePreviewDataQueryVariables>({
          query: getResourcePreviewData,
          variables: {
            id: resourceData._id,
          },
        });
        return data.getResourceById;
      }}
    />
  );
};
