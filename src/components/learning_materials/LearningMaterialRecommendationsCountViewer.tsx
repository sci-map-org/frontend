import { BoxProps, Tooltip } from '@chakra-ui/react';
import {
  LearningMaterialRecommendationsCountHeart,
  LearningMaterialRecommendationsCountHeartProps,
} from './LearningMaterialRecommendationsCountHeart';

export const LearningMaterialRecommendationsCountViewer: React.FC<
  {
    recommendationsTotalCount: number;
    size?: LearningMaterialRecommendationsCountHeartProps['size'];
    isLoading?: boolean;
  } & BoxProps
> = ({ recommendationsTotalCount, size, isLoading }) => {
  return (
    <Tooltip label={`${recommendationsTotalCount} recommendation${recommendationsTotalCount === 1 ? '' : 's'}`}>
      <LearningMaterialRecommendationsCountHeart
        recommendationsCount={recommendationsTotalCount}
        heartColor="red.400"
        countColor="gray.700"
        size={size}
        isLoading={isLoading}
      />
    </Tooltip>
  );
};
