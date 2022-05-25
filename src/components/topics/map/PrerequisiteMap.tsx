import { Stack, Text } from '@chakra-ui/react';
import * as d3Force from 'd3-force';
import { SimulationNodeDatum } from 'd3-force';
import { schemePastel1 } from 'd3-scale-chromatic';
import * as d3Selection from 'd3-selection';
import * as d3Zoom from 'd3-zoom';
import { useEffect, useMemo, useRef } from 'react';
import { BaseMap } from './BaseMap';
import { MapTopicDataFragment } from './map.utils.generated';
import {
  drawLink,
  drawTopicNode,
  getTopicNodeRadius,
  MapOptions,
  MapTopicData,
  TopicNodeColors,
  TopicNodeElement,
} from './map.utils';
import gql from 'graphql-tag';
import { useGetPrerequisiteMapTopicsQuery } from './PrerequisiteMap.generated';
import { omit } from 'lodash';
import { MapBackButton } from './MapBackButton';
import { TopicLinkDataFragment } from '../../../graphql/topics/topics.fragments.generated';
import { MapSearchBox } from './MapSearchBox';

type NodeElement = SimulationNodeDatum & TopicNodeElement & { type: 'prereq' | 'followUp' | 'topic' };

type LinkElement = d3Force.SimulationLinkDatum<NodeElement> & { size: number };

const radiusMarginArrow = 2;
const layoutMargin = 40;

const PREREQUISITE_COLOR = TopicNodeColors[5];
const FOLLOW_UP_COLOR = TopicNodeColors[4];

export const getPrerequisiteMapTopics = gql`
  query getPrerequisiteMapTopics($topicId: String!) {
    getTopicById(topicId: $topicId) {
      ...MapTopicData
      prerequisites {
        prerequisiteTopic {
          ...MapTopicData
        }
      }
      followUps {
        followUpTopic {
          ...MapTopicData
        }
      }
    }
  }
  ${MapTopicData}
`;

export const PrerequisiteMap: React.FC<{
  topicId: string;
  options: MapOptions;
  onSelectTopic: (node: TopicLinkDataFragment) => void;
  onBack?: () => void;
}> = ({ topicId, options, onSelectTopic, onBack }) => {
  const { data, loading } = useGetPrerequisiteMapTopicsQuery({ variables: { topicId } });
  if (loading || !data) return <BaseMap options={options} isLoading={true} />;
  return (
    <StatelessPrerequisiteMap
      topic={omit(data.getTopicById, ['prerequisites', 'followUps'])}
      prerequisiteTopics={(data.getTopicById.prerequisites || []).map(({ prerequisiteTopic }) => prerequisiteTopic)}
      followUpTopics={(data.getTopicById.followUps || []).map(({ followUpTopic }) => followUpTopic)}
      options={options}
      onSelectTopic={onSelectTopic}
      onBack={onBack}
    />
  );
};

