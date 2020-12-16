import { Button, ButtonGroup, Flex, Input, InputGroup, InputLeftAddon, Stack, Textarea } from '@chakra-ui/react';
import Router from 'next/router';
import { useState } from 'react';
import { DomainDataFragment } from '../../graphql/domains/domains.fragments.generated';
import { useAddLearningGoalToDomainMutation } from '../../graphql/learning_goals/learning_goals.operations.generated';
import { DomainLearningGoalPageInfo } from '../../pages/learning_goals/DomainLearningGoalPage';
import { routerPushToPage } from '../../pages/PageInfo';
import { generateUrlKey } from '../../services/url.service';

export const AddLearningGoalToDomain: React.FC<{ domain: DomainDataFragment; onCancel?: () => void }> = ({
  domain,
  onCancel,
}) => {
  const [addLearningGoalToDomain] = useAddLearningGoalToDomainMutation();
  const [contextualName, setContextualName] = useState('');
  const [contextualKey, setContextualKey] = useState('');
  const [description, setDescription] = useState('');
  return (
    <Stack spacing={4} direction="column" alignItems="stretch">
      <InputGroup>
        <InputLeftAddon px={2} children={`${domain.name} - `} />
        <Input
          placeholder="Learning Goal Name"
          size="md"
          pl={2}
          variant="flushed"
          value={contextualName}
          onChange={(e) => {
            if (contextualKey === generateUrlKey(contextualName)) setContextualKey(generateUrlKey(e.target.value));
            setContextualName(e.target.value);
          }}
        ></Input>
      </InputGroup>
      <Input
        placeholder="Learning Goal Url Key"
        size="md"
        variant="flushed"
        value={contextualKey}
        onChange={(e) => setContextualKey(e.target.value)}
      ></Input>
      <Textarea
        placeholder="Description"
        size="md"
        variant="flushed"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></Textarea>
      <Flex justifyContent="flex-end">
        <ButtonGroup spacing={8}>
          <Button size="lg" w="18rem" variant="outline" onClick={() => (onCancel && onCancel()) || Router.back()}>
            Cancel
          </Button>
          <Button
            size="lg"
            w="18rem"
            variant="solid"
            colorScheme="brand"
            onClick={() =>
              addLearningGoalToDomain({
                variables: {
                  domainId: domain._id,
                  payload: {
                    contextualName,
                    contextualKey,
                    description,
                  },
                },
              }).then(
                ({ data }) =>
                  data &&
                  data.addLearningGoalToDomain.learningGoal.domain &&
                  routerPushToPage(DomainLearningGoalPageInfo(domain, data.addLearningGoalToDomain.learningGoal.domain))
              )
            }
          >
            Add
          </Button>
        </ButtonGroup>
      </Flex>
    </Stack>
  );
};
