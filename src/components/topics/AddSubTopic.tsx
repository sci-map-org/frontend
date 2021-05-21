import { CheckIcon, NotAllowedIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  FormControl,
  FormHelperText,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Textarea,
  Tooltip,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { DomainDataFragment, DomainLinkDataFragment } from '../../graphql/domains/domains.fragments.generated';
import {
  useAttachTopicIsSubTopicOfTopicMutation,
  useCheckTopicKeyAvailabilityLazyQuery,
} from '../../graphql/topics/topics.operations.generated';
import { TopicType } from '../../graphql/types';
import { ConceptPagePath, DomainPageInfo } from '../../pages/RoutesPageInfos';
import { generateUrlKey } from '../../services/url.service';
import { getChakraRelativeSize } from '../../util/chakra.util';
import { NewConcept } from '../concepts/NewConcept';
import { DomainSelector } from '../domains/DomainSelector';
import { FormButtons } from '../lib/buttons/FormButtons';
import { DomainIcon } from '../lib/icons/DomainIcon';
import { PageLink } from '../navigation/InternalLink';

interface AddSubTopicProps {
  domain?: DomainLinkDataFragment;
  parentTopicId: string; // add data ?
  size?: 'sm' | 'md' | 'lg';
  onAdded?: () => void;
  onCancel: () => void;
}
export const AddSubTopic: React.FC<AddSubTopicProps> = ({ domain, parentTopicId, size = 'md', onCancel, onAdded }) => {
  const [attachTopicIsSubTopicOfTopic] = useAttachTopicIsSubTopicOfTopicMutation();
  // const [selectedDomain, selectDomain] = useState<DomainDataFragment>();
  const [name, setName] = useState('');
  const [key, setKey] = useState('');
  // const [types, setTypes] = useState(defaultPayload?.types || []);
  const [description, setDescription] = useState<string>();
  const [selectedDomain, selectDomain] = useState<DomainDataFragment | undefined>(domain);

  const [checkTopicKeyAvailability, { loading, data }] = useCheckTopicKeyAvailabilityLazyQuery({
    errorPolicy: 'ignore',
  });

  const [keyValueToCheck] = useDebounce(key, 300);

  useEffect(() => {
    domain &&
      checkTopicKeyAvailability({
        variables: { topicType: TopicType.Concept, domainKey: domain.key, key: keyValueToCheck },
      });
  }, [keyValueToCheck]);
  return (
    <Stack spacing={4} direction="column" alignItems="stretch">
      <Heading>Add subTopic</Heading>
      {!domain && (
        <Flex direction="column">
          <Text fontWeight={600}>
            In:{' '}
            <Text as="span" color="gray.800">
              {selectedDomain && selectedDomain.name}
            </Text>
          </Text>
          <DomainSelector onSelect={(selectedDomain) => selectDomain(selectedDomain)} />
        </Flex>
      )}
      <Input
        placeholder="Topic Name"
        size={size}
        variant="flushed"
        value={name}
        onChange={(e) => {
          if (key === generateUrlKey(name)) setKey(generateUrlKey(e.target.value));
          setName(e.target.value);
        }}
      ></Input>
      <FormControl id="key" size={getChakraRelativeSize(size, -1)}>
        <InputGroup>
          <Input
            placeholder="Topic Url Key"
            size={getChakraRelativeSize(size, -1)}
            variant="flushed"
            value={key}
            onChange={(e) => setKey(e.target.value)}
          ></Input>
          {key && (
            <InputRightElement
              children={
                !!loading ? (
                  <Spinner size="sm" />
                ) : data?.checkTopicKeyAvailability.available ? (
                  <CheckIcon color="green.500" />
                ) : (
                  <Tooltip
                    hasArrow
                    aria-label="Key already in use"
                    label="key already in use"
                    placement="top"
                    bg="red.600"
                  >
                    <NotAllowedIcon color="red.500" />
                  </Tooltip>
                )
              }
            />
          )}
        </InputGroup>
        {key && domain && (
          <FormHelperText fontSize="xs">
            Url will look like{' '}
            <Text as="span" fontWeight={500}>
              {ConceptPagePath(domain.key, key)}
            </Text>
          </FormHelperText>
        )}
      </FormControl>

      <Textarea
        placeholder="Description"
        size={size}
        variant="flushed"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></Textarea>
      {/* Context */}
      {/* Area or not (if no contect) */}
      {/* Name with suggestions */}
      {/*  key, preview*/}
      {/* Description field + suggestions pulled */}
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
            <Box mb={5}>
              <DomainSelector onSelect={(domain) => selectDomain(domain)} />
              {selectedDomain && (
                <Text fontSize="md" fontWeight={500} my={4}>
                  Selected Area: <PageLink pageInfo={DomainPageInfo(selectedDomain)}>{selectedDomain.name}</PageLink>
                </Text>
              )}
            </Box>
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
      </Tabs> */}
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
          <ModalHeader>{props.domain ? `Add a SubTopic` : 'Create new SubTopic'}</ModalHeader>
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
