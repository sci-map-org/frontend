import * as d3Force from 'd3-force';
import { SimulationNodeDatum } from 'd3-force';
import * as d3ScaleChromatic from 'd3-scale-chromatic';
import * as d3Selection from 'd3-selection';
import * as d3Zoom from 'd3-zoom';
import * as d3Scale from 'd3-scale';
import Router from 'next/router';
import { useEffect, useMemo, useRef } from 'react';
import { TopicType } from '../../graphql/types';
import { routerPushToPage } from '../../pages/PageInfo';
import { ConceptPagePath, DomainPageInfo } from '../../pages/RoutesPageInfos';
import { theme } from '../../theme/theme';
import { MinimapTopicDataFragment } from './SubTopicsMinimap.generated';
import { MapVisualisationTopicDataFragment } from './SubTopicsMapVisualisation.generated';
import gql from 'graphql-tag';

export const MapVisualisationTopicData = gql`
  fragment MapVisualisationTopicData on ITopic {
    _id
    key
    topicType
    name
    size
  }
`;

type NodeElement = SimulationNodeDatum & MapVisualisationTopicDataFragment;
export interface SubTopicsMapVisualisationProps {
  domainKey?: string;
  topic?: MapVisualisationTopicDataFragment; //only used to force rerendering
  subTopics: MapVisualisationTopicDataFragment[];
  parentTopics?: MapVisualisationTopicDataFragment[];
  pxWidth: number;
  pxHeight: number;
  onClick: (node: NodeElement) => void;
}
export const SubTopicsMapVisualisation: React.FC<SubTopicsMapVisualisationProps> = ({
  domainKey,
  topic,
  subTopics,
  parentTopics,
  pxWidth,
  pxHeight,
  onClick,
}) => {
  const d3Container = useRef<SVGSVGElement>(null);

  const nodes: NodeElement[] = useMemo(
    () =>
      subTopics.map((subTopic) => {
        if (subTopic.topicType === TopicType.Concept && !domainKey)
          throw new Error('domainKey required if a subtopic is a concept');
        return { id: subTopic._id, ...subTopic, ...(subTopic.topicType === TopicType.Concept && { domainKey }) };
      }),
    [subTopics]
  );

  const parentCircles: NodeElement[] = useMemo(
    () =>
      (parentTopics || []).map((parentTopic) => {
        return { id: parentTopic._id, ...parentTopic };
      }),
    [parentTopics]
  );
  console.log(parentTopics);
  useEffect(() => {
    if (d3Container && d3Container.current) {
      const colorMap: any = {};

      nodes.forEach((node, i) => {
        colorMap[node._id] = d3ScaleChromatic.schemePastel1[i % 9];
      });

      const svg = d3Selection.select(d3Container.current).attr('viewBox', [0, 0, pxWidth, pxHeight].join(','));
      svg.selectAll('.innerContainer').remove();
      const container = svg.selectAll('.innerContainer').data([true]).join('g').classed('innerContainer', true);

      const parentCircleDistance = 400;
      const parentCircleRadius = parentTopics?.length === 1 ? 600 : 400;
      var circleScale = d3Scale
        .scaleLinear()
        .range([0, 2 * Math.PI])
        .domain([0, parentCircles.length]);

      const parentCircle = container
        .selectAll('.parentCircle')
        .data(parentCircles)
        .join('circle')
        .classed('parentCircle', true)
        .attr('r', parentCircleRadius)
        .attr('cx', (n, i) => {
          const x = pxWidth / 2 + (parentCircles.length === 1 ? 0 : parentCircleDistance * Math.cos(circleScale(i)));
          return x;
        })
        .attr(
          'cy',
          (n, i) => pxHeight / 2 + (parentCircles.length === 1 ? 0 : parentCircleDistance * Math.sin(circleScale(i)))
        )
        .attr('fill', (n, i) => d3ScaleChromatic.schemePastel2[i])
        .attr('stroke', 'black')
        .on('click', (event, n) => {
          onClick(n);
        })
        .attr('stroke-width', 1);

      const parentLabel = container
        .selectAll('.parentLabel')
        .data(parentCircles)
        .join('text')
        .classed('parentLabel', true)
        .attr('text-anchor', 'middle')

        .on('click', (event, n) => {
          onClick(n);
        })
        .attr('dx', (n, i) => {
          const x = pxWidth / 2 + parentCircleDistance * Math.cos(circleScale(i));
          return x;
        })
        .attr('dy', (n, i) => pxHeight / 2 + parentCircleDistance * Math.sin(circleScale(i)))
        // .attr('fill', 'black')
        .attr('font-weight', 500)
        .attr('fill', (d) => (d.topicType === TopicType.Domain ? theme.colors.gray[600] : theme.colors.gray[600]))
        .text(function (d) {
          return d.name;
        });
      let rootCircle: d3Selection.Selection<SVGCircleElement, boolean, SVGSVGElement, unknown> | undefined;
      let rootCircleLabel: d3Selection.Selection<SVGTextElement, boolean, SVGSVGElement, unknown> | undefined;
      if (topic) {
        rootCircle = container
          .append('circle')
          .attr('r', (_, _2, circle) => {
            return 120;
          })
          .classed('rootCircle', true)
          .attr('cx', pxWidth / 2)
          .attr('cy', pxHeight / 2)
          .attr('fill', (n) => 'white')
          .attr('stroke', 'black')
          .attr('stroke-width', parentCircles.length ? 1 : 0);

        rootCircleLabel = container
          .append('text')
          .attr('x', (_, _2, circle) => {
            return pxWidth / 2;
          })
          .classed('rootCircle', true)
          .attr('text-anchor', 'middle')
          .attr('x', pxWidth / 2)
          .attr('y', pxHeight / 2)
          .attr('fill', (n) => theme.colors.gray[700])
          .attr('font-size', theme.fontSizes.lg)
          .attr('font-weight', 600)
          .attr('display', parentCircles.length ? 'inherit' : 'none')
          .text(function (d) {
            return topic.name;
          });
      }

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
          return getNodeRadius(d) + (d.topicType === TopicType.Domain ? 16 : 12);
        })
        .attr('z-index', 10)
        .attr('font-size', (d) => (d.topicType === TopicType.Domain ? '1em' : '0.8em'))
        .attr('font-weight', (d) => (d.topicType === TopicType.Domain ? 500 : 500))
        .attr('fill', (d) => (d.topicType === TopicType.Domain ? theme.colors.gray[700] : theme.colors.gray[500]))
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

        const labelDistance = parentCircles.length > 1 ? maxDistance + 90 : maxDistance + 120;

        const angle = (i: number) => (parentCircles.length > 1 ? circleScale(i) : Math.PI + Math.PI / 8);

        parentLabel
          .attr('dx', (n, i) => {
            const x = pxWidth / 2 + labelDistance * Math.cos(angle(i));
            return x;
          })
          .attr('dy', (n, i) => pxHeight / 2 + labelDistance * Math.sin(angle(i)));
        rootCircle && rootCircle.attr('r', maxDistance + 40);
        rootCircleLabel && rootCircleLabel.attr('y', pxHeight / 2 + maxDistance + 58);
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
  }, [topic?._id]);
  return <svg ref={d3Container} width={`${pxWidth}px`} height={`${pxHeight}px`} fontSize="xs" />;
};
