import { Box, Center, Text } from '@chakra-ui/layout';
import { SimulationNodeDatum } from 'd3-force';
import gql from 'graphql-tag';
import { useEffect, useState } from 'react';
import { PuffLoader } from 'react-spinners';
import { PageLayout } from '../components/layout/PageLayout';
import { SubTopicsMapVisualisation } from '../components/topics/SubTopicsMapVisualisation';
import { MapVisualisationTopicDataFragment } from '../components/topics/SubTopicsMapVisualisation.generated';
import { DomainData } from '../graphql/domains/domains.fragments';
import { DomainLinkDataFragment } from '../graphql/domains/domains.fragments.generated';
import { TopicType } from '../graphql/types';
import { theme } from '../theme/theme';
import { useGetTopicByIdExplorePageLazyQuery, useGetTopLevelDomainsQuery } from './ExplorePage.generated';

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
        }
      }
      ... on Domain {
        parentTopics(options: { sorting: { type: index, direction: ASC } }) {
          parentTopic {
            _id
            key
            name
            size
            topicType
          }
        }
      }

      ... on Concept {
        domain {
          ...DomainData
        }
        parentTopic {
          parentTopic {
            _id
            key
            name
            size
            topicType
          }
        }
      }
    }
  }
  ${DomainData}
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
  _id: 'root',
  key: 'root',
  topicType: TopicType.Domain,
  name: 'root',
};
export const ExplorePage: React.FC<{}> = () => {
  const [subTopics, setSubtopics] = useState<MapVisualisationTopicDataFragment[]>();
  const [parentTopics, setParentTopics] = useState<MapVisualisationTopicDataFragment[]>();
  const { data, loading: isTopLevelQueryLoading, refetch: refetchRootTopics } = useGetTopLevelDomainsQuery({
    onCompleted(d) {
      d && setSubtopics(d.getTopLevelDomains.items);
      setParentTopics([]);
      setSelectedTopic(rootTopic);
      console.log('hello');
    },
    fetchPolicy: 'network-only',
  });
  const [selectedDomain, setSelectedDomain] = useState<DomainLinkDataFragment>();
  const [selectedTopic, setSelectedTopic] = useState<MapVisualisationTopicDataFragment>();
  const [selectedTopicId, setSelectedTopicId] = useState<string>();
  const [getTopicById, { loading: isGetTopicLoading }] = useGetTopicByIdExplorePageLazyQuery({
    onCompleted(d) {
      d.getTopicById.__typename === 'Domain' && setSelectedDomain(d.getTopicById);
      d && d.getTopicById.subTopics && setSubtopics(d.getTopicById.subTopics.map((i) => i.subTopic));
      if (d && d.getTopicById.__typename === 'Domain') {
        d.getTopicById.parentTopics?.length
          ? setParentTopics(d.getTopicById.parentTopics.map((i) => i.parentTopic))
          : setParentTopics([rootTopic]);
      }

      d &&
        d.getTopicById.__typename === 'Concept' &&
        d.getTopicById.parentTopic &&
        setParentTopics([d.getTopicById.parentTopic.parentTopic]);
      setSelectedTopic(d.getTopicById);
    },
  });
  const loading = isGetTopicLoading || isTopLevelQueryLoading;

  useEffect(() => {
    console.log('hi');
    if (selectedTopicId) {
      if (selectedTopicId === rootTopic._id) {
        console.log('refetching root');
        data && setSubtopics(data.getTopLevelDomains.items);
        setParentTopics([]);
        setSelectedTopic(rootTopic);
        // refetchRootTopics();
      } else {
        getTopicById({ variables: { topicId: selectedTopicId } });
      }
    }
  }, [selectedTopicId]);
  return (
    <PageLayout marginSize="md">
      <Center>
        <Box boxShadow="lg">
          <Text>{selectedTopic?.name}</Text>
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
    </PageLayout>
  );
};
