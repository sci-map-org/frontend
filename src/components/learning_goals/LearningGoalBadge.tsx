import { CloseButton, Flex, FlexProps, Tooltip } from '@chakra-ui/react';
import gql from 'graphql-tag';
import Router from 'next/router';
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
    key
  }
`;

interface LearningGoalBadgeProps {
  learningGoal: LearningGoalBadgeDataFragment;
  onRemove?: () => void;
  removable?: boolean;
  role?: 'prerequisite' | 'outcome';
  clickable?: boolean;
}
export const LearningGoalBadge: React.FC<LearningGoalBadgeProps> = ({
  onRemove,
  learningGoal,
  removable,
  role = 'outcome',
  clickable = true,
}) => {
  return (
    <Tooltip label={learningGoal.name} aria-label={learningGoal.name} openDelay={500}>
      <Flex
        direction="row"
        borderRadius={10}
        px="6px"
        backgroundColor={roleStyleMapping[role].backgroundColor}
        color={roleStyleMapping[role].fontColor}
        borderWidth="1px"
        borderColor={roleStyleMapping[role].borderColor}
        textAlign="center"
        noOfLines={1}
        {...(clickable && {
          _hover: {
            backgroundColor: roleStyleMapping[role].hoverBackgroundColor,
            cursor: 'pointer',
          },
          onClick: () => Router.push('/goals/[learningGoalKey]', `/goals/${learningGoal.key}`),
        })}
      >
        {removable && <CloseButton float="left" as="span" size="sm" onClick={() => onRemove && onRemove()} />}
        {learningGoal.name}
      </Flex>
    </Tooltip>
  );
};
