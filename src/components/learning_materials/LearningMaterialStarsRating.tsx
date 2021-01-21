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
import gql from 'graphql-tag';
import { useEffect, useState } from 'react';
import ReactStars from 'react-rating-stars-component';
import {
  LearningMaterialStarsRaterDataFragment,
  useRateLearningMaterialMutation,
} from './LearningMaterialStarsRating.generated';

export const StarsRatingViewer: React.FC<{ value?: number | null; pxSize?: number; isLoading?: boolean }> = ({
  value,
  isLoading,
  pxSize = 18,
}) => {
  return value ? (
    <Skeleton isLoaded={!isLoading}>
      <Stack direction="row" spacing="2px" alignItems="baseline" px="2px">
        <StarIcon boxSize={`${pxSize + 1}px`} color="rgb(255, 215, 0)" />
        <Text fontSize={pxSize + 'px'} fontWeight={400}>
          {value}
          <Text as="span" fontSize={pxSize - 5 + 'px'} fontWeight={300}>
            /5
          </Text>
        </Text>
      </Stack>
    </Skeleton>
  ) : null;
};

export const LearningMaterialStarsRaterData = gql`
  fragment LearningMaterialStarsRaterData on LearningMaterial {
    _id
    ... on Resource {
      consumed {
        consumedAt
        openedAt
      }
    }
    ... on LearningPath {
      started {
        startedAt
        completedAt
      }
    }
  }
`;

const shouldShowRater = (learningMaterial: LearningMaterialStarsRaterDataFragment): boolean => {
  return (
    (learningMaterial.__typename === 'Resource' && !!learningMaterial.consumed?.consumedAt) ||
    (learningMaterial.__typename === 'LearningPath' && !!learningMaterial.started?.completedAt)
  );
};
/**
 * TODO: show user's own rating on button, show star as yellow then
 */
export const LearningMaterialStarsRater: React.FC<
  {
    learningMaterial: LearningMaterialStarsRaterDataFragment;
    buttonText?: string;
    popoverPlacement?: UsePopoverProps['placement'];
  } & Omit<ButtonProps, 'onClick'>
> = ({ learningMaterial, buttonText = 'Rate this', popoverPlacement = 'right', ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);

  const [showRater, setShowRater] = useState(shouldShowRater(learningMaterial));
  useEffect(() => {
    const shouldShow = shouldShowRater(learningMaterial);
    if (showRater !== shouldShow) setShowRater(shouldShow);
  }, [learningMaterial]);
  if (!showRater) return null;
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
          <LearningMaterialStarsRatingSelector learningMaterialId={learningMaterial._id} onSelected={() => close()} />
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
