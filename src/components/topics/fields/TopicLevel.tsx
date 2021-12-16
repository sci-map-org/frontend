import {
  Box,
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
import interpolate from 'color-interpolate';
import { useMemo, useState } from 'react';
import { theme } from '../../../theme/theme';
import { Field } from '../../lib/Field';

export enum TopicLevelValue {
  Beginner = 'beginner',
  Intermediate = 'intermediate',
  Advanced = 'advanced',
  Expert = 'expert',
}

const colorMap = interpolate([
  theme.colors.green[400],
  theme.colors.yellow[400],
  theme.colors.orange[400],
  theme.colors.red[400],
]);

interface TopicLevelViewerProps {
  level?: number;
  topicId?: string;
}

export const TopicLevelViewer: React.FC<TopicLevelViewerProps> = ({ level, topicId }) => {
  const value = useMemo(() => {
    if (level === undefined) return null;
    if (level >= 0 && level <= 25) return TopicLevelValue.Beginner;
    if (level <= 50) return TopicLevelValue.Intermediate;
    if (level <= 75) return TopicLevelValue.Advanced;
    if (level <= 100) return TopicLevelValue.Expert;
    throw new Error(`Invalid topic level value: ${level} for topic ${topicId}`);
  }, [level]);

  if (level === undefined || !value) return null;

  return (
    <Text
      color={colorMap(level / 100)}
      borderColor={colorMap(level / 100)}
      fontWeight={800}
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
