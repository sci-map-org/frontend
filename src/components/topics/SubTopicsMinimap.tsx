import { IconButton } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import { Box, Center, Stack } from '@chakra-ui/layout';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/modal';
import { CgArrowsExpandRight } from '@react-icons/all-files/cg/CgArrowsExpandRight';
import gql from 'graphql-tag';
import dynamic from 'next/dynamic';
import { useRef } from 'react';
import { PuffLoader } from 'react-spinners';
import { theme } from '../../theme/theme';
import { useElementSize } from '../../util/useElementSize';
import { SubTopicsMapVisualisationProps } from './SubTopicsMapVisualisation';
import { MinimapTopicDataFragment } from './SubTopicsMinimap.generated';

const SubTopicsMapVisualisation = dynamic<SubTopicsMapVisualisationProps>(
  () =>
    import('./SubTopicsMapVisualisation').then((res) => {
      const { SubTopicsMapVisualisation } = res;
      return SubTopicsMapVisualisation;
    }),
  { ssr: false }
);

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
  domainKey: string;
  isLoading: boolean;
  topics: MinimapTopicDataFragment[];
  pxWidth?: number;
  pxHeight?: number;
}

export const SubTopicsMinimap: React.FC<SubTopicsMinimapProps> = ({
  domainKey,
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
        <SubTopicsMapVisualisation domainKey={domainKey} topics={topics} pxWidth={pxWidth} pxHeight={pxHeight} />
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
            <SubTopicsMapModalContent domainKey={domainKey} topics={topics} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

const SubTopicsMapModalContent: React.FC<{ topics: MinimapTopicDataFragment[]; domainKey: string }> = ({
  topics,
  domainKey,
}) => {
  const modalContainerRef = useRef<HTMLDivElement>(null);
  const modalContainerSize = useElementSize(modalContainerRef);

  return (
    <Box ref={modalContainerRef} boxShadow="lg" mb={5}>
      {modalContainerSize && (
        <SubTopicsMapVisualisation
          domainKey={domainKey}
          topics={topics}
          pxWidth={modalContainerSize.width}
          pxHeight={modalContainerSize.width}
        />
      )}
    </Box>
  );
};
