import { Text, TextProps } from '@chakra-ui/layout';
import { Textarea } from '@chakra-ui/textarea';

interface TopicDescriptionProps extends TextProps {
  topicDescription?: string;
  placeholder?: string;
}

export const TopicDescription: React.FC<TopicDescriptionProps> = ({ topicDescription, placeholder, ...props }) => {
  if (!topicDescription)
    return placeholder ? (
      <Text fontWeight={300} color="gray.600" {...props}>
        {placeholder}
      </Text>
    ) : null;
  return (
    <Text fontWeight={300} whiteSpace="pre-wrap" {...props}>
      {topicDescription}
    </Text>
  );
};

export const TopicDescriptionField: React.FC<{
  size?: 'sm' | 'md' | 'lg';
  value?: string | null;
  onChange: (value: string) => void;
}> = ({ size, value, onChange }) => {
  return (
    <Textarea
      placeholder="Topic description"
      size={size}
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
    ></Textarea>
  );
};
