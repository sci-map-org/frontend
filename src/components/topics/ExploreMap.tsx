import { useDisclosure } from '@chakra-ui/hooks';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Box, Center, Flex, FlexProps, Link, Stack, Text } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { PuffLoader } from 'react-spinners';
import { RoleAccess } from '../../components/auth/RoleAccess';
import { LearningMaterialCountIcon } from '../../components/learning_materials/LearningMaterialCountIcon';
import { TopicLink } from '../../components/lib/links/TopicLink';
import { AddSubTopicModal } from '../../components/topics/AddSubTopic';
import { SubTopicsCountIcon } from '../../components/topics/SubTopicsCountIcon';
import { SubTopicsMapVisualisation } from '../../components/topics/SubTopicsMapVisualisation';
import { MapVisualisationTopicDataFragment } from '../../components/topics/SubTopicsMapVisualisation.generated';
import { TopicDescription } from '../../components/topics/TopicDescription';
import { ConceptLinkData } from '../../graphql/concepts/concepts.fragments';
import { DomainLinkData } from '../../graphql/domains/domains.fragments';
import { DomainLinkDataFragment } from '../../graphql/domains/domains.fragments.generated';
import { LearningGoalLinkData } from '../../graphql/learning_goals/learning_goals.fragments';
import { TopicType } from '../../graphql/types';
import { theme } from '../../theme/theme';
import {
  GetTopicByIdExplorePageQuery,
  useGetTopicByIdExplorePageLazyQuery,
  useGetTopLevelDomainsLazyQuery,
} from './ExploreMap.generated';

/**
 * Not using TopicLinkData because apollo fails: properly queried but data is empty object
 */
export const getTopicByIdExplorePage = gql`
  query getTopicByIdExplorePage($topicId: String!) {
    getTopicById(topicId: $topicId) {
      _id
      key
      name
      description
      size
      topicType
      subTopics(options: { sorting: { type: index, direction: ASC } }) {
        subTopic {
          _id
          key
          name
          size
          topicType
          ... on Concept {
            domain {
              ...DomainLinkData
            }
          }
          ... on LearningGoal {
            type
          }
        }
      }
      ... on Domain {
        learningMaterialsTotalCount
        parentTopics(options: { sorting: { type: index, direction: ASC } }) {
          parentTopic {
            topicType
            ...DomainLinkData
            ...ConceptLinkData
            ...LearningGoalLinkData
          }
        }
      }

      ... on Concept {
        domain {
          ...DomainLinkData
        }
        parentTopic {
          parentTopic {
            topicType
            ...DomainLinkData
            ...ConceptLinkData
            ...LearningGoalLinkData
          }
        }
      }
      ... on LearningGoal {
        type
        domain {
          domain {
            ...DomainLinkData
          }
        }
        parentTopic {
          parentTopic {
            topicType
            ...DomainLinkData
            ...ConceptLinkData
            ...LearningGoalLinkData
          }
        }
      }
    }
  }
  ${DomainLinkData}
  ${ConceptLinkData}
  ${LearningGoalLinkData}
`;

export const getTopLevelDomains = gql`
  query getTopLevelDomains {
    getTopLevelDomains {
      items {
        _id
        key
        name
        size
        topicType
      }
    }
  }
`;

export const rootTopic: MapVisualisationTopicDataFragment = {
  __typename: 'Domain',
  _id: 'root',
  key: 'root',
  topicType: TopicType.Domain,
  name: 'Explore',
};

interface ExploreMapProps {
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const urlSelectedTopicId = router.query.selectedTopicId;
  if (urlSelectedTopicId && typeof urlSelectedTopicId !== 'string')
    throw new Error(`Invalid url param urlSelectedTopicId ${urlSelectedTopicId}`);
  const [selectedTopicId, setSelectedTopicId] = useState<string | undefined>(propSelectedTopicId);

  const [loadedTopic, setLoadedTopic] = useState<GetTopicByIdExplorePageQuery['getTopicById']>();
  const [loadedTopicDomain, setLoadedTopicDomain] = useState<DomainLinkDataFragment>();

  const [subTopics, setSubtopics] = useState<MapVisualisationTopicDataFragment[]>();
  const [parentTopics, setParentTopics] = useState<MapVisualisationTopicDataFragment[]>();

  const [getTopLevelDomainsLazyQuery, { loading: isTopLevelQueryLoading }] = useGetTopLevelDomainsLazyQuery({
    onCompleted(d) {
      d && setSubtopics(d.getTopLevelDomains.items);
      setParentTopics([]);
      setLoadedTopic(rootTopic);
    },
    fetchPolicy: 'network-only',
  });

  const [getTopicById, { loading: isGetTopicLoading, refetch }] = useGetTopicByIdExplorePageLazyQuery({
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true, //https://github.com/apollographql/react-apollo/issues/3709
    onCompleted(d) {
      d.getTopicById.__typename === 'Domain' && setLoadedTopicDomain(d.getTopicById);
      d && d.getTopicById.subTopics && setSubtopics(d.getTopicById.subTopics.map((i) => i.subTopic));
      if (d && d.getTopicById.__typename === 'Domain') {
        d.getTopicById.parentTopics?.length
          ? setParentTopics(d.getTopicById.parentTopics.map((i) => i.parentTopic))
          : setParentTopics([rootTopic]);
      }

      if (d && d.getTopicById.__typename === 'Concept' && d.getTopicById.parentTopic) {
        d.getTopicById.domain && setLoadedTopicDomain(d.getTopicById.domain);
        setParentTopics([d.getTopicById.parentTopic.parentTopic]);
      }

      setLoadedTopic(d.getTopicById);
    },
  });
  // const loading = isGetTopicLoading || isTopLevelQueryLoading;
  const loading = true;
  const loadTopic = (topicId?: string) => {
    if (!topicId || topicId === rootTopic._id) {
      getTopLevelDomainsLazyQuery();
      onTopicChange && onTopicChange(rootTopic._id);
      // } else if (topicId === loadedTopic?._id) { => needed ?
      //   refetch && refetch({ topicId });
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
            <Stack direction="row" alignItems="flex-start" pb={3}>
              <TopicLink topic={loadedTopic} fontSize="3xl" isExternal />
              <ExternalLinkIcon ml={2} boxSize={6} />
            </Stack>
            <Stack direction="row" spacing={8}>
              {subTopics?.length && (
                <SubTopicsCountIcon
                  totalCount={subTopics.length}
                  tooltipLabel={`${subTopics.length} subTopics in ${loadedTopic.name}`}
                />
              )}
              {loadedTopic.__typename === TopicType.Domain && loadedTopic.learningMaterialsTotalCount && (
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
              <SubTopicsMapVisualisation
                subTopics={subTopics}
                parentTopics={parentTopics}
                pxWidth={mapPxWidth}
                domainKey={loadedTopicDomain?.key}
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
            <Link color="originalPalette.red" fontSize="md" fontWeight={600} onClick={() => onOpen()}>
              + Add SubTopic
            </Link>
          </Flex>
        </RoleAccess>
      </Stack>
      {loadedTopic && (
        <AddSubTopicModal
          domain={loadedTopicDomain}
          parentTopicId={loadedTopic._id}
          isOpen={isOpen}
          onClose={onClose}
          onCancel={() => onClose()}
          onAdded={() => loadTopic(loadedTopic._id)}
        />
      )}
    </Stack>
  );
};
