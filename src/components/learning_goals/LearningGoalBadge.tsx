import { CloseButton, FlexProps, Stack, Text, Tooltip } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { LearningGoalLinkData } from '../../graphql/learning_goals/learning_goals.fragments';
import { LearningGoalPageInfo } from '../../pages/RoutesPageInfos';
import { PageLink } from '../navigation/InternalLink';
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
    ...LearningGoalLinkData
  }
  ${LearningGoalLinkData}
`;

interface LearningGoalBadgeProps {
  learningGoal: LearningGoalBadgeDataFragment;
  onRemove?: () => void;
  removable?: boolean;
  role?: 'prerequisite' | 'outcome';
  clickable?: boolean;
  size?: 'md' | 'sm';
}
export const LearningGoalBadge: React.FC<LearningGoalBadgeProps> = ({
  onRemove,
  learningGoal,
  removable,
  role = 'outcome',
  clickable = true,
  size = 'md',
}) => {
  return (
    <Tooltip label={learningGoal.name} aria-label={learningGoal.name} openDelay={500}>
      <PageLink
        borderRadius={10}
        px="6px"
        backgroundColor={roleStyleMapping[role].backgroundColor}
        borderWidth="1px"
        fontSize={size}
        borderColor={roleStyleMapping[role].borderColor}
        isDisabled={!clickable}
        pageInfo={LearningGoalPageInfo(learningGoal)}
        {...(clickable && {
          _hover: {
            backgroundColor: roleStyleMapping[role].hoverBackgroundColor,
            cursor: 'pointer',
          },
        })}
      >
        <Stack direction="row" spacing={1}>
          {removable && (
            <CloseButton
              size={size}
              boxSize={{ sm: '20px', md: '24px' }[size]}
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
      </PageLink>
    </Tooltip>
  );
};
