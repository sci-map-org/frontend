import { Box, Flex, Text } from '@chakra-ui/react';
import { forwardRef } from 'react';
import { HeartIcon } from '../lib/icons/HeartIcon';
import { useRecommendLearningMaterialMutation } from './LearningMaterialRecommendationsViewer.generated';

const sizesMapping = {
  xs: {
    heartBoxSize: 6,
    heartInnerText: '8px',
  },
  sm: {
    heartBoxSize: '44px',
    heartInnerText: '13px',
  },
  md: {
    heartBoxSize: 12,
    heartInnerText: '14px',
  },
};

const isRecommendedColor = 'red.400';
const neutralHeartColor = 'gray.700';
const disabledHeartColor = 'gray.300';

export const LearningMaterialRecommendButton = forwardRef<
  HTMLDivElement,
  {
    learningMaterialId: string;
    isRecommended: boolean;
    recommendationsTotalCount?: number;
    size?: 'xs' | 'sm' | 'md';
    isDisabled?: boolean;
  }
>(({ learningMaterialId, isRecommended, recommendationsTotalCount, size = 'md', isDisabled }, ref) => {
  const [recommendLearningMaterialMutation] = useRecommendLearningMaterialMutation({
    variables: {
      learningMaterialId: learningMaterialId,
    },
  });
  return (
    <Box
      as="button"
      // weird TS ref issue when using as="button"
      // @ts-ignore
      ref={ref}
      position="relative"
      boxSize={sizesMapping[size].heartBoxSize}
      color={isDisabled ? disabledHeartColor : isRecommended ? isRecommendedColor : neutralHeartColor}
      transition="color ease-in 0.2s"
      {...(!isDisabled &&
        !isRecommended && {
          _hover: {
            color: isRecommendedColor,
          },
        })}
      {...(isDisabled
        ? { cursor: 'not-allowed' }
        : {
            onClick: () => recommendLearningMaterialMutation(),
          })}
    >
      <HeartIcon boxSize={sizesMapping[size].heartBoxSize} />
      {typeof recommendationsTotalCount === 'number' && (
        <Text
          fontWeight={600}
          fontSize={sizesMapping[size].heartInnerText}
          color={neutralHeartColor}
          position="absolute"
          top="46%"
          left="50%"
          textAlign="center"
          transform="translate(-50%, -50%)"
        >
          {recommendationsTotalCount}
        </Text>
      )}
    </Box>
  );
});
