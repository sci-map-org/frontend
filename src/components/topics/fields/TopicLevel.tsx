import {
  Box,
  BoxProps,
  Flex,
  FlexProps,
  FormControl,
  FormLabel,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Switch,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Field } from '../../lib/Field';

export enum TopicLevelValue {
  Basics = 'basics',
  Intermediate = 'intermediate',
  Advanced = 'advanced',
  Expert = 'expert',
}

const levelColorMapping: { [key in TopicLevelValue]: BoxProps['color'] } = {
  [TopicLevelValue.Basics]: 'green.300',
  [TopicLevelValue.Intermediate]: 'yellow.300',
  [TopicLevelValue.Advanced]: 'orange.300',
  [TopicLevelValue.Expert]: 'red.300',
};

interface TopicLevelViewerProps {
  level?: number;
  topicId?: string;
}

export const TopicLevelViewer: React.FC<TopicLevelViewerProps> = ({ level, topicId }) => {
  if (level === undefined) return null;
  if (level >= 0 && level <= 25) return <TopicLevelViewerBase value={TopicLevelValue.Basics} />;
  if (level <= 50) return <TopicLevelViewerBase value={TopicLevelValue.Intermediate} />;
  if (level <= 75) return <TopicLevelViewerBase value={TopicLevelValue.Advanced} />;
  if (level <= 100) return <TopicLevelViewerBase value={TopicLevelValue.Expert} />;
  throw new Error(`Invalid topic level value: ${level} for topic ${topicId}`);
};

const TopicLevelViewerBase: React.FC<{ value: TopicLevelValue }> = ({ value }) => {
  return (
    <Text
      color={levelColorMapping[value]}
      fontWeight={800}
      borderColor={levelColorMapping[value]}
      borderWidth={2}
      px={2}
      borderRadius={2}
    >
      {value.toLocaleUpperCase()}
    </Text>
  );
};

export const TopicLevelField: React.FC<{
  value: number | null;
  onChange: (value: number | null) => void;
  w?: FlexProps['w'];
}> = ({ value, onChange, w }) => {
  const [sliderValue, setSliderValue] = useState<number | null>(value);
  return (
    <Field label="Level">
      <Flex direction="column" alignItems="stretch" w={w}>
        <Slider
          defaultValue={value || undefined}
          min={0}
          max={100}
          aria-label="level"
          onChange={(val) => {
            setSliderValue(val);
            onChange(val);
          }}
          isDisabled={value === null}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>

        <Flex justifyContent="space-between" mt={1}>
          <Box>
            <TopicLevelViewer level={value === null ? undefined : value} />
          </Box>
          <FormControl display="flex" alignItems="baseline" w="unset" h="28px">
            <FormLabel htmlFor="level-not-applicable-switch" fontSize="md" fontWeight={600} color="gray.600" mb="2px">
              Not applicable
            </FormLabel>
            <Switch
              id="level-not-applicable-switch"
              size="sm"
              isChecked={value === null}
              onChange={() => {
                if (value === null) onChange(sliderValue);
                else onChange(null);
              }}
            />
          </FormControl>
        </Flex>
      </Flex>
    </Field>
  );
};
