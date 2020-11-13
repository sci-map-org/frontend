import {
  Button,
  ButtonProps,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
} from '@chakra-ui/core';
import { StarIcon } from '@chakra-ui/icons';
import gql from 'graphql-tag';
import { useState } from 'react';
import ReactStars from 'react-rating-stars-component';
import { useRateLearningMaterialMutation } from './LearningMaterialStarsRating.generated';

export const StarsRatingViewer: React.FC<{ value?: number | null; pxSize?: number }> = ({ value, pxSize = 18 }) => {
  return value ? (
    <Stack direction="row" spacing="2px" alignItems="baseline" px="2px">
      <StarIcon boxSize={`${pxSize + 1}px`} color="rgb(255, 215, 0)" />
      <Text fontSize={pxSize + 'px'} fontWeight={400}>
        {value}
        <Text as="span" fontSize={pxSize - 5 + 'px'} fontWeight={300}>
          /5
        </Text>
      </Text>
    </Stack>
  ) : null;
};

/**
 * TODO: show user's own rating on button, show star as yellow then
 */
export const LearningMaterialStarsRater: React.FC<{ learningMaterialId: string } & Omit<ButtonProps, 'onClick'>> = ({
  learningMaterialId,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);
  return (
    <Popover isOpen={isOpen} onClose={close} returnFocus={false} placement="right" isLazy>
      <PopoverTrigger>
        <Button variant="outline" aria-label="rate-this" size="sm" leftIcon={<StarIcon />} onClick={open} {...props}>
          Rate this
        </Button>
      </PopoverTrigger>
      <PopoverContent w="146px" zIndex={4}>
        <PopoverArrow />
        <PopoverBody>
          <LearningMaterialStarsRatingSelector learningMaterialId={learningMaterialId} onSelected={() => close()} />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export const rateLearningMaterial = gql`
  mutation rateLearningMaterial($learningMaterialId: String!, $value: Float!) {
    rateLearningMaterial(learningMaterialId: $learningMaterialId, value: $value) {
      _id
      rating
    }
  }
`;

export const LearningMaterialStarsRatingSelector: React.FC<{
  learningMaterialId: string;
  onSelected?: (selectedRating: number) => void;
}> = ({ learningMaterialId, onSelected }) => {
  const [rateLearningMaterialMutation] = useRateLearningMaterialMutation();
  return (
    <ReactStars
      count={5}
      onChange={async (rating: number) => {
        await rateLearningMaterialMutation({ variables: { learningMaterialId, value: rating } });
        onSelected && onSelected(rating);
      }}
      size={24}
      activeColor="#ffd700"
      isHalf
    />
  );
};
