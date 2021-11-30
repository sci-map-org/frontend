import { Stack, Text, Image } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { TopicLinkDataFragment } from '../../graphql/topics/topics.fragments.generated';
import { DirectionSignIcon } from '../lib/icons/DirectionSignIcon';
import { EditableTopicsWrapper } from '../topics/EditableTopicsWrapper';
import { TopicBadgeData } from '../topics/TopicBadge';
import {
  EditablePartOfTopicsDataFragment,
  useAttachTopicIsPartOfTopicMutation,
  useDetachTopicIsPartOfTopicMutation,
} from './EditablePartOfTopics.generated';
import { TopicBadgeDataFragment } from './TopicBadge.generated';

export const EditablePartOfTopicsData = gql`
  fragment EditablePartOfTopicsData on Topic {
    _id
    partOfTopics {
      partOfTopic {
        ...TopicBadgeData
      }
    }
  }
  ${TopicBadgeData}
`;

interface StatelessEditablePartOfTopicsProps {
  partOfTopics?: TopicBadgeDataFragment[];
  editable?: boolean;
  isLoading?: boolean;
  onRemove: (topiclId: string) => void;
  onAdded: (topic: TopicLinkDataFragment) => void;
  align: 'right' | 'center';
}
export const StatelessEditablePartOfTopics: React.FC<StatelessEditablePartOfTopicsProps> = ({
  partOfTopics,
  editable,
  isLoading,
  onRemove,
  onAdded,
  align,
}) => {
  if (!partOfTopics?.length && !editable) return null;
  return (
    <Stack direction="column" alignItems={align === 'right' ? 'flex-end' : 'center'} spacing={2}>
      <Stack direction="row" alignItems="flex-end">
        <DirectionSignIcon boxSize="24px" />
        <Text fontWeight={600} fontSize="lg" color="gray.700">
          {partOfTopics && partOfTopics.length ? 'Also Part Of' : 'No Part Of'}
        </Text>
      </Stack>
      {partOfTopics && (
        <EditableTopicsWrapper
          displayMode="row"
          editable={editable}
          isLoading={isLoading}
          topics={partOfTopics}
          onAdded={onAdded}
          onRemove={onRemove}
        />
      )}
    </Stack>
  );
};

export const attachTopicIsPartOfTopic = gql`
  mutation attachTopicIsPartOfTopic(
    $partOfTopicId: String!
    $subTopicId: String!
    $payload: AttachTopicIsPartOfTopicPayload!
  ) {
    attachTopicIsPartOfTopic(partOfTopicId: $partOfTopicId, subTopicId: $subTopicId, payload: $payload) {
      partOfTopic {
        _id
      }
      subTopic {
        ...EditablePartOfTopicsData
      }
    }
  }
  ${TopicBadgeData}
  ${EditablePartOfTopicsData}
`;

export const detachTopicIsPartOfTopic = gql`
  mutation detachTopicIsPartOfTopic($partOfTopicId: String!, $subTopicId: String!) {
    detachTopicIsPartOfTopic(partOfTopicId: $partOfTopicId, subTopicId: $subTopicId) {
      partOfTopic {
        ...TopicBadgeData
      }
      subTopic {
        ...TopicBadgeData
        ...EditablePartOfTopicsData
      }
    }
  }
  ${TopicBadgeData}
  ${EditablePartOfTopicsData}
`;

interface EditablePartOfTopicsProps extends Omit<StatelessEditablePartOfTopicsProps, 'onAdded' | 'onRemove'> {
  topic: EditablePartOfTopicsDataFragment;
}
export const EditablePartOfTopics: React.FC<EditablePartOfTopicsProps> = ({ topic, ...props }) => {
  const [attachTopicIsPartOfTopicMutation] = useAttachTopicIsPartOfTopicMutation();
  const [detachTopicIsPartOfTopicMutation] = useDetachTopicIsPartOfTopicMutation();

  return (
    <StatelessEditablePartOfTopics
      partOfTopics={topic.partOfTopics?.map(({ partOfTopic }) => partOfTopic)}
      onAdded={(partOfTopic) =>
        attachTopicIsPartOfTopicMutation({
          variables: { partOfTopicId: partOfTopic._id, subTopicId: topic._id, payload: {} },
        })
      }
      onRemove={(partOfTopicId) =>
        detachTopicIsPartOfTopicMutation({
          variables: { partOfTopicId: partOfTopicId, subTopicId: topic._id },
        })
      }
      {...props}
    />
  );
};
