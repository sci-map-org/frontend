import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { DomainDataFragment, DomainLinkDataFragment } from '../../graphql/domains/domains.fragments.generated';
import { useAttachTopicIsSubTopicOfTopicMutation } from '../../graphql/topics/topics.operations.generated';
import { DomainPageInfo } from '../../pages/RoutesPageInfos';
import { NewConcept } from '../concepts/NewConcept';
import { DomainSelector } from '../domains/DomainSelector';
import { FormButtons } from '../lib/buttons/FormButtons';
import { DomainIcon } from '../lib/icons/DomainIcon';
import { PageLink } from '../navigation/InternalLink';

interface AddSubTopicProps {
  domain?: DomainLinkDataFragment;
  parentTopicId: string; // add data ?
  // defaultPayload?: Partial<any>; // TODO
  size?: 'sm' | 'md' | 'lg';
  onAdded?: () => void;
  onCancel: () => void;
}
export const AddSubTopic: React.FC<AddSubTopicProps> = ({
  domain,
  parentTopicId,
  // defaultPayload,
  size = 'md',
  onCancel,
  onAdded,
}) => {
  const [attachTopicIsSubTopicOfTopic] = useAttachTopicIsSubTopicOfTopicMutation();
  const [selectedDomain, selectDomain] = useState<DomainDataFragment>();

  return (
    <Stack spacing={4} direction="column" alignItems="stretch">
      <Tabs isFitted variant="soft-rounded" colorScheme="deepBlue">
        <TabList mb="1em">
          <Tab _focus={{}}>New SubTopic</Tab>
          <Tab _focus={{}}>
            <Stack direction="row" alignItems="center">
              <DomainIcon boxSize={5} />
              <Text>Select Area</Text>
            </Stack>
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <NewConcept
              parentTopicId={parentTopicId}
              domain={domain}
              size={size}
              onCancel={onCancel}
              onCreated={() => onAdded && onAdded()}
            />
          </TabPanel>
          <TabPanel>
            <DomainSelector onSelect={(domain) => selectDomain(domain)} />
            {selectedDomain && (
              <Text fontSize="md" fontWeight={500} my={4}>
                Selected Area: <PageLink pageInfo={DomainPageInfo(selectedDomain)}>{selectedDomain.name}</PageLink>
              </Text>
            )}
            <FormButtons
              primaryText="Add SubTopic"
              size={size}
              onPrimaryClick={async () => {
                if (!selectedDomain) return;
                const { data } = await attachTopicIsSubTopicOfTopic({
                  variables: {
                    parentTopicId: parentTopicId,
                    subTopicId: selectedDomain._id,
                    payload: {},
                  },
                });
                onAdded && onAdded();
              }}
              isPrimaryDisabled={!selectedDomain}
              onCancel={onCancel}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  );
};

interface AddSubTopicModalProps extends AddSubTopicProps {
  isOpen: boolean;
  onClose: () => void;
}
export const AddSubTopicModal: React.FC<AddSubTopicModalProps> = ({ isOpen, onClose, onAdded, onCancel, ...props }) => {
  return (
    <Modal onClose={onClose} size="xl" isOpen={isOpen}>
      <ModalOverlay>
        <ModalContent>
          <ModalHeader>{props.domain ? `Add a SubTopic to ${props.domain.name}` : 'Create new SubTopic'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={5}>
            <AddSubTopic
              onAdded={() => {
                onClose();
                onAdded && onAdded();
              }}
              onCancel={() => {
                onClose();
                onCancel && onCancel();
              }}
              {...props}
            />
          </ModalBody>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};
