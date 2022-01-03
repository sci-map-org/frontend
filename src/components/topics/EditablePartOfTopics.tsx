import { Stack, Text, Image } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { TopicLinkData } from '../../graphql/topics/topics.fragments';
import { TopicLinkDataFragment } from '../../graphql/topics/topics.fragments.generated';
import {
  useAttachTopicIsPartOfTopicMutation,
  useDetachTopicIsPartOfTopicMutation,
} from '../../graphql/topics/topics.operations.generated';
import { DirectionSignIcon } from '../lib/icons/DirectionSignIcon';
import { EditableTopicsWrapper } from '../topics/EditableTopicsWrapper';
import { EditablePartOfTopicsDataFragment } from './EditablePartOfTopics.generated';

export const EditablePartOfTopicsData = gql`
  fragment EditablePartOfTopicsData on Topic {
    _id
    partOfTopics {
      partOfTopic {
        ...TopicLinkData
      }
    }
  }
  ${TopicLinkData}
`;

interface StatelessEditablePartOfTopicsProps {
  partOfTopics?: TopicLinkDataFragment[];
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
        <Text fontWeight={600} fontSize="lg" color="gray.700" whiteSpace="nowrap">
          {partOfTopics && partOfTopics.length ? 'Also Part Of' : 'Not Part of other topics'}
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
