import { Stack, Text } from '@chakra-ui/react';
import * as d3Force from 'd3-force';
import { SimulationNodeDatum } from 'd3-force';
import * as d3Selection from 'd3-selection';
import * as d3Zoom from 'd3-zoom';
import gql from 'graphql-tag';
import { flatten, omit, uniqBy } from 'lodash';
import { useEffect, useMemo, useRef } from 'react';
import { TopicLinkDataFragment } from '../../../graphql/topics/topics.fragments.generated';
import { AREA_TOPIC_TYPE_NAMES, isTopicArea } from '../../../services/topics.service';
import { topicLevelColorMap } from '../fields/TopicLevel';
import { BaseMap } from './BaseMap';
import {
  dragNode,
  drawLink,
  drawTopicNode,
  getTopicNodeRadius,
  MapOptions,
  MapTopicData,
  TopicNodeElement,
} from './map.utils';
import { MapTopicDataFragment } from './map.utils.generated';
import { MapBackButton } from './MapBackButton';
import { MapSearchBox } from './MapSearchBox';
import { useGetProgressMapTopicsQuery } from './ProgressMap.generated';

export const getProgressMapTopics = gql`
  query getProgressMapTopics($topicId: String!, $areaTopicTypes: [String!]!) {
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
          aggregatedSubtopicsPrerequisites(
            options: { onlyIfTopicHasTopicTypes: $areaTopicTypes, prereqParentsPathStopCondition: common_parent }
          ) {
            # subTopicPath {
            #   name
            # }
            prerequisiteParentsPath {
              _id
              key
              name
            }
          }
          subTopics(options: { filter: { currentTopicTypesNotIn: $areaTopicTypes } }) {
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
              aggregatedSubtopicsPrerequisites(
                options: { onlyIfTopicHasTopicTypes: $areaTopicTypes, prereqParentsPathStopCondition: common_parent }
              ) {
                # subTopicPath {
                #   name
                # }
                prerequisiteParentsPath {
                  _id
                  key
                  name
                }
              }
              subTopics(options: { filter: { currentTopicTypesNotIn: $areaTopicTypes } }) {
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
                  # not sure if needed here, but why not
                  aggregatedSubtopicsPrerequisites(
                    options: {
                      onlyIfTopicHasTopicTypes: $areaTopicTypes
                      prereqParentsPathStopCondition: common_parent
                    }
                  ) {
                    # subTopicPath {
                    #   name
                    # }
                    prerequisiteParentsPath {
                      _id
                      key
                      name
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

type LinkElement = d3Force.SimulationLinkDatum<NodeElement> & {
  size: number;
};

const radiusMarginArrow = 2;

const layoutMargin = 40;

export const ProgressMap: React.FC<{
  topicId: string;
  options: MapOptions;
  onSelectTopic: (node: TopicLinkDataFragment) => void;
  onBack?: () => void;
}> = ({ topicId, options, onSelectTopic, onBack }) => {
  const { data, loading } = useGetProgressMapTopicsQuery({
    variables: { topicId, areaTopicTypes: AREA_TOPIC_TYPE_NAMES },
    fetchPolicy: 'network-only', // without this the map might get rendered twice (no loading state)
  });
  const {
    topic,
    concepts,
    prerequisites,
  }: {
    topic?: MapTopicDataFragment & {
      level?: number | null;
    };
    concepts: Array<
      MapTopicDataFragment & {
        level?: number | null;
        topicTypes?: { name: string }[] | null;
      }
    >;
    prerequisites: { prerequisite: string; followUp: string; size: number; aggregated?: boolean }[];
  } = useMemo(() => {
    if (!data || loading)
      return {
        topic: undefined,
        concepts: [],
        prerequisites: [],
      };
    const r = (data.getTopicById.subTopics || []).map(({ subTopic }) => {
      return [
        omit(subTopic, 'subTopics'),
        ...(subTopic.subTopics || []).map(({ subTopic }) => {
          return [
            omit(subTopic, 'subTopics'),
            ...(subTopic.subTopics || []).map(({ subTopic }) => {
              return subTopic;
            }),
          ];
        }),
      ];
    });
    const flattened = uniqBy(flatten(flatten(r)), '_id')
      .filter((c) => typeof c['level'] === 'number')
      .filter((c) => !!c.topicTypes); // to disable at some point ?

    const prereqs: { prerequisite: string; followUp: string; size: number; aggregated?: boolean }[] = [];
    flattened.forEach((concept) => {
      concept.prerequisites?.forEach(({ prerequisiteTopic }) => {
        if (flattened.find((flat) => flat._id === prerequisiteTopic._id)) {
          prereqs.push({ prerequisite: prerequisiteTopic._id, followUp: concept._id, size: 1 });
        } else {
          console.log(`${prerequisiteTopic._id} is an external concept (prereq of ${concept.name})`);
        }
      });
      concept.followUps?.forEach(({ followUpTopic }) => {
        if (flattened.find((flat) => flat._id === followUpTopic._id)) {
          prereqs.push({ prerequisite: concept._id, followUp: followUpTopic._id, size: 1 });
        } else {
          console.log(`${followUpTopic._id} is an external concept (followUp of ${concept.name})`);
        }
      });
      concept.aggregatedSubtopicsPrerequisites?.forEach(({ prerequisiteParentsPath }) => {
        let i = 0;
        while (i < prerequisiteParentsPath.length) {
          const foundPrereqParent = flattened.find((flat) => flat._id === prerequisiteParentsPath[i]._id);
          if (foundPrereqParent) {
            const existingPrereq = prereqs.find(
              (prereq) => prereq.prerequisite === foundPrereqParent._id && prereq.followUp === concept._id
            );
            if (existingPrereq) {
              existingPrereq.size = existingPrereq.size ? existingPrereq.size + 1 : 1;
            } else {
              prereqs.push({ prerequisite: foundPrereqParent._id, followUp: concept._id, size: 1, aggregated: true });
            }
            break;
          }
          i++;
        }
        prerequisiteParentsPath.forEach((parent) => {});
      });
    });

    return {
      topic: omit(data.getTopicById, 'subTopics'),
      concepts: flattened.map((concept) => omit(concept, ['prerequisites', 'followUps'])),
      prerequisites: prereqs,
    };
  }, [data, loading]);

  if (!topic || loading) {
    return <BaseMap options={options} isLoading={true} />;
  }

  if (!concepts.length)
    return (
      <BaseMap
        options={options}
        renderCenter={
          <Text fontWeight={600} fontSize="lg" color="gray.100" fontStyle="italic" textAlign="center">
            No concepts found for this topic
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
  return (
    <StatelessProgressMap
      topic={topic}
      concepts={concepts}
      prerequisites={prerequisites}
      options={options}
      isLoading={!!loading}
      onSelectTopic={onSelectTopic}
      onBack={onBack}
    />
  );
};

export const StatelessProgressMap: React.FC<{
  topic: MapTopicDataFragment;
  concepts: Array<
    MapTopicDataFragment & {
      level?: number | null;
      topicTypes?: { name: string }[] | null;
    }
  >;
  prerequisites: { prerequisite: string; followUp: string; size: number; aggregated?: boolean }[];
  isLoading: boolean;
  options: MapOptions;
  onSelectTopic: (node: TopicLinkDataFragment) => void;
  onBack?: () => void;
}> = ({ topic, concepts, prerequisites, options, onSelectTopic, isLoading, onBack }) => {
  const d3Container = useRef<SVGSVGElement>(null);
  const onTopicClick = useRef(onSelectTopic);

  useEffect(() => {
    onTopicClick.current = onSelectTopic;
  }, [onSelectTopic]);

  const prerequisiteLinkElements: LinkElement[] = useMemo(() => {
    return prerequisites.map(({ prerequisite, followUp, size }) => ({
      source: prerequisite,
      target: followUp,
      size,
    }));
  }, [prerequisites]);

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
  }, [concepts, prerequisiteLinkElements, options.pxWidth]);

  const topicNodeElements: NodeElement[] = useMemo(
    () =>
      concepts.map((subTopic, idx) => ({
        _id: subTopic._id,
        key: subTopic.key,
        name: subTopic.name,
        id: subTopic._id,
        type: 'topic',
        radius:
          subTopic.topicTypes && isTopicArea(subTopic.topicTypes)
            ? getTopicNodeRadius(subTopic, { defaultRadius: 12, coefficient: 0.7 })
            : 12,
        clickable: true,
        level: typeof subTopic.level === 'number' ? subTopic.level : null,
        xGravityCenter: topicNodesGravityCenters[idx],
        color: typeof subTopic.level === 'number' ? topicLevelColorMap(subTopic.level / 100) : 'gray',
        x: topicNodesGravityCenters[idx], //(topicNodesGravityCenters[idx] + (2 * options.pxWidth) / 2) / 3,
        y: options.pxHeight / 2 + (Math.random() - 0.5) * options.pxHeight * 0.03,
        ...(subTopic.topicTypes &&
          isTopicArea(subTopic.topicTypes) && {
            subTopicsTotalCount: subTopic.subTopicsTotalCount,
            learningMaterialsTotalCount: subTopic.learningMaterialsTotalCount,
          }), // if atomic nodes (concepts), we don't show the counts (nodes are too small). If area, we do
      })),
    [concepts, topicNodesGravityCenters, options.pxHeight]
  );

  const topicNodeElementsIds = useMemo(
    () => topic._id + '-' + topicNodeElements.map(({ _id }) => _id).join(','),
    [topic, topicNodeElements]
  );
  const prerequisiteLinkElementsIds = useMemo(
    () => prerequisiteLinkElements.map(({ source, target }) => `${source}_${target}`).join(','),
    [prerequisiteLinkElements]
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
        onTopicClick.current(n);
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
        .force(
          'charge',
          d3Force.forceManyBody<NodeElement>().strength((n) => {
            // -30
            const coefficient = options.mode === 'explore' ? 1 : 1 / 1.5;
            const s = -(n.radius * Math.log(n.radius)) * coefficient;
            return s;
          })
        )
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
      topicNodes.call(dragNode(simulation));
    }
  }, [topicNodeElementsIds, prerequisiteLinkElementsIds]);

  if (isLoading) {
    return <BaseMap options={options} isLoading={true} />;
  }

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
      renderTopLeft={
        <Stack spacing="2px">
          {options.mode === 'explore' && <MapSearchBox onSelectTopic={onSelectTopic} />}
          {onBack && <MapBackButton onClick={onBack} />}
        </Stack>
      }
    />
  );
};
