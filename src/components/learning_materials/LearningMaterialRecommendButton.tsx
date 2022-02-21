import { Box, BoxProps, ButtonProps, SkeletonCircle, Text } from '@chakra-ui/react';
import { forwardRef } from 'react';
import { useCurrentUser } from '../../graphql/users/users.hooks';
import { useUnauthentificatedModal } from '../auth/UnauthentificatedModal';
import { HeartIcon } from '../lib/icons/HeartIcon';
import { useRecommendLearningMaterialMutation } from './LearningMaterialRecommendationsViewer.generated';

const sizesMapping = {
  xs: {
    heartBoxSize: '24px',
    heartInnerText: '8px',
  },
  sm: {
    heartBoxSize: '40px',
    heartInnerText: '12px',
  },
  md: {
    heartBoxSize: '44px',
    heartInnerText: '13px',
  },
  lg: {
    heartBoxSize: '48px',
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
    size?: 'xs' | 'sm' | 'md' | 'lg';
    isDisabled?: boolean;
    isLoading?: boolean;
  } & BoxProps
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
      <SkeletonCircle
        size={sizesMapping[size].heartBoxSize}
        isLoaded={typeof recommendationsTotalCount !== 'number' || !isLoading}
      >
        <Box
          as="button"
          {...props}
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
                onClick: () => {
                  if (!currentUser) onOpenUnauthentificatedModal();
                  else recommendLearningMaterialMutation();
                },
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
      </SkeletonCircle>
    );
  }
);
