import { IconButton } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import { Box, Center, Stack } from '@chakra-ui/layout';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/modal';
import { CgArrowsExpandRight } from '@react-icons/all-files/cg/CgArrowsExpandRight';
import * as d3 from 'd3';
import gql from 'graphql-tag';
import { useEffect, useMemo, useRef } from 'react';
import { GridLoader, PuffLoader } from 'react-spinners';
import { TopicType } from '../../graphql/types';
import { routerPushToPage } from '../../pages/PageInfo';
import { DomainPageInfo } from '../../pages/RoutesPageInfos';
import { theme } from '../../theme/theme';
import { useElementSize } from '../../util/useElementSize';
import { MinimapTopicDataFragment } from './SubTopicsMinimap.generated';

export const MinimapTopicData = gql`
  fragment MinimapTopicData on Topic {
    _id
    key
    topicType
    name
    size
  }
`;
interface SubTopicsMinimapProps {
  isLoading: boolean;
  topics: MinimapTopicDataFragment[];
  pxWidth?: number;
  pxHeight?: number;
}

function clamp(x, lo, hi) {
  return x < lo ? lo : x > hi ? hi : x;
}

// function dragstart() {
//   d3.select(this).classed('fixed', true);
// }

// function dragged(event, d) {
//   d.fx = clamp(event.x, 0, width);
//   d.fy = clamp(event.y, 0, height);
//   simulation.alpha(1).restart();
// }

// function click(event, d) {
//   delete d.fx;
//   delete d.fy;
//   d3.select(this).classed('fixed', false);
//   simulation.alpha(1).restart();
// }

