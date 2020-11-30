import { EditIcon, QuestionIcon } from '@chakra-ui/icons';
import {
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  Skeleton,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import humanizeDuration from 'humanize-duration';
import React, { useCallback, useEffect, useRef, useState } from 'react';

export const DurationViewer: React.FC<{ value?: number | null }> = ({ value }) => {
  return value ? (
    <Text fontSize="sm" color="gray.400" mb={0}>
      {humanizeDuration(value * 1000, { largest: 2 })}
    </Text>
  ) : null;
};

export const DurationInput: React.FC<
  {
    value?: number | null;
    onChange: (durationSeconds: number | null) => void;
    autoFocus?: boolean;
  } & Omit<InputProps, 'value' | 'onChange'>
> = ({ value, onChange, autoFocus, size, w, ...inputProps }) => {
  const [duration, setDuration] = useState(convertFromValue(value, 's'));
  const [isValid, setIsValid] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);
  let inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const { current } = inputRef;
    // autoFocus
    if (current) current.focus();
  }, []);
  useEffect(() => {
    setShowTooltip(!isValid);
  }, [isValid]);

  useEffect(() => {
    if (value) {
      const newDuration = convertFromValue(value, 's');
      if (newDuration !== duration) setDuration(newDuration);
    }
  }, [value]);

  useEffect(() => {
    const newValue = convertDurationToValue(duration);
    setIsValid(newValue === null || !isNaN(newValue));
  }, [duration]);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setDuration(e.target.value);

  const onBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>) => {
      const newValue = convertDurationToValue(e.currentTarget.value);

      if (newValue === null || !isNaN(newValue)) {
        onChange(newValue);
      } else {
        setDuration(convertFromValue(value, 's'));
      }
    },
    [onChange, value]
  );

  return (
    <InputGroup size={size} w={w}>
      <Input
        ref={inputRef}
        isInvalid={!isValid}
        id="duration"
        placeholder="1h 30m"
        onKeyPress={(e) => {
          if (e.key === 'Enter') onBlur(e);
        }}
        value={duration}
        onChange={onInputChange}
        onBlur={onBlur}
        {...inputProps}
      />

      <InputRightElement>
        <Tooltip
          isOpen={showTooltip}
          hasArrow
          aria-label="format: #w #d #h #m #s"
          label="Please use the following format: #w #d #h #m #s"
          placement="top"
          {...(!isValid && { bg: 'red.500' })}
          onOpen={() => setShowTooltip(true)}
          onClose={() => setShowTooltip(false)}
        >
          <QuestionIcon color={isValid ? 'grey.700' : 'red.500'} />
        </Tooltip>
      </InputRightElement>
    </InputGroup>
  );
};
export const SCALE_CONVERSIONS = {
  s: 1,
  m: 60,
  h: 3600,
  d: 86400,
  w: 86400 * 7,
};

type ScaleDuration = keyof typeof SCALE_CONVERSIONS;

export function convertValueFromScale(value: number, scale: ScaleDuration) {
  return value * (SCALE_CONVERSIONS[scale] || 1);
}

export function convertValueToScale(value: number | null, scale: ScaleDuration) {
  if (!value) return value;
  return value / (SCALE_CONVERSIONS[scale] || 1);
}

export function convertValueToDuration(value?: number): string {
  if (value === undefined) return '';
  // const milliseconds = Math.round(value % 1000);
  const seconds = Math.floor(value % 60);
  const minutes = Math.floor((value / 60) % 60);
  const hours = Math.floor((value / 3600) % 24);
  const days = Math.floor((value / 86400) % 7);
  const weeks = Math.floor(value / (86400 * 7));
  return [
    weeks && `${weeks}w`,
    days && `${days}d`,
    hours && `${hours}h`,
    (minutes || value === 0) && `${minutes}m`,
    seconds && `${seconds}s`,
  ]
    .filter((x) => !!x)
    .join(' ');
}

const regexp = /^(\d+w)?\s*(\d+d)?\s*(\d+h)?\s*(\d+m)?\s*(\d+s)?\s*(\d+ms)?$/i;
export function convertDurationToValue(duration: string): number | null {
  if (!duration.length) return null;
  const valid = regexp.test(duration.trim());
  if (!valid) return NaN;
  const matches = duration.trim().match(regexp);
  if (!matches) return parseFloat(duration);
  const [weeks, days, hours, minutes, seconds] = matches.slice(1).map((x) => parseInt(x) || 0);
  return (((weeks * 7 + days) * 24 + hours) * 60 + minutes) * 60 + seconds;
}

export const convertFromValue = (value: number | null | undefined, scale: keyof typeof SCALE_CONVERSIONS) => {
  if (!value) return '';
  return convertValueToDuration(convertValueFromScale(value, scale));
};

export const convertToValue = (duration: string, scale: ScaleDuration) =>
  convertValueToScale(convertDurationToValue(duration), scale);

interface EditableDurationProps {
  defaultValue?: number | null;
  isDisabled?: boolean;
  onSubmit: (durationSeconds: number | null) => void;
  placeholder?: string;
  isLoading?: boolean;
}
export const EditableDuration: React.FC<EditableDurationProps> = ({
  placeholder,
  defaultValue,
  onSubmit,
  isDisabled,
  isLoading,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <Skeleton isLoaded={!isLoading}>
      <Flex direction="row" alignItems="center">
        {isEditing && !isDisabled ? (
          <DurationInput
            value={defaultValue}
            onChange={(d) => {
              setIsEditing(false);
              onSubmit(d);
            }}
            size="sm"
            w="120px"
            autoFocus
          />
        ) : (
          <>
            <DurationViewer value={defaultValue} />
            {!defaultValue && placeholder && !isDisabled && (
              <Text fontSize="sm" color="gray.400" mb={1} pr={1}>
                {placeholder}
              </Text>
            )}
            {!isDisabled && (
              <IconButton
                aria-label="t"
                icon={<EditIcon />}
                onClick={() => setIsEditing(true)}
                size="xs"
                color="gray.600"
                variant="ghost"
                alignSelf="end"
              />
            )}
          </>
        )}
      </Flex>
    </Skeleton>
  );
};

export const DurationFormField: React.FC<{
  value?: number | null;
  onChange: (durationSeconds: number | null) => void;
}> = ({ value, onChange }) => {
  return (
    <FormControl display="flex" alignItems="baseline">
      <FormLabel htmlFor="duration" whiteSpace="nowrap">
        Estimated Duration
      </FormLabel>
      <DurationInput w="200px" value={value} onChange={onChange} />
    </FormControl>
  );
};
