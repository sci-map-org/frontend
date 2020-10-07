import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  CloseButton,
  Flex,
  Spinner,
  Text,
  useToast,
} from '@chakra-ui/core';
import gql from 'graphql-tag';
import { flatten } from 'lodash';
import { useSetConceptsKnownMutation } from '../../graphql/concepts/concepts.operations.generated';
import { ResourcePreviewData } from '../../graphql/resources/resources.fragments';
import { ResourcePreviewDataFragment } from '../../graphql/resources/resources.fragments.generated';
import { ResourcePreviewCard } from './ResourcePreviewCard';
import { useSetResourceConsumedMutation } from './ResourcePreviewCardList.generated';

export const setResourceConsumed = gql`
  mutation setResourceConsumed($resourceId: String!, $consumed: Boolean!) {
    setResourcesConsumed(payload: { resources: [{ resourceId: $resourceId, consumed: $consumed }] }) {
      ...ResourcePreviewData
    }
  }
  ${ResourcePreviewData}
`;

export const ResourcePreviewCardList: React.FC<{
  domainKey: string;
  resourcePreviews: ResourcePreviewDataFragment[];
  isLoading?: boolean;
  onResourceConsumed?: (resource: ResourcePreviewDataFragment, consumed: boolean) => void;
}> = ({ resourcePreviews, domainKey, isLoading, onResourceConsumed }) => {
  const checkedResourceToast = useToast();

  const [setConceptKnown] = useSetConceptsKnownMutation();
  const [setResourceConsumedMutation] = useSetResourceConsumedMutation();
  const setResourceConsumed = async (resource: ResourcePreviewDataFragment, consumed: boolean) => {
    await Promise.all([
      setResourceConsumedMutation({
        variables: {
          resourceId: resource._id,
          consumed,
        },
      }),
      resource.coveredConceptsByDomain && consumed
        ? setConceptKnown({
            variables: {
              payload: {
                concepts: flatten(
                  resource.coveredConceptsByDomain.map(({ coveredConcepts }) => coveredConcepts)
                ).map(({ _id }) => ({ conceptId: _id })),
              },
            },
          }).then(() => {
            // Later, reload everytime we mark a resource as consumed / not consumed, and filter from the backed: will fix all issues
            onResourceConsumed && onResourceConsumed(resource, consumed);
          })
        : undefined,
    ]);
  };
  const handleResourceConsumed = async (resource: ResourcePreviewDataFragment, setResourceConsumedValue: boolean) => {
    await setResourceConsumed(resource, setResourceConsumedValue);
    checkedResourceToast({
      render: ({ onClose, id }) => (
        <Alert
          status="success"
          variant="solid"
          id={id.toString()}
          textAlign="left"
          boxShadow="lg"
          rounded="md"
          alignItems="start"
          m={2}
          pr={8}
        >
          <AlertIcon />
          <Box flexDirection="row" alignItems="baseline" flex="1">
            <AlertDescription>
              The resource was marked as {setResourceConsumedValue ? `consumed` : 'not consumed'}
              <Button
                ml={6}
                size="sm"
                variant="outline"
                onClick={() => setResourceConsumed(resource, !setResourceConsumedValue).then(() => onClose())}
              >
                Undo
              </Button>
            </AlertDescription>
          </Box>
          <CloseButton size="sm" onClick={onClose} position="absolute" right="4px" top="4px" />
        </Alert>
      ),
      position: 'bottom-left',
      duration: 3000,
    });
  };

  if (!isLoading && !resourcePreviews.length)
    return (
      <Flex
        alignItems="center"
        justifyContent="center"
        py="50px"
        backgroundColor="backgroundColor.0"
        borderColor="gray.200"
        borderWidth="1px"
      >
        <Text fontSize="xl" fontStyle="italic">
          No results found
        </Text>
      </Flex>
    );
  return (
    <Flex
      borderTop="1px solid"
      borderTopColor="gray.200"
      direction="column"
      alignItems="stretch"
      backgroundColor="backgroundColor.0"
    >
      {isLoading ? (
        <Flex
          backgroundColor="backgroundColor.0"
          direction="column"
          alignItems="center"
          h="1000px"
          pt="200px"
          borderWidth="1px"
          borderTopWidth="0px"
          borderColor="gray.200"
        >
          <Spinner size="xl" m={4} />
          <Text fontStyle="italic">Finding the most adapted learning resources...</Text>
        </Flex>
      ) : (
        resourcePreviews.map((preview) => (
          <ResourcePreviewCard
            key={preview._id}
            domainKey={domainKey}
            resource={preview}
            onResourceConsumed={handleResourceConsumed}
          />
        ))
      )}
    </Flex>
  );
};