export const StatelessPrerequisiteMap: React.FC<{
  topic: MapTopicDataFragment;
  prerequisiteTopics: MapTopicDataFragment[];
  followUpTopics: MapTopicDataFragment[];
  options: MapOptions;
  onSelectTopic: (node: TopicLinkDataFragment) => void;
  onBack?: () => void;
}> = ({ topic, prerequisiteTopics, followUpTopics, options, onSelectTopic, onBack }) => {
  const d3Container = useRef<SVGSVGElement>(null);

  const linksLength = useMemo(
    () =>
      options.mode === 'explore' ? (options.pxWidth - 2 * layoutMargin) / 6 : (options.pxWidth - 2 * layoutMargin) / 3,
    [options]
  );
  const topicNodeElements: NodeElement[] = useMemo(
    () => [
      {
        id: topic._id,
        type: 'topic',
        radius: 24,
        fx: options.pxWidth / 2,
        fy: options.pxHeight / 2,
        color: TopicNodeColors[0],
        clickable: false,
        ...topic,
      },
    ],
    [topic]
  );
  const prereqNodeElements: NodeElement[] = useMemo(
    () =>
      prerequisiteTopics.map((prereqTopic, i) => {
        return {
          id: prereqTopic._id,
          type: 'prereq',
          x: options.pxWidth / 2 - linksLength,
          y: options.pxHeight / 2 - (13 * prerequisiteTopics.length) / 2 + i * 13,
          radius: getTopicNodeRadius(prereqTopic, { defaultRadius: 13, coefficient: 0.3 }), // 13,
          color: PREREQUISITE_COLOR,
          clickable: true,
          ...prereqTopic,
        };
      }),
    [prerequisiteTopics, options]
  );

  const followUpNodeElements: NodeElement[] = useMemo(
    () =>
      followUpTopics.map((followTopic, i) => {
        return {
          id: followTopic._id,
          type: 'followUp',
          x: options.pxWidth / 2 + linksLength,
          y: options.pxHeight / 2 - (13 * followUpTopics.length) / 2 + i * 13,
          // radius: 13,
          radius: getTopicNodeRadius(followTopic, { defaultRadius: 13, coefficient: 0.3 }), // 13,
          color: FOLLOW_UP_COLOR,
          clickable: true,
          ...followTopic,
        };
      }),
    [followUpTopics, options]
  );

  const nodeElements: NodeElement[] = useMemo(() => {
    return [...prereqNodeElements, ...topicNodeElements, ...followUpNodeElements];
  }, [prereqNodeElements, topicNodeElements, followUpNodeElements]);

  const prerequisiteLinkElements: LinkElement[] = useMemo(() => {
    return [
      ...prereqNodeElements.map((prereq, idx) => ({ source: prereq._id, target: topicNodeElements[0]._id, size: 2 })),
      ...followUpNodeElements.map((followUp, idx) => ({
        source: topicNodeElements[0]._id,
        target: followUp._id,
        size: 2,
      })),
    ];
  }, [prereqNodeElements, followUpNodeElements, topicNodeElements]);

  // Hack to avoid useless rerenders in useEffect.
  const nodeElementsIds = useMemo(() => nodeElements.map(({ _id }) => _id).join(','), [nodeElements]);
  const prerequisiteLinkElementsIds = useMemo(
    () => prerequisiteLinkElements.map(({ source, target }) => `${source}_${target}`).join(','),
    [prerequisiteLinkElements]
  );

  useEffect(() => {
    if (d3Container && d3Container.current) {
      const colorMap: any = {};

      nodeElements.forEach((node, i) => {
        colorMap[node._id] = schemePastel1[i % 9];
      });

      const svg = d3Selection
        .select(d3Container.current)
        .attr('viewBox', [0, 0, options.pxWidth, options.pxHeight].join(','));
      svg.selectAll('.innerContainer').remove();
      const container = svg.selectAll('.innerContainer').data([true]).join('g').classed('innerContainer', true);
      const prerequisiteLinks = drawLink(container, prerequisiteLinkElements, 'linkElement', options);
      const prereqNodes = drawTopicNode(container, prereqNodeElements, 'prereqNode', options).on(
        'click',
        (event, n) => {
          onSelectTopic(n);
        }
      );

      const followUpNodes = drawTopicNode(container, followUpNodeElements, 'followUpNode', options).on(
        'click',
        (event, n) => {
          onSelectTopic(n);
        }
      );

      const maintopicNode = drawTopicNode(container, topicNodeElements, 'mainNode', options);

      const zoom = d3Zoom.zoom<SVGSVGElement, unknown>();
      const tick = () => {
        prereqNodes.attr('transform', function (d) {
          return 'translate(' + d.x + ',' + d.y + ')';
        });

        followUpNodes.attr('transform', function (d) {
          return 'translate(' + d.x + ',' + d.y + ')';
        });

        const theta = (source: NodeElement, target: NodeElement) =>
          target.x! - source.x! > 0
            ? Math.atan((target.y! - source.y!) / (target.x! - source.x!))
            : Math.atan((target.y! - source.y!) / (target.x! - source.x!)) + Math.PI;

        prerequisiteLinks
          .attr('x1', function (d) {
            const target = d.target as NodeElement;
            const source = d.source as NodeElement;
            return source.x! + (source.radius + radiusMarginArrow) * Math.cos(theta(source, target));
          })
          .attr('y1', function (d) {
            const target = d.target as NodeElement;
            const source = d.source as NodeElement;
            return source.y! + (source.radius + radiusMarginArrow) * Math.sin(theta(source, target));
          })
          .attr('x2', function (d) {
            const target = d.target as NodeElement;
            const source = d.source as NodeElement;
            return target.x! - (target.radius + radiusMarginArrow) * Math.cos(theta(source, target));
          })
          .attr('y2', function (d) {
            const target = d.target as NodeElement;
            const source = d.source as NodeElement;
            return target.y! - (target.radius + radiusMarginArrow) * Math.sin(theta(source, target));
          });
      };

      svg.call(
        zoom
          .extent([
            [0, 0],
            [options.pxWidth, options.pxHeight],
          ])
          .scaleExtent([0.6, 3])
          .on('zoom', function ({ transform }) {
            container.attr('transform', transform);
          })
      );
      const simulation = d3Force
        .forceSimulation<NodeElement>()
        // .alpha(0.8)
        .alphaDecay(0.005)
        // .alphaDecay(1)
        .nodes(nodeElements)
        .force('charge', d3Force.forceManyBody<NodeElement>().strength(-40))
        .force(
          'collision',
          d3Force.forceCollide<NodeElement>().radius((n) => n.radius + radiusMarginArrow)
        )
        .force(
          'link',
          d3Force
            .forceLink<NodeElement, d3Force.SimulationLinkDatum<NodeElement>>()
            .id((node) => node._id)
            .distance(linksLength)
            .strength(0.2)
            .links(prerequisiteLinkElements)
        )

        .force(
          'prereqAxis',
          d3Force.forceX<NodeElement>(options.pxWidth / 4).strength((node) => (node.type === 'prereq' ? 0.05 : 0))
        )
        .force(
          'followUpAxis',
          d3Force
            .forceX<NodeElement>((3 * options.pxWidth) / 4)
            .strength((node) => (node.type === 'followUp' ? 0.05 : 0))
        )
        .force(
          'yAxis',
          d3Force.forceY<NodeElement>(options.pxHeight / 2).strength(options.mode === 'mini' ? 0.02 : 0.001)
        )
        // .force('center', d3Force.forceCenter(options.pxWidth / 2, options.pxHeight / 2))
        .on('tick', tick);
    }
  }, [nodeElementsIds, prerequisiteLinkElementsIds]);

  // if (!prereqNodeElements.length && !followUpNodeElements.length)
  //   return (
  //     <BaseMap
  //       options={options}
  //       renderCenter={
  //         <Text fontWeight={600} fontSize="lg" color="gray.100" fontStyle="italic" textAlign="center">
  //           No prerequisite or follow up topics found
  //         </Text>
  //       }
  //       renderTopLeft={
  //         <Stack spacing="2px">
  //           {options.mode === 'explore' && <MapSearchBox onSelectTopic={onSelectTopic} />}
  //           {onBack && <MapBackButton onClick={onBack} />}
  //         </Stack>
  //       }
  //     />
  //   );
  return (
    <BaseMap
      ref={d3Container}
      options={options}
      renderBottomMiddleLeft={
        <Text color={PREREQUISITE_COLOR} fontSize="xl" fontWeight={600} filter="brightness(1.1)">
          Prerequisites
        </Text>
      }
      renderBottomMiddleRight={
        <Text color={FOLLOW_UP_COLOR} fontSize="xl" fontWeight={600} filter="brightness(1.1)">
          Follow ups
        </Text>
      }
      renderTopLeft={
        <Stack spacing="2px">
          {options.mode === 'explore' && <MapSearchBox onSelectTopic={onSelectTopic} />}
          {onBack && <MapBackButton onClick={onBack} />}
        </Stack>
      }
    />
  );
};
