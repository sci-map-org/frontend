import {
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Heading,
  Link,
  Stack,
  Text,
  Textarea,
  TextProps,
} from '@chakra-ui/react';
import gql from 'graphql-tag';
import { debounce } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { PulledDescription } from '../../../graphql/types';
import { toUrlPreview } from '../../../services/url.service';
import { Field } from '../../lib/fields/Field';
import { useErrorToast } from '../../lib/Toasts/ErrorToast';
import { TopicDescriptionStyleProps } from '../../lib/Typography';
import { usePullTopicDescriptionsLazyQuery } from './TopicDescription.generated';

interface TopicDescriptionProps extends TextProps {
  topicDescription?: string;
  placeholder?: string;
  noOfLines?: number;
}

export const TopicDescription: React.FC<TopicDescriptionProps> = ({
  topicDescription,
  placeholder,
  noOfLines,
  ...props
}) => {
  const [clamped, setClamped] = useState(true);
  const [showButton, setShowButton] = useState(true);
  const containerRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const hasClamping = (el: HTMLParagraphElement) => {
      const { clientHeight, scrollHeight } = el;
      return clientHeight !== scrollHeight;
    };

    const checkButtonAvailability = () => {
      if (containerRef.current) {
        // TODO

        // Save current state to reapply later if necessary.
        // const hadClampClass = containerRef.current.classList.contains('clamp');
        // // Make sure that CSS clamping is applied if aplicable.
        // if (!hadClampClass) containerRef.current.classList.add('clamp');
        // Check for clamping and show or hide button accordingly.
        setShowButton(hasClamping(containerRef.current));
        // Sync clamping with local state.
        // if (!hadClampClass) containerRef.current.classList.remove('clamp');
      }
    };

    const debouncedCheck = debounce(checkButtonAvailability, 50);

    checkButtonAvailability();
    window.addEventListener('resize', debouncedCheck);

    return () => {
      window.removeEventListener('resize', debouncedCheck);
    };
  }, [containerRef]);

  if (!topicDescription)
    return placeholder ? (
      <Text fontWeight={500} color="gray.400" {...props}>
        {placeholder}
      </Text>
    ) : null;
  return (
    <Flex direction="column">
      <Text
        ref={containerRef}
        {...TopicDescriptionStyleProps}
        whiteSpace="pre-wrap"
        {...props}
        {...(!!clamped && {
          noOfLines: noOfLines,
          // display: '-webkit-box',
          // overflow: 'hidden',
          // 'text-overflow': 'ellipsis',
          // 'overflow-wrap': 'break-word',
        })}
      >
        {topicDescription}
      </Text>
      {showButton && (
        <Link color="blue.500" fontSize="sm" onClick={() => setClamped(!clamped)} mt="1px">
          {clamped ? 'Read More' : 'Show Less'}
        </Link>
      )}
    </Flex>
  );
};

export const pullTopicDescriptions = gql`
  query pullTopicDescriptions($queryOptions: PullDescriptionsQueryOptions!) {
    pullTopicDescriptions(queryOptions: $queryOptions) {
      sourceUrl
      sourceName
      resultName
      description
    }
  }
`;

export const TOPIC_DESCRIPTION_MAX_LENGTH = 500;

export const TopicDescriptionField: React.FC<{
  value?: string | null;
  onChange: (value: string) => void;
  isInvalid?: boolean;
  pullDescriptionsQueryData?: { name: string };
  onSelectPulledDescription: (pulledDescription: PulledDescription) => void;
  placeholder?: string;
  w?: string;
}> = ({
  value,
  onChange,
  isInvalid,
  onSelectPulledDescription,
  pullDescriptionsQueryData,
  placeholder = 'Topic description...',
  w,
}) => {
  const [pulledDescriptions, setPulledDescriptions] = useState<PulledDescription[]>();

  const errorToast = useErrorToast();
  const [pullTopicDescriptionsLazyQuery, { loading }] = usePullTopicDescriptionsLazyQuery({
    onCompleted(data) {
      setPulledDescriptions(data.pullTopicDescriptions);
    },
    onError() {
      errorToast({ title: 'Failed to pull Topic descriptions' });
    },
  });
  return (
    <Field
      label="Description"
      w={w}
      isInvalid={isInvalid}
      renderTopRight={
        pullDescriptionsQueryData && (
          <Button
            colorScheme="teal"
            isDisabled={!pullDescriptionsQueryData.name}
            size="sm"
            isLoading={loading}
            loadingText="Pulling Descriptions..."
            onClick={async () =>
              pullTopicDescriptionsLazyQuery({
                variables: {
                  queryOptions: {
                    name: pullDescriptionsQueryData.name,
                  },
                },
              })
            }
          >
            Pull Descriptions from Wikipedia
          </Button>
        )
      }
    >
      <Flex direction="row" justifyContent="space-between" alignItems="stretch">
        <FormControl {...(pulledDescriptions && { w: '50%' })}>
          <Textarea
            placeholder={placeholder}
            minH="260px"
            h="unset"
            isInvalid={!!isInvalid}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            {...TopicDescriptionStyleProps}
          />
          <FormHelperText textAlign="right" id="description-helper-text">
            {value ? value.length : 0}/{TOPIC_DESCRIPTION_MAX_LENGTH}
          </FormHelperText>
        </FormControl>
        {pulledDescriptions && (
          <Flex flexGrow={0} w="46%">
            {!pulledDescriptions.length && (
              <Center display="flex" flexDir="column" minW="100%" py={16}>
                <Heading size="lg" color="gray.600">
                  No results found
                </Heading>
                <Text color="gray.400" fontWeight={500} mt={2}>
                  No corresponding Wikipedia topic were found.
                </Text>
              </Center>
            )}
            <Stack w="100%">
              {pulledDescriptions.map((pulledDescription) => (
                <PulledDescriptionOption
                  key={pulledDescription.sourceUrl}
                  pulledDescription={pulledDescription}
                  onSelect={() => onSelectPulledDescription(pulledDescription)}
                />
              ))}
            </Stack>
          </Flex>
        )}
      </Flex>
      <FormErrorMessage>Topic Description is too long</FormErrorMessage>
    </Field>
  );
};

const PulledDescriptionOption: React.FC<{ onSelect: () => void; pulledDescription: PulledDescription }> = ({
  onSelect,
  pulledDescription,
}) => {
  return (
    <Flex direction="row" alignItems="stretch" borderWidth={1} borderColor="gray.400" boxShadow="md" borderRadius={2}>
      <Center px={4} borderColor="gray.400" borderRightWidth={1}>
        <Button colorScheme="blue" onClick={() => onSelect()} size="sm">
          Select
        </Button>
      </Center>
      <Flex direction="column" alignItems="stretch" pl={1} flexGrow={0} overflow="hidden">
        <Flex direction="row" alignItems="baseline" justifyContent="space-between" flexGrow={1} mr="2px">
          {pulledDescription.resultName && (
            <Text size="sm" fontWeight={600} color="gray.700" mr={2} whiteSpace="nowrap">
              {pulledDescription.resultName}
            </Text>
          )}
          <Link
            fontSize="sm"
            color="blue.500"
            href={pulledDescription.sourceUrl}
            isExternal
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            overflow="hidden"
          >
            {toUrlPreview(pulledDescription.sourceUrl, 26)}
          </Link>
        </Flex>
        <Flex direction="column" alignItems="stretch" pt="1px">
          <Text fontWeight={500} color="gray.600" fontSize="xs" h="80px" overflowY="scroll" pr="2px" pb={2}>
            {pulledDescription.description}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
