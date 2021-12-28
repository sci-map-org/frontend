import { Button, Stack, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { TopicLinkDataFragment } from '../../../graphql/topics/topics.fragments.generated';
import { useUpdateTopicContextMutation } from '../../../graphql/topics/topics.operations.generated';
import { routerPushToPage } from '../../../pages/PageInfo';
import { ManageTopicPageInfo } from '../../../pages/RoutesPageInfos';
import { useGetTopicValidContextsQuery } from '../tree/SubTopicsTree.generated';
import { SelectContextTopic } from './TopicNameField';

interface TopicContextEditorProps {
  topic: TopicLinkDataFragment;
  parentTopic: TopicLinkDataFragment;
  contextTopic: TopicLinkDataFragment;
}

export const TopicContextEditor: React.FC<TopicContextEditorProps> = ({ topic, parentTopic, contextTopic }) => {
  const { data } = useGetTopicValidContextsQuery({
    variables: { parentTopicId: parentTopic._id, topicId: topic._id },
    onCompleted(r) {
      if (!r.getTopicValidContexts.validContexts?.length) throw new Error(`No valid contexts found for ${topic._id}`);
    },
  });
  const [updateTopicContextMutation] = useUpdateTopicContextMutation();
  const [newContext, setNewContext] = useState<TopicLinkDataFragment>();

  return (
    <Stack alignItems="center">
      <Text fontWeight={700} color="gray.500">
        Context
      </Text>
      {data?.getTopicValidContexts.validContexts && (
        <SelectContextTopic
          contexts={data.getTopicValidContexts.validContexts}
          selectedContext={newContext || contextTopic}
          onSelect={(context) => setNewContext(context)}
        />
      )}
      {newContext && newContext._id !== contextTopic?._id && (
        <Button
          colorScheme="blue"
          onClick={async () => {
            const { data } = await updateTopicContextMutation({
              variables: { topicId: topic._id, contextTopicId: newContext._id },
            });
            data && routerPushToPage(ManageTopicPageInfo(data.updateTopicContext));
            setNewContext(undefined);
          }}
          size="sm"
        >
          Save
        </Button>
      )}
    </Stack>
  );
};
