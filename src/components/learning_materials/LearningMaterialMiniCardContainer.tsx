import { Flex, FlexProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface LearningMaterialMiniCardContainerProps {
  borderColor?: FlexProps['borderColor'];
  // hoverBorderColor?: FlexProps['borderColor'];
  inCompactList?: boolean;
  firstItemInCompactList?: boolean;
  renderFirstRow: ReactNode;
  renderSecondRow: ReactNode;
  onClick: () => void;
}
export const LearningMaterialMiniCardContainer: React.FC<LearningMaterialMiniCardContainerProps> = ({
  renderFirstRow,
  renderSecondRow,
  onClick,
  inCompactList,
  firstItemInCompactList,
  borderColor = 'gray.100',
  // hoverBorderColor = 'gray.300',
}) => {
  return (
    <Flex
      direction="column"
      alignItems="stretch"
      _hover={{
        cursor: 'pointer',
        backgroundColor: 'gray.50',
        // borderColor: hoverBorderColor,
      }}
      onClick={() => onClick()}
      // borderWidth={1}
      pl={1}
      py={1}
      borderColor={borderColor}
      borderTopColor={inCompactList && !firstItemInCompactList ? 'transparent' : borderColor}
      marginTop={inCompactList && !firstItemInCompactList ? '-1px' : '0px'}
    >
      <Flex>{renderFirstRow}</Flex>
      <Flex>{renderSecondRow}</Flex>
    </Flex>
  );
};
