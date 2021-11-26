import { Stack, Text } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { TopicLinkDataFragment } from '../../graphql/topics/topics.fragments.generated';
import { EditableTopicsWrapper } from '../topics/EditableTopicsWrapper';
import { TopicBadgeData } from '../topics/TopicBadge';
import {
  EditableTopicPrerequisitesDataFragment,
  useAddTopicHasPrerequisiteTopicMutation,
  useRemoveTopicHasPrerequisiteTopicMutation,
} from './EditableTopicPrerequisites.generated';

export const EditableTopicPrerequisitesData = gql`
  fragment EditableTopicPrerequisitesData on Topic {
    _id
    prerequisites {
      prerequisiteTopic {
        ...TopicBadgeData
      }
    }
  }
  ${TopicBadgeData}
`;

interface StatelessEditableTopicPrerequisitesProps {
  prerequisites?: TopicLinkDataFragment[];
  editable?: boolean;
  isLoading?: boolean;
  onRemove: (topiclId: string) => void;
  onAdded: (topic: TopicLinkDataFragment) => void;
}
export const StatelessEditableTopicPrerequisites: React.FC<StatelessEditableTopicPrerequisitesProps> = ({
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
          isLoading={isLoading}
          topics={prerequisites}
          onAdded={onAdded}
          onRemove={onRemove}
        />
      )}
    </Stack>
  );
};

export const addTopicHasPrerequisiteTopic = gql`
  mutation addTopicHasPrerequisiteTopic($topicId: String!, $prerequisiteTopicId: String!) {
    addTopicHasPrerequisiteTopic(topicId: $topicId, prerequisiteTopicId: $prerequisiteTopicId) {
      topic {
        _id
        prerequisites {
          prerequisiteTopic {
            ...TopicBadgeData
          }
        }
      }
    }
  }
  ${TopicBadgeData}
`;

export const removeTopicHasPrerequisiteTopic = gql`
  mutation removeTopicHasPrerequisiteTopic($topicId: String!, $prerequisiteTopicId: String!) {
    removeTopicHasPrerequisiteTopic(topicId: $topicId, prerequisiteTopicId: $prerequisiteTopicId) {
      topic {
        _id
        prerequisites {
          prerequisiteTopic {
            ...TopicBadgeData
          }
        }
      }
    }
  }
  ${TopicBadgeData}
`;

interface EditableTopicPrerequisitesProps
  extends Omit<StatelessEditableTopicPrerequisitesProps, 'onAdded' | 'onRemove'> {
  topic: EditableTopicPrerequisitesDataFragment;
}
export const EditableTopicPrerequisites: React.FC<EditableTopicPrerequisitesProps> = ({ topic, ...props }) => {
  const [addTopicHasPrerequisiteTopicMutation] = useAddTopicHasPrerequisiteTopicMutation();
  const [removeTopicHasPrerequisiteTopicMutation] = useRemoveTopicHasPrerequisiteTopicMutation();

  return (
    <StatelessEditableTopicPrerequisites
      prerequisites={topic.prerequisites?.map(({ prerequisiteTopic }) => prerequisiteTopic)}
      onAdded={(prerequisiteTopic) =>
        addTopicHasPrerequisiteTopicMutation({
          variables: { topicId: topic._id, prerequisiteTopicId: prerequisiteTopic._id },
        })
      }
      onRemove={(prerequisiteTopicId) =>
        removeTopicHasPrerequisiteTopicMutation({
          variables: {
            topicId: topic._id,
            prerequisiteTopicId,
          },
        })
      }
      {...props}
    />
  );
};
