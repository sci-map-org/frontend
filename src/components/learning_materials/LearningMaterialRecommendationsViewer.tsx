import { Center, Flex, FlexProps, Skeleton, SkeletonCircle, Text } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { SocialWidgetsLabelStyleProps } from '../lib/Typography';
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

// TODO: don't load all recommendations, only count
export const LearningMaterialRecommendationsViewer: React.FC<
  {
    learningMaterial: LearningMaterialRecommendationsViewerDataFragment;
    isLoading: boolean;
    display?: 'vertical' | 'horizontal';
    size?: 'md' | 'sm' | 'lg';
  } & FlexProps
> = ({ learningMaterial, isLoading, display = 'vertical', size = 'md', ...props }) => {
  if (typeof learningMaterial.recommendationsCount !== 'number' && !isLoading)
    throw new Error('learningMaterial.recommendationsCount should not be null');
  return (
    <Flex
      direction={display === 'vertical' ? 'column' : 'row'}
      alignItems="stretch"
      {...(display === 'horizontal' && { spacing: 1 })}
      {...props}
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
          isLoading={isLoading}
          size={size}
        />
      </Center>
      <Flex
        direction="column"
        justifyContent="center"
        alignItems={display === 'vertical' ? 'center' : 'flex-start'}
        {...(display === 'horizontal' && { ml: 1 })}
      >
        <Skeleton isLoaded={!isLoading}>
          <Text
            {...SocialWidgetsLabelStyleProps(size)}
            textAlign="center"
            {...(display === 'horizontal' && { whiteSpace: 'nowrap' })}
          >
            {!!learningMaterial.recommendedBy?.length ? 'Recommended By' : 'No recommendations'}
          </Text>
        </Skeleton>
        {!!learningMaterial.recommendedBy?.length && (
          <Skeleton isLoaded={!isLoading}>
            <UserAvatarGroup
              users={learningMaterial.recommendedBy.map(({ user }) => user)}
              popoverTitle="Recommended By"
              size={size}
            />
          </Skeleton>
        )}
      </Flex>
    </Flex>
  );
};
