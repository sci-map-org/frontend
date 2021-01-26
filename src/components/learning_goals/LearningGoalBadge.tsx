import { CloseButton, FlexProps, Stack, Text, Tooltip } from '@chakra-ui/react';
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
    domain {
      contextualKey
      contextualName
      domain {
        _id
        key
      }
    }
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
  const domainRelationship = learningGoal.domain;
  return (
    <Tooltip label={learningGoal.name} aria-label={learningGoal.name} openDelay={500}>
      <Stack
        direction="row"
        spacing={1}
        borderRadius={10}
        px="6px"
        backgroundColor={roleStyleMapping[role].backgroundColor}
        borderWidth="1px"
        borderColor={roleStyleMapping[role].borderColor}
        {...(clickable && {
          _hover: {
            backgroundColor: roleStyleMapping[role].hoverBackgroundColor,
            cursor: 'pointer',
          },
          onClick: () =>
            Router.push(
              domainRelationship ? '/domains/[key]/goals/[learningGoalKey]' : '/goals/[learningGoalKey]',
              domainRelationship
                ? `/domains/${domainRelationship.domain.key}/goals/${domainRelationship.contextualKey}`
                : `/goals/${learningGoal.key}`
            ),
        })}
      >
        {removable && (
          <CloseButton
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onRemove && onRemove();
            }}
          />
        )}
        <Text textAlign="center" color={roleStyleMapping[role].fontColor} noOfLines={1}>
          {learningGoal.name}
        </Text>
      </Stack>
    </Tooltip>
  );
};
