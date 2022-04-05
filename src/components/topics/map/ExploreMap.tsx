import { useDisclosure } from '@chakra-ui/hooks';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Box, Center, Flex, FlexProps, Link, Stack, Text } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { PuffLoader } from 'react-spinners';
import { RoleAccess } from '../../auth/RoleAccess';
import { LearningMaterialCountIcon } from '../../learning_materials/LearningMaterialCountIcon';
import { TopicLink } from '../../lib/links/TopicLink';
import { SubTopicsCountIcon } from '../SubTopicsCountIcon';
import { MapTopicData, Map } from './Map';
import { MapTopicDataFragment } from './Map.generated';
import { TopicDescription } from '../fields/TopicDescription';
import { TopicLinkData } from '../../../graphql/topics/topics.fragments';
import { TopicLinkDataFragment } from '../../../graphql/topics/topics.fragments.generated';
import { theme } from '../../../theme/theme';
import {
  GetTopicByIdExplorePageQuery,
  useGetTopicByIdExplorePageLazyQuery,
  useGetTopLevelTopicsLazyQuery,
} from './ExploreMap.generated';
import { NewTopicModal } from '../NewTopic';

export const getTopicByIdExplorePage = gql`
  query getTopicByIdExplorePage($topicId: String!) {
    getTopicById(topicId: $topicId) {
      ...MapTopicData
      description
      learningMaterialsTotalCount
      subTopics {
        subTopic {
          ...MapTopicData
        }
      }
      parentTopic {
        ...TopicLinkData
      }
    }
  }
  ${MapTopicData}
  ${TopicLinkData}
`;

export const getTopLevelTopics = gql`
  query getTopLevelTopics {
    getTopLevelTopics {
      items {
        ...MapTopicData
      }
    }
  }
  ${MapTopicData}
`;

export const rootTopic: MapTopicDataFragment = {
  __typename: 'Topic',
  _id: 'root',
  key: 'root',
  name: 'Explore',
};

