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

export const MapTopicData = gql`
  fragment MapTopicData on Topic {
    ...TopicLinkData
    subTopicsTotalCount
  }
  ${TopicLinkData}
`;

type NodeElement = SimulationNodeDatum & MapTopicDataFragment & { size?: number };

export interface MapProps {
  topic?: MapTopicDataFragment; //only used to force rerendering
  subTopics: MapTopicDataFragment[];
  parentTopic?: TopicLinkDataFragment;
  pxWidth: number;
  pxHeight: number;
  onClick: (node: NodeElement) => void;
}

export const Map: React.FC<MapProps> = ({ topic, subTopics, parentTopic, pxWidth, pxHeight, onClick }) => {
  const d3Container = useRef<SVGSVGElement>(null);
  const nodes: NodeElement[] = useMemo(
    () =>
      subTopics.map((subTopic) => {
        return { id: subTopic._id, ...subTopic, size: subTopic.subTopicsTotalCount || undefined };
      }),
    [subTopics]
  );

  useEffect(() => {
    if (d3Container && d3Container.current) {
      const colorMap: any = {};

      nodes.forEach((node, i) => {
        colorMap[node._id] = d3ScaleChromatic.schemePastel1[i % 9];
      });

      const svg = d3Selection.select(d3Container.current).attr('viewBox', [0, 0, pxWidth, pxHeight].join(','));
      svg.selectAll('.innerContainer').remove();
      const container = svg.selectAll('.innerContainer').data([true]).join('g').classed('innerContainer', true);

      const node = container
        .selectAll('.node')
        .data(nodes)
        .join('g')
        .classed('node', true)
        .on('click', (event, n) => {
          onClick(n);
        });

      const getNodeRadius = (n: NodeElement) => (n.size ? 12 + (n.size > 1 ? Math.log(n.size) * 12 : 0) : 12);

      node
        .append('circle')
        .classed('node_circle', true)
        .attr('r', getNodeRadius)
        .attr('fill', (n) => colorMap[n._id]);

      node
        .append('text')
        .classed('node_label', true)
        .attr('text-anchor', 'middle')
        .attr('dx', 0)

        .attr('dy', (d) => {
          return getNodeRadius(d) + 12;
        })
        .attr('z-index', 10)
        .attr('font-size', '0.8em')
        .attr('font-weight', 500)
        .attr('fill', theme.colors.gray[500])
        .text(function (d) {
          return d.name;
        });

      const zoom = d3Zoom.zoom<SVGSVGElement, unknown>();
      const tick = () => {
        let maxDistance = 0;
        const xCenter = pxWidth / 2;
        const yCenter = pxHeight / 2;
        node.each(function (d) {
          if (d.x && d.y) {
            const distance = Math.sqrt(Math.pow(d.x - xCenter, 2) + Math.pow(d.y - yCenter, 2)) + getNodeRadius(d);
            if (distance > maxDistance) maxDistance = distance;
          }
        });

        node.attr('transform', function (d) {
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
        .nodes(nodes)
        .force(
          'charge',
          d3Force.forceManyBody<NodeElement>().strength((d) => {
            return d.size ? -(getNodeRadius(d) * getNodeRadius(d)) / 15 : -8;
          })
        )

        .force('center', d3Force.forceCenter(pxWidth / 2, pxHeight / 2))
        .on('tick', tick);
    }
  }, [topic?._id, nodes.length]);

  return (
    <Box position="relative" width={`${pxWidth}px`} height={`${pxHeight}px`}>
      <svg ref={d3Container} width={`${pxWidth}px`} height={`${pxHeight}px`} fontSize="xs" />
      {!nodes.length && (
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
