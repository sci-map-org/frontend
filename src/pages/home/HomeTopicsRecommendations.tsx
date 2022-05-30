import { Flex, Heading, Stack } from '@chakra-ui/react';
import { TopicCard } from '../../components/topics/TopicCard';
import { TopicLinkDataFragment } from '../../graphql/topics/topics.fragments.generated';

const recommendedTopics: TopicLinkDataFragment[] = [
  {
    _id: 'AvgsEAdEM',
    name: 'Functional programming',
    key: 'functional_programming_(programming_paradigms)',
  },
  {
    _id: 'rbmJ0zwLg',
    name: 'Learning Theory',
    key: 'learning_theory',
  },
  {
    _id: 'Pzzw6056c',
    name: 'Object Oriented Programming',
    key: 'object_oriented_programming',
  },
  {
    _id: '71ExPVDej',
    name: 'Computer Science',
    key: 'computer_science',
  },
  {
    _id: 'A-y9qLFzH',
    name: 'Machine Learning',
    key: 'machine_learning',
  },
  {
    _id: 'EUm5JHAZl',
    name: 'JavaScript',
    key: 'javascript',
  },
  {
    _id: 'CPNvRhxqh',
    name: 'Deep Learning',
    key: 'deep_learning',
  },
  {
    _id: 'g-8hRa0tS',
    name: 'UX Design',
    key: 'ux_design',
  },
  {
    _id: 'XZj4wirw5',
    name: 'TypeScript',
    key: 'typescript',
  },
];

export const HomeTopicsRecommendations: React.FC<{}> = () => {
  return (
    <Flex overflowX="auto" direction="column">
      <Flex justifyContent="space-between" alignItems="baseline" mb={3}>
        <Heading size="lg" color="gray.700">
          Learn anything
        </Heading>
        {/* <PageLink mx={1} pageInfo={DomainsListPageInfo} fontWeight={500}>
          See all
        </PageLink> */}
      </Flex>
      <Stack direction="row" overflowX="auto" spacing={4}>
        {recommendedTopics.map((topic) => (
          <TopicCard topic={topic} key={topic._id} />
        ))}
      </Stack>
    </Flex>
  );
};
