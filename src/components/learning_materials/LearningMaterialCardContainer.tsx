import { Center, Flex, FlexProps } from '@chakra-ui/react';
import { forwardRef, ReactNode } from 'react';
import { BoxBlockDefaultClickPropagation } from '../resources/ResourcePreviewCard';

interface LearningMaterialCardContainerProps {
  renderCenterLeft: ReactNode;
  leftBlockWidth: FlexProps['w'];
  renderRight: ReactNode;
  renderBottom: ReactNode;
  inCompactList?: boolean;
  firstItemInCompactList?: boolean;
  borderColor?: FlexProps['borderColor'];
  hoverBorderColor?: FlexProps['borderColor'];
  onClick: () => void;
  children: ReactNode;
}

export const LearningMaterialCardContainer = forwardRef<HTMLDivElement, LearningMaterialCardContainerProps>(
  (
    {
      renderCenterLeft,
      leftBlockWidth,
      renderRight,
      renderBottom,
      children,
      inCompactList,
      firstItemInCompactList,
      borderColor = 'gray.200',
      hoverBorderColor = 'gray.400',
      onClick,
    },
    ref
  ) => {
    return (
      <Flex
        ref={ref}
        direction="row"
        alignItems="stretch"
        borderWidth={1}
        borderTopColor={inCompactList ? (firstItemInCompactList ? borderColor : 'white') : borderColor} // hacky stuff
        borderLeftColor={borderColor}
        borderRightColor={borderColor}
        borderBottomColor={borderColor}
        _hover={{
          cursor: 'pointer',
          borderColor: hoverBorderColor,
        }}
        onClick={() => onClick()}
      >
        <Center w={leftBlockWidth} flexShrink={0}>
          <BoxBlockDefaultClickPropagation display="flex">{renderCenterLeft}</BoxBlockDefaultClickPropagation>
        </Center>
        <Flex direction="column" alignItems="stretch" flexGrow={1}>
          {children}
          {renderBottom}
        </Flex>
        {renderRight}
      </Flex>
    );
  }
);
