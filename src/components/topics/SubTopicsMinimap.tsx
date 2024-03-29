import { IconButton } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import { Box, Center, Text } from '@chakra-ui/layout';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/modal';
import { CgArrowsExpandRight } from '@react-icons/all-files/cg/CgArrowsExpandRight';
import dynamic from 'next/dynamic';
import { useRef } from 'react';
import { PuffLoader } from 'react-spinners';
import { TopicLinkDataFragment } from '../../graphql/topics/topics.fragments.generated';
import { routerPushToPage } from '../../pages/PageInfo';
import { TopicPageInfo } from '../../pages/RoutesPageInfos';
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
  isLoading: boolean;
  topic: MapVisualisationTopicDataFragment;
  subTopics: MapVisualisationTopicDataFragment[];
  parentTopic?: TopicLinkDataFragment;
  pxWidth?: number;
  pxHeight?: number;
}

export const SubTopicsMinimap: React.FC<SubTopicsMinimapProps> = ({
  topic,
  subTopics,
  parentTopic,
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
        <SubTopicsMapVisualisation
          topic={topic}
          subTopics={subTopics}
          parentTopic={parentTopic}
          pxWidth={pxWidth}
          pxHeight={pxHeight}
          onClick={(n) => routerPushToPage(TopicPageInfo(n))}
        />
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
              parentTopic={parentTopic}
              topic={topic}
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
  topic: MapVisualisationTopicDataFragment;
  parentTopic?: TopicLinkDataFragment;
}> = ({ subTopics, topic, parentTopic }) => {
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
      {modalContainerSize && (
        <SubTopicsMapVisualisation
          topic={topic}
          subTopics={subTopics}
          parentTopic={parentTopic}
          pxWidth={modalContainerSize.width}
          pxHeight={modalContainerSize.width}
          onClick={(n) => routerPushToPage(TopicPageInfo(n))}
        />
      )}
    </Box>
  );
};
