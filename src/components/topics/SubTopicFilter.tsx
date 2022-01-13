import { Divider, Flex, Heading, Stack, StackProps, Wrap, WrapItem } from '@chakra-ui/react';
import { TopicLinkDataFragment } from '../../graphql/topics/topics.fragments.generated';
import { TopicDescription } from './fields/TopicDescription';
import { TopicSubHeader } from './TopicSubHeader';

interface SubTopicFilterProps extends Omit<StackProps, 'onChange'> {
  subTopics: TopicLinkDataFragment[];
  selectedSubTopic: TopicLinkDataFragment | null;
  onChange: (selectedTopicKey: string | null) => void;
}
export const SubTopicFilter: React.FC<SubTopicFilterProps> = ({ subTopics, selectedSubTopic, onChange, ...props }) => {
  return (
    <Stack spacing={4} alignItems="center" {...props}>
      <Heading size="xl" fontWeight={400}>
        SubTopics
      </Heading>
      <Wrap justify="center">
        <WrapItem>
          <SubTopicFilterItem name="General" isSelected={selectedSubTopic === null} onClick={() => onChange(null)} />
        </WrapItem>
        {subTopics.map((subTopic) => (
          <WrapItem key={subTopic._id}>
            <SubTopicFilterItem
              name={subTopic.name}
              isSelected={selectedSubTopic?._id === subTopic._id}
              onClick={() => onChange(subTopic.key)}
            />
          </WrapItem>
        ))}
      </Wrap>
      {selectedSubTopic && <Divider borderColor="gray.400" />}
      {selectedSubTopic && (
        <Stack alignItems="center">
          <Heading color="gray.600" size="lg">
            {selectedSubTopic.name}
          </Heading>
          <TopicSubHeader topic={selectedSubTopic} size="sm" />
          {/* <TopicDescription topicDescription={selectedSubTopic.description} /> */}
        </Stack>
      )}
    </Stack>
  );
};

const SubTopicFilterItem: React.FC<{
  name: string;
  isSelected?: boolean;
  onClick: () => void;
}> = ({ name, isSelected, onClick }) => {
  return (
    <Flex
      onClick={onClick}
      borderRadius={10}
      borderWidth={1}
      borderColor={isSelected ? 'teal.600' : 'black'}
      bgColor={isSelected ? 'teal.600' : 'white'}
      color={isSelected ? 'white' : 'black'}
      fontSize="17px"
      px="8px"
      py="2px"
      _hover={{
        cursor: isSelected ? 'auto' : 'pointer',
      }}
    >
      {name}
    </Flex>
  );
};
