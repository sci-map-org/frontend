import * as d3Force from 'd3-force';
import { useEffect, useRef } from 'react';
import { GetTopLevelDomainsQuery } from '../ExplorePage.generated';
import * as d3Hierarchy from 'd3-hierarchy';
import * as d3Selection from 'd3-selection';
import { groupBy } from 'lodash';
import { group } from 'd3-array';
import { interpolateMagma } from 'd3-scale-chromatic';
import { scaleSequential } from 'd3-scale';

// d3Force.SimulationNodeDatum &

type NodeElement = {
  _id: string;
  name: string;
  children?: NodeElement[];
  size?: number | null;
};

interface ExploreMapCirclePackingProps {
  data: GetTopLevelDomainsQuery['getTopLevelDomains'];
  pxWidth: number;
  pxHeight: number;
}

export const ExploreMapCirclePacking: React.FC<ExploreMapCirclePackingProps> = ({ data, pxHeight, pxWidth }) => {
  const d3Container = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (data && d3Container.current) {
      const color = scaleSequential([8, 0], interpolateMagma);
      const hierarchyData: NodeElement = { _id: 'root', name: 'root', children: data.items || [] };

      const d = d3Hierarchy
        .hierarchy(hierarchyData)
        .sum((d) => d.size || 0)
        .sort((a, b) => (b.value || 0) - (a.value || 0));

      const pack = d3Hierarchy
        .pack()
        .size([pxWidth - 2, pxHeight - 2])
        .padding(3);
      const root = pack(d);
      const svg = d3Selection.select(d3Container.current).attr('viewBox', [0, 0, pxWidth, pxHeight].join(','));

      const node = svg
        .selectAll('g')
        .data(group(root.descendants(), (d) => d.height))
        .join('g')
        // .attr('filter', shadow)
        .selectAll('g')
        .data((d) => d[1])
        .join('g')
        .attr('transform', (d) => `translate(${d.x + 1},${d.y + 1})`);

      node
        .append('circle')
        .attr('r', (d) => d.r)
        .attr('fill', (d) => color(d.height));
    }
  }, []);
  return <svg ref={d3Container} width={`${pxWidth}px`} height={`${pxHeight}px`} fontSize="xs" />;
};
