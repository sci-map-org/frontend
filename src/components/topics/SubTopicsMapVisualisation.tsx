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
  MinimapTopicDataFragment & {
    id: string;
  };
export interface SubTopicsMapVisualisationProps {
  domainKey: string;
  topics: MinimapTopicDataFragment[];
  pxWidth: number;
  pxHeight: number;
}
export const SubTopicsMapVisualisation: React.FC<SubTopicsMapVisualisationProps> = ({
  domainKey,
  topics,
  pxWidth,
  pxHeight,
}) => {
  const d3Container = useRef<SVGSVGElement>(null);

  const nodes: NodeElement[] = useMemo(
    () =>
      topics.map((topic) => {
        return { id: topic._id, ...topic };
      }),
    []
  );

  useEffect(() => {
    if (d3Container && d3Container.current) {
      const colorMap: any = {};

      nodes.forEach((node, i) => {
        colorMap[node._id] = d3ScaleChromatic.schemePastel1[i % 9];
      });

      const svg = d3Selection.select(d3Container.current).attr('viewBox', [0, 0, pxWidth, pxHeight].join(','));
      const container = svg.append('g');

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
        .classed('nodeC', true)
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
  }, [nodes]);
  return <svg ref={d3Container} width={`${pxWidth}px`} height={`${pxHeight}px`} fontSize="xs" />;
};
