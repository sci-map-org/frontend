import * as d3Force from 'd3-force';
import * as d3Selection from 'd3-selection';
import gql from 'graphql-tag';
import { TopicLinkData } from '../../../graphql/topics/topics.fragments';
import { MapTopicDataFragment } from './map.utils.generated';

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
  showTotalSubTopicsCount?: boolean;
  // showLearningMaterialsTotalCount?: boolean;
}

export interface TopicNodeElement extends MapTopicDataFragment {
  radius: number;
  color: string;
  learningMaterialsTotalCount?: number;
}
export function drawTopicNode<T extends TopicNodeElement>(
  container: d3Selection.Selection<d3Selection.BaseType | SVGGElement, boolean, SVGSVGElement, unknown>,
  topicNodeElements: T[],
  className: string,
  { pxHeight, pxWidth, showTotalSubTopicsCount }: MapOptions
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

  if (showTotalSubTopicsCount) {
    const getIconSize = (radius: number) => radius * 0.18 + 12;
    const getFontSize = (radius: number) => radius * 0.14 + 12 + 'px';

    const subTopicsCountViewers = topicNodes
      .append('g')
      .attr('transform', (n) => (n.learningMaterialsTotalCount ? `translate(0, -${n.radius / 3})` : ''))
      .classed('subtopics_count_viewer', (n) => !!n.subTopicsTotalCount && n.subTopicsTotalCount > 0)
      .classed('subtopics_count_viewer_hidden', (n) => !n.subTopicsTotalCount);

    subTopicsCountViewers
      .append('text')
      .classed('subtopics_count', true)
      .attr('z-index', 10)
      .attr('text-anchor', 'end')
      .attr('dx', (n) => -n.radius * 0.05)
      .attr('dy', (n) => {
        return '0.46em';
      })
      .attr('font-size', (n) => getFontSize(n.radius))
      .attr('font-weight', 500)
      .text(function (d) {
        return d.subTopicsTotalCount || '';
      });

    subTopicsCountViewers
      .append('g')
      .attr('transform', (n) => `translate(0, -${getIconSize(n.radius) / 2})`)
      .html((n) => renderTopicIcon(getIconSize(n.radius) + 'px'));
  }

  topicNodes
    .append('text')
    .classed('node_label', true)
    .attr('text-anchor', 'middle')
    .attr('dx', 0)
    .attr('dy', (n) => {
      return n.radius * 1.2 + 10;
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

const renderTopicIcon = (
  boxSize: string
) => `<svg viewBox="0 0 100 100" width="${boxSize}" height="${boxSize}" fill="white" >
<path d="M62,47.9h-2c-0.2-0.8-0.6-1.6-1-2.4l1.4-1.4c0.3-0.3,0.3-0.9,0-1.2l-2.7-2.7c-0.3-0.3-0.9-0.3-1.2,0l-1.4,1.4     c-0.7-0.4-1.5-0.7-2.4-1v-2c0-0.5-0.4-0.9-0.9-0.9h-3.8c-0.5,0-0.9,0.4-0.9,0.9v2c-0.8,0.2-1.6,0.6-2.4,1l-1.4-1.4     c-0.3-0.3-0.9-0.3-1.2,0l-2.7,2.7c-0.3,0.3-0.3,0.9,0,1.2l1.4,1.4c-0.4,0.7-0.7,1.5-1,2.4h-2c-0.5,0-0.9,0.4-0.9,0.9v3.8     c0,0.5,0.4,0.9,0.9,0.9h2c0.2,0.8,0.6,1.6,1,2.4l-1.4,1.4c-0.3,0.3-0.3,0.9,0,1.2l2.7,2.7c0.3,0.3,0.9,0.3,1.2,0l1.4-1.4     c0.7,0.4,1.5,0.7,2.4,1v2c0,0.5,0.4,0.9,0.9,0.9h3.8c0.5,0,0.9-0.4,0.9-0.9v-2c0.8-0.2,1.6-0.6,2.4-1l1.4,1.4     c0.3,0.3,0.9,0.3,1.2,0l2.7-2.7c0.3-0.3,0.3-0.9,0-1.2l-1.4-1.4c0.4-0.7,0.7-1.5,1-2.4h2c0.5,0,0.9-0.4,0.9-0.9v-3.8     C62.9,48.3,62.5,47.9,62,47.9z M50,55.2c-2.5,0-4.5-2-4.5-4.5c0-2.5,2-4.5,4.5-4.5c2.5,0,4.5,2,4.5,4.5     C54.5,53.2,52.5,55.2,50,55.2z" />
<path d="M65.9,30.8c-6.2-4.9-14.2-6.6-22-4.8c-9.1,2.1-16.4,9.3-18.6,18.4c-2.5,10.1,1,20.3,9.2,26.6c0.6,0.5,1,1.4,1,2.4v13.7     c0,2.8,2.3,5.1,5.1,5.1h3.2c0.9,2.7,3.3,4.6,6.3,4.6c3,0,5.4-2,6.3-4.6h3.2c2.8,0,5.1-2.3,5.1-5.1V73.3c0-0.9,0.3-1.7,0.9-2.2     c6.4-4.9,10.1-12.3,10.1-20.2C75.6,43,72,35.7,65.9,30.8z M41.6,86v-5.8h16.8V86H41.6z M61.7,66.2c-2.1,1.6-3.4,4.2-3.4,7.1v0.8     H41.6v-0.7c0-2.9-1.3-5.6-3.4-7.3c-6.2-4.8-8.9-12.5-7-20.3C32.9,39,38.4,33.6,45.3,32c6-1.4,12.1-0.1,16.8,3.6     c4.7,3.7,7.4,9.2,7.4,15.2C69.4,56.9,66.6,62.5,61.7,66.2z" />
<path d="M50,19.1c1.7,0,3.1-1.4,3.1-3.1V6.3c0-1.7-1.4-3.1-3.1-3.1s-3.1,1.4-3.1,3.1V16C46.9,17.7,48.3,19.1,50,19.1z" />
<path d="M27.7,28.3c1.2-1.2,1.2-3.2,0-4.4l-6.9-6.9c-1.2-1.2-3.2-1.2-4.4,0s-1.2,3.2,0,4.4l6.9,6.9c0.6,0.6,1.4,0.9,2.2,0.9     S27.1,28.9,27.7,28.3z" />
<path d="M15.3,47.6H5.6c-1.7,0-3.1,1.4-3.1,3.1s1.4,3.1,3.1,3.1h9.7c1.7,0,3.1-1.4,3.1-3.1S17,47.6,15.3,47.6z" />
<path d="M94.4,47.6h-9.7c-1.7,0-3.1,1.4-3.1,3.1s1.4,3.1,3.1,3.1h9.7c1.7,0,3.1-1.4,3.1-3.1S96.1,47.6,94.4,47.6z" />
<path d="M83.6,17.1c-1.2-1.2-3.2-1.2-4.4,0L72.3,24c-1.2,1.2-1.2,3.2,0,4.4c0.6,0.6,1.4,0.9,2.2,0.9s1.6-0.3,2.2-0.9l6.9-6.9     C84.8,20.2,84.8,18.3,83.6,17.1z" />
</svg>`;
