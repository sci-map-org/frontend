import { Box, Stack, Text } from '@chakra-ui/react';
import { useHover } from '../../hooks/useHover';
import {
  LearningMaterialBadgeColorToCssColorMapping,
  LearningMaterialType,
  LearningMaterialTypeBadge,
  LearningMaterialTypeToBadgeColorMapping,
} from './LearningMaterialTypeBadge';

const getLearningMaterialTypeBadgeBgColor = (learningMaterialType: LearningMaterialType) => {
  return LearningMaterialBadgeColorToCssColorMapping[LearningMaterialTypeToBadgeColorMapping[learningMaterialType]];
};
interface LearningMaterialTypesViewerProps {
  learningMaterialTypes: LearningMaterialType[];
  // size?: 'sm' | 'md';
  // onClick?: (learningMaterialType: LearningMaterialType) => void;
  // shade?: 'pale' | 'solid';
  maxShown?: number;
}

export const LearningMaterialTypesViewer: React.FC<LearningMaterialTypesViewerProps> = ({
  learningMaterialTypes,
  // size = 'md',
  // onClick,
  // shade = 'solid',
  maxShown,
}) => {
  if (!learningMaterialTypes.length) return null;
  const [setRef, isHover] = useHover();

  return (
    <Stack
      direction="row"
      ref={setRef}
      //   spacing={{ md: '8px', sm: '4px' }[size]}
      spacing="8px"
    >
      {learningMaterialTypes.slice(0, maxShown || learningMaterialTypes.length).map((learningMaterialType) => (
        <LearningMaterialTypeBadge
          key={learningMaterialType}
          type={learningMaterialType}
          //   size={size}
          //   {...(onClick && { onClick: () => onClick(topicType) })}
          //   shade={shade}
          //   textOverflow="ellipsis"
          //   whiteSpace="nowrap"
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
                  //   size={size}
                  //   {...(onClick && { onClick: () => onClick(topicType) })}
                  //   shade={shade}
                  //   textOverflow="ellipsis"
                  //   whiteSpace="nowrap"
                />
              ))}
            </Stack>
          )}
          <Text
            color="white"
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
            // {...sizesMapping[size]}
            display="flex"
            alignItems="center"
            // _hover={{
            //   ...(!!onClick && { cursor: 'pointer' }),
            // }}
          >
            +{learningMaterialTypes.length - maxShown}
          </Text>
        </Box>
      )}
    </Stack>
  );
};
