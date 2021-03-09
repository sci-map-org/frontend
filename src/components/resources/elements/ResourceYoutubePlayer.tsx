import { YouTubePlayerProps } from 'react-player/youtube';
import { ResourceDataFragment } from '../../../graphql/resources/resources.fragments.generated';
import { useSetResourceConsumed } from '../../../graphql/resources/resources.hooks';
import { YoutubePlayer } from '../../lib/YoutubePlayer';

export const ResourceYoutubePlayer: React.FC<
  { resource: ResourceDataFragment } & Omit<YouTubePlayerProps, 'onEnded' | 'videoUrl'>
> = ({ resource, ...props }) => {
  const [setResourceConsumed] = useSetResourceConsumed({
    showNotificationToast: false,
  });
  return <YoutubePlayer videoUrl={resource.url} onEnded={() => setResourceConsumed(resource, true)} {...props} />;
};
