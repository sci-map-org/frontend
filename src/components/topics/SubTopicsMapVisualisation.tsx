import * as d3Force from 'd3-force';
import { SimulationNodeDatum } from 'd3-force';
import * as d3ScaleChromatic from 'd3-scale-chromatic';
import * as d3Selection from 'd3-selection';
import * as d3Zoom from 'd3-zoom';
import Router from 'next/router';
import { useEffect, useMemo, useRef } from 'react';
import { TopicType } from '../../graphql/types';
import { routerPushToPage } from '../../pages/PageInfo';
import { ConceptPagePath, DomainPageInfo } from '../../pages/RoutesPageInfos';
import { theme } from '../../theme/theme';
import { MinimapTopicDataFragment } from './SubTopicsMinimap.generated';

type NodeElement = SimulationNodeDatum &
  MinimapTopicDataFragment['subTopic'] & {
    id: string;
  };
export interface SubTopicsMapVisualisationProps {
  domainKey: string;
  topicId: string; //only used to force rerendering
  subTopics: MinimapTopicDataFragment[];
  pxWidth: number;
  pxHeight: number;
}
export const SubTopicsMapVisualisation: React.FC<SubTopicsMapVisualisationProps> = ({
  domainKey,
  topicId,
  subTopics,
  pxWidth,
  pxHeight,
}) => {
  const d3Container = useRef<SVGSVGElement>(null);

  const nodes: NodeElement[] = useMemo(
    () =>
      subTopics.map(({ subTopic }) => {
        return { id: subTopic._id, ...subTopic };
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

      const container = svg.selectAll('.innerContainer').data([true]).join('g').classed('innerContainer', true);

      const rootCircle = container
        .append('circle')
        .attr('r', (_, _2, circle) => {
          return 120;
        })
        .classed('rootCircle', true)
        .attr('cx', pxWidth / 2)
        .attr('cy', pxHeight / 2)
        .attr('fill', (n) => 'white')
        .attr('stroke', 'black')
        .attr('stroke-width', 1);

      const node = container
        .selectAll('.node')
        .data(nodes)
        .join('g')
        .classed('node', true)
        .on('click', (event, n) => {
          n.__typename === 'Domain' && routerPushToPage(DomainPageInfo(n));
          n.topicType === TopicType.Concept && Router.push(ConceptPagePath(domainKey, n.key));
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
        rootCircle.attr('r', maxDistance + 20);

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
  }, [topicId]);
  return <svg ref={d3Container} width={`${pxWidth}px`} height={`${pxHeight}px`} fontSize="xs" />;
};
