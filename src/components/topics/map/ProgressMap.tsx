import { Text } from '@chakra-ui/react';
import * as d3Drag from 'd3-drag';
import * as d3Force from 'd3-force';
import { SimulationNodeDatum } from 'd3-force';
import * as d3Selection from 'd3-selection';
import * as d3Zoom from 'd3-zoom';
import gql from 'graphql-tag';
import { flatten, flattenDeep, omit } from 'lodash';
import { useEffect, useMemo, useRef, useState } from 'react';
import { isTopicArea } from '../../../services/topics.service';
import { topicLevelColorMap } from '../fields/TopicLevel';
import { BaseMap } from './BaseMap';
import { drawLink, drawTopicNode, MapOptions, MapTopicData, TopicNodeElement } from './map.utils';
import { MapTopicDataFragment } from './map.utils.generated';
import { PrerequisiteMap } from './PrerequisiteMap';
import { useGetProgressMapTopicsQuery } from './ProgressMap.generated';

export const getProgressMapTopics = gql`
  query getProgressMapTopics($topicId: String!) {
    getTopicById(topicId: $topicId) {
      ...MapTopicData
      level
      subTopics {
        subTopic {
          ...MapTopicData
          level
          topicTypes {
            name
          }
          prerequisites {
            prerequisiteTopic {
              _id
            }
          }
          followUps {
            followUpTopic {
              _id
            }
          }
          subTopics {
            subTopic {
              ...MapTopicData
              level
              topicTypes {
                name
              }
              prerequisites {
                prerequisiteTopic {
                  _id
                }
              }
              followUps {
                followUpTopic {
                  _id
                }
              }
              subTopics {
                subTopic {
                  ...MapTopicData
                  level
                  topicTypes {
                    name
                  }
                  prerequisites {
                    prerequisiteTopic {
                      _id
                    }
                  }
                  followUps {
                    followUpTopic {
                      _id
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  ${MapTopicData}
`;

type NodeElement = SimulationNodeDatum & TopicNodeElement & { level: number | null; xGravityCenter: number };

type LinkElement = d3Force.SimulationLinkDatum<NodeElement> & {};

const radiusMarginArrow = 2;

const layoutMargin = 40;

export const ProgressMap: React.FC<{
  topicId: string;
  options: MapOptions;
  onSelectTopic: (node: NodeElement) => void;
  onBack?: () => void;
}> = ({ topicId, options, onSelectTopic, onBack }) => {
  const { data, loading } = useGetProgressMapTopicsQuery({ variables: { topicId } });
  const [topic, setTopic] = useState<
    MapTopicDataFragment & {
      level?: number | null;
    }
  >();
  const [concepts, setConcepts] = useState<
    Array<
      MapTopicDataFragment & {
        level?: number | null;
      }
    >
  >([]);

  const [prerequisites, setPrerequisites] = useState<{ prerequisite: string; followUp: string }[]>([]);
  useEffect(() => {
    if (data) {
      const r = (data.getTopicById.subTopics || []).map(({ subTopic }) => {
        return [
          omit(subTopic, 'subTopics'),
          ...(subTopic.subTopics || [])
            .filter(({ subTopic }) => !!subTopic.topicTypes && !isTopicArea(subTopic.topicTypes))
            .map(({ subTopic }) => {
              return [
                omit(subTopic, 'subTopics'),
                ...(subTopic.subTopics || [])
                  .filter(({ subTopic }) => !!subTopic.topicTypes && !isTopicArea(subTopic.topicTypes))
                  .map(({ subTopic }) => {
                    return subTopic;
                  }),
              ];
            }),
        ];
      });
      const flattened = flatten(flatten(r)).filter((c) => typeof c['level'] === 'number'); // to disable at some point ?
      const prereqs: { prerequisite: string; followUp: string }[] = [];
      flattened.forEach((concept) => {
        concept.prerequisites?.forEach(({ prerequisiteTopic }) => {
          if (flattened.find((flat) => flat._id === prerequisiteTopic._id)) {
            prereqs.push({ prerequisite: prerequisiteTopic._id, followUp: concept._id });
          } else {
            console.log(`${prerequisiteTopic._id} is an external concept (prereq of ${concept.name})`);
          }
        });
        concept.followUps?.forEach(({ followUpTopic }) => {
          if (flattened.find((flat) => flat._id === followUpTopic._id)) {
            prereqs.push({ prerequisite: concept._id, followUp: followUpTopic._id });
          } else {
            console.log(`${followUpTopic._id} is an external concept (followUp of ${concept.name})`);
          }
        });
      });
      setPrerequisites(prereqs);
      setConcepts(flattened.map((concept) => omit(concept, ['prerequisites', 'followUps'])));
    }
  }, [data]);

  if (loading || !data) return <BaseMap options={options} isLoading={true} />;
  if (!concepts.length)
    return (
      <BaseMap
        options={options}
        renderCenter={
          <Text fontWeight={600} fontSize="lg" color="gray.100" fontStyle="italic" textAlign="center">
            No concepts found for this topic
          </Text>
        }
      />
    );
  return (
    <StatelessProgressMap
      topic={data.getTopicById}
      concepts={concepts}
      prerequisites={prerequisites}
      options={options}
      onClick={onSelectTopic}
      onBack={onBack}
    />
  );
};

