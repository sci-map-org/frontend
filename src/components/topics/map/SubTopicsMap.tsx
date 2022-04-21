import { Icon } from '@chakra-ui/icons';
import { Box, Center, Flex, Stack, Text } from '@chakra-ui/layout';
import { BsArrowReturnLeft } from '@react-icons/all-files/bs/BsArrowReturnLeft';
import * as d3Force from 'd3-force';
import { SimulationNodeDatum } from 'd3-force';
import * as d3Selection from 'd3-selection';
import * as d3Zoom from 'd3-zoom';
import { useEffect, useMemo, useRef } from 'react';
import { TopicLinkDataFragment } from '../../../graphql/topics/topics.fragments.generated';
import { TopicLink } from '../../lib/links/TopicLink';
import { BaseMap } from './BaseMap';
import { DrawMapOptions, drawTopicNode, TopicNodeColors, TopicNodeElement } from './Map';
import { MapTopicDataFragment } from './Map.generated';

type NodeElement = TopicNodeElement & SimulationNodeDatum;

const getNodeRadius = (topic: MapTopicDataFragment): number => {
  return topic.subTopicsTotalCount
    ? 12 + (topic.subTopicsTotalCount > 1 ? Math.log(topic.subTopicsTotalCount) * 12 : 0)
    : 12;
};

export const SubTopicsMap: React.FC<{
  topic?: MapTopicDataFragment; //only used to force rerendering
  subTopics: MapTopicDataFragment[];
  parentTopic?: TopicLinkDataFragment;
  pxWidth: number;
  pxHeight: number;
  // ratio?: number;
  onClick: (node: TopicLinkDataFragment) => void;
}> = ({
  topic,
  subTopics,
  parentTopic,
  pxWidth,
  pxHeight,
  // ratio = 4 / 3,
  onClick,
}) => {
  const d3Container = useRef<SVGSVGElement>(null);

  const mapOptions: DrawMapOptions = useMemo(() => {
    return {
      pxWidth: pxWidth,
      pxHeight: pxHeight,
    };
  }, []);

  const topicNodeElements: NodeElement[] = useMemo(
    () =>
      subTopics.map((subTopic, idx) => {
        return {
          id: subTopic._id,
          ...subTopic,
          color: TopicNodeColors[idx % 9],
          size: subTopic.subTopicsTotalCount || undefined,
          radius: getNodeRadius(subTopic),
        };
      }),
    [subTopics]
  );

  useEffect(() => {
    if (d3Container && d3Container.current) {
      const svg = d3Selection.select(d3Container.current).attr('viewBox', [0, 0, pxWidth, pxHeight].join(','));
      svg.selectAll('.innerContainer').remove();
      const container = svg.selectAll('.innerContainer').data([true]).join('g').classed('innerContainer', true);

      const topicNodes = drawTopicNode(container, topicNodeElements, 'topicNode', mapOptions).on(
        'click',
        (event, n) => {
          onClick(n);
        }
      );

      const zoom = d3Zoom.zoom<SVGSVGElement, unknown>();
      const tick = () => {
        topicNodes.attr('transform', function (d) {
          return 'translate(' + d.x + ',' + d.y + ')';
        });
      };

      svg.call(
        zoom
          .extent([
            [0, 0],
            [pxWidth, pxHeight],
          ])
          .scaleExtent([0.6, 3])
          .on('zoom', function ({ transform }) {
            container.attr('transform', transform);
          })
      );

      const simulation = d3Force
        .forceSimulation<NodeElement>()
        .nodes(topicNodeElements)
        .force(
          'charge',
          d3Force.forceManyBody<NodeElement>().strength((d) => {
            return d.subTopicsTotalCount ? -(getNodeRadius(d) * getNodeRadius(d)) / 15 : -8;
          })
        )

        .force('center', d3Force.forceCenter(pxWidth / 2, pxHeight / 2))
        .on('tick', tick);
    }
  }, [topic?._id, topicNodeElements.length]);

  return (
    <Box position="relative" width={`${pxWidth}px`} height={`${pxHeight}px`}>
      <BaseMap ref={d3Container} pxWidth={pxWidth} pxHeight={pxHeight} />;
      {!topicNodeElements.length && (
        <Center position="absolute" top={0} left={0} width={`${pxWidth}px`} height={`${pxHeight}px`}>
          <Text fontWeight={600} fontSize="lg" color="originalPalette.red" fontStyle="italic">
            No SubTopics found
          </Text>
        </Center>
      )}
      {parentTopic && (
        <Flex
          direction="row"
          alignItems="stretch"
          position="absolute"
          top={0}
          bgColor="white"
          opacity={0.7}
          _hover={{ opacity: 1 }}
          borderBottomEndRadius={4}
        >
          <Flex p={1}>
            <Icon as={BsArrowReturnLeft} boxSize={6} />
          </Flex>
          <Flex pt={1}>
            <Stack mr={2} spacing={1} pt={1}>
              <Flex pl={1} alignItems="center">
                <TopicLink topic={parentTopic} onClick={() => onClick(parentTopic)} />
              </Flex>
            </Stack>
          </Flex>
        </Flex>
      )}
    </Box>
  );
};
