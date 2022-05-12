import gql from 'graphql-tag';
import { TopicLinkData } from '../../../graphql/topics/topics.fragments';
import * as d3Selection from 'd3-selection';
import { MapTopicDataFragment } from './map.utils.generated';
import * as d3Force from 'd3-force';

export const MapTopicData = gql`
  fragment MapTopicData on Topic {
    ...TopicLinkData
    subTopicsTotalCount
  }
  ${TopicLinkData}
`;

export const TopicNodeColors = [
  '#7FB0EA', // lightBlue
  '#EAA67F', // orange
  '#9FA55F', // kaki
  '#69A55F', // green apple
  '#EA7F7F', // salmon
  '#5FA5A1', // tealish
  '#8638B7', // violet
  '#C17FEA', // purple
  '#817FEA', // mauve
];

export interface MapOptions {
  pxWidth: number;
  pxHeight: number;
  radiusCoefficient?: number;
  mode: 'explore' | 'mini';
  enableHistory?: boolean;
}

export interface TopicNodeElement extends MapTopicDataFragment {
  radius: number;
  color: string;
}
export function drawTopicNode<T extends TopicNodeElement>(
  container: d3Selection.Selection<d3Selection.BaseType | SVGGElement, boolean, SVGSVGElement, unknown>,
  topicNodeElements: T[],
  className: string,
  { pxHeight, pxWidth }: MapOptions
) {
  const topicNodes = container
    .selectAll('.' + className)
    .data(topicNodeElements)
    .join('g')
    .attr('transform', `translate(${pxWidth / 2}, ${pxHeight / 2})`)
    .classed('node', true)
    .classed(className, true);

  topicNodes
    .append('circle')
    .classed('node_circle', true)
    .attr('r', (n) => n.radius)
    .attr('fill', (n) => n.color);

  topicNodes
    .append('text')
    .classed('node_label', true)
    .attr('text-anchor', 'middle')
    .attr('dx', 0)
    .attr('dy', (n) => {
      return n.radius * 1.15 + 10;
    })
    .attr('z-index', 10)
    .attr('font-size', (n) => 0.7 + n.radius * 0.01 + 'em')
    .attr('font-weight', 500)
    .text(function (d) {
      return d.name;
    });
  return topicNodes;
}

export function drawLink<T>(
  container: d3Selection.Selection<d3Selection.BaseType | SVGGElement, boolean, SVGSVGElement, unknown>,
  dependencyElements: d3Force.SimulationLinkDatum<T>[],
  className: string,
  { pxHeight, pxWidth }: MapOptions
): d3Selection.Selection<
  d3Selection.BaseType,
  d3Force.SimulationLinkDatum<T>,
  d3Selection.BaseType | SVGGElement,
  d3Force.SimulationLinkDatum<T>
> {
  const defs = container.append('defs');
  defs
    .append('marker')
    .attr('id', 'arrow-head')
    .attr('refX', 10) // to make sure the arrow starts before the end of the marker
    .attr('refY', 3.5)
    .attr('markerWidth', 10)
    .attr('markerHeight', 7)
    .attr('orient', 'auto')
    .classed('arrow-head', true)
    .append('polygon')
    .attr('points', '0 0, 10 3.5, 0 7');

  defs
    .append('marker')
    .attr('id', 'arrow-head-hover')
    .attr('refX', 10) // to make sure the arrow starts before the end of the marker
    .attr('refY', 3.5)
    .attr('markerWidth', 10)
    .attr('markerHeight', 7)
    .attr('orient', 'auto')
    .classed('arrow-head-hover', true)
    .append('polygon')
    .attr('points', '0 0, 10 3.5, 0 7');

  const dependencies = container
    .selectAll('.' + className)
    .data(dependencyElements)
    .join('g')
    .classed(className, true);

  dependencies.append('line').classed('linkLineHoverElement', true);
  dependencies
    .append('line')
    .classed('linkLineElement', true)
    .attr('marker-end', (d) => `url("#arrow-head")`);

  return dependencies.selectAll('line');
}
