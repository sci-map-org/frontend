import { Center, Flex, Text } from '@chakra-ui/react';
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

const sizesMapping: {
  [key in 'sm' | 'md']: {
    recommendedByFontSize: string;
  };
} = {
  sm: {
    recommendedByFontSize: '14px',
  },
  md: {
    recommendedByFontSize: 'md',
  },
};

// TODO: don't load all recommendations, only count
export const LearningMaterialRecommendationsViewer: React.FC<{
  learningMaterial: LearningMaterialRecommendationsViewerDataFragment;
  isLoading: boolean;
  display?: 'vertical' | 'horizontal';
  size?: 'md' | 'sm';
}> = ({ learningMaterial, isLoading, display = 'vertical', size = 'md' }) => {
  if (typeof learningMaterial.recommendationsCount !== 'number' && !isLoading)
    throw new Error('learningMaterial.recommendationsCount should not be null');
  return (
    <Flex
      direction={display === 'vertical' ? 'column' : 'row'}
      alignItems="stretch"
      p={1}
      {...(display === 'horizontal' && { spacing: 1 })}
    >
      <Center>
        <LearningMaterialRecommendButton
          learningMaterialId={learningMaterial._id}
          isRecommended={!!learningMaterial.recommended}
          recommendationsTotalCount={
            typeof learningMaterial.recommendationsCount === 'number'
              ? learningMaterial.recommendationsCount
              : undefined
          }
          size={size}
        />
      </Center>
      <Flex
        direction="column"
        justifyContent="center"
        alignItems={display === 'vertical' ? 'center' : 'flex-start'}
        {...(display === 'horizontal' && { ml: 1 })}
      >
        <Text
          color="gray.500"
          fontWeight={600}
          fontSize={sizesMapping[size].recommendedByFontSize}
          textAlign="center"
          {...(display === 'horizontal' && { whiteSpace: 'nowrap' })}
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
    </Flex>
  );
};
