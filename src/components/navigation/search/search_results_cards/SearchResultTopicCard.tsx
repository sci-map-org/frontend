import { Flex, Stack, Text } from '@chakra-ui/layout';
import gql from 'graphql-tag';
import { TopicLinkData } from '../../../../graphql/topics/topics.fragments';
import { LearningMaterialCountIcon } from '../../../learning_materials/LearningMaterialCountIcon';
import { TopicIcon } from '../../../lib/icons/TopicIcon';
import { SubTopicsCountIcon } from '../../../topics/SubTopicsCountIcon';
import { SearchResultCardContainer, SearchResultCardContainerProps } from './SearchResultCardContainer';
import { SearchResultTopicCardDataFragment } from './SearchResultTopicCard.generated';

export const SearchResultTopicCardData = gql`
  fragment SearchResultTopicCardData on Topic {
    ...TopicLinkData
    subTopicsTotalCount
    learningMaterialsTotalCount
  }
  ${TopicLinkData}
`;

export const SearchResultTopicCard: React.FC<
  { topic: SearchResultTopicCardDataFragment } & Omit<SearchResultCardContainerProps, 'borderLeftColor'>
> = ({ topic, ...props }) => {
  return (
    <SearchResultCardContainer
      renderIcon={(props) => <TopicIcon {...props} />}
      {...props}
      borderLeftColor="gray.500"
      bgColor={props.isHighlighted ? 'gray.200' : 'gray.100'}
    >
      <Flex direction="row" justifyContent="space-between" w="100%">
        <Text fontWeight={600} color="gray.600" fontSize="md" noOfLines={1}>
          {topic.name}
        </Text>
        <Stack direction="row">
          {!!topic.conceptTotalCount && (
            <SubTopicsCountIcon
              totalCount={topic.conceptTotalCount}
              tooltipLabel={`${topic.conceptTotalCount} Subtopics in ${topic.name}`}
            />
          )}
          {!!topic.learningMaterialsTotalCount && (
            <LearningMaterialCountIcon
              totalCount={topic.learningMaterialsTotalCount}
              tooltipLabel={`${topic.learningMaterialsTotalCount} Learning Materials in ${topic.name}`}
            />
          )}
        </Stack>
      </Flex>
    </SearchResultCardContainer>
  );
};
