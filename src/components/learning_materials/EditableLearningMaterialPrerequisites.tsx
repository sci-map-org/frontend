import { Stack, Text } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { TopicLinkData } from '../../graphql/topics/topics.fragments';
import { TopicLinkDataFragment } from '../../graphql/topics/topics.fragments.generated';
import { EditableTopicsWrapper } from '../topics/EditableTopicsWrapper';
import {
  EditableLearningMaterialPrerequisitesDataFragment,
  useAddLearningMaterialHasPrerequisiteTopicMutation,
  useRemoveLearningMaterialHasPrerequisiteTopicMutation,
} from './EditableLearningMaterialPrerequisites.generated';

export const EditableLearningMaterialPrerequisitesData = gql`
  fragment EditableLearningMaterialPrerequisitesData on LearningMaterial {
    _id
    prerequisites {
      topic {
        ...TopicLinkData
      }
    }
  }
  ${TopicLinkData}
`;

interface StatelessEditableLearningMaterialPrerequisitesProps {
  prerequisites?: TopicLinkDataFragment[];
  editable?: boolean;
  isLoading?: boolean;
  onRemove: (topiclId: string) => void;
  onAdded: (topic: TopicLinkDataFragment) => void;
}
export const StatelessEditableLearningMaterialPrerequisites: React.FC<StatelessEditableLearningMaterialPrerequisitesProps> = ({
  prerequisites,
  editable,
  isLoading,
  onRemove,
  onAdded,
}) => {
  return (
    <Stack direction="column" alignItems="center" spacing={1}>
      <Text fontWeight={600} color="gray.500">
        {prerequisites && prerequisites.length ? 'Prerequisites' : 'No Prerequisites'}
      </Text>
      {prerequisites && (
        <EditableTopicsWrapper
          editable={editable}
          // role="prerequisite"
          isLoading={isLoading}
          topics={prerequisites}
          onAdded={onAdded}
          onRemove={onRemove}
        />
      )}
    </Stack>
  );
};

export const addLearningMaterialHasPrerequisiteTopic = gql`
  mutation addLearningMaterialHasPrerequisiteTopic($learningMaterialId: String!, $prerequisiteTopicId: String!) {
    addLearningMaterialHasPrerequisiteTopic(
      learningMaterialId: $learningMaterialId
      prerequisiteTopicId: $prerequisiteTopicId
    ) {
      _id
      prerequisites {
        topic {
          ...TopicLinkData
        }
      }
    }
  }
  ${TopicLinkData}
`;

export const removeLearningMaterialHasPrerequisiteTopic = gql`
  mutation removeLearningMaterialHasPrerequisiteTopic($learningMaterialId: String!, $prerequisiteTopicId: String!) {
    removeLearningMaterialHasPrerequisiteTopic(
      learningMaterialId: $learningMaterialId
      prerequisiteTopicId: $prerequisiteTopicId
    ) {
      _id
      prerequisites {
        topic {
          ...TopicLinkData
        }
      }
    }
  }
  ${TopicLinkData}
`;

interface EditableLearningMaterialPrerequisitesProps
  extends Omit<StatelessEditableLearningMaterialPrerequisitesProps, 'onAdded' | 'onRemove'> {
  learningMaterial: EditableLearningMaterialPrerequisitesDataFragment;
}
export const EditableLearningMaterialPrerequisites: React.FC<EditableLearningMaterialPrerequisitesProps> = ({
  learningMaterial,
  ...props
}) => {
  const [addLearningMaterialHasPrerequisiteTopicMutation] = useAddLearningMaterialHasPrerequisiteTopicMutation();
  const [removeLearningMaterialHasPrerequisiteTopicMutation] = useRemoveLearningMaterialHasPrerequisiteTopicMutation();

  return (
    <StatelessEditableLearningMaterialPrerequisites
      prerequisites={learningMaterial.prerequisites?.map(({ topic }) => topic)}
      onAdded={(topic) =>
        addLearningMaterialHasPrerequisiteTopicMutation({
          variables: { learningMaterialId: learningMaterial._id, prerequisiteTopicId: topic._id },
        })
      }
      onRemove={(topicId) =>
        removeLearningMaterialHasPrerequisiteTopicMutation({
          variables: {
            learningMaterialId: learningMaterial._id,
            prerequisiteTopicId: topicId,
          },
        })
      }
      {...props}
    />
  );
};
