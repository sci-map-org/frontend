import { Text } from '@chakra-ui/react';
import * as d3Drag from 'd3-drag';
import * as d3Force from 'd3-force';
import { SimulationNodeDatum } from 'd3-force';
import * as d3Selection from 'd3-selection';
import * as d3Zoom from 'd3-zoom';
import { flatten } from 'lodash';
import { useEffect, useMemo, useRef } from 'react';
import { topicLevelColorMap } from '../fields/TopicLevel';
import { BaseMap } from './BaseMap';
import { drawLink, drawTopicNode, MapOptions, TopicNodeElement } from './map.utils';
import { MapTopicDataFragment } from './map.utils.generated';

type NodeElement = SimulationNodeDatum & TopicNodeElement & { xGravityCenter: number };

type LinkElement = d3Force.SimulationLinkDatum<NodeElement> & {};

const radiusMarginArrow = 2;

const layoutMargin = 40;

export const ProgressMap: React.FC<{
  topic: MapTopicDataFragment;
  subTopics: Array<MapTopicDataFragment & { prerequisites: { _id: string }[]; level?: number }>;
  options: MapOptions;
  onClick: (node: NodeElement) => void;
}> = ({ topic, subTopics, options, onClick }) => {
  const d3Container = useRef<SVGSVGElement>(null);

  const prerequisiteLinkElements: LinkElement[] = useMemo(() => {
    const relArray = subTopics.map((subTopic) =>
      subTopic.prerequisites.map((prereq) => ({ source: prereq._id, target: subTopic._id }))
    );
    return flatten(relArray);
  }, [subTopics]);

  const topicNodesGravityCenters = useMemo(() => {
    const alpha = 40;
    const getNodeIndexFromId = (id: string): number => {
      const index = subTopics.findIndex(({ _id }) => id === _id);
      if (index === -1) throw new Error(`Not found node with id ${id}`);
      return index;
    };

    let gravityCenters = subTopics.map((subTopic) => {
      return (
        layoutMargin +
        ((typeof subTopic.level === 'number' ? subTopic.level : 50) * (options.pxWidth - 2 * layoutMargin)) / 100
      ); // future: mix of level and rank ?)
    });
    for (let i = 0; i < 3; i++) {
      prerequisiteLinkElements.forEach(({ source, target }) => {
        const sourceIndex = getNodeIndexFromId(source as string);
        const targetIndex = getNodeIndexFromId(target as string);
        const targetGravityCenter = gravityCenters[targetIndex];
        const sourceGravityCenter = gravityCenters[sourceIndex];
        if (sourceGravityCenter + alpha >= targetGravityCenter) {
          gravityCenters[targetIndex] = (targetGravityCenter + sourceGravityCenter + alpha) / 2;
          gravityCenters[sourceIndex] = (targetGravityCenter + sourceGravityCenter - alpha) / 2;
        }
      });
    }
    return gravityCenters;
  }, []);

  const topicNodeElements: NodeElement[] = useMemo(
    () =>
      subTopics.map((subTopic, idx) => ({
        id: subTopic._id,
        type: 'topic',
        radius: 12,
        xGravityCenter: topicNodesGravityCenters[idx],
        color: typeof subTopic.level === 'number' ? topicLevelColorMap(subTopic.level / 100) : 'gray',
        x: topicNodesGravityCenters[idx], //(topicNodesGravityCenters[idx] + (2 * options.pxWidth) / 2) / 3,
        y: options.pxHeight / 2 + (Math.random() - 0.5) * options.pxHeight * 0.03,
        ...subTopic,
      })),
    [subTopics, topicNodesGravityCenters]
  );
  useEffect(() => {
    if (d3Container && d3Container.current) {
      const svg = d3Selection
        .select(d3Container.current)
        .attr('viewBox', [0, 0, options.pxWidth, options.pxHeight].join(','));
      svg.selectAll('.innerContainer').remove();
      const container = svg.selectAll('.innerContainer').data([true]).join('g').classed('innerContainer', true);

      const prerequisiteLinks = drawLink(container, prerequisiteLinkElements, 'linkElement', options);

      const topicNodes = drawTopicNode(container, topicNodeElements, 'topicNode', options)
        .classed('node', true)
        .attr('fill-opacity', 1)
        .on('click', (event, n) => {
          onClick(n);
        });

      const zoom = d3Zoom.zoom<SVGSVGElement, unknown>();
      const tick = () => {
        topicNodes.attr('transform', function (d) {
          return 'translate(' + d.x + ',' + d.y + ')';
        });

        const theta = (source: NodeElement, target: NodeElement) =>
          target.x! - source.x! > 0
            ? Math.atan((target.y! - source.y!) / (target.x! - source.x!))
            : Math.atan((target.y! - source.y!) / (target.x! - source.x!)) + Math.PI;

        prerequisiteLinks
          .attr('x1', function (d) {
            const target = d.target as NodeElement;
            const source = d.source as NodeElement;
            return source.x! + (source.radius + radiusMarginArrow) * Math.cos(theta(source, target));
          })
          .attr('y1', function (d) {
            const target = d.target as NodeElement;
            const source = d.source as NodeElement;
            return source.y! + (source.radius + radiusMarginArrow) * Math.sin(theta(source, target));
          })
          .attr('x2', function (d) {
            const target = d.target as NodeElement;
            const source = d.source as NodeElement;
            return target.x! - (target.radius + radiusMarginArrow) * Math.cos(theta(source, target));
          })
          .attr('y2', function (d) {
            const target = d.target as NodeElement;
            const source = d.source as NodeElement;
            return target.y! - (target.radius + radiusMarginArrow) * Math.sin(theta(source, target));
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
        .alphaDecay(0.005)
        // .alphaDecay(0.01)
        .nodes(topicNodeElements)
        .force('charge', d3Force.forceManyBody<NodeElement>().strength(-15))
        .force(
          'collision',
          d3Force.forceCollide<NodeElement>().radius((n) => n.radius + radiusMarginArrow)
        )
        .force(
          'link',
          d3Force
            .forceLink<NodeElement, d3Force.SimulationLinkDatum<NodeElement>>()
            .id((node) => node._id)
            .distance(120)
            .strength(0.02)
            .links(prerequisiteLinkElements)
        )

        .force('xForce', d3Force.forceX<NodeElement>((n) => n.xGravityCenter).strength(0.1))
        // .force('yForce', d3Force.forceY<NodeElement>(options.pxHeight / 2).strength(0.002))
        // .force('center', d3Force.forceCenter(options.pxWidth / 2, options.pxHeight / 2).strength(0.01))
        .force('y', d3Force.forceY(options.pxHeight / 2).strength(0.01))
        // .force('x', d3Force.forceX(options.pxWidth / 2).strength(0.01))
        .on('tick', tick);

      //   @ts-ignore
      topicNodes.call(drag(simulation));
    }
  }, [topic._id, topicNodeElements.length, prerequisiteLinkElements.length]);

  return (
    <BaseMap
      ref={d3Container}
      options={options}
      renderBottomMiddleLeft={
        <Text color={topicLevelColorMap(0.1)} fontSize="xl" fontWeight={600}>
          Basics
        </Text>
      }
      renderBottomMiddleRight={
        <Text color={topicLevelColorMap(0.9)} fontSize="xl" fontWeight={600}>
          Advanced
        </Text>
      }
    />
  );
};

function drag(simulation: d3Force.Simulation<NodeElement, undefined>) {
  function dragstarted(event: any) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    event.subject.fx = event.subject.x;
    event.subject.fy = event.subject.y;
  }

  function dragged(event: any) {
    event.subject.fx = event.x;
    event.subject.fy = event.y;
  }

  function dragended(event: any) {
    if (!event.active) simulation.alphaTarget(0);
    event.subject.fx = null;
    event.subject.fy = null;
  }

  return d3Drag.drag().on('start', dragstarted).on('drag', dragged).on('end', dragended);
}
