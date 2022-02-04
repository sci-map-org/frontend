import gql from 'graphql-tag';
import { useSetResourceConsumed } from '../../../graphql/resources/resources.hooks';
import { useCurrentUser } from '../../../graphql/users/users.hooks';
import { useUnauthentificatedModal } from '../../auth/UnauthentificatedModal';
import { CompletedCheckbox, CompletedCheckboxProps } from '../../lib/CompletedCheckbox';
import { ResourceCompletedCheckboxDataFragment } from './ResourceCompletedCheckbox.generated';

export const ResourceCompletedCheckboxData = gql`
  fragment ResourceCompletedCheckboxData on Resource {
    _id
    consumed {
      consumedAt
      openedAt
    }
  }
`;
export const ResourceCompletedCheckbox: React.FC<
  {
    resource: ResourceCompletedCheckboxDataFragment;
    onResourceConsumed?: (resourceId: string, consumed: boolean) => void;
    isLoading?: boolean;
    showCompletedNotificationToast?: boolean;
  } & Omit<
    CompletedCheckboxProps,
    'resource' | 'onChange' | 'isChecked' | 'tooltipLabel' | 'tooltipDelay' | 'isDisabled'
  >
> = ({ resource, onResourceConsumed, showCompletedNotificationToast, isLoading, ...checkboxProps }) => {
  const { currentUser } = useCurrentUser();
  const [setResourceConsumed] = useSetResourceConsumed({
    onResourceConsumed,
    showNotificationToast: !!showCompletedNotificationToast,
  });
  const unauthentificatedModalDisclosure = useUnauthentificatedModal();
  return (
    <CompletedCheckbox
      tooltipLabel={!!resource.consumed && !!resource.consumed.consumedAt ? undefined : 'Mark as completed'}
      tooltipDelay={1000}
      isDisabled={isLoading}
      isChecked={!isLoading && !!resource.consumed && !!resource.consumed.consumedAt}
      onChange={async () => {
        if (!currentUser) return unauthentificatedModalDisclosure.onOpen();
        await setResourceConsumed(resource, !resource.consumed || !resource.consumed.consumedAt);
        onResourceConsumed && onResourceConsumed(resource._id, !resource.consumed || !resource.consumed.consumedAt);
      }}
      {...checkboxProps}
    />
  );
};
