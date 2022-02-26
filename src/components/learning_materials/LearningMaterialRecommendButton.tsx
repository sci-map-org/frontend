import { BoxProps } from '@chakra-ui/react';
import { forwardRef } from 'react';
import { useCurrentUser } from '../../graphql/users/users.hooks';
import { useUnauthentificatedModal } from '../auth/UnauthentificatedModal';
import {
  LearningMaterialRecommendationsCountHeart,
  LearningMaterialRecommendationsCountHeartProps,
} from './LearningMaterialRecommendationsCountHeart';
import { useRecommendLearningMaterialMutation } from './LearningMaterialRecommendationsViewer.generated';

const isRecommendedColor = 'red.400';
const neutralHeartColor = 'gray.700';
const disabledHeartColor = 'gray.300';

export const LearningMaterialRecommendButton = forwardRef<
  HTMLDivElement,
  {
    learningMaterialId: string;
    isRecommended: boolean;
    recommendationsTotalCount?: number;
    size?: LearningMaterialRecommendationsCountHeartProps['size'];
    isDisabled?: boolean;
    isLoading?: boolean;
  } & Omit<BoxProps, 'onClick'>
>(
  (
    { learningMaterialId, isRecommended, recommendationsTotalCount, size = 'md', isDisabled, isLoading, ...props },
    ref
  ) => {
    const [recommendLearningMaterialMutation] = useRecommendLearningMaterialMutation({
      variables: {
        learningMaterialId: learningMaterialId,
      },
    });
    const { currentUser } = useCurrentUser();
    const { onOpen: onOpenUnauthentificatedModal } = useUnauthentificatedModal();

    return (
      <LearningMaterialRecommendationsCountHeart
        recommendationsCount={recommendationsTotalCount}
        heartColor={isDisabled ? disabledHeartColor : isRecommended ? isRecommendedColor : neutralHeartColor}
        {...(!isDisabled && {
          hoverHeartColor: isRecommended ? neutralHeartColor : isRecommendedColor,
        })}
        countColor={isDisabled ? disabledHeartColor : 'gray.700'}
        size={size}
        isLoading={isLoading}
        onClick={() => {
          if (!isDisabled) {
            if (!currentUser) onOpenUnauthentificatedModal();
            else recommendLearningMaterialMutation();
          }
        }}
        {...(isDisabled && { cursor: 'not-allowed' })}
        {...props}
      />
    );
  }
);
