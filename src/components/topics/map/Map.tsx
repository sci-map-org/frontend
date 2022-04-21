import * as d3Selection from 'd3-selection';
import gql from 'graphql-tag';
import { TopicLinkData } from '../../../graphql/topics/topics.fragments';
import { TopicLinkDataFragment } from '../../../graphql/topics/topics.fragments.generated';
import { MapTopicDataFragment } from './Map.generated';
import { MapType } from './MapHeader';
import { PrerequisiteMap } from './PrerequisiteMap';
import { ProgressMap } from './ProgressMap';
import { SubTopicsMap } from './SubTopicsMap';

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

export interface MapProps {
  mapType: MapType;
  topic?: MapTopicDataFragment; //only used to force rerendering
  subTopics: MapTopicDataFragment[];
  parentTopic?: TopicLinkDataFragment;
  pxWidth: number;
  pxHeight: number;
  // ratio?: number;
  onClick: (node: TopicLinkDataFragment) => void;
}

export const Map: React.FC<MapProps> = ({
  mapType,
  topic,
  subTopics,
  parentTopic,
  pxWidth,
  pxHeight,
  // ratio = 4 / 3,
  onClick,
}) => {
  if (mapType === MapType.SUBTOPICS)
    return (
      <SubTopicsMap
        topic={topic}
        subTopics={subTopics}
        parentTopic={parentTopic}
        pxWidth={pxWidth}
        pxHeight={pxHeight}
        onClick={onClick}
      />
    );

  if (mapType === MapType.PREREQUISITES && topic)
    return (
      <PrerequisiteMap
        topic={topic}
        prerequisiteTopics={[
          { _id: 'bla', key: 'bla', name: 'Bla 1' },
          { _id: 'bla2', key: 'bla2', name: 'Bla 2' },
          { _id: 'bla3', key: 'bla3', name: 'Bla 3' },
          { _id: 'bla4', key: 'bla4', name: 'Bla 4' },
        ]}
        followUpTopics={[
          { _id: 'bli', key: 'bli', name: 'Bli' },
          { _id: 'bli2', key: 'bli2', name: 'Bli 2' },
          { _id: 'bli3', key: 'bli3', name: 'Bli 3' },
          { _id: 'bli4', key: 'bli4', name: 'Bli 4' },
        ]}
        pxWidth={pxWidth}
        pxHeight={pxHeight}
        onClick={() => console.log('click')}
      />
    );
  if (mapType === MapType.CONCEPTS && topic)
    return (
      <ProgressMap
        topic={topic}
        subTopics={[
          { _id: 'bla', key: 'bla', name: 'Bla 1', level: 0, prerequisites: [] },
          { _id: 'bla2', key: 'bla2', name: 'Bla 2', level: 30, prerequisites: [{ _id: 'bla' }] },
          { _id: 'bla3', key: 'bla3', name: 'Bla 3', level: 5, prerequisites: [] },
          { _id: 'bla4', key: 'bla4', name: 'Bla 4', level: 30, prerequisites: [{ _id: 'bla2' }, { _id: 'bla3' }] },
          { _id: 'bla5', key: 'bla5', name: 'Bla 5', level: 30, prerequisites: [{ _id: 'bla3' }] },
          { _id: 'bla6', key: 'bla6', name: 'Bla 6', level: 30, prerequisites: [{ _id: 'bla2' }, { _id: 'bla4' }] },
          { _id: 'bla7', key: 'bla7', name: 'Bla 7', level: 100, prerequisites: [] },
          { _id: 'bla8', key: 'bla8', name: 'Bla 8', level: 50, prerequisites: [{ _id: 'bla3' }] },
        ]}
        pxWidth={pxWidth}
        pxHeight={pxHeight}
        onClick={() => console.log('click')}
      />
    );
  return null;
};

export type DrawMapOptions = {
  pxWidth: number;
  pxHeight: number;
};

export interface TopicNodeElement extends MapTopicDataFragment {
  radius: number;
  color: string;
}
export function drawTopicNode<T extends TopicNodeElement>(
  container: d3Selection.Selection<d3Selection.BaseType | SVGGElement, boolean, SVGSVGElement, unknown>,
  topicNodeElements: T[],
  className: string,
  { pxHeight, pxWidth }: DrawMapOptions
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

export function drawDependency<T>(
  container: d3Selection.Selection<d3Selection.BaseType | SVGGElement, boolean, SVGSVGElement, unknown>,
  dependencyElements: T[],
  className: string,
  { pxHeight, pxWidth }: DrawMapOptions
) {
  container
    .append('defs')
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

  return container
    .selectAll('.' + className)
    .data(dependencyElements)
    .join('g')
    .classed(className, true)
    .append('line')
    .classed('linkLineElement', true)
    .attr('marker-end', (d) => `url(${new URL(`#arrow-head`, window.location.href)})`);
}
