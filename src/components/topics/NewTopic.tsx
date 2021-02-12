import { Box, Button, Flex, Stack, Text } from '@chakra-ui/react';
import { values } from 'lodash';
import { useState } from 'react';
import { ConceptDataFragment } from '../../graphql/concepts/concepts.fragments.generated';
import { DomainDataFragment } from '../../graphql/domains/domains.fragments.generated';
import { LearningGoalDataFragment } from '../../graphql/learning_goals/learning_goals.fragments.generated';
import { TopicType } from '../../graphql/types';
import { NewConcept } from '../concepts/NewConcept';
import { NewDomain } from '../domains/NewDomain';
import { NewLearningGoal } from '../learning_goals/NewLearningGoal';

interface NewTopicProps {
  onCancel: () => void;
  onCreated?: (
    createdTopic: DomainDataFragment | ConceptDataFragment | LearningGoalDataFragment,
    topicType: TopicType
  ) => void;
  parentDomain?: DomainDataFragment;
  defaultPayload?: { name?: string; key?: string };
  allowedTopicTypes?: TopicType[];
  size?: 'sm' | 'md' | 'lg';
}
export const NewTopic: React.FC<NewTopicProps> = ({
  onCancel,
  onCreated,
  parentDomain,
  allowedTopicTypes = values(TopicType),
  defaultPayload,
  size,
}) => {
  const [topicType, setTopicType] = useState<TopicType>();
  return (
    <Box>
      {topicType ? (
        <Stack>
          <Flex direction="row" alignItems="baseline" justifyContent="center">
            <Text fontSize="xl">Create new {topicType}</Text>
            <Button variant="ghost" onClick={() => setTopicType(undefined)}>
              Change
            </Button>
          </Flex>
          {topicType === TopicType.Domain && (
            <NewDomain
              defaultPayload={defaultPayload}
              onCreated={(createdDomain) => !!onCreated && onCreated(createdDomain, TopicType.Domain)}
              onCancel={onCancel}
              parentDomainId={parentDomain?._id}
              size={size}
            />
          )}
          {topicType === TopicType.Concept && (
            <NewConcept
              defaultPayload={defaultPayload}
              onCreated={(createdConcept) => !!onCreated && onCreated(createdConcept, TopicType.Concept)}
              onCancel={onCancel}
              domain={parentDomain}
              size={size}
            />
          )}
          {topicType === TopicType.LearningGoal && (
            <NewLearningGoal
              defaultPayload={defaultPayload}
              defaultDomain={parentDomain}
              onCancel={onCancel}
              onCreated={(createdLG) => !!onCreated && onCreated(createdLG, TopicType.LearningGoal)}
              size={size}
            />
          )}
        </Stack>
      ) : (
        <Stack>
          {allowedTopicTypes.includes(TopicType.Domain) && (
            <Box>
              <Button variant="outline" onClick={() => setTopicType(TopicType.Domain)}>
                Domain
              </Button>
            </Box>
          )}
          {allowedTopicTypes.includes(TopicType.Concept) && (
            <Box>
              <Button variant="outline" onClick={() => setTopicType(TopicType.Concept)}>
                Concept
              </Button>
            </Box>
          )}
          {allowedTopicTypes.includes(TopicType.LearningGoal) && (
            <Box>
              <Button variant="outline" onClick={() => setTopicType(TopicType.LearningGoal)}>
                Learning Goal
              </Button>
            </Box>
          )}
        </Stack>
      )}
    </Box>
  );
};
