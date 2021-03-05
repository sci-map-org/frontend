import { StarIcon } from '@chakra-ui/icons';
import {
  Button,
  ButtonProps,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Skeleton,
  Stack,
  Text,
  UsePopoverProps,
} from '@chakra-ui/react';
import { useState } from 'react';
import ReactStars from 'react-rating-stars-component';

export const StarsRatingViewer: React.FC<{ value?: number | null; pxSize?: number; isLoading?: boolean }> = ({
  value,
  isLoading,
  pxSize = 18,
}) => {
  return value ? (
    <Skeleton isLoaded={!isLoading}>
      <Stack direction="row" spacing="2px" alignItems="baseline" px="2px">
        <StarIcon boxSize={`${pxSize + 1}px`} color="rgb(255, 215, 0)" />
        <Text fontSize={pxSize + 'px'} fontWeight={400} lineHeight={pxSize + 'px'}>
          {value}
          <Text as="span" fontSize={pxSize - 5 + 'px'} fontWeight={300}>
            /5
          </Text>
        </Text>
      </Stack>
    </Skeleton>
  ) : null;
};

export interface StarsRaterProps extends Omit<ButtonProps, 'onClick'> {
  onRating: (value: number) => Promise<void>;
  buttonText?: string;
  popoverPlacement?: UsePopoverProps['placement'];
}
export const StarsRater: React.FC<StarsRaterProps> = ({
  onRating,
  buttonText = 'Rate this',
  popoverPlacement = 'right',
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);

  return (
    <Popover isOpen={isOpen} size="starRater" onClose={close} returnFocusOnClose={false} placement={popoverPlacement}>
      <PopoverTrigger>
        <Button
          variant="outline"
          backgroundColor="white"
          aria-label="rate-this"
          size="sm"
          leftIcon={<StarIcon />}
          onClick={open}
          {...props}
        >
          {buttonText}
        </Button>
      </PopoverTrigger>
      <PopoverContent zIndex={4}>
        <PopoverArrow />
        <PopoverBody>
          <StarsRatingSelector
            onSelected={async (value) => {
              onRating(value);
              close();
            }}
          />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

const StarsRatingSelector: React.FC<{
  onSelected?: (selectedRating: number) => void;
}> = ({ onSelected }) => {
  return (
    <ReactStars
      count={5}
      onChange={async (rating: number) => {
        onSelected && onSelected(rating);
      }}
      size={24}
      activeColor="#ffd700"
      isHalf
    />
  );
};
