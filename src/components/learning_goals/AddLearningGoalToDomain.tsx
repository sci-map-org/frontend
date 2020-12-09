import { Button, ButtonGroup, Flex, Input, InputGroup, InputLeftAddon, Stack, Textarea } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { useState } from 'react';
import { DomainData } from '../../graphql/domains/domains.fragments';
import { DomainDataFragment } from '../../graphql/domains/domains.fragments.generated';
import { LearningGoalData } from '../../graphql/learning_goals/learning_goals.fragments';
import { DomainLearningGoalPageInfo } from '../../pages/learning_goals/DomainLearningGoalPage';
import { routerPushToPage } from '../../pages/PageInfo';
import { generateUrlKey } from '../../services/url.service';
import { useAddLearningGoalToDomainMutation } from './AddLearningGoalToDomain.generated';

export const addLearningGoalToDomain = gql`
  mutation addLearningGoalToDomain($domainId: String!, $payload: AddLearningGoalToDomainPayload!) {
    addLearningGoalToDomain(domainId: $domainId, payload: $payload) {
      learningGoal {
        ...LearningGoalData
        domain {
          domain {
            ...DomainData
          }
          contextualKey
          contextualName
        }
      }
    }
  }
  ${DomainData}
  ${LearningGoalData}
`;
export const AddLearningGoalToDomain: React.FC<{ domain: DomainDataFragment }> = ({ domain }) => {
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
          <Button size="lg" w="18rem" variant="outline" onClick={() => console.log('cancel')}>
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
