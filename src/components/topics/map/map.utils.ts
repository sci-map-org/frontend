import * as d3Force from 'd3-force';
import * as d3Selection from 'd3-selection';
import gql from 'graphql-tag';
import { TopicLinkData } from '../../../graphql/topics/topics.fragments';
import { MapTopicDataFragment } from './map.utils.generated';
import * as d3Drag from 'd3-drag';

export const MapTopicData = gql`
  fragment MapTopicData on Topic {
    ...TopicLinkData
    subTopicsTotalCount
    learningMaterialsTotalCount
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

export function dragNode(simulation: d3Force.Simulation<d3Force.SimulationNodeDatum, undefined>) {
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

export interface MapOptions {
  pxWidth: number;
  pxHeight: number;
  radiusCoefficient?: number;
  mode: 'explore' | 'mini';
  enableHistory?: boolean;
  showTotalSubTopicsCount?: boolean;
  showLearningMaterialsTotalCount?: boolean;
}

export interface TopicNodeElement extends MapTopicDataFragment {
  radius: number;
  color: string;
  learningMaterialsTotalCount?: number | null;
  clickable: boolean;
}

const spacingBetweenCounts = (radius: number) => radius / 6 + 4;

export function drawTopicNode<T extends TopicNodeElement>(
  container: d3Selection.Selection<d3Selection.BaseType | SVGGElement, boolean, SVGSVGElement, unknown>,
  topicNodeElements: T[],
  className: string,
  { pxHeight, pxWidth, showTotalSubTopicsCount, showLearningMaterialsTotalCount }: MapOptions
) {
  const topicNodes = container
    .selectAll('.' + className)
    .data(topicNodeElements)
    .join('g')
    .attr('transform', `translate(${pxWidth / 2}, ${pxHeight / 2})`)
    .classed('node', true)
    .classed('clickable_node', (n) => n.clickable)
    .classed(className, true);

  topicNodes
    .append('circle')
    .classed('node_circle', true)
    .attr('r', (n) => n.radius)
    .attr('fill', (n) => n.color);

  if (showTotalSubTopicsCount) {
    const getIconSize = (radius: number) => radius * 0.18 + 10;
    const getFontSize = (radius: number) => radius * 0.14 + 10 + 'px';

    const subTopicsCountViewers = topicNodes
      .append('g')
      .attr('transform', (n) =>
        n.learningMaterialsTotalCount && showLearningMaterialsTotalCount
          ? `translate(0, -${spacingBetweenCounts(n.radius)})`
          : ''
      )
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
  if (showLearningMaterialsTotalCount) {
    const getIconSize = (radius: number) => radius * 0.12 + 10;
    const getFontSize = (radius: number) => radius * 0.14 + 10 + 'px';

    const learningMaterialsCountViewers = topicNodes
      .append('g')
      .attr('transform', (n) =>
        n.subTopicsTotalCount && showTotalSubTopicsCount ? `translate(0, ${spacingBetweenCounts(n.radius)})` : ''
      )
      .classed(
        'learning_materials_count_viewer',
        (n) => !!n.learningMaterialsTotalCount && n.learningMaterialsTotalCount > 0
      )
      .classed('learning_materials_count_viewer_hidden', (n) => !n.learningMaterialsTotalCount);

    learningMaterialsCountViewers
      .append('text')
      .classed('learning_materials_count', true)
      .attr('z-index', 10)
      .attr('text-anchor', 'end')
      .attr('dx', (n) => -n.radius * 0.05)
      .attr('dy', (n) => {
        return '0.38em';
      })
      .attr('font-size', (n) => getFontSize(n.radius))
      .attr('font-weight', 500)
      .text(function (d) {
        return d.learningMaterialsTotalCount || '';
      });

    learningMaterialsCountViewers
      .append('g')
      .attr('transform', (n) => `translate(0, -${getIconSize(n.radius) / 2})`)
      .html((n) => renderLearningMaterialIcon(getIconSize(n.radius) + 'px'));
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

export function drawLink<
  LinkElement extends d3Force.SimulationLinkDatum<d3Force.SimulationNodeDatum> & { size: number }
>(
  container: d3Selection.Selection<d3Selection.BaseType | SVGGElement, boolean, SVGSVGElement, unknown>,
  dependencyElements: LinkElement[],
  className: string,
  { pxHeight, pxWidth }: MapOptions
): d3Selection.Selection<d3Selection.BaseType, LinkElement, d3Selection.BaseType | SVGGElement, LinkElement> {
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
    .classed('linkLineElementSize2', (n) => !!n['size'] && n.size === 2)
    .classed('linkLineElementSize3', (n) => !!n['size'] && n.size > 2)
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

const renderLearningMaterialIcon = (
  boxSize: string
) => `<svg viewBox="0 0 19 19" width="${boxSize}" height="${boxSize}" fill="none" xmlns="http://www.w3.org/2000/svg" >
<path
  d="M15.8568 5.35488L11.8639 1.36191C11.7525 1.25059 11.6022 1.1875 11.4445 1.1875H3.5625C3.23408 1.1875 2.96875 1.45283 2.96875 1.78125V17.2188C2.96875 17.5472 3.23408 17.8125 3.5625 17.8125H15.4375C15.7659 17.8125 16.0312 17.5472 16.0312 17.2188V5.77607C16.0312 5.61836 15.9682 5.46621 15.8568 5.35488ZM14.6619 6.04883H11.1699V2.55684L14.6619 6.04883ZM14.6953 16.4766H4.30469V2.52344H9.9082V6.53125C9.9082 6.73793 9.99031 6.93615 10.1365 7.0823C10.2826 7.22844 10.4808 7.31055 10.6875 7.31055H14.6953V16.4766ZM9.35156 11.4668H5.9375C5.85586 11.4668 5.78906 11.5336 5.78906 11.6152V12.5059C5.78906 12.5875 5.85586 12.6543 5.9375 12.6543H9.35156C9.4332 12.6543 9.5 12.5875 9.5 12.5059V11.6152C9.5 11.5336 9.4332 11.4668 9.35156 11.4668ZM5.78906 9.0918V9.98242C5.78906 10.0641 5.85586 10.1309 5.9375 10.1309H13.0625C13.1441 10.1309 13.2109 10.0641 13.2109 9.98242V9.0918C13.2109 9.01016 13.1441 8.94336 13.0625 8.94336H5.9375C5.85586 8.94336 5.78906 9.01016 5.78906 9.0918Z"
  fill="white"
/>
</svg>`;

export const getTopicNodeRadius = (
  topic: MapTopicDataFragment,
  { defaultRadius = 15, coefficient = 1 }: { defaultRadius?: number; coefficient?: number }
): number => {
  return topic.subTopicsTotalCount
    ? defaultRadius + (topic.subTopicsTotalCount > 0 ? Math.log(topic.subTopicsTotalCount + 1) * 12 * coefficient : 0)
    : defaultRadius;
};
