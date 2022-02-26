import { ButtonProps, Text, UsePopoverProps } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { useEffect, useState } from 'react';
import { StarsRater } from '../lib/StarsRating';
import {
  LearningMaterialStarsRaterDataFragment,
  useRateLearningMaterialMutation,
} from './LearningMaterialStarsRating.generated';

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

export const rateLearningMaterial = gql`
  mutation rateLearningMaterial($learningMaterialId: String!, $value: Float!) {
    rateLearningMaterial(learningMaterialId: $learningMaterialId, value: $value) {
      _id
      rating
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
  const [rateLearningMaterialMutation] = useRateLearningMaterialMutation();

  const [showRater, setShowRater] = useState(shouldShowRater(learningMaterial));
  useEffect(() => {
    const shouldShow = shouldShowRater(learningMaterial);
    if (showRater !== shouldShow) setShowRater(shouldShow);
  }, [learningMaterial]);

  if (!showRater) return null;
  return (
    <StarsRater
      onRating={async (value) => {
        await rateLearningMaterialMutation({ variables: { learningMaterialId: learningMaterial._id, value } });
      }}
      buttonText={buttonText}
      popoverPlacement={popoverPlacement}
      {...props}
    />
  );
};
