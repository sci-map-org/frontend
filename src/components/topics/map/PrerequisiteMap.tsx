import { Text } from '@chakra-ui/react';
import * as d3Force from 'd3-force';
import { SimulationNodeDatum } from 'd3-force';
import { schemePastel1 } from 'd3-scale-chromatic';
import * as d3Selection from 'd3-selection';
import * as d3Zoom from 'd3-zoom';
import { useEffect, useMemo, useRef } from 'react';
import { BaseMap } from './BaseMap';
import { MapTopicDataFragment } from './map.utils.generated';
import { drawDependency, drawTopicNode, MapOptions, TopicNodeColors, TopicNodeElement } from './map.utils';

type NodeElement = SimulationNodeDatum & TopicNodeElement & { type: 'prereq' | 'followUp' | 'topic' };

type LinkElement = d3Force.SimulationLinkDatum<NodeElement> & {};

const radiusMarginArrow = 2;

const PREREQUISITE_COLOR = TopicNodeColors[5];
const FOLLOW_UP_COLOR = TopicNodeColors[4];

export const PrerequisiteMap: React.FC<{
  topic: MapTopicDataFragment;
  prerequisiteTopics: MapTopicDataFragment[];
  followUpTopics: MapTopicDataFragment[];
  options: MapOptions;
  onClick: (node: NodeElement) => void;
}> = ({ topic, prerequisiteTopics, followUpTopics, options, onClick }) => {
  const d3Container = useRef<SVGSVGElement>(null);

  const topicNodeElements: NodeElement[] = useMemo(
    () => [
      {
        id: topic._id,
        type: 'topic',
        radius: 24,
        fx: options.pxWidth / 2,
        fy: options.pxHeight / 2,
        color: TopicNodeColors[0],
        ...topic,
      },
    ],
    []
  );
  const prereqNodeElements: NodeElement[] = useMemo(
    () =>
      prerequisiteTopics.map((prereqTopic) => {
        return {
          id: prereqTopic._id,
          type: 'prereq',
          x: options.pxWidth / 2,
          y: options.pxHeight / 2,
          radius: 13,
          color: PREREQUISITE_COLOR,
          ...prereqTopic,
        };
      }),
    [prerequisiteTopics]
  );

  const followUpNodeElements: NodeElement[] = useMemo(
    () =>
      followUpTopics.map((followTopic) => {
        return {
          id: followTopic._id,
          type: 'followUp',
          x: options.pxWidth / 2,
          y: options.pxHeight / 2,
          radius: 13,
          color: FOLLOW_UP_COLOR,
          ...followTopic,
        };
      }),
    [followUpTopics]
  );

  const nodeElements: NodeElement[] = useMemo(() => {
    return [...prereqNodeElements, ...topicNodeElements, ...followUpNodeElements];
  }, [prereqNodeElements, topicNodeElements, followUpNodeElements]);

  const linksData: LinkElement[] = useMemo(() => {
    return [
      ...prereqNodeElements.map((prereq, idx) => ({ source: prereq._id, target: topicNodeElements[0]._id })),
      ...followUpNodeElements.map((followUp, idx) => ({ source: topicNodeElements[0]._id, target: followUp._id })),
    ];
  }, [prereqNodeElements, followUpNodeElements, topicNodeElements]);

  useEffect(() => {
    if (d3Container && d3Container.current) {
      const colorMap: any = {};

      nodeElements.forEach((node, i) => {
        colorMap[node._id] = schemePastel1[i % 9];
      });

      const svg = d3Selection
        .select(d3Container.current)
        .attr('viewBox', [0, 0, options.pxWidth, options.pxHeight].join(','));
      svg.selectAll('.innerContainer').remove();
      const container = svg.selectAll('.innerContainer').data([true]).join('g').classed('innerContainer', true);
      const link = drawDependency(container, linksData, 'linkElement', options);
      const prereqNodes = drawTopicNode(container, prereqNodeElements, 'prereqNode', options).on(
        'click',
        (event, n) => {
          onClick(n);
        }
      );

      const followUpNodes = drawTopicNode(container, followUpNodeElements, 'followUpNode', options).on(
        'click',
        (event, n) => {
          onClick(n);
        }
      );

      const maintopicNode = drawTopicNode(container, topicNodeElements, 'mainNode', options);

      const zoom = d3Zoom.zoom<SVGSVGElement, unknown>();
      const tick = () => {
        prereqNodes.attr('transform', function (d) {
          return 'translate(' + d.x + ',' + d.y + ')';
        });

        followUpNodes.attr('transform', function (d) {
          return 'translate(' + d.x + ',' + d.y + ')';
        });

        link
          .attr('x1', function (d) {
            const target = d.target as NodeElement;
            const source = d.source as NodeElement;
            return (
              source.x! +
              (source.radius + radiusMarginArrow) *
                Math.cos(Math.atan((target.y! - source.y!) / (target.x! - source.x!)))
            );
          })
          .attr('y1', function (d) {
            const target = d.target as NodeElement;
            const source = d.source as NodeElement;
            return (
              source.y! +
              (source.radius + radiusMarginArrow) *
                Math.sin(Math.atan((target.y! - source.y!) / (target.x! - source.x!)))
            );
          })
          .attr('x2', function (d) {
            const target = d.target as NodeElement;
            const source = d.source as NodeElement;
            return (
              target.x! -
              (target.radius + radiusMarginArrow) *
                Math.cos(Math.atan((target.y! - source.y!) / (target.x! - source.x!)))
            );
          })
          .attr('y2', function (d) {
            const target = d.target as NodeElement;
            const source = d.source as NodeElement;
            return (
              target.y! -
              (target.radius + radiusMarginArrow) *
                Math.sin(Math.atan((target.y! - source.y!) / (target.x! - source.x!)))
            );
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
        // .alpha(0.8)
        .alphaDecay(0.005)
        .nodes(nodeElements)
        .force('charge', d3Force.forceManyBody<NodeElement>().strength(-30))
        .force(
          'link',
          d3Force
            .forceLink<NodeElement, d3Force.SimulationLinkDatum<NodeElement>>()
            .id((node) => node._id)
            .distance(120)
            // .strength(0.1)
            .links(linksData)
        )

        .force(
          'prereqAxis',
          d3Force.forceX<NodeElement>(options.pxWidth / 4).strength((node) => (node.type === 'prereq' ? 0.1 : 0))
        )
        .force(
          'followUpAxis',
          d3Force
            .forceX<NodeElement>((3 * options.pxWidth) / 4)
            .strength((node) => (node.type === 'followUp' ? 0.1 : 0))
        )
        .force('center', d3Force.forceCenter(options.pxWidth / 2, options.pxHeight / 2))
        .on('tick', tick);
    }
  }, [topic._id, prereqNodeElements.length, followUpNodeElements.length]);

  return (
    <BaseMap
      ref={d3Container}
      options={options}
      renderBottomMiddleLeft={
        <Text color={PREREQUISITE_COLOR} fontSize="xl" fontWeight={600} filter="brightness(1.1)">
          Prerequisites
        </Text>
      }
      renderBottomMiddleRight={
        <Text color={FOLLOW_UP_COLOR} fontSize="xl" fontWeight={600} filter="brightness(1.1)">
          Follow ups
        </Text>
      }
    />
  );
};
