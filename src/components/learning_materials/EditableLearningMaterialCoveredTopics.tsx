import { Stack, Text } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { LearningMaterialWithCoveredTopicsData } from '../../graphql/learning_materials/learning_materials.fragments';
import { LearningMaterialWithCoveredTopicsDataFragment } from '../../graphql/learning_materials/learning_materials.fragments.generated';
import { TopicLinkDataFragment } from '../../graphql/topics/topics.fragments.generated';
import { EditableTopicsWrapper } from '../topics/EditableTopicsWrapper';
import { TopicBadgeData } from '../topics/TopicBadge';
import {
  useAttachLearningMaterialCoversTopicsMutation,
  useDetachLearningMaterialCoversTopicsMutation,
} from './EditableLearningMaterialCoveredTopics.generated';

export const EditableLearningMaterialPrerequisitesData = gql`
  fragment EditableLearningMaterialPrerequisitesData on LearningMaterial {
    _id
    prerequisites {
      topic {
        ...TopicBadgeData
      }
    }
  }
  ${TopicBadgeData}
`;

interface StatelessEditableLearningMaterialCoveredTopicsProps {
  coveredTopics?: TopicLinkDataFragment[];
  editable?: boolean;
  isLoading?: boolean;
  onRemove: (topiclId: string) => void;
  onAdded: (topic: TopicLinkDataFragment) => void;
}
export const StatelessEditableLearningMaterialCoveredTopics: React.FC<StatelessEditableLearningMaterialCoveredTopicsProps> = ({
  coveredTopics,
  editable,
  isLoading,
  onRemove,
  onAdded,
}) => {
  return (
    <Stack direction="column" alignItems="center" spacing={1}>
      <Text fontWeight={600} color="gray.500">
        Covered SubTopics
      </Text>
      {coveredTopics && (
        <EditableTopicsWrapper
          editable={editable}
          // role="prerequisite"
          isLoading={isLoading}
          topics={coveredTopics}
          onAdded={onAdded}
          onRemove={onRemove}
        />
      )}
    </Stack>
  );
};

export const attachLearningMaterialCoversTopics = gql`
  mutation attachLearningMaterialCoversTopics($learningMaterialId: String!, $topicsIds: [String!]!) {
    attachLearningMaterialCoversTopics(learningMaterialId: $learningMaterialId, topicsIds: $topicsIds) {
      ...LearningMaterialWithCoveredTopicsData
    }
  }
  ${LearningMaterialWithCoveredTopicsData}
`;

export const detachLearningMaterialCoversTopics = gql`
  mutation detachLearningMaterialCoversTopics($learningMaterialId: String!, $topicsIds: [String!]!) {
    detachLearningMaterialCoversTopics(learningMaterialId: $learningMaterialId, topicsIds: $topicsIds) {
      ...LearningMaterialWithCoveredTopicsData
    }
  }
  ${LearningMaterialWithCoveredTopicsData}
`;

interface EditableLearningMaterialCoveredTopicsProps
  extends Omit<StatelessEditableLearningMaterialCoveredTopicsProps, 'onAdded' | 'onRemove'> {
  learningMaterial: LearningMaterialWithCoveredTopicsDataFragment;
}
export const EditableLearningMaterialCoveredTopics: React.FC<EditableLearningMaterialCoveredTopicsProps> = ({
  learningMaterial,
  ...props
}) => {
  const [attachLearningMaterialCoversTopicsMutation] = useAttachLearningMaterialCoversTopicsMutation();
  const [detachLearningMaterialCoversTopicsMutation] = useDetachLearningMaterialCoversTopicsMutation();

  return (
    <StatelessEditableLearningMaterialCoveredTopics
      coveredTopics={learningMaterial.coveredSubTopics?.items}
      onAdded={(topic) =>
        attachLearningMaterialCoversTopicsMutation({
          variables: { learningMaterialId: learningMaterial._id, topicsIds: [topic._id] },
        })
      }
      onRemove={(topicId) =>
        detachLearningMaterialCoversTopicsMutation({
          variables: {
            learningMaterialId: learningMaterial._id,
            topicsIds: [topicId],
          },
        })
      }
      {...props}
    />
  );
};
