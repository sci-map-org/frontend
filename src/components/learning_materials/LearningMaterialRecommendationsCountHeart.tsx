import { Box, BoxProps, FlexProps, SkeletonCircle, Text } from '@chakra-ui/react';
import { forwardRef } from 'react';
import { HeartIcon } from '../lib/icons/HeartIcon';

const sizesMapping = {
  '2xs': {
    heartBoxSize: '24px',
    heartInnerText: '8px',
  },
  xs: {
    heartBoxSize: '32px',
    heartInnerText: '10px',
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

export type LearningMaterialRecommendationsCountHeartProps = {
  heartColor?: FlexProps['color'];
  hoverHeartColor?: FlexProps['color'];
  countColor?: FlexProps['color'];
  recommendationsCount?: number;
  onClick?: () => void;
  size?: keyof typeof sizesMapping;
  isLoading?: boolean;
} & Omit<BoxProps, 'onClick'>;

export const LearningMaterialRecommendationsCountHeart = forwardRef<
  HTMLDivElement,
  LearningMaterialRecommendationsCountHeartProps
>(
  (
    { heartColor, hoverHeartColor, countColor, recommendationsCount, onClick, isLoading, size = 'md', ...props },
    ref
  ) => {
    return (
      <SkeletonCircle size={sizesMapping[size].heartBoxSize} isLoaded={!isLoading}>
        <Box
          as="button"
          {...props}
          // weird TS ref issue when using as="button"
          // @ts-ignore
          ref={ref}
          position="relative"
          boxSize={sizesMapping[size].heartBoxSize}
          color={heartColor}
          transition="color ease-in 0.2s"
          {...(hoverHeartColor && {
            _hover: {
              color: hoverHeartColor,
            },
          })}
          onClick={onClick}
        >
          <HeartIcon boxSize={sizesMapping[size].heartBoxSize} />
          {recommendationsCount !== undefined && (
            <Text
              fontWeight={600}
              fontSize={sizesMapping[size].heartInnerText}
              color={countColor}
              position="absolute"
              top="46%"
              left="50%"
              textAlign="center"
              transform="translate(-50%, -50%)"
            >
              {recommendationsCount}
            </Text>
          )}
        </Box>
      </SkeletonCircle>
    );
  }
);
