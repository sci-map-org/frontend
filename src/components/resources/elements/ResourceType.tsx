import {
  Badge,
  BadgeProps,
  Center,
  CenterProps,
  FormControl,
  FormLabel,
  Icon,
  Select,
  Tooltip,
} from '@chakra-ui/react';
import { upperFirst, values } from 'lodash';
import { useMemo } from 'react';
import { BiHeadphone } from '@react-icons/all-files/bi/BiHeadphone';
import { FaGraduationCap } from '@react-icons/all-files/fa/FaGraduationCap';
import { GiMicrophone } from '@react-icons/all-files/gi/GiMicrophone';
import { GoBrowser } from '@react-icons/all-files/go/GoBrowser';
import { ImFilm } from '@react-icons/all-files/im/ImFilm';
import { IconType } from '@react-icons/all-files/lib';
import { RiBookOpenLine } from '@react-icons/all-files/ri/RiBookOpenLine';
import { RiFileTextLine } from '@react-icons/all-files/ri/RiFileTextLine';
import { RiGamepadLine } from '@react-icons/all-files/ri/RiGamepadLine';
import { RiTwitterLine } from '@react-icons/all-files/ri/RiTwitterLine';
import { RiYoutubeFill } from '@react-icons/all-files/ri/RiYoutubeFill';
import { ResourceType } from '../../../graphql/types';
import { InfographicIcon } from '../../lib/icons/InfographicIcon';
import { OnlineBookIcon } from '../../lib/icons/OnlineBookIcon';
import { YoutubePlaylistIcon } from '../../lib/icons/YoutubePlaylistIcon';

export const resourceTypeColorMapping: { [key in ResourceType]: string } = {
  [ResourceType.Article]: 'green',
  [ResourceType.ArticleSeries]: 'green',
  [ResourceType.Course]: 'red',
  [ResourceType.Podcast]: 'yellow',
  [ResourceType.PodcastEpisode]: 'yellow',
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

export const resourceTypeIconMapping: { [key in ResourceType]?: IconType | typeof Icon } = {
  [ResourceType.Article]: RiFileTextLine, // RiArticleLine
  [ResourceType.ArticleSeries]: RiFileTextLine,
  [ResourceType.Course]: FaGraduationCap,
  [ResourceType.Podcast]: BiHeadphone, // or FaMicrophoneAlt (microphone) ?
  [ResourceType.PodcastEpisode]: BiHeadphone,
  // [ResourceType.Other]: , // Find better => nothing ?
  [ResourceType.OnlineBook]: OnlineBookIcon, // RiBookOpenLine,
  [ResourceType.Book]: RiBookOpenLine, // RiBookOpenLine,
  [ResourceType.ResearchPaper]: RiFileTextLine, // to improve
  [ResourceType.Documentary]: ImFilm,
  [ResourceType.Tweet]: RiTwitterLine,
  [ResourceType.Talk]: GiMicrophone,
  [ResourceType.Infographic]: InfographicIcon, //  RiImageLine
  [ResourceType.Website]: GoBrowser, //  GoBrowser CgWebsite IoGlobeOutline
  [ResourceType.YoutubeVideo]: RiYoutubeFill, //RiYoutubeLine
  [ResourceType.YoutubePlaylist]: YoutubePlaylistIcon, // or RiPlayList2Line ?
  [ResourceType.VideoGame]: RiGamepadLine,
};

export const ResourceTypeIcon: React.FC<{ resourceType: ResourceType; boxSize?: string | number } & CenterProps> = ({
  resourceType,
  boxSize,
  ...centerProps
}) => {
  const icon = useMemo(() => {
    return resourceTypeIconMapping[resourceType];
  }, [resourceType]);
  if (!icon) return null;
  return (
    <Tooltip label={resourceTypeToLabel(resourceType)} fontSize="sm">
      <Center {...centerProps}>
        <Icon as={icon} boxSize={boxSize} />
      </Center>
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
