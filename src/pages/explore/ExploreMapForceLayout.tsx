import * as d3Force from 'd3-force';
import { interpolateZoom } from 'd3-interpolate';
import { schemePastel1 } from 'd3-scale-chromatic';
import * as d3Selection from 'd3-selection';
import { useEffect, useRef } from 'react';
import { GetTopLevelDomainsQuery } from '../ExplorePage.generated';
import { theme } from '../../theme/theme';

type NodeElement = d3Force.SimulationNodeDatum & {
  _id: string;
  name: string;
  size?: number;
};

interface ExploreMapForceLayoutProps {
  data: GetTopLevelDomainsQuery['getTopLevelDomains'];
  pxWidth: number;
  pxHeight: number;
}

export const ExploreMapForceLayout: React.FC<ExploreMapForceLayoutProps> = ({ data, pxWidth, pxHeight }) => {
  const d3Container = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (data && d3Container.current) {
      const colorMap: any = {};
      let view: any;

      const root: { subTopics: NodeElement[] } = {
        subTopics: data.items.map((i) => ({ ...i, size: i.size || undefined })),
      };
      let focus = root;
      root.subTopics.forEach((node, i) => {
        colorMap[node._id] = schemePastel1[i % 9];
      });

      const svg = d3Selection.select(d3Container.current).attr('viewBox', [0, 0, pxWidth, pxHeight].join(','));
      // .on('click', (event) => zoom(event, root));

      const container = svg.selectAll('.innerContainer').data([true]).join('g').classed('innerContainer', true);

      const getNodeRadius = (n: NodeElement) => (n.size ? 12 + (n.size > 1 ? Math.log(n.size) * 12 : 0) : 12);

      const node = container
        .selectAll('.node')
        .data(root.subTopics)
        .join('g')
        .classed('node', true)
        .attr('r', getNodeRadius)
        .on('click', (event, d) => focus !== d && (zoom(event, d), event.stopPropagation()));

      node
        .append('circle')
        .classed('node_circle', true)
        .attr('r', getNodeRadius)
        .attr('fill', (n) => colorMap[n._id]);

      const label = node
        .append('text')
        .classed('node_label', true)
        .attr('text-anchor', 'middle')
        .attr('dx', 0)

        .attr('dy', (d) => {
          return getNodeRadius(d) + 16;
        })
        .attr('z-index', 10)
        .attr('font-size', (d) => '1em')
        .attr('font-weight', (d) => 500)
        .attr('fill', (d) => theme.colors.gray[700])
        .text(function (d) {
          return d.name;
        });

      const zoomTo = (v) => {
        const k = pxWidth / v[2];

        view = v;

        label.attr('transform', (d) => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
        node.attr('transform', (d) => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
        node.attr('r', (d) => d.r * k);
      };

      const zoom = (event, d) => {
        const focus0 = focus;

        focus = d;

        const transition = svg
          .transition()
          .duration(event.altKey ? 7500 : 750)
          .tween('zoom', (d) => {
            const i = interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
            return (t) => zoomTo(i(t));
          });

        // label
        //   .filter(function (d) {
        //     return d.parent === focus || this.style.display === 'inline';
        //   })
        //   .transition(transition)
        //   .style('fill-opacity', (d) => (d.parent === focus ? 1 : 0))
        //   .on('start', function (d) {
        //     if (d.parent === focus) this.style.display = 'inline';
        //   })
        //   .on('end', function (d) {
        //     if (d.parent !== focus) this.style.display = 'none';
        //   });
      };

      //   const zoom = d3Zoom.zoom<SVGSVGElement, unknown>();
      const tick = () => {
        node.attr('transform', function (d) {
          return 'translate(' + d.x + ',' + d.y + ')';
        });
      };

      //   svg.call(
      //     zoom
      //       .extent([
      //         [0, 0],
      //         [pxWidth, pxHeight],
      //       ])
      //       .scaleExtent([0.6, 3])
      //       .on('zoom', function ({ transform }) {
      //         container.attr('transform', transform);
      //       })
      //   );

      const simulation = d3Force
        .forceSimulation<NodeElement>()
        .nodes(root.subTopics)
        .force(
          'charge',
          d3Force.forceManyBody<NodeElement>().strength((d) => {
            return d.size ? -(getNodeRadius(d) * getNodeRadius(d)) / 15 : -8;
          })
        )

        .force('center', d3Force.forceCenter(pxWidth / 2, pxHeight / 2))
        .on('tick', tick);
    }
  }, [data]);
  return <svg ref={d3Container} width={`${pxWidth}px`} height={`${pxHeight}px`} fontSize="xs" />;
};
