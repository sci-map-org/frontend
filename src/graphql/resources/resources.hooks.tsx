import { Alert, AlertDescription, AlertIcon, Box, Button, CloseButton, useToast } from '@chakra-ui/core';
import { flatten } from 'lodash';
import { ReactText } from 'react';
import { useSetConceptsKnownMutation } from '../concepts/concepts.operations.generated';
import { ResourceWithCoveredConceptsByDomainDataFragment } from './resources.fragments.generated';
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
  const [setConceptKnown] = useSetConceptsKnownMutation();
  const setResourceConsumed = async (resource: ResourceWithCoveredConceptsByDomainDataFragment, consumed: boolean) => {
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
          })
        : undefined,
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
