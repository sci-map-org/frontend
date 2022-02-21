import { Icon, IconProps } from '@chakra-ui/icons';
import { BadgeProps, Center, CenterProps, ComponentWithAs, Flex, FlexProps, Text, Tooltip } from '@chakra-ui/react';
import { BiHeadphone } from '@react-icons/all-files/bi/BiHeadphone';
import { BsPencil } from '@react-icons/all-files/bs/BsPencil';
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
import { upperFirst } from 'lodash';
import React, { useMemo } from 'react';
import { ResourceType } from '../../graphql/types';
import { InfographicIcon } from '../lib/icons/InfographicIcon';
import { LearningPathIcon } from '../lib/icons/LearningPathIcon';
import { OnlineBookIcon } from '../lib/icons/OnlineBookIcon';
import { ResourceIcon } from '../lib/icons/ResourceIcon';
import { YoutubePlaylistIcon } from '../lib/icons/YoutubePlaylistIcon';

export type LearningMaterialType = ResourceType | 'LearningPath';

// label
export const resourceTypeToLabel = (type: ResourceType) => type.split('_').map(upperFirst).join(' ');

export const learningMaterialTypeToLabel = (type: LearningMaterialType) =>
  type === 'LearningPath' ? 'Learning Path' : resourceTypeToLabel(type);

// icons
export const learningMaterialTypeIconMapping: { [key in LearningMaterialType]: IconType | typeof Icon | null } = {
  LearningPath: LearningPathIcon,
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
  [ResourceType.Project]: BsPencil,
  [ResourceType.Exercise]: BsPencil,
  [ResourceType.VideoGame]: RiGamepadLine,
  [ResourceType.Other]: null,
};

const defaultResourceTypeIcon = ResourceIcon;

export const getLearningMaterialTypeIcon = (type: LearningMaterialType): IconType | typeof Icon =>
  learningMaterialTypeIconMapping[type] || defaultResourceTypeIcon;

type LearningMaterialTypeBadgeColor = 'yellow' | 'orange' | 'teal' | 'blue' | 'red' | 'darkGray' | 'lightGray';

export const LearningMaterialTypeToBadgeColorMapping: {
  [key in LearningMaterialType]: LearningMaterialTypeBadgeColor;
} = {
  LearningPath: 'teal',
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
  [ResourceType.Exercise]: 'darkGray',
  [ResourceType.Project]: 'darkGray',
  [ResourceType.VideoGame]: 'darkGray',
  [ResourceType.Other]: 'lightGray',
};

export const LearningMaterialBadgeColorToCssColorMapping: {
  [key in LearningMaterialTypeBadgeColor]: BadgeProps['color'];
} = {
  yellow: 'yellow.400',
  orange: 'orange.400',
  teal: 'teal.400',
  blue: 'blue.400',
  red: 'red.400',
  darkGray: 'gray.700',
  lightGray: 'gray.500',
};

export const LearningMaterialTypeIcon: React.FC<
  { type: LearningMaterialType; boxSize?: IconProps['boxSize'] } & CenterProps
> = ({ type, boxSize, ...centerProps }) => {
  const icon = useMemo(() => getLearningMaterialTypeIcon(type), [type]);

  return (
    <Tooltip label={learningMaterialTypeToLabel(type)} fontSize="sm">
      <Center {...centerProps}>
        <Icon as={icon} boxSize={boxSize} />
      </Center>
    </Tooltip>
  );
};

export const LearningMaterialTypeBadge: React.FC<
  Omit<FlexProps, 'color'> & { type: LearningMaterialType; size?: keyof typeof LearningMaterialTypeBadgeSizesMapping }
> = ({ type, onClick, size = 'md', ...badgeProps }) => {
  const icon = useMemo(() => {
    return learningMaterialTypeIconMapping[type] || defaultResourceTypeIcon;
  }, [type]);

  return (
    <LearningMaterialTypeBaseBadge
      name={learningMaterialTypeToLabel(type)}
      icon={icon}
      onClick={onClick}
      size={size}
      {...(onClick && {
        _hover: {
          cursor: 'pointer',
        },
      })}
      color={LearningMaterialTypeToBadgeColorMapping[type]}
      {...badgeProps}
    />
  );
};

export const LearningMaterialTypeBadgeSizesMapping = {
  sm: {
    container: {
      borderRadius: 3,
      px: '3px',
      pt: '2px',
      pb: '2px',
    },
    icon: {
      boxSize: '13px',
    },
    spacing: '4px',
    label: {
      letterSpacing: '0.07em',
      fontSize: '12px',
      lineHeight: '13px',
      height: '13px',
      fontWeight: 500,
    },
  },
  md: {
    container: {
      borderRadius: 3,
      px: '4px',
      pt: '2px',
      pb: '2px',
    },
    icon: {
      boxSize: '16px',
    },
    spacing: '6px',
    label: {
      letterSpacing: '0.11em',
      fontSize: '14px',
      lineHeight: '16px',
      height: '16px',
    },
  },
};

const LearningMaterialTypeBaseBadge: React.FC<
  {
    icon: IconType | ComponentWithAs<'svg', IconProps>;
    name: string;
    color: LearningMaterialTypeBadgeColor;
    size?: keyof typeof LearningMaterialTypeBadgeSizesMapping;
  } & Omit<FlexProps, 'color'>
> = ({ icon, name, color, size = 'md', ...props }) => {
  return (
    <Flex
      bgColor={LearningMaterialBadgeColorToCssColorMapping[color]}
      direction="row"
      alignItems="stretch"
      // opacity={0.96} => disabled because of https://github.com/chakra-ui/chakra-ui/issues/5630
      {...LearningMaterialTypeBadgeSizesMapping[size].container}
      {...props}
    >
      <Center mr={LearningMaterialTypeBadgeSizesMapping[size].spacing}>
        <Icon color="white" as={icon} {...LearningMaterialTypeBadgeSizesMapping[size].icon} />
      </Center>

      <Center>
        <Text
          color="white"
          fontWeight={400}
          textTransform="uppercase"
          {...LearningMaterialTypeBadgeSizesMapping[size].label}
        >
          {name}
        </Text>
      </Center>
    </Flex>
  );
};