export interface ExploreMapProps {
  mapPxWidth: number;
  mapPxHeight: number;
  selectedTopicId?: string;
  onTopicChange?: (topicId: string) => void;
  direction: 'row' | 'column';
  mapContainerProps?: FlexProps;
}
export const ExploreMap: React.FC<ExploreMapProps> = ({
  mapPxWidth,
  mapPxHeight,
  selectedTopicId: propSelectedTopicId,
  onTopicChange,
  direction,
  mapContainerProps,
}) => {
  const router = useRouter();
  const urlSelectedTopicId = router.query.selectedTopicId;
  if (urlSelectedTopicId && typeof urlSelectedTopicId !== 'string')
    throw new Error(`Invalid url param urlSelectedTopicId ${urlSelectedTopicId}`);
  const [selectedTopicId, setSelectedTopicId] = useState<string | undefined>(propSelectedTopicId);

  const [loadedTopic, setLoadedTopic] = useState<GetTopicByIdExplorePageQuery['getTopicById']>();

  const [subTopics, setSubtopics] = useState<MapTopicDataFragment[]>();
  const [parentTopic, setParentTopic] = useState<TopicLinkDataFragment>();

  const [getTopLevelDomainsLazyQuery, { loading: isTopLevelQueryLoading }] = useGetTopLevelTopicsLazyQuery({
    onCompleted(d) {
      d && setSubtopics(d.getTopLevelTopics.items);
      setLoadedTopic(rootTopic);
    },
    fetchPolicy: 'network-only',
  });

  const [getTopicById, { loading: isGetTopicLoading, refetch }] = useGetTopicByIdExplorePageLazyQuery({
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true, //https://github.com/apollographql/react-apollo/issues/3709
    onCompleted(d) {
      d && d.getTopicById.subTopics && setSubtopics(d.getTopicById.subTopics.map((i) => i.subTopic));
      setParentTopic(d.getTopicById.parentTopic || undefined);

      setLoadedTopic(d.getTopicById);
    },
  });
  const loading = isGetTopicLoading || isTopLevelQueryLoading;
  const loadTopic = (topicId?: string) => {
    if (!topicId || topicId === rootTopic._id) {
      getTopLevelDomainsLazyQuery();
      onTopicChange && onTopicChange(rootTopic._id);
    } else {
      getTopicById({ variables: { topicId } });
      onTopicChange && onTopicChange(topicId);
    }
  };

  useEffect(() => {
    loadTopic(selectedTopicId);
  }, [selectedTopicId]);

  return (
    <Stack direction={direction} spacing={6} alignItems="center">
      <Box
        borderBottomWidth={3}
        minH="168px"
        position="relative"
        borderBottomColor="teal.500"
        pb={6}
        pt={1}
        borderLeftWidth={2}
        borderLeftColor="gray.300"
        pl={4}
        pr={5}
        flexGrow={1}
        {...(direction === 'column' && { width: `${mapPxWidth}px` })}
        {...(direction === 'row' && { maxHeight: `200px` })}
      >
        {!!loadedTopic && loadedTopic._id !== rootTopic._id ? (
          <Stack direction="column" spacing={1}>
            <Stack direction="row" alignItems="flex-start" pb={1}>
              <TopicLink topic={loadedTopic} size="lg" newTab />
            </Stack>
            <Stack direction="row" spacing={8}>
              {subTopics?.length && (
                <SubTopicsCountIcon
                  totalCount={subTopics.length}
                  tooltipLabel={`${subTopics.length} subTopics in ${loadedTopic.name}`}
                />
              )}
              {loadedTopic.learningMaterialsTotalCount && (
                <LearningMaterialCountIcon
                  totalCount={loadedTopic.learningMaterialsTotalCount}
                  tooltipLabel={`${loadedTopic.learningMaterialsTotalCount} Learning Materials in ${loadedTopic.name}`}
                />
              )}
            </Stack>
            {loadedTopic.description && <TopicDescription topicDescription={loadedTopic.description} noOfLines={2} />}
          </Stack>
        ) : (
          <Text fontSize="3xl" fontWeight={700} color="gray.600">
            Explore Topics
          </Text>
        )}
        {isGetTopicLoading && (
          <Center position="absolute" top={0} right={0} p={2}>
            <Spinner />
          </Center>
        )}
      </Box>
      <Stack direction="column">
        <Center>
          <Box boxShadow="lg" width={mapPxWidth + 'px'} {...mapContainerProps}>
            {loading || !subTopics ? (
              <Center w={`${mapPxWidth}px`} h={`${mapPxHeight}px`}>
                <PuffLoader size={Math.floor(mapPxWidth / 3)} color={theme.colors.blue[500]} />
              </Center>
            ) : (
              <Map
                subTopics={subTopics}
                parentTopic={parentTopic}
                pxWidth={mapPxWidth}
                topic={loadedTopic}
                pxHeight={mapPxHeight}
                onClick={(topic) => {
                  setSelectedTopicId(topic._id);
                }}
              />
            )}
          </Box>
        </Center>
        <RoleAccess accessRule="loggedInUser">
          <Flex direction="row" justifyContent="center" pt={1} pb={1}>
            <NewTopicModal
              parentTopic={loadedTopic}
              renderButton={(openModal) => (
                <Link color="originalPalette.red" fontSize="md" fontWeight={600} onClick={() => openModal()}>
                  + Add SubTopic
                </Link>
              )}
            />
          </Flex>
        </RoleAccess>
      </Stack>
      {/* {loadedTopic && (
        <AddSubTopicModal
          parentTopicId={loadedTopic._id}
          isOpen={isOpen}
          onClose={onClose}
          onCancel={() => onClose()}
          onAdded={() => loadTopic(loadedTopic._id)}
        />
      )} */}
    </Stack>
  );
};
