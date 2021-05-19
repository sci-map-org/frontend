import { ExternalLinkIcon, Icon } from '@chakra-ui/icons';
import { Box, Center, Flex, Heading, Stack, Text } from '@chakra-ui/layout';
import { SimulationNodeDatum } from 'd3-force';
import gql from 'graphql-tag';
import { useEffect, useState } from 'react';
import { PuffLoader } from 'react-spinners';
import { PageLayout } from '../components/layout/PageLayout';
import { PageLink } from '../components/navigation/InternalLink';
import { MapVisualisationTopicData, SubTopicsMapVisualisation } from '../components/topics/SubTopicsMapVisualisation';
import { MapVisualisationTopicDataFragment } from '../components/topics/SubTopicsMapVisualisation.generated';
import { ConceptLinkData } from '../graphql/concepts/concepts.fragments';
import { DomainData, DomainLinkData } from '../graphql/domains/domains.fragments';
import { DomainLinkDataFragment } from '../graphql/domains/domains.fragments.generated';
import { LearningGoalLinkData } from '../graphql/learning_goals/learning_goals.fragments';
import { TopicLinkData } from '../graphql/topics/topics.fragments';
import { TopicType } from '../graphql/types';
import { theme } from '../theme/theme';
import { useGetTopicByIdExplorePageLazyQuery, useGetTopLevelDomainsQuery } from './ExplorePage.generated';
import { DomainPageInfo } from './RoutesPageInfos';

/**
 * Not using TopicLinkData because apollo fails: properly queried but data is empty object
 */
export const getTopicByIdExplorePage = gql`
  query getTopicByIdExplorePage($topicId: String!) {
    getTopicById(topicId: $topicId) {
      _id
      key
      name
      size
      topicType
      subTopics(options: { sorting: { type: index, direction: ASC } }) {
        subTopic {
          _id
          key
          name
          size
          topicType
          ...on Concept {
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
  const [selectedTopic, setSelectedTopic] = useState<MapVisualisationTopicDataFragment>();
  const [selectedTopicId, setSelectedTopicId] = useState<string>();
  const [getTopicById, { loading: isGetTopicLoading }] = useGetTopicByIdExplorePageLazyQuery({
    fetchPolicy: 'network-only',
    onCompleted(d) {
      d.getTopicById.__typename === 'Domain' && setSelectedDomain(d.getTopicById);
      d && d.getTopicById.subTopics && setSubtopics(d.getTopicById.subTopics.map((i) => i.subTopic));
      if (d && d.getTopicById.__typename === 'Domain') {
        d.getTopicById.parentTopics?.length
          ? setParentTopics(d.getTopicById.parentTopics.map((i) => i.parentTopic))
          : setParentTopics([rootTopic]);
      } 
      
      if(d &&
        d.getTopicById.__typename === 'Concept' &&
        d.getTopicById.parentTopic){
          setParentTopics([d.getTopicById.parentTopic.parentTopic]);
        }
        
      setSelectedTopic(d.getTopicById);
    },
  });
  const loading = isGetTopicLoading || isTopLevelQueryLoading;

  useEffect(() => {
    if (selectedTopicId) {
      if (selectedTopicId === rootTopic._id) {
        data && setSubtopics(data.getTopLevelDomains.items);
        setParentTopics([]);
        setSelectedTopic(rootTopic);
      } else {
        getTopicById({ variables: { topicId: selectedTopicId } });
      }
    }
  }, [selectedTopicId]);


  return (
    <PageLayout marginSize="md">
      <Center>
        <Stack direction="column" spacing={6}>
          <Box h={20} borderWidth={1} borderRadius={5} borderColor="gray.300" boxShadow="md" pl={2} pt={1}>
            {!!selectedTopic && selectedTopic._id !== rootTopic._id ? (
              <Stack direction="column" alignItems="flex-start">
                {selectedTopic?.__typename === TopicType.Domain && (
                  <PageLink pageInfo={DomainPageInfo(selectedTopic)} display="flex" alignItems="baseline">
                    <Text fontSize="xl" fontWeight={500} color="blue.600">
                      {selectedTopic?.name}
                    </Text>
                    <ExternalLinkIcon ml={2} color="blue.500" />
                  </PageLink>
                )}
              </Stack>
            ) : (
              <Text fontSize="xl" fontWeight={500} color="gray.600">
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

              {/* {data && <ExploreMapForceLayout data={data.getTopLevelDomains} pxWidth={pxWidth} pxHeight={pxHeight} />} */}
              {/* {data && <ExploreMapCirclePacking data={data.getTopLevelDomains} pxWidth={pxWidth} pxHeight={pxHeight} />} */}
            </Box>
          </Center>
        </Stack>
      </Center>
    </PageLayout>
  );
};
