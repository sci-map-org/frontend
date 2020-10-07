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
} from '@chakra-ui/core';
import { AddIcon } from '@chakra-ui/icons';
import { ReactElement } from 'react';
import { DomainDataFragment } from '../../graphql/domains/domains.fragments.generated';
import { ResourceDataFragment } from '../../graphql/resources/resources.fragments.generated';
import { NewResourceModal } from './NewResource';
import { ResourceFinder } from './ResourceFinder';

interface ResourceSelectorProps {
  onSelect: (resource: ResourceDataFragment) => void;
  defaultAttachedDomains?: DomainDataFragment[];
}
export const ResourceSelector: React.FC<ResourceSelectorProps> = ({ onSelect, defaultAttachedDomains }) => {
  return (
    <Flex direction="column" alignItems="stretch">
      <ResourceFinder onSelect={onSelect} />
      <Divider my={4} />
      <Center>
        <Stack spacing={2} alignItems="center">
          <Heading size="sm">Create New Resource</Heading>
          <NewResourceModal
            renderButton={(onClick) => (
              <IconButton aria-label="Create resource" icon={<AddIcon />} size="lg" isRound mb={3} onClick={onClick} />
            )}
            defaultAttachedDomains={defaultAttachedDomains}
            onResourceCreated={onSelect}
          />
        </Stack>
      </Center>
    </Flex>
  );
};

export const ResourceSelectorModal: React.FC<
  { renderButton: (args: { openModal: () => void }) => ReactElement } & ResourceSelectorProps
> = ({ renderButton, children, onSelect, ...resourceSelectorProps }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {renderButton({ openModal: onOpen })}
      <Modal onClose={onClose} size="xl" isOpen={isOpen}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>Create new Resource</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={5}>
              <ResourceSelector
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
};
