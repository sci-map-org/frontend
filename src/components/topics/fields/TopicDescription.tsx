import { Center, Flex, Stack, Button, Text, Textarea, TextProps } from '@chakra-ui/react';
import { useState } from 'react';
import { Field } from '../../lib/Field';

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

interface PulledDescription {
  sourceUrl: string;
  sourceName: string;
  text: string;
}

export const TopicDescriptionField: React.FC<{
  size?: 'sm' | 'md' | 'lg';
  value?: string | null;
  noOfLines?: number;
  onChange: (value: string) => void;
}> = ({ noOfLines = 17, size, value, onChange }) => {
  const [pulledDescriptions, setPulledDescriptions] = useState<PulledDescription[]>();
  return (
    <Field
      label="Description"
      renderTopRight={
        <Button
          colorScheme="teal"
          size="sm"
          onClick={() =>
            setPulledDescriptions([
              {
                sourceUrl: 'wikipedia.org/x/topic_smthg',
                sourceName: 'Wikipedia',
                text:
                  'In computer science, functional programming is a programming paradigm where programs are constructed by applying and composing functions. It is a declarative programming paradigm in which function definitions ....',
              },
              {
                sourceUrl: 'medium.com/x/topic_smthg',
                sourceName: 'Medium',
                text:
                  'In computer science, functional programming is a programming paradigm where programs are constructed by applying and composing functions. It is a declarative programming paradigm in which function definitions ....',
              },
            ])
          }
        >
          Pull Descriptions from the Web
        </Button>
      }
    >
      <Flex direction="row" justifyContent="space-between" alignItems="stretch" h="400px">
        <Textarea
          placeholder="Topic description"
          size={size}
          minH="260px"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          {...(pulledDescriptions && { w: '50%' })}
        />
        {pulledDescriptions && (
          <Flex justifyContent="stretch" {...(pulledDescriptions && { w: '46%' })}>
            <Stack>
              {pulledDescriptions.map((pulledDescription) => (
                <PulledDescriptionOption
                  key={pulledDescription.sourceUrl}
                  pulledDescription={pulledDescription}
                  onSelect={() => onChange(pulledDescription.text)}
                />
              ))}
            </Stack>
          </Flex>
        )}
      </Flex>
    </Field>
  );
};

const PulledDescriptionOption: React.FC<{ onSelect: () => void; pulledDescription: PulledDescription }> = ({
  onSelect,
  pulledDescription,
}) => {
  return (
    <Flex direction="row" alignItems="stretch" borderWidth={1} borderColor="gray.400" boxShadow="md" borderRadius={2}>
      <Center px={4} borderColor="gray.400" borderRightWidth={1}>
        <Button colorScheme="blue" onClick={() => onSelect()} size="sm">
          Select
        </Button>
      </Center>
      <Flex pt={2} pl={1}>
        <Text fontWeight={600} color="gray.600" fontSize="sm" h="80px" overflowY="scroll" pr="2px">
          {pulledDescription.text}
        </Text>
      </Flex>
    </Flex>
  );
};
