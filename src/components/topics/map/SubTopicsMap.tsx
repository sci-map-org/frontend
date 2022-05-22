import { Box, Stack, Text } from '@chakra-ui/layout';
import * as d3Force from 'd3-force';
import { SimulationNodeDatum } from 'd3-force';
import * as d3Selection from 'd3-selection';
import * as d3Zoom from 'd3-zoom';
import { useEffect, useMemo, useRef } from 'react';
import { TopicLinkDataFragment } from '../../../graphql/topics/topics.fragments.generated';
import { BaseMap } from './BaseMap';
import { drawTopicNode, MapOptions, TopicNodeColors, TopicNodeElement } from './map.utils';
import { MapTopicDataFragment } from './map.utils.generated';
import { MapBackButton } from './MapBackButton';
import { MapSearchBox } from './MapSearchBox';

type NodeElement = TopicNodeElement & SimulationNodeDatum;

const getNodeRadius = (topic: MapTopicDataFragment): number => {
  return topic.subTopicsTotalCount
    ? 15 + (topic.subTopicsTotalCount > 0 ? Math.log(topic.subTopicsTotalCount + 1) * 12 : 0)
    : 15;
};

export const SubTopicsMap: React.FC<{
  topic?: MapTopicDataFragment; //only used to force rerendering
  subTopics: MapTopicDataFragment[];
  parentTopic?: TopicLinkDataFragment;
  options: MapOptions;
  onSelectTopic: (node: TopicLinkDataFragment) => void;
  onBack?: () => void;
}> = ({ topic, subTopics, parentTopic, options, onSelectTopic, onBack }) => {
  // Pretty important, otherwise the onClick callback will not use updated state
  const onTopicClick = useRef(onSelectTopic);

  useEffect(() => {
    onTopicClick.current = onSelectTopic;
  }, [onSelectTopic]);

  const d3Container = useRef<SVGSVGElement>(null);
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
      const svg = d3Selection
        .select(d3Container.current)
        .attr('viewBox', [0, 0, options.pxWidth, options.pxHeight].join(','));
      svg.selectAll('.innerContainer').remove();
      const container = svg.selectAll('.innerContainer').data([true]).join('g').classed('innerContainer', true);

      const topicNodes = drawTopicNode(container, topicNodeElements, 'topicNode', options).on('click', (event, n) => {
        onTopicClick.current(n);
      });

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
            [options.pxWidth, options.pxHeight],
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
            const coefficient = options.mode === 'explore' ? 1 / 2 : 1 / 3;
            return -(d.radius * Math.log(d.radius)) * coefficient;
            // return d.subTopicsTotalCount ? -(getNodeRadius(d) * getNodeRadius(d)) / 15 : -8;
          })
        )

        .force('center', d3Force.forceCenter(options.pxWidth / 2, options.pxHeight / 2))
        .on('tick', tick);
    }
  }, [topic?._id, topicNodeElements.length]);

  if (!topicNodeElements.length)
    return (
      <BaseMap
        options={options}
        renderCenter={
          <Text fontWeight={600} fontSize="lg" color="gray.100" fontStyle="italic" textAlign="center">
            No SubTopics found
          </Text>
        }
        renderTopLeft={
          <Stack spacing="2px">
            {options.mode === 'explore' && <MapSearchBox onSelectTopic={onSelectTopic} />}
            {onBack && <MapBackButton onClick={onBack} />}
          </Stack>
        }
      />
    );
  return (
    <Box position="relative" width={`${options.pxWidth}px`} height={`${options.pxHeight}px`}>
      <BaseMap
        ref={d3Container}
        options={options}
        renderTopLeft={
          <Stack spacing="2px">
            {options.mode === 'explore' && <MapSearchBox onSelectTopic={onSelectTopic} />}
            {onBack && <MapBackButton onClick={onBack} />}
          </Stack>
        }
      />
      {/* {parentTopic && (
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
                <TopicLink topic={parentTopic} onClick={() => onSelectTopic(parentTopic)} />
              </Flex>
            </Stack>
          </Flex>
        </Flex>
      )} */}
    </Box>
  );
};
