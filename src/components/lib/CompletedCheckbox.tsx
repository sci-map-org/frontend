import { IconButton, Tooltip, IconButtonProps } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';

const sizeMapping = {
  sm: 4,
  md: 5,
  lg: 6,
};

export interface CompletedCheckboxProps
  extends Omit<
    IconButtonProps,
    | 'size'
    | 'onChange'
    | 'icon'
    | 'isRound'
    | 'h'
    | 'minW'
    | 'variant'
    | 'onClick'
    | 'color'
    | 'backgroundColor'
    | 'aria-label'
  > {
  size: keyof typeof sizeMapping;
  isChecked: boolean;
  onChange: (completedValue: boolean) => void;
  tooltipLabel?: string;
  tooltipDelay?: number;
}

export const CompletedCheckbox: React.FC<CompletedCheckboxProps> = ({
  size,
  onChange,
  isChecked,
  tooltipLabel,
  tooltipDelay,
  ...iconButtonProps
}) => {
  return (
    <Tooltip
      isDisabled={!tooltipLabel}
      openDelay={tooltipDelay}
      aria-label={tooltipLabel}
      label={tooltipLabel}
      placement="top"
    >
      <IconButton
        {...iconButtonProps}
        aria-label="mark as completed"
        h={sizeMapping[size]}
        minW={sizeMapping[size]}
        variant="ghost"
        onClick={() => onChange(!isChecked)}
        color={isChecked ? 'main' : 'white'}
        backgroundColor={isChecked ? 'white' : 'gray.300'}
        _hover={{
          backgroundColor: isChecked ? 'white' : 'main',
          color: isChecked ? 'gray.300' : 'white',
        }}
        _selected={{}}
        _active={{}}
        _focus={{}}
        isRound
        icon={<CheckCircleIcon boxSize={isChecked ? sizeMapping[size] : sizeMapping[size] - 1} />}
      />
    </Tooltip>
  );
};
