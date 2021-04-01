import { IconButton } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import { Box, Center, Stack } from '@chakra-ui/layout';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/modal';
import { CgArrowsExpandRight } from '@react-icons/all-files/cg/CgArrowsExpandRight';
import * as d3 from 'd3';
import { useEffect, useMemo, useRef } from 'react';
import { GridLoader } from 'react-spinners';
import { ConceptWithDependenciesDataFragment } from '../../graphql/concepts/concepts.fragments.generated';
import { Topic } from '../../graphql/types';
import { theme } from '../../theme/theme';
import { useElementSize } from '../../util/useElementSize';
interface SubTopicsMinimapProps {
  isLoading: boolean;
  concepts: ConceptWithDependenciesDataFragment[];
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
  concepts,
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
            <GridLoader size={Math.floor(pxWidth / 15)} color={theme.colors.yellow[200]} />
            {/* <Text fontStyle="italic" fontWeight={400} fontSize="sm">
              Analyzing Area Topology...
            </Text> */}
          </Stack>
        </Center>
      ) : (
        <SubTopicsMapVisualisation topics={concepts} pxWidth={pxWidth} pxHeight={pxHeight} />
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
            <SubTopicsMapModalContent topics={concepts} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

const SubTopicsMapModalContent: React.FC<{ topics: Topic[] }> = ({ topics }) => {
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
  topics: Topic[];
  pxWidth: number;
  pxHeight: number;
}
const SubTopicsMapVisualisation: React.FC<SubTopicsMapVisualisationProps> = ({ topics, pxWidth, pxHeight }) => {
  const d3Container = useRef(null);
  const nodes = useMemo(
    () =>
      topics.map((topic) => {
        return { id: topic._id, label: topic.name };
        //, conceptKey: concept.key, known: !!concept.known
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

      const interp = d3.interpolateRainbow;
      nodes.forEach((node, i) => {
        colorMap[node.id] = interp(i / nodes.length);
      });
      // for (const [i, node] of dag.idescendants().entries()) {
      // }

      const svg = d3.select(d3Container.current).attr('viewBox', [0, 0, pxWidth, pxHeight]);
      // const link = svg.selectAll('.link').data(links).join('line').classed('link', true);
      const node = svg
        .selectAll('.node')
        .data(nodes)
        .join('circle')
        .attr('r', 12)
        .attr('fill', (n) => colorMap[n.id])
        .classed('node', true);
      // .classed('fixed', (d) => d.fx !== undefined);

      const tick = () => {
        // link
        //   .attr('x1', (d) => d.source.x)
        //   .attr('y1', (d) => d.source.y)
        //   .attr('x2', (d) => d.target.x)
        //   .attr('y2', (d) => d.target.y);
        node.attr('cx', (d) => d.x).attr('cy', (d) => d.y);
      };

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
        .force('charge', d3.forceManyBody().strength(-5))
        .force('center', d3.forceCenter(pxWidth / 2, pxHeight / 2))
        // .force('link', d3.forceLink(links))
        .on('tick', tick);
    }
  }, [nodes]);
  return <svg ref={d3Container} width={`${pxWidth}px`} height={`${pxHeight}px`} />;
};
