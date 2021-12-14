import { Flex, Stack, Text } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { TopicLinkData } from '../../graphql/topics/topics.fragments';
import { TopicLink } from '../lib/links/TopicLink';
import { TopicPageSectionHeader } from '../lib/Typography';
import { SeeAlsoDataFragment } from './SeeAlso.generated';

export const SeeAlsoData = gql`
  fragment SeeAlsoData on Topic {
    _id
    disambiguationTopic {
      contextualisedTopics {
        ...TopicLinkData
      }
    }
  }
  ${TopicLinkData}
`;
interface SeeAlsoProps {
  topic: SeeAlsoDataFragment;
}

export const SeeAlso: React.FC<SeeAlsoProps> = ({ topic }) => {
  if (!topic.disambiguationTopic?.contextualisedTopics) return null;
  return (
    <Stack direction="column" alignItems="flex-end" spacing={2} pl={2} pb={2}>
      <TopicPageSectionHeader>See Also</TopicPageSectionHeader>
      <Stack spacing="2px" alignItems="flex-end">
        {topic.disambiguationTopic.contextualisedTopics
          .filter(({ _id }) => _id !== topic._id)
          .map((contextualisedTopic) => (
            <TopicLink key={contextualisedTopic._id} topic={contextualisedTopic}>
              {contextualisedTopic.name}{' '}
              <Text color="gray.500" as="span">
                ({contextualisedTopic.context})
              </Text>
            </TopicLink>
          ))}
      </Stack>
    </Stack>
  );
};