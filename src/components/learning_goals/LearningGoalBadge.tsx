import { CloseButton, Flex, FlexProps } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { LearningGoalBadgeDataFragment } from './LearningGoalBadge.generated';

const roleStyleMapping: {
  [key in 'prerequisite' | 'outcome']: {
    backgroundColor: FlexProps['bgColor'];
    hoverBackgroundColor: FlexProps['bgColor'];
    borderColor: FlexProps['borderColor'];
    fontColor: FlexProps['color'];
  };
} = {
  prerequisite: {
    backgroundColor: 'gray.50',
    hoverBackgroundColor: 'gray.100',
    borderColor: 'gray.900',
    fontColor: 'gray.900',
  },
  outcome: {
    backgroundColor: 'gray.600',
    hoverBackgroundColor: 'gray.500',
    borderColor: 'gray.600',
    fontColor: 'gray.50',
  },
};
export const LearningGoalBadgeData = gql`
  fragment LearningGoalBadgeData on LearningGoal {
    _id
    name
  }
`;
interface LearningGoalBadgeProps {
  learningGoal: LearningGoalBadgeDataFragment;
  onRemove?: () => void;
  removable?: boolean;
  role?: 'prerequisite' | 'outcome';
}
export const LearningGoalBadge: React.FC<LearningGoalBadgeProps> = ({
  onRemove,
  learningGoal,
  removable,
  role = 'outcome',
}) => {
  return (
    <Flex
      direction="row"
      borderRadius={10}
      px="6px"
      backgroundColor={roleStyleMapping[role].backgroundColor}
      color={roleStyleMapping[role].fontColor}
      borderWidth="1px"
      borderColor={roleStyleMapping[role].borderColor}
      // _hover={{
      // backgroundColor: roleStyleMapping[role].hoverBackgroundColor,
      // cursor: 'pointer',
      // }}
    >
      {removable && <CloseButton size="sm" onClick={() => onRemove && onRemove()} />}
      {learningGoal.name}
    </Flex>
  );
};
