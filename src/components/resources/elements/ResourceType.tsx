import {
  Badge,
  BadgeProps,
  Center,
  CenterProps,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Select,
  Text,
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
import { IconProps } from '@chakra-ui/icons';

export const resourceTypeColorMapping: { [key in ResourceType]: string } = {
  [ResourceType.Article]: 'yellow',
  [ResourceType.ArticleSeries]: 'yellow',
  [ResourceType.Book]: 'yellow',
  [ResourceType.OnlineBook]: 'yellow',
  [ResourceType.ResearchPaper]: 'yellow',
  [ResourceType.Podcast]: 'orange',
  [ResourceType.PodcastEpisode]: 'orange',
  [ResourceType.Talk]: 'orange',
  [ResourceType.Course]: 'teal',
  [ResourceType.Tweet]: 'blue',
  [ResourceType.Infographic]: 'blue',
  [ResourceType.Website]: 'blue',
  // [ResourceType.Quizz]: 'gray',
  [ResourceType.Documentary]: 'red',
  [ResourceType.YoutubeVideo]: 'red',
  [ResourceType.YoutubePlaylist]: 'red',
  [ResourceType.Exercise]: 'gray',
  [ResourceType.Project]: 'gray',
  [ResourceType.VideoGame]: 'gray',
  [ResourceType.Other]: 'gray',
};

export const resourceTypeToLabel = (type: ResourceType) => type.split('_').map(upperFirst).join(' ');

//ItemRenderer in DomainRecommendedLearningMaterials copies this style. TODO: refactor
export const ResourceTypeBadge: React.FC<BadgeProps & { type: ResourceType }> = ({ type, ...badgeProps }) => {
  const icon = useMemo(() => {
    return resourceTypeIconMapping[type];
  }, [type]);

  if (!icon) return null;

  return (
    <Flex
      bgColor={`${resourceTypeColorMapping[type]}.400`}
      {...badgeProps}
      direction="row"
      alignItems="stretch"
      borderRadius={3}
      px="4px"
      pt="2px"
      pb="2px"
      opacity={0.96}
    >
      <Center>
        <Icon color="white" as={icon} boxSize="16px" />
      </Center>
      <Center>
        <Text
          ml="6px"
          color="white"
          fontWeight={400}
          textTransform="uppercase"
          letterSpacing="0.11em"
          fontSize="14px"
          lineHeight="14px"
          height="14px"
        >
          {resourceTypeToLabel(type)}
        </Text>
      </Center>
    </Flex>
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

export const ResourceTypeIcon: React.FC<
  { resourceType: ResourceType; boxSize?: IconProps['boxSize'] } & CenterProps
> = ({ resourceType, boxSize, ...centerProps }) => {
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
