import ReactPlayer from 'react-player';
import { ResourceDataFragment } from '../../graphql/resources/resources.fragments.generated';

interface YoutubePlayerProps {
  resource: ResourceDataFragment;
  h?: string;
  w?: string;
  playing?: boolean;
  skipThumbnail?: boolean;
}

export const YoutubePlayer: React.FC<YoutubePlayerProps> = ({ resource, h, w, playing, skipThumbnail }) => {
  return <ReactPlayer url={resource.url} light={!skipThumbnail} height={h} width={w} playing={playing} controls />;
};
