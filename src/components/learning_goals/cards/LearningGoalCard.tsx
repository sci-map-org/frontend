import { Flex } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { DomainLinkData } from '../../../graphql/domains/domains.fragments';
import { LearningGoalPageInfo } from '../../../pages/RoutesPageInfos';
import { PageLink } from '../../navigation/InternalLink';
import { LearningGoalCardDataFragment } from './LearningGoalCard.generated';
import { LearningGoalLinearProgress, LearningGoalLinearProgressData } from '../LearningGoalLinearProgress';
import { routerPushToPage } from '../../../pages/PageInfo';

export const LearningGoalCardData = gql`
  fragment LearningGoalCardData on LearningGoal {
    _id
    key
    name
    domain {
      domain {
        ...DomainLinkData
      }
      contextualKey
      contextualName
    }
    ...LearningGoalLinearProgressData
  }
  ${DomainLinkData}
  ${LearningGoalLinearProgressData}
`;
interface LearningGoalCardProps {
  learningGoal: LearningGoalCardDataFragment;
  mouseHover: boolean;
}
export const LearningGoalCard: React.FC<LearningGoalCardProps> = ({ learningGoal, mouseHover }) => {
  return (
    <Flex
      h="100%"
      w="100%"
      direction="column"
      bgColor={learningGoal.progress?.level === 100 ? 'green.100' : mouseHover ? 'gray.300' : 'gray.100'}
      _hover={{ cursor: 'pointer' }}
      onClick={() => routerPushToPage(LearningGoalPageInfo(learningGoal))}
    >
      <Flex flexGrow={1} direction="column" pl={2} pt={2}>
        <PageLink
          pageInfo={LearningGoalPageInfo(learningGoal)}
          fontSize="lg"
          _hover={{}}
          fontWeight={500}
          mt={3}
          overflowWrap="break-word"
        >
          {learningGoal.name}
        </PageLink>
      </Flex>

      <LearningGoalLinearProgress learningGoal={learningGoal} bgColor="transparent" />
    </Flex>
  );
};
