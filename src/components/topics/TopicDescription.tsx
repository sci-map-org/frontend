import { Text, TextProps } from '@chakra-ui/layout';

interface TopicDescriptionProps extends TextProps {
  topicDescription: string;
}

export const TopicDescription: React.FC<TopicDescriptionProps> = ({ topicDescription, ...props }) => {
  return (
    <Text fontWeight={300} whiteSpace="pre-wrap">
      {topicDescription}
    </Text>
  );
};