export const StatelessProgressMap: React.FC<{
  topic: MapTopicDataFragment;
  concepts: Array<
    MapTopicDataFragment & {
      level?: number | null;
    }
  >;
  prerequisites: { prerequisite: string; followUp: string }[];
  options: MapOptions;
  onClick: (node: NodeElement) => void;
  onBack?: () => void;
}> = ({ topic, concepts, prerequisites, options, onClick }) => {
  const d3Container = useRef<SVGSVGElement>(null);

  const prerequisiteLinkElements: LinkElement[] = useMemo(() => {
    return prerequisites.map(({ prerequisite, followUp }) => ({
      source: prerequisite,
      target: followUp,
    }));
  }, [PrerequisiteMap]);

  const topicNodesGravityCenters = useMemo(() => {
    const alpha = 40;
    const getNodeIndexFromId = (id: string): number => {
      const index = concepts.findIndex(({ _id }) => id === _id);
      if (index === -1) throw new Error(`Not found node with id ${id}`);
      return index;
    };

    let gravityCenters = concepts.map((concept) => {
      return (
        layoutMargin +
        ((typeof concept.level === 'number' ? concept.level : 50) * (options.pxWidth - 2 * layoutMargin)) / 100
      ); // future: mix of level and rank ?)
    });
    for (let i = 0; i < 3; i++) {
      prerequisiteLinkElements.forEach(({ source, target }) => {
        const sourceIndex = getNodeIndexFromId(source as string);
        const targetIndex = getNodeIndexFromId(target as string);
        const targetGravityCenter = gravityCenters[targetIndex];
        const sourceGravityCenter = gravityCenters[sourceIndex];
        if (sourceGravityCenter + alpha >= targetGravityCenter) {
          gravityCenters[targetIndex] = (targetGravityCenter + sourceGravityCenter + alpha) / 2;
          gravityCenters[sourceIndex] = (targetGravityCenter + sourceGravityCenter - alpha) / 2;
        }
      });
    }
    return gravityCenters;
  }, []);

  const topicNodeElements: NodeElement[] = useMemo(
    () =>
      concepts.map((subTopic, idx) => ({
        id: subTopic._id,
        type: 'topic',
        radius: 12,
        level: typeof subTopic.level === 'number' ? subTopic.level : null,
        xGravityCenter: topicNodesGravityCenters[idx],
        color: typeof subTopic.level === 'number' ? topicLevelColorMap(subTopic.level / 100) : 'gray',
        x: topicNodesGravityCenters[idx], //(topicNodesGravityCenters[idx] + (2 * options.pxWidth) / 2) / 3,
        y: options.pxHeight / 2 + (Math.random() - 0.5) * options.pxHeight * 0.03,
        ...subTopic,
      })),
    [concepts, topicNodesGravityCenters]
  );
  useEffect(() => {
    if (d3Container && d3Container.current) {
      const svg = d3Selection
        .select(d3Container.current)
        .attr('viewBox', [0, 0, options.pxWidth, options.pxHeight].join(','));
      svg.selectAll('.innerContainer').remove();
      const container = svg.selectAll('.innerContainer').data([true]).join('g').classed('innerContainer', true);

      const prerequisiteLinks = drawLink(container, prerequisiteLinkElements, 'linkElement', options);

      const topicNodes = drawTopicNode(container, topicNodeElements, 'topicNode', options).on('click', (event, n) => {
        onClick(n);
      });

      const zoom = d3Zoom.zoom<SVGSVGElement, unknown>();
      const tick = () => {
        topicNodes.attr('transform', function (d) {
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
        .alphaDecay(0.005)
        // .alphaDecay(0.01)
        .nodes(topicNodeElements)
        .force('charge', d3Force.forceManyBody<NodeElement>().strength(-30))
        .force(
          'collision',
          d3Force.forceCollide<NodeElement>().radius((n) => n.radius + radiusMarginArrow)
        )
        .force(
          'link',
          d3Force
            .forceLink<NodeElement, d3Force.SimulationLinkDatum<NodeElement>>()
            .id((node) => node._id)
            .distance(120)
            .strength(0.02)
            .links(prerequisiteLinkElements)
        )

        .force(
          'xForce',
          d3Force.forceX<NodeElement>((n) => n.xGravityCenter).strength((n) => (n.level !== null ? 0.1 : 0.005))
        )
        // .force('yForce', d3Force.forceY<NodeElement>(options.pxHeight / 2).strength(0.002))
        // .force('center', d3Force.forceCenter(options.pxWidth / 2, options.pxHeight / 2).strength(0.01))
        .force(
          'y',
          d3Force
            .forceY<NodeElement>((n, i) =>
              n.level !== null ? options.pxHeight / 2 : options.pxHeight / 5 + (i % 2) * ((3 * options.pxHeight) / 5)
            )
            .strength((n) => (n.level !== null ? 0.02 : 0.03))
        )
        // .force('x', d3Force.forceX(options.pxWidth / 2).strength(0.01))
        .on('tick', tick);

      //   @ts-ignore
      topicNodes.call(drag(simulation));
    }
  }, [topic._id, topicNodeElements.length, prerequisiteLinkElements.length]);

  return (
    <BaseMap
      ref={d3Container}
      options={options}
      renderBottomMiddleLeft={
        <Text color={topicLevelColorMap(0.1)} fontSize="xl" fontWeight={600}>
          Basics
        </Text>
      }
      renderBottomMiddleRight={
        <Text color={topicLevelColorMap(0.9)} fontSize="xl" fontWeight={600}>
          Advanced
        </Text>
      }
    />
  );
};

function drag(simulation: d3Force.Simulation<NodeElement, undefined>) {
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
