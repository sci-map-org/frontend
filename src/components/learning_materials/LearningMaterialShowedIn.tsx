import { Flex, Stack, Text } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { TopicLinkData } from '../../graphql/topics/topics.fragments';
import { ShowedInTopicLink } from '../lib/Typography';
import { LearningMaterialShowedInDataFragment } from './LearningMaterialShowedIn.generated';

export const LearningMaterialShowedInData = gql`
  fragment LearningMaterialShowedInData on LearningMaterial {
    _id
    showedIn {
      ...TopicLinkData
    }
  }
  ${TopicLinkData}
`;
export const LearningMaterialShowedIn: React.FC<{
  learningMaterial: LearningMaterialShowedInDataFragment;
  isLoading?: boolean;
  size: 'sm' | 'md';
}> = ({ learningMaterial, isLoading, size }) => {
  return learningMaterial.showedIn?.length ? (
    <Flex direction="column">
      <Text fontWeight={700} color="gray.600" fontSize={size}>
        Shown In
      </Text>
      <Stack ml={3}>
        {learningMaterial.showedIn.map((showedInTopic) => (
          <ShowedInTopicLink key={showedInTopic._id} topic={showedInTopic} size={size} />
        ))}
      </Stack>
    </Flex>
  ) : null;
};
