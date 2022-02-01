import { AvatarGroup, Box, Flex, Text } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { HeartIcon } from '../lib/icons/HeartIcon';
import { UserAvatar, UserAvatarData } from '../users/UserAvatar';
import { UserAvatarGroup } from '../users/UserAvatarGroup';
import { LearningMaterialRecommendationsViewerDataFragment } from './LearningMaterialRecommendationsViewer.generated';

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
  }
  ${UserAvatarData}
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
      <Box position="relative" boxSize={sizesMapping[size].heartBoxSize}>
        <HeartIcon color="red.400" boxSize={sizesMapping[size].heartBoxSize} />
        <Text
          fontWeight={600}
          fontSize={sizesMapping[size].heartInnerText}
          color="gray.700"
          position="absolute"
          top="46%"
          left="50%"
          textAlign="center"
          transform="translate(-50%, -50%)"
        >
          {learningMaterial.recommendationsCount}
        </Text>
      </Box>
      {!!learningMaterial.recommendedBy?.length && (
        <Text color="gray.500" fontWeight={600} fontSize={sizesMapping[size].recommendedByFontSize} whiteSpace="nowrap">
          Recommended By
        </Text>
      )}
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
