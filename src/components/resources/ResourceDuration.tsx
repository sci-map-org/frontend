import {
  NumberInputStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Stack,
  Text,
  NumberInput,
  StackProps,
} from '@chakra-ui/core';

export const ResourceDurationMnSelector: React.FC<Omit<StackProps, 'onChange'> & {
  value?: number | null;
  onChange: (durationMn: number | null) => void;
}> = ({ value, onChange, ...stackProps }) => {
  return (
    <Stack direction="row" alignItems="center" {...stackProps}>
      <Text fontWeight={600}>Estimated Duration</Text>
      <NumberInput
        step={5}
        min={0}
        max={600}
        value={value || ''}
        onChange={(value: any) => {
          onChange(value === 0 ? null : value);
        }}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </Stack>
  );
};