export const SubTopicsMinimap: React.FC<SubTopicsMinimapProps> = ({
  topics,
  isLoading,
  pxWidth = 300,
  pxHeight = 200,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      w={`${pxWidth}px`}
      h={`${pxHeight}px`}
      boxShadow="lg"
      bgColor="white"
      zIndex={4}
      borderWidth={1}
      borderColor="gray.100"
      position="relative"
    >
      {isLoading ? (
        <Center w="100%" h="100%">
          <Stack alignItems="center">
            <PuffLoader size={Math.floor(pxWidth / 3)} color={theme.colors.blue[500]} />
            {/* <Text fontStyle="italic" fontWeight={400} fontSize="sm">
              Analyzing Area Topology...
            </Text> */}
          </Stack>
        </Center>
      ) : (
        <SubTopicsMapVisualisation topics={topics} pxWidth={pxWidth} pxHeight={pxHeight} />
      )}
      <IconButton
        position="absolute"
        variant="solid"
        size="md"
        onClick={() => onOpen()}
        bottom={2}
        right={2}
        opacity={0.8}
        _hover={{ opacity: 1 }}
        aria-label="expand minimap"
        icon={<CgArrowsExpandRight />}
      />
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent w="600px">
          <ModalHeader>SubTopics Map</ModalHeader>
          <ModalCloseButton />
          <ModalBody justifyContent="stretch" alignItems="stretch">
            <SubTopicsMapModalContent topics={topics} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

const SubTopicsMapModalContent: React.FC<{ topics: MinimapTopicDataFragment[] }> = ({ topics }) => {
  const modalContainerRef = useRef<HTMLDivElement>(null);
  const modalContainerSize = useElementSize(modalContainerRef);

  return (
    <Box ref={modalContainerRef} boxShadow="lg" mb={5}>
      {modalContainerSize && (
        <SubTopicsMapVisualisation
          topics={topics}
          pxWidth={modalContainerSize.width}
          pxHeight={modalContainerSize.width}
        />
      )}
    </Box>
  );
};
interface SubTopicsMapVisualisationProps {
  topics: MinimapTopicDataFragment[];
  pxWidth: number;
  pxHeight: number;
}
const SubTopicsMapVisualisation: React.FC<SubTopicsMapVisualisationProps> = ({ topics, pxWidth, pxHeight }) => {
  const d3Container = useRef(null);

  const nodes = useMemo(
    () =>
      topics.map((topic) => {
        return { id: topic._id, ...topic };
      }),
    []
  );

  // const links = useMemo(
  //   () =>
  //     concepts
  //       .map((concept) => {
  //         return [
  //           // { data: { id: concept._id, label: concept.name, conceptKey: concept.key, known: !!concept.known } },
  //           ...(concept.referencedByConcepts || []).map(({ concept: referencedByConcept }) => ({
  //             target: nodes.findIndex((node) => node.id === concept._id),
  //             source: nodes.findIndex((node) => node.id === referencedByConcept._id),
  //             //   data: {
  //             //     id: `${concept._id}_${referencedByConcept._id}`,
  //             //     target: concept._id,
  //             //     source: referencedByConcept._id,
  //             //     label: 'REFERENCES',
  //             //   },
  //           })),
  //         ];
  //       })
  //       .flat(),
  //   []
  // );
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
      // for (const [i, node] of dag.idescendants().entries()) {
      // }

      const svg = d3.select(d3Container.current).attr('viewBox', [0, 0, pxWidth, pxHeight]);
      const container = svg.append('g');
      // const link = svg.selectAll('.link').data(links).join('line').classed('link', true);
      const node = container
        .selectAll('.node')
        .data(nodes)
        .join('g')
        // .attr('r', 12)
        // .attr('fill', (n) => colorMap[n.id])
        .classed('node', true)
        .on('click', (event, n) => {
          console.log(n);
          n.topicType === TopicType.Domain && routerPushToPage(DomainPageInfo(n));
        });
      // .join('g')
      // .enter()
      // .append('g')
      // // .attr('r', 12)
      // // .attr('fill', (n) => colorMap[n.id])
      // .classed('node', true);
      // .classed('fixed', (d) => d.fx !== undefined);
      const getNodeRadius = (n: MinimapTopicDataFragment) => 12 + (n.size > 1 ? Math.log(n.size) * 12 : 0);
      node
        .append('circle')
        .classed('nodeC', true)
        .attr('r', getNodeRadius)
        // .attr('r', (n) => 12 + (n.size  ? Math.log(n.size) * 12 : 0))
        .attr('fill', (n) => colorMap[n._id]);

      node
        .append('text')
        .classed('node_label', true)
        .attr('text-anchor', 'middle')
        .attr('dx', 0)

        .attr('dy', (d) => {
          // console.log(d.r);
          return getNodeRadius(d) + (d.topicType === TopicType.Domain ? 16 : 12);
        })
        .attr('z-index', 10)
        .attr('font-size', (d) => (d.topicType === TopicType.Domain ? '1em' : '0.8em'))
        .attr('font-weight', (d) => (d.topicType === TopicType.Domain ? 500 : 500))
        .attr('fill', (d) => (d.topicType === TopicType.Domain ? theme.colors.gray[700] : theme.colors.gray[500]))
        // .attr('max-width', '0.8em')
        .text(function (d) {
          return d.name;
        });
      // .attr("y", -8)
      // .attr("width", 16)
      // .attr("height", 16);
      const zoom = d3.zoom();
      const tick = () => {
        // link
        //   .attr('x1', (d) => d.source.x)
        //   .attr('y1', (d) => d.source.y)
        //   .attr('x2', (d) => d.target.x)
        //   .attr('y2', (d) => d.target.y);
        // node.attr('cx', (d) => d.x).attr('cy', (d) => d.y);
        // node.call(zoom.transform, );
        // node.call((d) => zoom.translateTo(node, d.x, d.y));

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
        // .on('zoom', function zoomed({ transform }) {
        //   node.attr('transform', transform);
        // })
      );

      // const drag = d3
      //   .drag()
      //   .on('start', function () {
      //     //   console.log(that);
      //     d3.select(this).classed('fixed', true);
      //   })
      //   .on('drag', function (event, d) {
      //     d.fx = clamp(event.x, 0, 400);
      //     d.fy = clamp(event.y, 0, 400);
      //     simulation.alpha(1).restart();
      //   });
      // node.call(drag).on('click', function (d) {
      //   delete d.fx;
      //   delete d.fy;
      //   d3.select(this).classed('fixed', false);
      //   simulation.alpha(1).restart();
      // });

      const simulation = d3
        .forceSimulation()
        .nodes(nodes)
        .force(
          'charge',
          d3.forceManyBody().strength((d) => {
            console.log(d);
            return d.size ? -(getNodeRadius(d) * getNodeRadius(d)) / 15 : -8;
          })
        )
        // .force(
        //   'collide',
        //   d3
        //     .forceCollide()
        //     .radius((d) => d.r + 0.5)
        //     .iterations(20)
        // )
        .force('center', d3.forceCenter(pxWidth / 2, pxHeight / 2))
        // .force('link', d3.forceLink(links))
        .on('tick', tick);
    }
  }, [nodes]);
  return <svg ref={d3Container} width={`${pxWidth}px`} height={`${pxHeight}px`} fontSize="xs" />;
};
