import { Icon } from '@chakra-ui/icons';
import { CircularProgress } from '@chakra-ui/react';
import { IoIosCheckmarkCircle } from '@react-icons/all-files/io/IoIosCheckmarkCircle';
import gql from 'graphql-tag';
import { LearningGoalCircularProgressDataFragment } from './LearningGoalCircularProgress.generated';

export const LearningGoalCircularProgressData = gql`
  fragment LearningGoalCircularProgressData on LearningGoal {
    _id
    progress {
      level
    }
  }
`;

interface LearningGoalCircularProgressProps {
  learningGoal: LearningGoalCircularProgressDataFragment;
  pxSize?: number;
}

export const LearningGoalCircularProgress: React.FC<LearningGoalCircularProgressProps> = ({
  learningGoal,
  pxSize = 30,
}) => {
  if (!learningGoal.progress) return null;
  if (learningGoal.progress.level === 100)
    return (
      //Some hacking to make it align with the circular progress (path in icon has a margin)
      <Icon
        as={IoIosCheckmarkCircle}
        boxSize={pxSize + pxSize / 5 + 'px'}
        mb={`${-Math.floor((1 / 8) * pxSize)}px`}
        color={learningGoal.progress?.level === 100 ? 'white' : 'black'}
      />
    );
  return (
    <CircularProgress
      thickness="10px"
      capIsRound
      value={learningGoal.progress.level}
      size={pxSize + 'px'}
      color="main"
      trackColor="gray.300"
    />
  );
};
