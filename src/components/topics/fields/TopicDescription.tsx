import { Button, Center, Flex, Heading, Link, Stack, Text, Textarea, TextProps } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { useState } from 'react';
import { PulledDescription } from '../../../graphql/types';
import { toUrlPreview } from '../../../services/url.service';
import { Field } from '../../lib/fields/Field';
import { useErrorToast } from '../../lib/Toasts/ErrorToast';
import { usePullTopicDescriptionsLazyQuery } from './TopicDescription.generated';

interface TopicDescriptionProps extends TextProps {
  topicDescription?: string;
  placeholder?: string;
}

export const TopicDescription: React.FC<TopicDescriptionProps> = ({ topicDescription, placeholder, ...props }) => {
  if (!topicDescription)
    return placeholder ? (
      <Text fontWeight={300} color="gray.600" {...props}>
        {placeholder}
      </Text>
    ) : null;
  return (
    <Text fontWeight={300} whiteSpace="pre-wrap" {...props}>
      {topicDescription}
    </Text>
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

export const TopicDescriptionField: React.FC<{
  // size?: 'sm' | 'md' | 'lg';
  // noOfLines?: number;
  value?: string | null;
  onChange: (value: string) => void;
  pullDescriptionsQueryData?: { name: string };
  onSelectPulledDescription: (pulledDescription: PulledDescription) => void;
  placeholder?: string;
}> = ({
  value,
  onChange,
  onSelectPulledDescription,
  pullDescriptionsQueryData,
  placeholder = 'Topic description...',
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
        <Textarea
          placeholder={placeholder}
          minH="260px"
          h="unset"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          {...(pulledDescriptions && { w: '50%' })}
        />
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
