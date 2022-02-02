import { Flex, Text } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { UserAvatarData } from '../users/UserAvatar';
import { UserAvatarGroup } from '../users/UserAvatarGroup';
import { LearningMaterialRecommendationsViewerDataFragment } from './LearningMaterialRecommendationsViewer.generated';
import { LearningMaterialRecommendButton } from './LearningMaterialRecommendButton';

export const LearningMaterialRecommendationsViewerData = gql`
  fragment LearningMaterialRecommendationsViewerData on LearningMaterial {
    _id
    recommendationsCount
    recommendedBy(limit: 500) {
      user {
        ...UserAvatarData
      }
      recommendedAt
    }
    recommended {
      recommendedAt
    }
  }
  ${UserAvatarData}
`;

export const recommendLearningMaterial = gql`
  mutation recommendLearningMaterial($learningMaterialId: String!) {
    recommendLearningMaterial(learningMaterialId: $learningMaterialId) {
      _id
      ...LearningMaterialRecommendationsViewerData
    }
  }
  ${LearningMaterialRecommendationsViewerData}
`;

const sizesMapping = {
  sm: {
    heartBoxSize: 10,
    heartInnerText: '12px',
    recommendedByFontSize: '14px',
  },
  md: {
    heartBoxSize: 12,
    heartInnerText: '14px',
    recommendedByFontSize: 'md',
  },
};

// TODO: don't load all recommendations, only count
export const LearningMaterialRecommendationsViewer: React.FC<{
  learningMaterial: LearningMaterialRecommendationsViewerDataFragment;
  isLoading: boolean;
  size?: 'md' | 'sm';
}> = ({ learningMaterial, isLoading, size = 'md' }) => {
  if (typeof learningMaterial.recommendationsCount !== 'number' && !isLoading)
    throw new Error('learningMaterial.recommendationsCount should not be null');
  return (
    <Flex direction="column" alignItems="center" p={1}>
      <LearningMaterialRecommendButton
        learningMaterialId={learningMaterial._id}
        isRecommended={!!learningMaterial.recommended}
        recommendationsTotalCount={
          typeof learningMaterial.recommendationsCount === 'number' ? learningMaterial.recommendationsCount : undefined
        }
        size={size}
      />
      <Text
        color="gray.500"
        fontWeight={600}
        fontSize={sizesMapping[size].recommendedByFontSize}
        textAlign="center"
        // whiteSpace="nowrap"
      >
        {!!learningMaterial.recommendedBy?.length ? 'Recommended By' : 'No recommendations'}
      </Text>
      {!!learningMaterial.recommendedBy?.length && (
        <UserAvatarGroup
          users={learningMaterial.recommendedBy.map(({ user }) => user)}
          popoverTitle="Recommended By"
          size={size}
        />
      )}
    </Flex>
  );
};
