import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Box, Center, Flex, FlexProps, Link, Stack, Text, Wrap, WrapItem } from '@chakra-ui/layout';
import { Button, useBreakpointValue } from '@chakra-ui/react';
import { Spinner } from '@chakra-ui/spinner';
import gql from 'graphql-tag';
import { useCallback, useEffect, useState } from 'react';
import { TopicLinkData } from '../../../graphql/topics/topics.fragments';
import { TopicLinkDataFragment } from '../../../graphql/topics/topics.fragments.generated';
import { TopicPageInfo } from '../../../pages/RoutesPageInfos';
import { RoleAccess } from '../../auth/RoleAccess';
import { TopicLink } from '../../lib/links/TopicLink';
import { PageLink } from '../../navigation/InternalLink';
import { AlsoPartOfTopicsViewer } from '../AlsoPartOfTopicsViewer';
import { EditablePartOfTopicsData } from '../EditablePartOfTopics';
import { TopicDescription } from '../fields/TopicDescription';
import { NewTopicModal } from '../NewTopic';
import { TopicSubHeader, TopicSubHeaderData } from '../TopicSubHeader';
import {
  ExploreMapFocusedTopicCardDataFragment,
  GetTopicByIdExplorePageQuery,
  useGetTopicByIdExplorePageLazyQuery,
  useGetTopLevelTopicsLazyQuery,
} from './ExploreMap.generated';
import { Map } from './Map';
import { MapTopicData } from './map.utils';
import { MapTopicDataFragment } from './map.utils.generated';
import { MapHeader, MapType } from './MapHeader';

export const ExploreMapFocusedTopicCardData = gql`
  fragment ExploreMapFocusedTopicCardData on Topic {
    ...MapTopicData
    description
    ...TopicSubHeaderData
    ...EditablePartOfTopicsData
    subTopics {
      subTopic {
        ...MapTopicData
      }
    }
    parentTopic {
      ...TopicLinkData
      parentTopic {
        ...TopicLinkData
      }
    }
  }
  ${TopicSubHeaderData}
  ${TopicLinkData}
  ${MapTopicData}
  ${EditablePartOfTopicsData}
`;

