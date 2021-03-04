import { Flex } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { useMemo } from 'react';
import { LearningGoalLinkData } from '../../../graphql/learning_goals/learning_goals.fragments';
import { routerPushToPage } from '../../../pages/PageInfo';
import { LearningGoalPageInfo } from '../../../pages/RoutesPageInfos';
import { PageLink } from '../../navigation/InternalLink';
import { LearningGoalLinearProgress, LearningGoalLinearProgressData } from '../LearningGoalLinearProgress';
import { LearningGoalCardDataFragment } from './LearningGoalCard.generated';

export const LearningGoalCardData = gql`
  fragment LearningGoalCardData on LearningGoal {
    ...LearningGoalLinkData
    ...LearningGoalLinearProgressData
  }
  ${LearningGoalLinkData}
  ${LearningGoalLinearProgressData}
`;
enum LearningGoalStatus {
  Completed = 'Completed',
  Normal = 'Normal',
}
const learningGoalStatusStyleMapping: {
  fontColor: {
    [key in LearningGoalStatus]: string;
  };
  cardBackgroundColor: {
    [key in LearningGoalStatus]: string;
  };
  cardBorderColor: {
    [key in LearningGoalStatus]: string;
  };
} = {
  fontColor: {
    [LearningGoalStatus.Completed]: 'white',
    [LearningGoalStatus.Normal]: 'teal.600',
  },
  cardBackgroundColor: {
    [LearningGoalStatus.Completed]: 'teal.600',
    [LearningGoalStatus.Normal]: 'white',
  },
  cardBorderColor: {
    [LearningGoalStatus.Completed]: 'teal.600',
    [LearningGoalStatus.Normal]: 'teal.600',
  },
};
interface LearningGoalCardProps {
  learningGoal: LearningGoalCardDataFragment;
  mouseHover: boolean;
}

export const LearningGoalCard: React.FC<LearningGoalCardProps> = ({ learningGoal, mouseHover }) => {
  const status = useMemo(() => {
    return learningGoal.progress?.level === 100 ? LearningGoalStatus.Completed : LearningGoalStatus.Normal;
  }, [learningGoal.progress]);

  const showProgressBar = useMemo(() => {
    return !!learningGoal.progress?.level && learningGoal.progress.level < 100;
  }, []);

  return (
    <Flex
      h="100%"
      w="100%"
      direction="column"
      _hover={{ cursor: 'pointer' }}
      onClick={() => routerPushToPage(LearningGoalPageInfo(learningGoal))}
    >
      <Flex
        flexGrow={1}
        direction="column"
        bgColor={learningGoalStatusStyleMapping.cardBackgroundColor[status]}
        pl={4}
        pr={2}
        pt={2}
        borderWidth={2}
        borderBottomWidth={0}
        borderTopLeftRadius={10}
        borderTopRightRadius={10}
        borderColor={learningGoalStatusStyleMapping.cardBorderColor[status]}
        {...(!showProgressBar && {
          borderRadius: 10,
          borderBottomWidth: 2,
        })}
      >
        <PageLink
          pageInfo={LearningGoalPageInfo(learningGoal)}
          color={learningGoalStatusStyleMapping.fontColor[status]}
          fontSize="lg"
          _hover={{}}
          fontWeight={500}
          mt={3}
          overflowWrap="break-word"
        >
          {learningGoal.name}
        </PageLink>
      </Flex>

      {showProgressBar && (
        <LearningGoalLinearProgress
          size="lg"
          borderBottomRightRadius={8}
          borderBottomLeftRadius={8}
          borderLeftWidth={2}
          borderRightWidth={2}
          borderBottomWidth={2}
          borderColor={learningGoalStatusStyleMapping.cardBorderColor[status]}
          learningGoal={learningGoal}
          hasStripe
        />
      )}
    </Flex>
  );
};
