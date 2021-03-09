import { YouTubePlayerProps } from 'react-player/youtube';
import { ResourceDataFragment } from '../../../graphql/resources/resources.fragments.generated';
import { useSetResourceConsumed } from '../../../graphql/resources/resources.hooks';
import { YoutubePlayer } from '../../lib/YoutubePlayer';
import { useSetResourceOpenedMutation } from '../../../graphql/resources/resources.operations.generated';

export const ResourceYoutubePlayer: React.FC<
  { resource: ResourceDataFragment } & Omit<YouTubePlayerProps, 'onEnded' | 'videoUrl'>
> = ({ resource, ...props }) => {
  const [setResourceConsumed] = useSetResourceConsumed({
    showNotificationToast: false,
  });
  const [setResourceOpened] = useSetResourceOpenedMutation({ variables: { resourceId: resource._id } });
  return (
    <YoutubePlayer
      videoUrl={resource.url}
      onEnded={() => setResourceConsumed(resource, true)}
      onStart={() => {
        if (!resource.consumed || !resource.consumed.openedAt) {
          setResourceOpened();
        }
      }}
      {...props}
    />
  );
};
