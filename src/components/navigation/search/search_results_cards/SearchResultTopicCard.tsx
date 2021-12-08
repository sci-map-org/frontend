import { Flex, Stack, Text } from '@chakra-ui/layout';
import gql from 'graphql-tag';
import { TopicLinkData } from '../../../../graphql/topics/topics.fragments';
import { LearningMaterialCountIcon } from '../../../learning_materials/LearningMaterialCountIcon';
import { TopicIcon } from '../../../lib/icons/TopicIcon';
import { DirectionSignIcon } from '../../../lib/icons/DirectionSignIcon';
import { SubTopicsCountIcon } from '../../../topics/SubTopicsCountIcon';
import { SearchResultCardContainer, SearchResultCardContainerProps } from './SearchResultCardContainer';
import { SearchResultTopicCardDataFragment } from './SearchResultTopicCard.generated';

export const SearchResultTopicCardData = gql`
  fragment SearchResultTopicCardData on Topic {
    ...TopicLinkData
    isDisambiguation
    context
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
      renderIcon={(props) => (topic.isDisambiguation ? <DirectionSignIcon {...props} /> : <TopicIcon {...props} />)}
      {...props}
      borderLeftColor="gray.500"
      bgColor={props.isHighlighted ? 'gray.200' : 'gray.100'}
    >
      <Flex direction="row" justifyContent="space-between" w="100%">
        <Stack direction="row" alignItems="baseline" spacing={1}>
          <Text fontWeight={600} color="gray.600" fontSize="md" noOfLines={1}>
            {topic.name}
          </Text>
          {topic.context && (
            <Text fontWeight={600} color="gray.700" fontSize="sm" noOfLines={1}>
              ({topic.context})
            </Text>
          )}
          {topic.isDisambiguation && (
            <Text fontWeight={600} color="gray.500" fontSize="sm" noOfLines={1}>
              - Disambiguation
            </Text>
          )}
        </Stack>
        {!topic.isDisambiguation && (
          <Stack direction="row">
            {!!topic.subTopicsTotalCount && topic.subTopicsTotalCount > 1 && (
              <SubTopicsCountIcon
                totalCount={topic.subTopicsTotalCount}
                tooltipLabel={`${topic.subTopicsTotalCount} Subtopics in ${topic.name}`}
              />
            )}
            {!!topic.learningMaterialsTotalCount && (
              <LearningMaterialCountIcon
                totalCount={topic.learningMaterialsTotalCount}
                tooltipLabel={`${topic.learningMaterialsTotalCount} Learning Materials in ${topic.name}`}
              />
            )}
          </Stack>
        )}
      </Flex>
    </SearchResultCardContainer>
  );
};
