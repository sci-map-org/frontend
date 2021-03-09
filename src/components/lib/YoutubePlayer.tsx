import ReactPlayer from 'react-player';
import { ResourceDataFragment } from '../../graphql/resources/resources.fragments.generated';

interface YoutubePlayerProps {
  videoUrl: string;
  h?: string;
  w?: string;
  playing?: boolean;
  skipThumbnail?: boolean;
  onEnded?: () => void;
}

export const YoutubePlayer: React.FC<YoutubePlayerProps> = ({ videoUrl, h, w, playing, onEnded, skipThumbnail }) => {
  return (
    <ReactPlayer
      url={videoUrl}
      light={!skipThumbnail}
      height={h}
      width={w}
      playing={playing}
      controls
      onEnded={onEnded}
    />
  );
};
