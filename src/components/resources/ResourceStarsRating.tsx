import {
  Button,
  Icon,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
} from '@chakra-ui/core';
import gql from 'graphql-tag';
import { useState } from 'react';
import ReactStars from 'react-rating-stars-component';
import { useRateResourceMutation } from './ResourceStarsRating.generated';

export const ResourceStarsRating: React.FC<{ value?: number | null; pxSize?: number }> = ({ value, pxSize = 18 }) => {
  return value ? (
    <Stack direction="row" spacing="2px" alignItems="baseline" px="2px">
      <Icon name="star" size={`${pxSize + 1}px`} color="rgb(255, 215, 0)" />
      <Text fontSize={pxSize + 'px'} fontWeight={400}>
        {value}
        <Text as="span" fontSize={pxSize - 5 + 'px'} fontWeight={300}>
          /10
        </Text>
      </Text>
    </Stack>
  ) : null;
};

export const rateResource = gql`
  mutation rateResource($resourceId: String!, $value: Float!) {
    rateResource(resourceId: $resourceId, value: $value) {
      _id
      rating
    }
  }
`;

/**
 * TODO: show user's own rating on button, show star as yellow then
 */
export const ResourceStarsRater: React.FC<{ resourceId: string }> = ({ resourceId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);
  return (
    <Popover isOpen={isOpen} onClose={close} returnFocusOnClose={false}>
      <PopoverTrigger>
        <Button variant="outline" aria-label="rate-this" size="sm" leftIcon="star" onClick={open}>
          Rate this
        </Button>
      </PopoverTrigger>
      <PopoverContent zIndex={4} placement="right">
        <PopoverArrow />
        <PopoverBody>
          <ResourceStarsRatingSelector resourceId={resourceId} onSelected={() => close()} />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export const ResourceStarsRatingSelector: React.FC<{
  resourceId: string;
  onSelected?: (selectedRating: number) => void;
}> = ({ resourceId, onSelected }) => {
  const [rateResourceMutation] = useRateResourceMutation();
  return (
    <ReactStars
      count={10}
      onChange={async (rating: number) => {
        await rateResourceMutation({ variables: { resourceId, value: rating } });
        onSelected && onSelected(rating);
      }}
      size={24}
      activeColor="#ffd700"
      isHalf
    />
  );
};