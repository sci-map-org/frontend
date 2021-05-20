import { useDisclosure } from '@chakra-ui/hooks';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Box, Center, Flex, Link, Stack, Text } from '@chakra-ui/layout';
import { SimulationNodeDatum } from 'd3-force';
import gql from 'graphql-tag';
import { useEffect, useState } from 'react';
import { PuffLoader } from 'react-spinners';
import { RoleAccess } from '../components/auth/RoleAccess';
import { PageLayout } from '../components/layout/PageLayout';
import { LearningMaterialCountIcon } from '../components/learning_materials/LearningMaterialCountIcon';
import { TopicLink } from '../components/lib/links/TopicLink';
import { AddSubTopicModal } from '../components/topics/AddSubTopic';
import { SubTopicsCountIcon } from '../components/topics/SubTopicsCountIcon';
import { SubTopicsMapVisualisation } from '../components/topics/SubTopicsMapVisualisation';
import { MapVisualisationTopicDataFragment } from '../components/topics/SubTopicsMapVisualisation.generated';
import { TopicDescription } from '../components/topics/TopicDescription';
import { ConceptLinkData } from '../graphql/concepts/concepts.fragments';
import { DomainLinkData } from '../graphql/domains/domains.fragments';
import { DomainLinkDataFragment } from '../graphql/domains/domains.fragments.generated';
import { LearningGoalLinkData } from '../graphql/learning_goals/learning_goals.fragments';
import { TopicType } from '../graphql/types';
import { theme } from '../theme/theme';
import {
  GetTopicByIdExplorePageQuery,
  useGetTopicByIdExplorePageLazyQuery,
  useGetTopLevelDomainsQuery,
} from './ExplorePage.generated';

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

const pxWidth = 500;
const pxHeight = 500;

type NodeElement = SimulationNodeDatum & {
  _id: string;
  name: string;
  size?: number;
};

const rootTopic: MapVisualisationTopicDataFragment = {
  __typename: 'Domain',
  _id: 'root',
  key: 'root',
  topicType: TopicType.Domain,
  name: 'Explore',
};
export const ExplorePage: React.FC<{}> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [subTopics, setSubtopics] = useState<MapVisualisationTopicDataFragment[]>();
  const [parentTopics, setParentTopics] = useState<MapVisualisationTopicDataFragment[]>();
  const { data, loading: isTopLevelQueryLoading, refetch: refetchRootTopics } = useGetTopLevelDomainsQuery({
    onCompleted(d) {
      d && setSubtopics(d.getTopLevelDomains.items);
      setParentTopics([]);
      setSelectedTopic(rootTopic);
    },
    fetchPolicy: 'network-only',
  });
  const [selectedDomain, setSelectedDomain] = useState<DomainLinkDataFragment>();
  const [selectedTopic, setSelectedTopic] = useState<GetTopicByIdExplorePageQuery['getTopicById']>();
  const [selectedTopicId, setSelectedTopicId] = useState<string>();
  const [getTopicById, { loading: isGetTopicLoading, refetch }] = useGetTopicByIdExplorePageLazyQuery({
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true, //https://github.com/apollographql/react-apollo/issues/3709
    onCompleted(d) {
      d.getTopicById.__typename === 'Domain' && setSelectedDomain(d.getTopicById);
      d && d.getTopicById.subTopics && setSubtopics(d.getTopicById.subTopics.map((i) => i.subTopic));
      if (d && d.getTopicById.__typename === 'Domain') {
        d.getTopicById.parentTopics?.length
          ? setParentTopics(d.getTopicById.parentTopics.map((i) => i.parentTopic))
          : setParentTopics([rootTopic]);
      }

      if (d && d.getTopicById.__typename === 'Concept' && d.getTopicById.parentTopic) {
        d.getTopicById.domain && setSelectedDomain(d.getTopicById.domain);
        setParentTopics([d.getTopicById.parentTopic.parentTopic]);
      }

      setSelectedTopic(d.getTopicById);
    },
  });
  const loading = isGetTopicLoading || isTopLevelQueryLoading;

  const loadTopic = (topicId?: string) => {
    if (topicId) {
      if (topicId === rootTopic._id) {
        data && setSubtopics(data.getTopLevelDomains.items);
        setParentTopics([]);
        setSelectedTopic(rootTopic);
      } else if (topicId === selectedTopic?._id) {
        refetch && refetch({ topicId });
      } else {
        getTopicById({ variables: { topicId } });
      }
    }
  };
  useEffect(() => {
    loadTopic(selectedTopicId);
  }, [selectedTopicId]);

  return (
    <PageLayout marginSize="md">
      <Center>
        <Stack direction="column" spacing={6} width={pxWidth + 'px'}>
          <Box
            borderBottomWidth={3}
            minH="168px"
            borderBottomColor="teal.500"
            pb={6}
            pt={1}
            borderLeftWidth={2}
            borderLeftColor="gray.300"
            pl={4}
            pr={5}
          >
            {!!selectedTopic && selectedTopic._id !== rootTopic._id ? (
              <Stack direction="column" spacing={1}>
                <Stack direction="row" alignItems="flex-start" pb={3}>
                  <TopicLink topic={selectedTopic} fontSize="3xl" isExternal />
                  <ExternalLinkIcon ml={2} boxSize={6} />
                </Stack>
                <Stack direction="row" spacing={8}>
                  {subTopics?.length && (
                    <SubTopicsCountIcon
                      totalCount={subTopics.length}
                      tooltipLabel={`${subTopics.length} subTopics in ${selectedTopic.name}`}
                    />
                  )}
                  {selectedTopic.__typename === TopicType.Domain && selectedTopic.learningMaterialsTotalCount && (
                    <LearningMaterialCountIcon
                      totalCount={selectedTopic.learningMaterialsTotalCount}
                      tooltipLabel={`${selectedTopic.learningMaterialsTotalCount} Learning Materials in ${selectedTopic.name}`}
                    />
                  )}
                </Stack>
                {selectedTopic.description && <TopicDescription topicDescription={selectedTopic.description} />}
              </Stack>
            ) : (
              <Text fontSize="3xl" fontWeight={700} color="gray.600">
                Explore
              </Text>
            )}
          </Box>

          <Center>
            <Box boxShadow="lg">
              {loading || !subTopics ? (
                <Center w={`${pxWidth}px`} h={`${pxHeight}px`}>
                  <PuffLoader size={Math.floor(pxWidth / 3)} color={theme.colors.blue[500]} />
                </Center>
              ) : (
                <SubTopicsMapVisualisation
                  subTopics={subTopics}
                  parentTopics={parentTopics}
                  pxWidth={pxWidth}
                  domainKey={selectedDomain?.key}
                  topic={selectedTopic}
                  pxHeight={pxHeight}
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
          {selectedTopic && (
            <AddSubTopicModal
              domain={selectedDomain}
              parentTopicId={selectedTopic._id}
              isOpen={isOpen}
              onClose={onClose}
              onCancel={() => onClose()}
              onAdded={() => loadTopic(selectedTopic._id)}
            />
          )}
        </Stack>
      </Center>
    </PageLayout>
  );
};
