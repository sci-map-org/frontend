import { IconButton } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import { Box, Center, Stack, Text } from '@chakra-ui/layout';
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
  fragment MinimapTopicData on TopicIsSubTopicOfTopic {
    index
    subTopic {
      ... on Concept {
        _id
        key
        topicType
        name
        size
      }
      ... on Domain {
        _id
        key
        topicType
        name
        size
      }
    }
  }
`;
interface SubTopicsMinimapProps {
  domainKey: string;
  isLoading: boolean;
  topicId: string;
  subTopics: MinimapTopicDataFragment[];
  pxWidth?: number;
  pxHeight?: number;
}

export const SubTopicsMinimap: React.FC<SubTopicsMinimapProps> = ({
  domainKey,
  topicId,
  subTopics,
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
          topicId={topicId}
          domainKey={domainKey}
          subTopics={subTopics}
          pxWidth={pxWidth}
          pxHeight={pxHeight}
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
            <SubTopicsMapModalContent topicId={topicId} domainKey={domainKey} subTopics={subTopics} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

const SubTopicsMapModalContent: React.FC<{
  subTopics: MinimapTopicDataFragment[];
  domainKey: string;
  topicId: string;
}> = ({ subTopics, domainKey, topicId }) => {
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
          domainKey={domainKey}
          topicId={topicId}
          subTopics={subTopics}
          pxWidth={modalContainerSize.width}
          pxHeight={modalContainerSize.width}
        />
      )}
    </Box>
  );
};
