import { FormControl, FormLabel, Input, InputGroup, InputRightElement, Stack, Text, Tooltip } from '@chakra-ui/core';
import { QuestionIcon } from '@chakra-ui/icons';
import humanizeDuration from 'humanize-duration';
import React, { useCallback, useEffect, useState } from 'react';

export const ResourceDuration: React.FC<{ value?: number | null }> = ({ value }) => {
  return value ? (
    <Text fontSize="sm" color="gray.400" mb={1} pr={1}>
      {humanizeDuration(value, { largest: 2 })}
    </Text>
  ) : null;
};

export const ResourceDurationSelector: React.FC<{
  value?: number | null;
  onChange: (durationMs: number | null) => void;
}> = ({ value, onChange }) => {
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
    (e: React.FocusEvent<HTMLInputElement>) => {
      const newValue = convertDurationToValue(e.target.value);

      if (newValue === null || !isNaN(newValue)) {
        onChange(newValue);
      } else {
        setDuration(convertFromValue(value, 'ms'));
      }
    },
    [onChange, value]
  );

  return (
    <FormControl display="flex" alignItems="baseline" isInvalid={!isValid}>
      <FormLabel htmlFor="resource_duration" whiteSpace="nowrap">
        Estimated Duration
      </FormLabel>
      <Stack direction="column">
        <InputGroup size="md">
          <Input
            id="resource_duration"
            placeholder="1h 30m"
            value={duration}
            onChange={onInputChange}
            onBlur={onBlur}
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
      </Stack>
    </FormControl>
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
