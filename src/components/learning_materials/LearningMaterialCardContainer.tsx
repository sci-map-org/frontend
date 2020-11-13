import { Center, Flex, FlexProps } from '@chakra-ui/core';
import { ReactNode } from 'react';
import { BoxBlockDefaultClickPropagation } from '../resources/ResourcePreviewCard';

export const LearningMaterialCardContainer: React.FC<{
  renderCenterLeft: ReactNode;
  leftBlockWidth: FlexProps['w'];
  renderRight: ReactNode;
  renderBottom: ReactNode;
  inCompactList?: boolean;
  firstItemInCompactList?: boolean;
  borderColor?: FlexProps['borderColor'];
  hoverBorderColor?: FlexProps['borderColor'];
  onClick: () => void;
}> = ({
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
}) => {
  return (
    <Flex
      direction="row"
      alignItems="stretch"
      borderWidth={1}
      borderTopColor={inCompactList && firstItemInCompactList !== false ? 'white' : borderColor} // hacky stuff
      borderLeftColor={borderColor}
      borderRightColor={borderColor}
      borderBottomColor={borderColor}
      _hover={{
        cursor: 'pointer',
        borderColor: hoverBorderColor,
      }}
      onClick={() => onClick()}
    >
      <Center w={leftBlockWidth}>
        <BoxBlockDefaultClickPropagation>{renderCenterLeft}</BoxBlockDefaultClickPropagation>
      </Center>
      <Flex direction="column" alignItems="stretch">
        {children}
        {renderBottom}
      </Flex>
      {renderRight}
    </Flex>
  );
};
