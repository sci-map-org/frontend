import ReactStars from 'react-rating-stars-component';
import gql from 'graphql-tag';
import { useRateResourceMutation } from './ResourceStarsRating.generated';
import { Box, Icon, Text } from '@chakra-ui/core';

export const ResourceStarsRating: React.FC<{ value?: number | null }> = ({ value }) => {
  return (
    <Box>
      <Icon name="star" />
      <Text>{value}</Text>
    </Box>
  );
};

export const rateResource = gql`
  mutation rateResource($resourceId: String!, $value: Float!) {
    rateResource(resourceId: $resourceId, value: $value) {
      _id
      rating
    }
  }
`;

export const ResourceStarsRatingSelector: React.FC<{ resourceId: string }> = ({ resourceId }) => {
  const [rateResourceMutation] = useRateResourceMutation();
  return (
    <ReactStars
      count={5}
      onChange={(rating: number) => rateResourceMutation({ variables: { resourceId, value: rating } })}
      size={24}
      activeColor="#ffd700"
      isHalf
    />
  );
};
