import { IconButton } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import { Box, Center, Text } from '@chakra-ui/layout';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/modal';
import { CgArrowsExpandRight } from '@react-icons/all-files/cg/CgArrowsExpandRight';
import dynamic from 'next/dynamic';
import Router from 'next/router';
import { useRef } from 'react';
import { PuffLoader } from 'react-spinners';
import { routerPushToPage } from '../../pages/PageInfo';
import { theme } from '../../theme/theme';
import { useElementSize } from '../../util/useElementSize';
import { SubTopicsMapVisualisationProps } from './SubTopicsMapVisualisation';
import { MapVisualisationTopicDataFragment } from './SubTopicsMapVisualisation.generated';

const SubTopicsMapVisualisation = dynamic<SubTopicsMapVisualisationProps>(
  () =>
    import('./SubTopicsMapVisualisation').then((res) => {
      const { SubTopicsMapVisualisation } = res;
      return SubTopicsMapVisualisation;
    }),
  { ssr: false }
);

interface SubTopicsMinimapProps {
  domainKey: string;
  isLoading: boolean;
  topic: MapVisualisationTopicDataFragment;
  subTopics: MapVisualisationTopicDataFragment[];
  parentTopics?: MapVisualisationTopicDataFragment[];
  pxWidth?: number;
  pxHeight?: number;
}

export const SubTopicsMinimap: React.FC<SubTopicsMinimapProps> = ({
  domainKey,
  topic,
  subTopics,
  parentTopics,
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
      borderRadius={4}
      borderColor="deepBlue.200"
      overflow="hidden"
      position="relative"
    >
      {isLoading ? (
        <Center w="100%" h="100%">
          <PuffLoader size={Math.floor(pxWidth / 3)} color={theme.colors.blue[500]} />
        </Center>
      ) : subTopics.length ? (
        <div>Map</div>
        // <SubTopicsMapVisualisation
        //   topic={topic}
        //   domainKey={domainKey}
        //   subTopics={subTopics}
        //   parentTopics={parentTopics}
        //   pxWidth={pxWidth}
        //   pxHeight={pxHeight}
        //   onClick={(n) => {
        //     n.__typename === 'Domain' && routerPushToPage(DomainPageInfo(n));
        //     n.__typename === 'Concept' && domainKey && Router.push(ConceptPagePath(domainKey, n.key));
        //   }}
        // />
      ) : (
        <Center w="100%" h="100%">
          <Text textAlign="center" fontWeight={600} fontStyle="italic" color="gray.400">
            No SubTopics found
          </Text>
        </Center>
      )}

      {(isLoading || subTopics.length) && (
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
      )}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent w="600px">
          <ModalHeader>SubTopics Map</ModalHeader>
          <ModalCloseButton />
          <ModalBody justifyContent="stretch" alignItems="stretch">
            <SubTopicsMapModalContent
              parentTopics={parentTopics}
              topic={topic}
              domainKey={domainKey}
              subTopics={subTopics}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

const SubTopicsMapModalContent: React.FC<{
  subTopics: MapVisualisationTopicDataFragment[];
  parentTopics?: MapVisualisationTopicDataFragment[];
  domainKey: string;
  topic: MapVisualisationTopicDataFragment;
}> = ({ subTopics, domainKey, topic, parentTopics }) => {
  const modalContainerRef = useRef<HTMLDivElement>(null);
  const modalContainerSize = useElementSize(modalContainerRef);

  return (
    <Box
      ref={modalContainerRef}
      boxShadow="lg"
      bgColor="white"
      zIndex={4}
      borderWidth={1}
      borderRadius={4}
      borderColor="deepBlue.200"
      mb={5}
    >
      {modalContainerSize && (<div>map</div>
        // <SubTopicsMapVisualisation
        //   domainKey={domainKey}
        //   topic={topic}
        //   subTopics={subTopics}
        //   parentTopics={parentTopics}
        //   pxWidth={modalContainerSize.width}
        //   pxHeight={modalContainerSize.width}
        //   onClick={(n) => {
        //     n.__typename === 'Domain' && routerPushToPage(DomainPageInfo(n));
        //     n.__typename === 'Concept' && domainKey && Router.push(ConceptPagePath(domainKey, n.key));
        //   }}
        // />
      )}
    </Box>
  );
};
