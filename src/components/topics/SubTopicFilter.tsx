import { Flex, Heading, Stack, StackProps, Wrap, WrapItem } from '@chakra-ui/react';
import { TopicLinkDataFragment } from '../../graphql/topics/topics.fragments.generated';

interface SubTopicFilterProps extends Omit<StackProps, 'onChange'> {
  subTopics: TopicLinkDataFragment[];
  selectedSubTopicId: string | null;
  onChange: (selectedTopicId: string | null) => void;
}
export const SubTopicFilter: React.FC<SubTopicFilterProps> = ({
  subTopics,
  selectedSubTopicId,
  onChange,
  ...props
}) => {
  return (
    <Stack alignItems="center" {...props}>
      <Heading size="xl" fontWeight={400}>
        SubTopics
      </Heading>
      <Wrap>
        <WrapItem>
          <SubTopicFilterItem name="General" isSelected={selectedSubTopicId === null} onClick={() => onChange(null)} />
        </WrapItem>
        {subTopics.map((subTopic) => (
          <WrapItem key={subTopic._id}>
            <SubTopicFilterItem
              name={subTopic.name}
              isSelected={selectedSubTopicId === subTopic._id}
              onClick={() => onChange(subTopic._id)}
            />
          </WrapItem>
        ))}
      </Wrap>
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