export const getTopicByIdExplorePage = gql`
  query getTopicByIdExplorePage($topicId: String!) {
    getTopicById(topicId: $topicId) {
      ...ExploreMapFocusedTopicCardData
    }
  }
  ${ExploreMapFocusedTopicCardData}
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

export interface ExploreMapOptions {
  direction: 'row' | 'column';
  mapPxWidth: number;
  mapPxHeight: number;
}

export interface ExploreMapProps {
  selectedTopicId?: string;
  selectedMapType?: MapType;
  onTopicOrMapTypeChange?: (topicId: string, mapType: MapType) => void;
  mapContainerProps?: FlexProps;
  options: ExploreMapOptions;
}
export const ExploreMap: React.FC<ExploreMapProps> = ({
  selectedTopicId: propSelectedTopicId,
  selectedMapType: propSelectedMapType,
  onTopicOrMapTypeChange,
  mapContainerProps,
  options,
}) => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>(propSelectedTopicId || rootTopic._id);

  const [loadedTopic, setLoadedTopic] = useState<GetTopicByIdExplorePageQuery['getTopicById']>();
  const [selectedMapType, setSelectedMapType] = useState<MapType>(propSelectedMapType || MapType.SUBTOPICS);
  const [subTopics, setSubtopics] = useState<MapTopicDataFragment[]>();
  const [parentTopic, setParentTopic] = useState<TopicLinkDataFragment>();

  useEffect(() => {
    // for handling browser "Previous page" action
    if (propSelectedMapType && propSelectedMapType !== selectedMapType) setSelectedMapType(propSelectedMapType);
  }, [propSelectedMapType]);

  useEffect(() => {
    // for handling browser "Previous page" action
    if (propSelectedTopicId !== selectedTopicId) setSelectedTopicId(propSelectedTopicId || rootTopic._id);
  }, [propSelectedTopicId]);

  useEffect(() => {
    onTopicOrMapTypeChange && onTopicOrMapTypeChange(selectedTopicId || rootTopic._id, selectedMapType);
  }, [selectedMapType, selectedTopicId]);

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
    } else {
      getTopicById({ variables: { topicId } });
    }
  };
  useEffect(() => {
    // Because root topic can not be shown as progress or prereq map. Breaks a bit history though
    if (selectedTopicId === rootTopic._id && selectedMapType !== MapType.SUBTOPICS)
      setSelectedMapType(MapType.SUBTOPICS);
  }, [selectedTopicId]);

  useEffect(() => {
    loadTopic(selectedTopicId);
  }, [selectedTopicId]);

  const onSelectTopic = useCallback(
    (topic) => {
      setSelectedTopicId(topic._id);
    },
    [setSelectedTopicId]
  );

  const headerSize: 'sm' | 'lg' | undefined = useBreakpointValue({ base: 'sm', md: 'lg' });

  return (
    <Stack direction={options.direction} spacing={4} alignItems="center">
      <ExploreMapFocusedTopicCard topic={loadedTopic} isLoading={isGetTopicLoading} options={options} />

      <Stack direction="column">
        <Center>
          <Stack spacing="2px" alignItems={{ base: 'flex-start', md: 'stretch' }}>
            <Flex
              justifyContent={{ base: 'flex-start', md: 'space-between' }}
              direction={{ base: 'column-reverse', md: 'row' }}
              alignItems="center"
            >
              <MapHeader
                onChange={setSelectedMapType}
                value={selectedMapType}
                size={headerSize || 'lg'}
                disabledMapTypes={selectedTopicId === rootTopic._id ? [MapType.CONCEPTS, MapType.PREREQUISITES] : []}
              />
              {!!loadedTopic && <AlsoPartOfTopicsViewer topic={loadedTopic} />}
            </Flex>
            <Box boxShadow="lg" width={options.mapPxWidth + 'px'} {...mapContainerProps}>
              <Map
                mapType={selectedMapType}
                setMapType={setSelectedMapType}
                isLoading={loading || !subTopics}
                subTopics={subTopics || []}
                parentTopic={parentTopic}
                topic={loadedTopic}
                options={{
                  mode: 'explore',
                  pxWidth: options.mapPxWidth,
                  pxHeight: options.mapPxHeight,
                  enableHistory: true,
                  showTotalSubTopicsCount: true,
                  showLearningMaterialsTotalCount: true,
                }}
                onSelectTopic={onSelectTopic}
              />
            </Box>
            <Flex justifyContent="space-between" alignItems="center">
              <ExploreMapBreadcrumbs topic={loadedTopic} onSelect={(topicId) => setSelectedTopicId(topicId)} />
              <RoleAccess accessRule="loggedInUser">
                <NewTopicModal
                  parentTopic={loadedTopic}
                  renderButton={(openModal) => (
                    <Button colorScheme="blue" size="xs" variant="outline" onClick={() => openModal()}>
                      + Add SubTopic
                    </Button>
                  )}
                />
              </RoleAccess>
            </Flex>
          </Stack>
        </Center>
      </Stack>
    </Stack>
  );
};

const ExploreMapFocusedTopicCard: React.FC<{
  topic?: ExploreMapFocusedTopicCardDataFragment;
  isLoading: boolean;
  options: ExploreMapOptions;
}> = ({ topic, isLoading, options }) => {
  return (
    <Box
      bgColor="gray.50"
      boxShadow="lg"
      minH="156px"
      position="relative"
      pb={3}
      pt={1}
      pl={3}
      pr={2}
      flexGrow={1}
      display="flex"
      alignItems="stretch"
      justifyContent="stretch"
      {...(options.direction === 'column' && { width: `${options.mapPxWidth}px` })}
      {...(options.direction === 'row' && { maxHeight: `200px` })}
    >
      {!!topic && topic._id !== rootTopic._id ? (
        <Flex direction="row" alignItems="stretch" flexGrow={1}>
          <Box flexGrow={1}>
            <Stack direction="column" spacing={1}>
              <Stack direction="row" alignItems="flex-start" pb={0}>
                <TopicLink topic={topic} size="2xl" />
              </Stack>
              <TopicSubHeader topic={topic} subTopicsDisplay="count" />
              {topic.description && <TopicDescription topicDescription={topic.description} noOfLines={2} />}
            </Stack>
          </Box>
          <Center>
            <PageLink
              color="blue.500"
              display="flex"
              alignItems="baseline"
              fontSize="lg"
              pageInfo={TopicPageInfo(topic)}
              isExternal
            >
              Explore
              <ExternalLinkIcon ml="6px" boxSize={4} />
            </PageLink>
          </Center>
        </Flex>
      ) : (
        <Text fontSize="3xl" fontWeight={700} color="gray.600">
          Explore Topics
        </Text>
      )}
      {isLoading && (
        <Center position="absolute" top={0} right={0} p={2}>
          <Spinner />
        </Center>
      )}
    </Box>
  );
};

const ExploreMapBreadcrumbs: React.FC<{
  topic?: ExploreMapFocusedTopicCardDataFragment;
  onSelect: (topicId: string) => void;
}> = ({ topic, onSelect }) => {
  const fontSize = useBreakpointValue(
    {
      base: '10px',
      sm: '13px',
      md: '17px',
    },
    'md'
  );
  const breadcrumbLink = (topic: TopicLinkDataFragment, isCurrent?: boolean) => (
    <Link
      fontSize={fontSize}
      fontWeight={500}
      textDecoration={isCurrent ? 'underline' : 'none'}
      onClick={() => onSelect(topic._id)}
    >
      {topic._id !== rootTopic._id ? topic.name : 'Explore'}
    </Link>
  );
  return (
    <Wrap direction="row" alignItems="center" spacing={{ base: '2px', sm: 1, md: 2 }} fontSize={fontSize}>
      {topic?._id !== rootTopic._id &&
        (!topic?.parentTopic || !topic.parentTopic?.parentTopic ? (
          <>
            <WrapItem>{breadcrumbLink(rootTopic)}</WrapItem>
            <WrapItem>
              <Text>/</Text>
            </WrapItem>
          </>
        ) : (
          <>
            <WrapItem>
              <Text>..</Text>
            </WrapItem>
            <WrapItem>
              <Text>/</Text>
            </WrapItem>
          </>
        ))}
      {!!topic?.parentTopic?.parentTopic && (
        <>
          <WrapItem>{breadcrumbLink(topic.parentTopic.parentTopic)}</WrapItem>
          <WrapItem>
            <Text>/</Text>
          </WrapItem>
        </>
      )}
      {!!topic?.parentTopic && (
        <>
          <WrapItem>{breadcrumbLink(topic.parentTopic)}</WrapItem>
          <WrapItem>
            <Text>/</Text>
          </WrapItem>
        </>
      )}
      <WrapItem>{topic && breadcrumbLink(topic, true)}</WrapItem>
    </Wrap>
  );
};
