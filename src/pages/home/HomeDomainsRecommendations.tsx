import { Flex, Heading, Stack } from '@chakra-ui/react';
import { DomainCard } from '../../components/domains/DomainCard';
import { PageLink } from '../../components/navigation/InternalLink';
import { DomainLinkDataFragment } from '../../graphql/domains/domains.fragments.generated';
import { DomainsListPageInfo } from '../../pages/RoutesPageInfos';

const recommendedDomains: DomainLinkDataFragment[] = [
  {
    _id: 'AvgsEAdEM',
    name: 'Functional programming',
    key: 'functional_programming',
  },
  {
    _id: 'rbmJ0zwLg',
    name: 'Learning Theory',
    key: 'learning_theory',
  },
  //   {
  //     _id: 'moHAhCCrG',
  //     name: 'Word2Vec',
  //     key: 'word2vec',
  //   },
  {
    _id: 'Pzzw6056c',
    name: 'Object Oriented Programming',
    key: 'object_oriented_programming',
  },
  //   {
  //     _id: 'J3Ztx8J7v',
  //     name: 'Design',
  //     key: 'design',
  //   },
  //   {
  //     _id: 'XfLdsq7rp',
  //     name: 'Graph Theory',
  //     key: 'graph_theory',
  //   },
  //   {
  //     _id: '71ExPVDej',
  //     name: 'Computer Science',
  //     key: 'computer_science',
  //   },
  {
    _id: 'A-y9qLFzH',
    name: 'Machine Learning',
    key: 'machine_learning',
  },
  //   {
  //     _id: 'O_l-V7Ztc',
  //     name: 'Category Theory',
  //     key: 'category_theory',
  //   },
  {
    _id: 'EUm5JHAZl',
    name: 'JavaScript',
    key: 'javascript',
  },
  //   {
  //     _id: 'HRtR86sfk',
  //     name: 'Writing',
  //     key: 'writing',
  //   },
  //   {
  //     _id: 'b8hts8ECK',
  //     name: 'React.js',
  //     key: 'react_js',
  //   },
  //   {
  //     _id: 'OWvGDZRI8',
  //     name: 'Web Design',
  //     key: 'web_design',
  //   },
  //   {
  //     _id: 'k4vVjIhGX',
  //     name: 'NLP (Natural Language Processing)',
  //     key: 'natural_language_processing',
  //   },
  //   {
  //     _id: 'rPIp8B_Tt',
  //     name: 'Git',
  //     key: 'git',
  //   },
  //   {
  //     _id: 'ueMbFF4Lo',
  //     name: 'NumPy',
  //     key: 'numpy',
  //   },
  //   {
  //     _id: 'QOnTNIAMg',
  //     name: 'Graph Algorithms',
  //     key: 'graph_algorithms',
  //   },
  //   {
  //     _id: 'gx0f0KDnc',
  //     name: 'Entrepreneurship',
  //     key: 'entrepreneurship',
  //   },
  //   {
  //     _id: 'wOuDICuWZ',
  //     name: 'Startups',
  //     key: 'startups',
  //   },
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
  //   {
  //     _id: 'ZXV-KoPOx',
  //     name: 'Python',
  //     key: 'python',
  //   },
  //   {
  //     _id: 'cemyPvM_P',
  //     name: 'UI Design',
  //     key: 'ui_design',
  //   },
  {
    _id: 'XZj4wirw5',
    name: 'TypeScript',
    key: 'typescript',
  },
];

export const HomeDomainsRecommendations: React.FC<{}> = () => {
  return (
    <Flex overflowX="auto" direction="column">
      <Flex justifyContent="space-between" alignItems="baseline" mb={3}>
        <Heading size="lg" color="gray.700">
          Learn anything
        </Heading>
        <PageLink mx={1} pageInfo={DomainsListPageInfo} fontWeight={500}>
          See all
        </PageLink>
      </Flex>
      <Stack direction="row" overflowX="auto" spacing={4}>
        {recommendedDomains.map((domain) => (
          <DomainCard domain={domain} key={domain._id} />
        ))}
      </Stack>
    </Flex>
  );
};
