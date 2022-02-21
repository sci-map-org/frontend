import { Box, Flex, Stack, Text } from '@chakra-ui/react';
import { useHover } from '../../hooks/useHover';
import {
  LearningMaterialBadgeColorToCssColorMapping,
  LearningMaterialType,
  LearningMaterialTypeBadge,
  LearningMaterialTypeBadgeSizesMapping,
  LearningMaterialTypeToBadgeColorMapping,
} from './LearningMaterialTypeBadge';

const getLearningMaterialTypeBadgeBgColor = (learningMaterialType: LearningMaterialType) => {
  return LearningMaterialBadgeColorToCssColorMapping[LearningMaterialTypeToBadgeColorMapping[learningMaterialType]];
};
interface LearningMaterialTypesViewerProps {
  learningMaterialTypes: LearningMaterialType[];
  size?: 'sm' | 'md';
  maxShown?: number;
}

export const LearningMaterialTypesViewer: React.FC<LearningMaterialTypesViewerProps> = ({
  learningMaterialTypes,
  size = 'md',
  maxShown,
}) => {
  if (!learningMaterialTypes.length) return null;
  const [setRef, isHover] = useHover();

  return (
    <Stack direction="row" ref={setRef} alignItems="center" spacing={{ md: '8px', sm: '4px' }[size]}>
      {learningMaterialTypes.slice(0, maxShown || learningMaterialTypes.length).map((learningMaterialType) => (
        <LearningMaterialTypeBadge
          key={learningMaterialType}
          type={learningMaterialType}
          size={size}
          whiteSpace="nowrap"
        />
      ))}

      {!!maxShown && maxShown < learningMaterialTypes.length && (
        <Box position="relative">
          {isHover && (
            <Stack direction="row" position="absolute" bgColor="white" zIndex={2}>
              {learningMaterialTypes.slice(maxShown, learningMaterialTypes.length).map((learningMaterialType, idx) => (
                <LearningMaterialTypeBadge
                  key={learningMaterialType}
                  type={learningMaterialType}
                  size={size}
                  whiteSpace="nowrap"
                />
              ))}
            </Stack>
          )}
          <Flex
            {...LearningMaterialTypeBadgeSizesMapping[size].container}
            bgGradient={
              learningMaterialTypes.length - maxShown > 1
                ? `linear(to-r, ${getLearningMaterialTypeBadgeBgColor(
                    learningMaterialTypes[maxShown]
                  )} 0%, ${getLearningMaterialTypeBadgeBgColor(
                    learningMaterialTypes[maxShown]
                  )} 50%, ${getLearningMaterialTypeBadgeBgColor(
                    learningMaterialTypes[maxShown + 1]
                  )} 50%, ${getLearningMaterialTypeBadgeBgColor(learningMaterialTypes[maxShown + 1])} 100%)`
                : `linear(to-r, ${getLearningMaterialTypeBadgeBgColor(
                    learningMaterialTypes[maxShown]
                  )}, ${getLearningMaterialTypeBadgeBgColor(learningMaterialTypes[maxShown])})`
            }
          >
            <Text
              color="white"
              {...LearningMaterialTypeBadgeSizesMapping[size].label}
              display="flex"
              alignItems="center"
            >
              +{learningMaterialTypes.length - maxShown}
            </Text>
          </Flex>
        </Box>
      )}
    </Stack>
  );
};
