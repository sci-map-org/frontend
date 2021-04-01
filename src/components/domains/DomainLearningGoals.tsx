import { AddIcon } from '@chakra-ui/icons';
import { Flex, Heading, IconButton, Stack, Text } from '@chakra-ui/react';
import { DomainDataFragment } from '../../graphql/domains/domains.fragments.generated';
import { LearningGoalBelongsToDomain } from '../../graphql/types';
import { useCurrentUser } from '../../graphql/users/users.hooks';
import { routerPushToPage } from '../../pages/PageInfo';
import { AddLearningGoalToDomainPageInfo } from '../../pages/RoutesPageInfos';
import { LearningGoalCard } from '../learning_goals/cards/LearningGoalCard';
import { LearningGoalCardDataFragment } from '../learning_goals/cards/LearningGoalCard.generated';
import { LearningGoalCardList } from '../learning_goals/cards/LearningGoalCardList';
import { LearningGoalIcon } from '../lib/icons/LearningGoalIcon';

interface DomainLearningGoalsProps {
  learningGoalItems: Array<
    Pick<LearningGoalBelongsToDomain, 'index'> & {
      learningGoal: LearningGoalCardDataFragment;
    }
  >;
  domain: DomainDataFragment;
  isLoading?: boolean;
}
export const DomainLearningGoals: React.FC<DomainLearningGoalsProps> = ({ domain, learningGoalItems, isLoading }) => {
  const { currentUser } = useCurrentUser();
  return (
    <Flex direction="column" pb={5}>
      <Stack direction="row" alignItems="center" mb={3}>
        <LearningGoalIcon boxSize="24px" />
        <Heading fontSize="2xl" fontWeight={600} color="blackAlpha.800">
          Learning Goals
        </Heading>
      </Stack>

      <Flex direction="row">
        <LearningGoalCardList
          learningGoalItems={learningGoalItems}
          spacing="20px"
          isLoading={isLoading}
          renderCard={({ learningGoal }, hover) => <LearningGoalCard learningGoal={learningGoal} mouseHover={hover} />}
        />
        {!!currentUser && (
          <Flex direction="row" alignItems="stretch" borderLeftWidth={0} ml={1} borderColor="gray.400">
            <Flex
              direction="column"
              justifyContent="center"
              alignItems="center"
              px={8}
              ml={4}
              borderWidth={1}
              borderColor="teal.600"
              borderRadius={4}
              mb={2}
            >
              <IconButton
                size="lg"
                aria-label="add goal"
                variant="ghost"
                icon={<AddIcon />}
                isRound
                colorScheme="teal"
                onClick={() => {
                  routerPushToPage(AddLearningGoalToDomainPageInfo(domain));
                }}
              />
            </Flex>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};
