import { IconButton } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import { Box, Center, Stack, Text } from '@chakra-ui/layout';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/modal';
import { CgArrowsExpandRight } from '@react-icons/all-files/cg/CgArrowsExpandRight';
import dynamic from 'next/dynamic';
import { useRef, useState } from 'react';
import { PuffLoader } from 'react-spinners';
import { TopicLinkDataFragment } from '../../../graphql/topics/topics.fragments.generated';
import { routerPushToPage } from '../../../pages/PageInfo';
import { TopicPageInfo } from '../../../pages/RoutesPageInfos';
import { theme } from '../../../theme/theme';
import { useElementSize } from '../../../util/useElementSize';
import { MapProps } from './Map';
import { MapTopicDataFragment } from './Map.generated';
import { MapHeader, MapType } from './MapHeader';

const Map = dynamic<MapProps>(
  () =>
    import('./Map').then((res) => {
      const { Map } = res;
      return Map;
    }),
  { ssr: false }
);

interface MinimapProps {
  isLoading: boolean;
  topic: MapTopicDataFragment;
  subTopics: MapTopicDataFragment[];
  parentTopic?: TopicLinkDataFragment;
  pxWidth?: number;
  pxHeight?: number;
}

export const Minimap: React.FC<MinimapProps> = ({
  topic,
  subTopics,
  parentTopic,
  isLoading,
  pxWidth = 300,
  pxHeight = 200,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedMapType, setSelectedMapType] = useState<MapType>(MapType.SUBTOPICS);

  return (
    <Stack spacing={0}>
      <MapHeader value={selectedMapType} onChange={setSelectedMapType} size="sm" />

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
          <Map
            mapType={selectedMapType}
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
                selectedMapType={selectedMapType}
              />
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </Stack>
  );
};

const SubTopicsMapModalContent: React.FC<{
  subTopics: MapTopicDataFragment[];
  topic: MapTopicDataFragment;
  parentTopic?: TopicLinkDataFragment;
  selectedMapType: MapType;
}> = ({ selectedMapType, subTopics, topic, parentTopic }) => {
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
        <Map
          mapType={selectedMapType}
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