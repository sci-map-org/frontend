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
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { useDisclosure } from '@chakra-ui/hooks';
import { useAttachTopicIsSubTopicOfTopicMutation } from '../../graphql/topics/topics.operations.generated';
import { DomainIcon } from '../lib/icons/DomainIcon';

interface AddSubTopicProps {
  parentTopicId: string; // add data ?
  size?: 'sm' | 'md' | 'lg';
  onAdded?: () => void;
  onCancel: () => void;
}
export const AddSubTopic: React.FC<AddSubTopicProps> = ({ parentTopicId, size = 'md', onCancel, onAdded }) => {
  const [attachTopicIsSubTopicOfTopic] = useAttachTopicIsSubTopicOfTopicMutation();

  return (
    <Stack spacing={4} direction="column" alignItems="stretch">
      {/* <Tabs isFitted variant="soft-rounded" colorScheme="deepBlue">
        <TabList mb="1em">
          <Tab _focus={{}}>New SubTopic</Tab>
          <Tab _focus={{}}>
            <Stack direction="row" alignItems="center">
              <DomainIcon boxSize={5} />
              <Text>Select Area</Text>
            </Stack>
          </Tab>
        </TabList>
        <TabPanels> */}
      {/*<TabPanel>
             <NewConcept
              parentTopicId={parentTopicId}
              domain={domain}
              size={size}
              onCancel={onCancel}
              onCreated={() => onAdded && onAdded()}
            />
          </TabPanel> */}
      {/* <TabPanel> */}
      {/* <Box mb={5}>
              <DomainSelector onSelect={(domain) => selectDomain(domain)} />
              {selectedDomain && (
                <Text fontSize="md" fontWeight={500} my={4}>
                  Selected Area: <PageLink pageInfo={DomainPageInfo(selectedDomain)}>{selectedDomain.name}</PageLink>
                </Text>
              )}
            </Box> */}
      {/* <FormButtons
              primaryText="Add SubTopic"
              size={size}
              onPrimaryClick={async () => {
                // if (!selectedDomain) return;
                const { data } = await attachTopicIsSubTopicOfTopic({
                  variables: {
                    parentTopicId: parentTopicId,
                    // subTopicId: selectedDomain._id,
                    payload: {},
                  },
                });
                onAdded && onAdded();
              }}
              // isPrimaryDisabled={!selectedDomain}
              onCancel={onCancel}
            />
          </TabPanel> */}
      {/* </TabPanels> */}
      {/* </Tabs> */}
    </Stack>
  );
};

interface AddSubTopicModalProps extends Omit<AddSubTopicProps, 'onCancel'> {
  onCancel?: () => void;
  onAdded?: () => void;
  renderButton: (openModal: () => void) => ReactNode;
}

export const AddSubTopicModal: React.FC<AddSubTopicModalProps> = ({ renderButton, onCancel, onAdded, ...props }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {renderButton(onOpen)}
      {isOpen && (
        <Modal onClose={onClose} size="xl" isOpen={isOpen}>
          <ModalOverlay>
            <ModalContent>
              <ModalHeader>Add SubTopic</ModalHeader>
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
      )}
    </>
  );
};
