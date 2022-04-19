import * as d3Drag from 'd3-drag';
import * as d3Force from 'd3-force';
import { SimulationNodeDatum } from 'd3-force';
import * as d3Selection from 'd3-selection';
import * as d3Zoom from 'd3-zoom';
import { flatten } from 'lodash';
import { useEffect, useMemo, useRef } from 'react';
import { topicLevelColorMap } from '../fields/TopicLevel';
import { drawDependency, DrawMapOptions, drawTopicNode, TopicNodeElement } from './Map';
import { MapTopicDataFragment } from './Map.generated';

type NodeElement = SimulationNodeDatum & TopicNodeElement & { xGravityCenter: number };

type LinkElement = d3Force.SimulationLinkDatum<NodeElement> & {};

const radiusMarginArrow = 2;

const layoutMargin = 20;

export const ProgressMap: React.FC<{
  topic: MapTopicDataFragment;
  subTopics: Array<MapTopicDataFragment & { prerequisites: { _id: string }[]; level?: number }>;
  pxWidth: number;
  pxHeight: number;
  onClick: (node: NodeElement) => void;
}> = ({ topic, subTopics, pxWidth, pxHeight, onClick }) => {
  const d3Container = useRef<SVGSVGElement>(null);

  const mapOptions: DrawMapOptions = useMemo(() => {
    return {
      pxWidth: pxWidth,
      pxHeight: pxHeight,
    };
  }, []);

  const prerequisiteLinkElements: LinkElement[] = useMemo(() => {
    const relArray = subTopics.map((subTopic) =>
      subTopic.prerequisites.map((prereq) => ({ source: prereq._id, target: subTopic._id }))
    );
    return flatten(relArray);
  }, [subTopics]);

  const topicNodeElements: NodeElement[] = useMemo(
    () =>
      subTopics.map((subTopic, idx) => ({
        id: subTopic._id,
        type: 'topic',
        radius: 12,
        xGravityCenter:
          (layoutMargin + (typeof subTopic.level === 'number' ? subTopic.level : 50) * (pxWidth - 2 * layoutMargin)) /
          100, // future: mix of level and rank ?
        color: typeof subTopic.level === 'number' ? topicLevelColorMap(subTopic.level / 100) : 'gray',
        ...subTopic,
      })),
    [subTopics]
  );

  useEffect(() => {
    if (d3Container && d3Container.current) {
      const svg = d3Selection.select(d3Container.current).attr('viewBox', [0, 0, pxWidth, pxHeight].join(','));
      svg.selectAll('.innerContainer').remove();
      const container = svg.selectAll('.innerContainer').data([true]).join('g').classed('innerContainer', true);

      const prerequisiteLinks = drawDependency(container, prerequisiteLinkElements, 'linkElement', {
        pxWidth,
        pxHeight,
      });

      const topicNodes = drawTopicNode(container, topicNodeElements, 'topicNode', mapOptions)
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
            [pxWidth, pxHeight],
          ])
          .scaleExtent([0.6, 3])
          .on('zoom', function ({ transform }) {
            container.attr('transform', transform);
          })
      );
      const simulation = d3Force
        .forceSimulation<NodeElement>()
        .alphaDecay(0.005)
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

        .force('xForce', d3Force.forceX<NodeElement>((n) => n.xGravityCenter).strength(0.04))
        .force('yForce', d3Force.forceY<NodeElement>(pxHeight / 2).strength(0.002))
        .force('center', d3Force.forceCenter(pxWidth / 2, pxHeight / 2).strength(1))
        .on('tick', tick);

      //   @ts-ignore
      topicNodes.call(drag(simulation));
    }
  }, [topic._id, topicNodeElements.length, prerequisiteLinkElements.length]);

  return <svg ref={d3Container} width={`${pxWidth}px`} height={`${pxHeight}px`} fontSize="xs" />;
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