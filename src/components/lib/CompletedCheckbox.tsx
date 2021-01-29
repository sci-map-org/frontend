import { IconButton, IconButtonProps, IconProps, Tooltip } from '@chakra-ui/react';
import { IoIosCheckmarkCircle } from '@react-icons/all-files/io/IoIosCheckmarkCircle';
import { IoIosCheckmarkCircleOutline } from '@react-icons/all-files/io/IoIosCheckmarkCircleOutline';

const sizeMapping = {
  xs: { iconSize: 24 },
  sm: { iconSize: 34 },
  md: { iconSize: 46 },
  lg: { iconSize: 52 },
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
  uncheckedColor?: IconProps['color'];
}

export const CompletedCheckbox: React.FC<CompletedCheckboxProps> = ({
  size,
  onChange,
  isChecked,
  tooltipLabel,
  tooltipDelay,
  uncheckedColor = 'gray.300',
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
        minW={sizeMapping[size].iconSize + 'px'}
        variant="ghost"
        onClick={() => onChange(!isChecked)}
        color={isChecked ? 'main' : uncheckedColor}
        w={sizeMapping[size].iconSize + 'px'}
        h={sizeMapping[size].iconSize + 'px'}
        bgColor="transparent"
        _hover={{
          color: isChecked ? uncheckedColor : 'main',
        }}
        _selected={{}}
        _active={{}}
        _focus={{}}
        isRound
        icon={
          isChecked ? (
            <IoIosCheckmarkCircle size={sizeMapping[size].iconSize} />
          ) : (
            <IoIosCheckmarkCircleOutline size={sizeMapping[size].iconSize} />
          )
        }
      />
    </Tooltip>
  );
};
