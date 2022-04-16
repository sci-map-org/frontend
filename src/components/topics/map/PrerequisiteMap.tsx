import { SimulationNodeDatum } from 'd3-force';
import { useEffect, useMemo, useRef } from 'react';
import { MapTopicDataFragment } from './Map.generated';
import * as d3Force from 'd3-force';
import * as d3Selection from 'd3-selection';
import * as d3Zoom from 'd3-zoom';
import { theme } from '../../../theme/theme';
import { schemePastel1 } from 'd3-scale-chromatic';

type NodeElement = SimulationNodeDatum &
  MapTopicDataFragment & { id: string; type: 'prereq' | 'followUp' | 'topic'; radius: number };

type LinkElement = d3Force.SimulationLinkDatum<NodeElement> & {};

const radiusMarginArrow = 2;

export const PrerequisiteMap: React.FC<{
  topic: MapTopicDataFragment;
  prerequisiteTopics: MapTopicDataFragment[];
  followUpTopics: MapTopicDataFragment[];
  pxWidth: number;
  pxHeight: number;
  onClick: (node: NodeElement) => void;
}> = ({ topic, prerequisiteTopics, followUpTopics, pxWidth, pxHeight, onClick }) => {
  const d3Container = useRef<SVGSVGElement>(null);

  const topicNodes: NodeElement[] = useMemo(
    () => [{ id: topic._id, type: 'topic', radius: 16, fx: pxWidth / 2, fy: pxHeight / 2, ...topic }],
    []
  );
  const prereqNodes: NodeElement[] = useMemo(
    () =>
      prerequisiteTopics.map((prereqTopic) => {
        return { id: prereqTopic._id, type: 'prereq', x: pxWidth / 2, y: pxHeight / 2, radius: 12, ...prereqTopic };
      }),
    [prerequisiteTopics]
  );

  const followUpNodes: NodeElement[] = useMemo(
    () =>
      followUpTopics.map((followTopic) => {
        return { id: followTopic._id, type: 'followUp', x: pxWidth / 2, y: pxHeight / 2, radius: 12, ...followTopic };
      }),
    [followUpTopics]
  );

  const nodesData: NodeElement[] = useMemo(() => {
    return [...prereqNodes, ...topicNodes, ...followUpNodes];
  }, [prereqNodes, topicNodes, followUpNodes]);

  const linksData: LinkElement[] = useMemo(() => {
    return [
      ...prereqNodes.map((prereq, idx) => ({ source: prereq._id, target: topicNodes[0]._id })),
      ...followUpNodes.map((followUp, idx) => ({ source: topicNodes[0]._id, target: followUp._id })),
    ];
  }, [prereqNodes, followUpNodes, topicNodes]);

  useEffect(() => {
    if (d3Container && d3Container.current) {
      const colorMap: any = {};

      nodesData.forEach((node, i) => {
        colorMap[node._id] = schemePastel1[i % 9];
      });

      const svg = d3Selection.select(d3Container.current).attr('viewBox', [0, 0, pxWidth, pxHeight].join(','));
      svg.selectAll('.innerContainer').remove();
      const container = svg.selectAll('.innerContainer').data([true]).join('g').classed('innerContainer', true);

      // svg
      //   .append('defs')
      //   .append('marker')
      //   .attr('id', 'arrow-head')
      //   .attr('viewBox', '0 -5 10 10')
      //   .attr('refX', 15)
      //   .attr('refY', -0.5)
      //   .attr('markerWidth', 6)
      //   .attr('markerHeight', 6)
      //   .attr('orient', 'auto')
      //   .append('path')
      //   .attr('fill', 'blue')
      //   .attr('d', 'M0,-5L10,0L0,5');

      svg
        .append('defs')
        .append('marker')
        .attr('id', 'arrow-head')
        // .attr('viewBox', '0 -5 10 10')
        // .attr('refX', 0)
        .attr('refX', 10) // to make sure the arrow starts before the end of the marker
        .attr('refY', 3.5)
        .attr('markerWidth', 10)
        .attr('markerHeight', 7)
        .attr('orient', 'auto')
        .append('polygon')
        .attr('stroke-width', '1.5px')
        // .classed('arrowHeads', true)
        .attr('fill', 'rgb(80, 80, 80)')
        .attr('points', '0 0, 10 3.5, 0 7');
      // .attr('d', 'M0,-5L10,0L0,5');
      // markerWidth="10" markerHeight="7"
      // refX="0" refY="3.5" orient="auto">
      //   <polygon points="0 0, 10 3.5, 0 7" />

      // const link = container.selectAll('.linkElement').data(linksData).join('line').attr('class', 'linkElement');
      const link = container
        .selectAll('.linkElement')
        .data(linksData)
        .join('g')
        .attr('class', 'linkElement')
        .append('line')
        .classed('linkLineElement', true)
        .attr('marker-end', (d) => `url(${new URL(`#arrow-head`, window.location.href)})`);

      // .attr('fill', 'none')
      // .attr('stroke-width', 1.5)
      // .selectAll('path')
      // .join('path')
      // .attr(
      //   'stroke',
      //   (d) => 'black'
      //   // color(d.type)
      // );
      // .attr('stroke-width', '1.5px')

      const prereqNode = container
        .selectAll('.prereqNode')
        .data(prereqNodes)
        .join('g')
        .attr('transform', `translate(${pxWidth / 2}, ${pxHeight / 2})`)
        .classed('node', true)
        .classed('prereqNode', true)
        .on('click', (event, n) => {
          onClick(n);
        });

      const followUpNode = container
        .selectAll('.followUpNode')
        .data(followUpNodes)
        .join('g')
        .attr('transform', `translate(${pxWidth / 2}, ${pxHeight / 2})`)
        .classed('node', true)
        .classed('followUpNode', true)
        .on('click', (event, n) => {
          onClick(n);
        });

      prereqNode
        .append('circle')
        .classed('node_circle', true)
        .attr('r', (n) => n.radius)
        .attr('fill', () => 'orange');

      prereqNode
        .append('text')
        .classed('node_label', true)
        .attr('text-anchor', 'middle')
        .attr('dx', 0)
        .attr('dy', (d) => {
          return 24;
        })
        .attr('z-index', 10)
        .attr('font-size', '0.8em')
        .attr('font-weight', 500)
        .attr('fill', theme.colors.gray[500])
        .text(function (d) {
          return d.name;
        });

      const topicNode = container
        .selectAll('.mainNode')
        .data(topicNodes)
        .join('g')
        .classed('node', true)
        .classed('mainNode', true)
        .attr('transform', function (d) {
          return 'translate(' + pxWidth / 2 + ',' + pxHeight / 2 + ')';
        })
        .on('click', (event, n) => {
          onClick(n);
        });

      topicNode
        .append('circle')
        .classed('node_circle', true)
        .attr('r', 16)
        .attr('fill', () => 'red');

      topicNode
        .append('text')
        .classed('node_label', true)
        .attr('text-anchor', 'middle')
        .attr('dx', 0)
        .attr('dy', (d) => {
          return 28;
        })
        .attr('z-index', 10)
        .attr('font-size', '0.8em')
        .attr('font-weight', 500)
        .attr('fill', theme.colors.gray[500])
        .text(function (d) {
          return d.name;
        });

      followUpNode
        .append('circle')
        .classed('node_circle', true)
        .attr('r', 12)
        .attr('fill', () => 'blue');

      followUpNode
        .append('text')
        .classed('node_label', true)
        .attr('text-anchor', 'middle')
        .attr('dx', 0)
        .attr('dy', (d) => {
          return 24;
        })
        .attr('z-index', 10)
        .attr('font-size', '0.8em')
        .attr('font-weight', 500)
        .attr('fill', theme.colors.gray[500])
        .text(function (d) {
          return d.name;
        });

      // const allNode = prereqNode.merge(topicNode).merge(followUpNode);

      const zoom = d3Zoom.zoom<SVGSVGElement, unknown>();
      const tick = () => {
        // let maxDistance = 0;
        // const xCenter = pxWidth / 2;
        // const yCenter = pxHeight / 2;
        // prereqNode.each(function (d) {
        //   if (d.x && d.y) {
        //     const distance = Math.sqrt(Math.pow(d.x - xCenter, 2) + Math.pow(d.y - yCenter, 2)) + 12; //+ getNodeRadius(d);
        //     if (distance > maxDistance) maxDistance = distance;
        //   }
        // });
        prereqNode.attr('transform', function (d) {
          return 'translate(' + d.x + ',' + d.y + ')';
        });

        followUpNode.attr('transform', function (d) {
          return 'translate(' + d.x + ',' + d.y + ')';
        });

        link
          .attr('x1', function (d) {
            // return d.source.x;
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
            // console.log(target.x);
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
            [pxWidth, pxHeight],
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
        .nodes(nodesData)
        .force('charge', d3Force.forceManyBody<NodeElement>().strength(-30))
        .force(
          'link',
          d3Force
            .forceLink<NodeElement, d3Force.SimulationLinkDatum<NodeElement>>()
            .id((node) => node._id)
            .distance(120)
            .links(
              linksData
              //   [
              //   ...prereqNodes.map((prereq, idx) => ({ source: prereq._id, target: topicNodes[0]._id })),
              //   ...followUpNodes.map((followUp, idx) => ({ source: topicNodes[0]._id, target: followUp._id })),
              // ]
            )
        )

        .force(
          'prereqAxis',
          d3Force.forceX<NodeElement>(pxWidth / 4).strength((node) => (node.type === 'prereq' ? 0.1 : 0))
        )
        .force(
          'followUpAxis',
          d3Force.forceX<NodeElement>((3 * pxWidth) / 4).strength((node) => (node.type === 'followUp' ? 0.1 : 0))
        )
        // .force('prereqAxis2', d3Force.forceY(pxHeight / 2).strength(0.01))
        .force('center', d3Force.forceCenter(pxWidth / 2, pxHeight / 2))
        .on('tick', tick);

      // const simulation2 = d3Force
      //   .forceSimulation<NodeElement>()
      //   .nodes(followUpNodes)
      //   .force(
      //     'charge',
      //     d3Force.forceManyBody<NodeElement>().strength((d) => {
      //       return -20; //d.size ? -(getNodeRadius(d) * getNodeRadius(d)) / 15 : -8;
      //     })
      //   )

      //   // .force('followUpAxis', d3Force.forceX((3 * pxWidth) / 4).strength(0.2))
      //   // .force('followUpAxis2', d3Force.forceY(pxHeight / 2).strength(0.02))
      //   .force('center', d3Force.forceCenter(pxWidth / 2, pxHeight / 2).strength(0.1))
      //   .force(
      //     'link',
      //     d3Force
      //       .forceLink()
      //       .links([...prerequisiteTopics.map((prereq) => ({ source: prereq._id, target: topic._id }))])
      //   )
      //   .on('tick', tickFollowUp);
    }
  }, [topic._id, prereqNodes.length, followUpNodes.length]);

  return <svg ref={d3Container} width={`${pxWidth}px`} height={`${pxHeight}px`} fontSize="xs" />;
};
