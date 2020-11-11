import {
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  Stack,
  Text,
  Tooltip,
} from '@chakra-ui/core';
import { EditIcon, QuestionIcon } from '@chakra-ui/icons';
import humanizeDuration from 'humanize-duration';
import React, { useCallback, useEffect, useState } from 'react';

export const DurationViewer: React.FC<{ value?: number | null }> = ({ value }) => {
  return value ? (
    <Text fontSize="sm" color="gray.400" mb={1} pr={1}>
      {humanizeDuration(value, { largest: 2 })}
    </Text>
  ) : null;
};

export const DurationInput: React.FC<
  {
    value?: number | null;
    onChange: (durationMs: number | null) => void;
  } & Omit<InputProps, 'value' | 'onChange'>
> = ({ value, onChange, size, w, ...inputProps }) => {
  const [duration, setDuration] = useState(convertFromValue(value, 'ms'));
  const [isValid, setIsValid] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    setShowTooltip(!isValid);
  }, [isValid]);

  useEffect(() => {
    if (value) {
      const newDuration = convertFromValue(value, 'ms');
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
        setDuration(convertFromValue(value, 'ms'));
      }
    },
    [onChange, value]
  );

  return (
    <InputGroup size={size} w={w}>
      <Input
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
  ms: 1,
  s: 1000,
  m: 60000,
  h: 3600000,
  d: 86400000,
  w: 86400000 * 7,
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
  const milliseconds = Math.round(value % 1000);
  const seconds = Math.floor((value / 1000) % 60);
  const minutes = Math.floor((value / 60000) % 60);
  const hours = Math.floor((value / 3600000) % 24);
  const days = Math.floor((value / 86400000) % 7);
  const weeks = Math.floor(value / (86400000 * 7));
  return [
    weeks && `${weeks}w`,
    days && `${days}d`,
    hours && `${hours}h`,
    (minutes || value === 0) && `${minutes}m`,
    seconds && `${seconds}s`,
    milliseconds && `${milliseconds}ms`,
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
  const [weeks, days, hours, minutes, seconds, milliseconds] = matches.slice(1).map((x) => parseInt(x) || 0);
  return ((((weeks * 7 + days) * 24 + hours) * 60 + minutes) * 60 + seconds) * 1000 + milliseconds;
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
  onSubmit: (durationMs: number | null) => void;
}
export const EditableDuration: React.FC<EditableDurationProps> = ({ defaultValue, onSubmit }) => {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <Flex>
      {isEditing ? (
        <DurationInput
          value={defaultValue}
          onChange={(d) => {
            setIsEditing(false);
            onSubmit(d);
          }}
          size="sm"
          w="120px"
        />
      ) : (
        <>
          <DurationViewer value={defaultValue} />
          <IconButton
            aria-label="t"
            icon={<EditIcon />}
            onClick={() => setIsEditing(true)}
            size="xs"
            color="gray.600"
            variant="ghost"
            alignSelf="end"
          />
        </>
      )}
    </Flex>
  );
};

export const DurationFormField: React.FC<{
  value?: number | null;
  onChange: (durationMs: number | null) => void;
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
