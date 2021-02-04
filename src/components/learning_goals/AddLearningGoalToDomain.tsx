import { Button, ButtonGroup, Center, Input, InputGroup, InputLeftAddon, Stack, Textarea } from '@chakra-ui/react';
import { useState } from 'react';
import { DomainDataFragment } from '../../graphql/domains/domains.fragments.generated';
import { LearningGoalDataFragment } from '../../graphql/learning_goals/learning_goals.fragments.generated';
import { useAddLearningGoalToDomainMutation } from '../../graphql/learning_goals/learning_goals.operations.generated';
import { AddLearningGoalToDomainPayload, LearningGoalBelongsToDomain, LearningGoalType } from '../../graphql/types';
import { generateUrlKey } from '../../services/url.service';
import { getChakraRelativeSize } from '../../util/chakra.util';
import { FormButtons } from '../lib/buttons/FormButtons';

interface AddLearningGoalToDomainProps {
  domain: DomainDataFragment;
  onCreated?: (
    learningGoal: LearningGoalDataFragment,
    relationship: Omit<LearningGoalBelongsToDomain, 'learningGoal' | 'domain'>,
    domain: DomainDataFragment
  ) => void;
  onCancel: () => void;
  size?: 'sm' | 'md' | 'lg';
  defaultPayload?: Partial<AddLearningGoalToDomainPayload>;
}
export const AddLearningGoalToDomain: React.FC<AddLearningGoalToDomainProps> = ({
  domain,
  onCancel,
  onCreated,
  size = 'md',
  defaultPayload,
}) => {
  const [addLearningGoalToDomain] = useAddLearningGoalToDomainMutation();
  const [contextualName, setContextualName] = useState(defaultPayload?.contextualName || '');
  const [contextualKey, setContextualKey] = useState(defaultPayload?.contextualKey || '');
  const [description, setDescription] = useState(defaultPayload?.description || undefined);
  const [type, setType] = useState(defaultPayload?.type || LearningGoalType.Roadmap);
  return (
    <Stack spacing={4} direction="column" alignItems="stretch">
      <Center>
        <Stack direction="row">
          <ButtonGroup size="sm" isAttached variant="outline">
            <Button
              mr="-px"
              isActive={type === LearningGoalType.Roadmap}
              _focus={{}}
              onClick={() => setType(LearningGoalType.Roadmap)}
            >
              Roadmap
            </Button>
            <Button
              _focus={{}}
              isActive={type === LearningGoalType.SubGoal}
              onClick={() => setType(LearningGoalType.SubGoal)}
            >
              Concept Group
            </Button>
          </ButtonGroup>
        </Stack>
      </Center>
      <InputGroup size={size}>
        <InputLeftAddon px={2} children={`${domain.name} - `} />
        <Input
          placeholder="Learning Goal Name"
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
        size={size}
        variant="flushed"
        value={contextualKey}
        onChange={(e) => setContextualKey(e.target.value)}
      ></Input>
      <Textarea
        placeholder="Description"
        size={size}
        variant="flushed"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></Textarea>
      <FormButtons
        isPrimaryDisabled={!contextualName || !contextualKey}
        onCancel={() => onCancel()}
        size={getChakraRelativeSize(size, 1)}
        onPrimaryClick={async () => {
          const { data } = await addLearningGoalToDomain({
            variables: {
              domainId: domain._id,
              payload: {
                contextualName,
                contextualKey,
                description,
                public: true,
                type,
              },
            },
          });
          if (!data) throw new Error('no data returned');
          const domainRel = data.addLearningGoalToDomain.learningGoal.domain;
          if (!domainRel) throw new Error('domain seems to have failed to attach to lg');
          !!onCreated && onCreated(data.addLearningGoalToDomain.learningGoal, domainRel, domainRel.domain);
        }}
      />
    </Stack>
  );
};
