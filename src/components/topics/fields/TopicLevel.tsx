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

export enum TopicLevelValue {
  Beginner = 'beginner',
  Intermediate = 'intermediate',
  Advanced = 'advanced',
  Expert = 'expert',
}

export const topicLevelColorMap = interpolate([
  theme.colors.green[400],
  theme.colors.yellow[400],
  theme.colors.orange[400],
  theme.colors.red[400],
]);

const sizesMapping = {
  sm: {
    fontWeight: 800,
    borderWidth: '2px',
    px: '3px',
    py: 0,
    borderRadius: '2px',
    fontSize: '11px',
    lineHeight: '13px',
  },
  md: {
    fontWeight: 800,
    borderWidth: 2,
    px: '4px',
    borderRadius: 2,
    fontSize: '14px',
    lineHeight: '1.3em',
  },
};
interface TopicLevelViewerProps {
  level?: number;
  topicId?: string;
  showNotApplicable?: boolean;
  size?: 'sm' | 'md';
}

export const TopicLevelViewer: React.FC<TopicLevelViewerProps> = ({
  level,
  topicId,
  showNotApplicable,
  size = 'md',
}) => {
  const value = useMemo(() => {
    if (level === undefined) return null;
    if (level >= 0 && level <= 25) return TopicLevelValue.Beginner;
    if (level <= 50) return TopicLevelValue.Intermediate;
    if (level <= 75) return TopicLevelValue.Advanced;
    if (level <= 100) return TopicLevelValue.Expert;
    throw new Error(`Invalid topic level value: ${level} for topic ${topicId}`);
  }, [level]);

  if (level === undefined || !value)
    return showNotApplicable ? (
      <Text fontSize="md" fontWeight={600} color="gray.500" mb="2px">
        Not applicable
      </Text>
    ) : null;

  return (
    <Text color={topicLevelColorMap(level / 100)} borderColor={topicLevelColorMap(level / 100)} {...sizesMapping[size]}>
      {value.toLocaleUpperCase()}
    </Text>
  );
};

export const TOPIC_LEVEL_DEFAULT_VALUE = 35;

export const TopicLevelEditor: React.FC<{
  value: number | null;
  onChange: (value: number | null) => void;
  w?: FlexProps['w'];
}> = ({ value, onChange, w }) => {
  const [sliderValue, setSliderValue] = useState<number>(value || TOPIC_LEVEL_DEFAULT_VALUE);

  return (
    <Flex direction="column" alignItems="stretch" w={w}>
      <Slider
        defaultValue={value || undefined}
        value={sliderValue}
        min={0}
        max={100}
        aria-label="level"
        onChange={(val) => {
          setSliderValue(val);
          onChange(val);
        }}
        isDisabled={value === null}
        position="relative"
      >
        {value !== null && (
          <Text position="absolute" fontSize="10px" fontWeight={400} color="gray.400" right={0} top={-3}>
            {value}/100
          </Text>
        )}
        <SliderTrack>
          <SliderFilledTrack bgColor={value !== null ? topicLevelColorMap(value / 100) : 'gray.500'} />
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
  );
};
