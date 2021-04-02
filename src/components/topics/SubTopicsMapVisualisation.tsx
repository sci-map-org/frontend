import * as d3 from 'd3';
import Router from 'next/router';
import { useEffect, useMemo, useRef } from 'react';
import { TopicType } from '../../graphql/types';
import { routerPushToPage } from '../../pages/PageInfo';
import { ConceptPagePath, DomainPageInfo } from '../../pages/RoutesPageInfos';
import { theme } from '../../theme/theme';
import { MinimapTopicDataFragment } from './SubTopicsMinimap.generated';

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
  const d3Container = useRef(null);

  const nodes = useMemo(
    () =>
      topics.map((topic) => {
        return { id: topic._id, ...topic };
      }),
    []
  );

  useEffect(() => {
    if (d3Container) {
      const colorMap: any = {};

      nodes.forEach((node, i) => {
        // 1
        // colorMap[node._id] = d3.interpolateRainbow(i / nodes.length);
        // 2
        // colorMap[node._id] = d3.schemeSet3[i % 12];
        // 3
        // colorMap[node._id] = d3.schemeSet2[i % 8];
        // 4
        // colorMap[node._id] = d3.schemeSet1[i % 9];

        colorMap[node._id] = d3.schemePastel1[i % 9];

        //5
        // colorMap[node._id] = d3.interpolateYlGnBu(i / nodes.length);

        // colorMap[node._id] = d3.interpolateSpectral(i / nodes.length);
      });

      const svg = d3.select(d3Container.current).attr('viewBox', [0, 0, pxWidth, pxHeight]);
      const container = svg.append('g');

      const node = container
        .selectAll('.node')
        .data(nodes)
        .join('g')
        .classed('node', true)
        .on('click', (event, n) => {
          n.topicType === TopicType.Domain && routerPushToPage(DomainPageInfo(n));
          n.topicType === TopicType.Concept && Router.push(ConceptPagePath(domainKey, n.key));
        });

      const getNodeRadius = (n: MinimapTopicDataFragment) =>
        n.size ? 12 + (n.size > 1 ? Math.log(n.size) * 12 : 0) : 12;

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

      const zoom = d3.zoom();
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

      const simulation = d3
        .forceSimulation()
        .nodes(nodes)
        .force(
          'charge',
          d3.forceManyBody().strength((d) => {
            return d.size ? -(getNodeRadius(d) * getNodeRadius(d)) / 15 : -8;
          })
        )

        .force('center', d3.forceCenter(pxWidth / 2, pxHeight / 2))
        .on('tick', tick);
    }
  }, [nodes]);
  return <svg ref={d3Container} width={`${pxWidth}px`} height={`${pxHeight}px`} fontSize="xs" />;
};
