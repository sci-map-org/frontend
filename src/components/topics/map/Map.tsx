import { Icon } from '@chakra-ui/icons';
import { Box, Center, Flex, Stack, Text } from '@chakra-ui/layout';
import { BsArrowReturnLeft } from '@react-icons/all-files/bs/BsArrowReturnLeft';
import * as d3Force from 'd3-force';
import { SimulationNodeDatum } from 'd3-force';
import * as d3ScaleChromatic from 'd3-scale-chromatic';
import * as d3Selection from 'd3-selection';
import * as d3Zoom from 'd3-zoom';
import gql from 'graphql-tag';
import { useEffect, useMemo, useRef } from 'react';
import { TopicLinkData } from '../../../graphql/topics/topics.fragments';
import { TopicLinkDataFragment } from '../../../graphql/topics/topics.fragments.generated';
import { theme } from '../../../theme/theme';
import { TopicLink } from '../../lib/links/TopicLink';
import { MapTopicDataFragment } from './Map.generated';
import { MapType } from './MapHeader';
import { PrerequisiteMap } from './PrerequisiteMap';
import { SubTopicsMap } from './SubTopicsMap';

export const MapTopicData = gql`
  fragment MapTopicData on Topic {
    ...TopicLinkData
    subTopicsTotalCount
  }
  ${TopicLinkData}
`;

type NodeElement = SimulationNodeDatum & MapTopicDataFragment & { size?: number };

export interface MapProps {
  mapType: MapType;
  topic?: MapTopicDataFragment; //only used to force rerendering
  subTopics: MapTopicDataFragment[];
  parentTopic?: TopicLinkDataFragment;
  pxWidth: number;
  pxHeight: number;
  // ratio?: number;
  onClick: (node: NodeElement) => void;
}

export const Map: React.FC<MapProps> = ({
  mapType,
  topic,
  subTopics,
  parentTopic,
  pxWidth,
  pxHeight,
  // ratio = 4 / 3,
  onClick,
}) => {
  if (mapType === MapType.SUBTOPICS)
    return (
      <SubTopicsMap
        topic={topic}
        subTopics={subTopics}
        parentTopic={parentTopic}
        pxWidth={pxWidth}
        pxHeight={pxHeight}
        onClick={onClick}
      />
    );

  if (mapType === MapType.PREREQUISITES && topic)
    return (
      <PrerequisiteMap
        topic={topic}
        prerequisiteTopics={[
          { _id: 'bla', key: 'bla', name: 'Bla 1' },
          { _id: 'bla2', key: 'bla2', name: 'Bla 2' },
          { _id: 'bla3', key: 'bla3', name: 'Bla 3' },
          { _id: 'bla4', key: 'bla4', name: 'Bla 4' },
        ]}
        followUpTopics={[
          { _id: 'bli', key: 'bli', name: 'Bli' },
          { _id: 'bli2', key: 'bli2', name: 'Bli 2' },
          { _id: 'bli3', key: 'bli3', name: 'Bli 3' },
          { _id: 'bli4', key: 'bli4', name: 'Bli 4' },
        ]}
        pxWidth={pxWidth}
        pxHeight={pxHeight}
        onClick={() => console.log('click')}
      />
    );
  return null;
};
