import { Badge, BadgeProps, FormControl, FormLabel, Select, Icon, Tooltip } from '@chakra-ui/react';
import { upperFirst, values } from 'lodash';
import {
  RiArticleLine,
  RiBookOpenLine,
  RiFileTextLine,
  RiGamepadLine,
  RiTwitterLine,
  RiVolumeDownFill,
  RiYoutubeFill,
  RiYoutubeLine,
} from 'react-icons/ri';
import { IoGlobeOutline } from 'react-icons/io5';
import { CgWebsite } from 'react-icons/cg';
import { GoBrowser } from 'react-icons/go';
import { FaGraduationCap } from 'react-icons/fa';
import { GiMicrophone } from 'react-icons/gi';
import { IconType } from 'react-icons/lib';
import { BiHeadphone } from 'react-icons/bi';
import { ResourceType } from '../../../graphql/types';
import { ImFilm } from 'react-icons/im';
import { YoutubePlaylistIcon } from '../../lib/icons/YoutubePlaylistIcon';
import { useMemo } from 'react';
import { InfographicIcon } from '../../lib/icons/InfographicIcon';
import { OnlineBookIcon } from '../../lib/icons/OnlineBookIcon';

export const resourceTypeColorMapping: { [key in ResourceType]: string } = {
  [ResourceType.Article]: 'green',
  [ResourceType.ArticleSeries]: 'green',
  [ResourceType.Course]: 'red',
  [ResourceType.Podcast]: 'yellow',
  [ResourceType.PodcastEpisode]: 'yellow',
  [ResourceType.PodcastSeries]: 'yellow', //to remove
  [ResourceType.Other]: 'gray',
  [ResourceType.OnlineBook]: 'red',
  [ResourceType.Book]: 'red',
  [ResourceType.ResearchPaper]: 'blue',
  [ResourceType.Documentary]: 'blue',
  [ResourceType.Tweet]: 'blue',
  [ResourceType.Talk]: 'orange',
  [ResourceType.Infographic]: 'yellow',
  [ResourceType.Website]: 'blue',
  [ResourceType.YoutubeVideo]: 'red',
  [ResourceType.YoutubePlaylist]: 'red',
  [ResourceType.YoutubeVideoSeries]: 'red', // to remove
  [ResourceType.VideoGame]: 'yellow',
};

export const resourceTypeToLabel = (type: ResourceType) => type.split('_').map(upperFirst).join(' ');

//ItemRenderer in DomainRecommendedLearningMaterials copies this style. TODO: refactor
export const ResourceTypeBadge: React.FC<BadgeProps & { type: ResourceType }> = ({ type, ...badgeProps }) => {
  return (
    <Badge colorScheme={resourceTypeColorMapping[type]} {...badgeProps}>
      {resourceTypeToLabel(type)}
    </Badge>
  );
};

export const resourceTypeIconMapping: { [key in ResourceType]: IconType | typeof Icon } = {
  [ResourceType.Article]: RiFileTextLine, //RiArticleLine
  [ResourceType.ArticleSeries]: RiFileTextLine,
  [ResourceType.Course]: FaGraduationCap, // Find better
  [ResourceType.Podcast]: BiHeadphone, // or FaMicrophoneAlt (microphone) ?
  [ResourceType.PodcastSeries]: BiHeadphone, // to remove
  [ResourceType.PodcastEpisode]: BiHeadphone,
  [ResourceType.Other]: RiVolumeDownFill, // Find better => nothing ?
  [ResourceType.OnlineBook]: OnlineBookIcon, // RiBookOpenLine,
  [ResourceType.Book]: RiBookOpenLine, // RiBookOpenLine,
  [ResourceType.ResearchPaper]: RiFileTextLine, // to improve
  [ResourceType.Documentary]: ImFilm,
  [ResourceType.Tweet]: RiTwitterLine,
  [ResourceType.Talk]: GiMicrophone, // Find better
  [ResourceType.Infographic]: InfographicIcon, // Find better RiImageLine
  [ResourceType.Website]: GoBrowser, //  GoBrowser CgWebsite IoGlobeOutline
  [ResourceType.YoutubeVideo]: RiYoutubeFill, //RiYoutubeLine
  [ResourceType.YoutubePlaylist]: YoutubePlaylistIcon, // or RiPlayList2Line ?
  [ResourceType.YoutubeVideoSeries]: YoutubePlaylistIcon, // tp remove
  [ResourceType.VideoGame]: RiGamepadLine,
};

export const ResourceTypeIcon: React.FC<{ resourceType: ResourceType; boxSize?: string | number }> = ({
  resourceType,
  boxSize,
}) => {
  const icon = useMemo(() => {
    return resourceTypeIconMapping[resourceType];
  }, [resourceType]);
  if (!icon) return null;
  return (
    <Tooltip label={resourceTypeToLabel(resourceType)} fontSize="sm">
      <span>
        <Icon as={icon} boxSize={boxSize} />
      </span>
    </Tooltip>
  );
};

export const ResourceTypeSelector: React.FC<{ value: ResourceType; onSelect: (type: ResourceType) => void }> = ({
  onSelect,
  value,
}) => {
  return (
    <FormControl display="flex" flexDirection="row" alignItems="baseline" isRequired isInvalid={!value}>
      <FormLabel htmlFor="type">Type</FormLabel>
      <Select
        id="type"
        placeholder="Select Type"
        value={value}
        variant="filled"
        flexBasis="200px"
        onChange={(e) => onSelect(e.target.value as ResourceType)}
      >
        {values(ResourceType).map((type) => (
          <option key={type} value={type}>
            {resourceTypeToLabel(type)}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};
