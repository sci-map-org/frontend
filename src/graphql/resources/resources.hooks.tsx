import { Alert, AlertDescription, AlertIcon, Box, Button, CloseButton, useToast } from '@chakra-ui/react';
import { ReactText } from 'react';
import { ResourceLinkDataFragment } from './resources.fragments.generated';
import { useSetResourceConsumedMutation } from './resources.operations.generated';

const ResourceConsumedToastAlert: React.FC<{
  onClose: () => void;
  toastId: ReactText;
  resourceConsumed: boolean;
  onUndo: () => void;
}> = ({ onClose, toastId, resourceConsumed, onUndo }) => {
  return (
    <Alert
      status="success"
      variant="solid"
      id={toastId.toString()}
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
          The resource was marked as {resourceConsumed ? `completed` : 'not completed'}
          <Button
            ml={6}
            size="sm"
            variant="outline"
            onClick={() => {
              onUndo();
              onClose();
            }}
          >
            Undo
          </Button>
        </AlertDescription>
      </Box>
      <CloseButton size="sm" onClick={onClose} position="absolute" right="4px" top="4px" />
    </Alert>
  );
};

export const useSetResourceConsumed = ({
  onResourceConsumed,
  showNotificationToast,
}: {
  onResourceConsumed?: (resourceId: string, consumed: boolean) => void;
  showNotificationToast?: boolean;
}) => {
  const checkedResourceToast = useToast();
  const [setResourceConsumedMutation] = useSetResourceConsumedMutation();
  // const [setConceptKnown] = useSetConceptsKnownMutation();
  const setResourceConsumed = async (resource: Pick<ResourceLinkDataFragment, '_id'>, consumed: boolean) => {
    // const coveredConcepts = flatten(
    //   (resource.coveredConceptsByDomain || []).map(({ coveredConcepts }) => coveredConcepts)
    // );
    await Promise.all([
      setResourceConsumedMutation({
        variables: {
          resourceId: resource._id,
          consumed,
        },
        optimisticResponse: {
          __typename: 'Mutation',
          setResourcesConsumed: [
            {
              ...resource,
              consumed: {
                __typename: 'ConsumedResource',
                consumedAt: consumed ? new Date().toISOString() : null,
                openedAt: null,
              },
            },
          ],
        },
        // refetchQueries: resource.coveredConceptsByDomain?.map(({ domain }) => ({
        //   query: getDomainCompletedLearningMaterialsHistory,
        //   variables: getDomainCompletedLearningMaterialsHistoryQueryVariables(domain.key),
        // })),
      }),
      // coveredConcepts.length && consumed
      //   ? setConceptKnown({
      //       variables: {
      //         payload: {
      //           concepts: coveredConcepts.map(({ _id }) => ({ conceptId: _id })),
      //         },
      //       },
      //     })
      //   : undefined,
    ]);
    showNotificationToast &&
      checkedResourceToast({
        render: ({ onClose, id }) => (
          <ResourceConsumedToastAlert
            onClose={onClose}
            toastId={id}
            resourceConsumed={consumed}
            onUndo={() => setResourceConsumed(resource, !consumed)}
          />
        ),
        position: 'bottom-left',
        duration: 3000,
      });

    onResourceConsumed && onResourceConsumed(resource._id, consumed);
  };
  return [setResourceConsumed];
};
