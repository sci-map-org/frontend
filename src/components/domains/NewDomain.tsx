import { Input, Stack, Textarea } from '@chakra-ui/react';
import { useState } from 'react';
import { DomainDataFragment } from '../../graphql/domains/domains.fragments.generated';
import { useCreateDomain } from '../../graphql/domains/domains.hooks';
import { useAddDomainBelongsToDomainMutation } from '../../graphql/domains/domains.operations.generated';
import { CreateDomainPayload } from '../../graphql/types';
import { generateUrlKey } from '../../services/url.service';
import { getChakraRelativeSize } from '../../util/chakra.util';
import { FormButtons } from '../lib/buttons/FormButtons';

interface NewDomainFormProps {
  onCreate: (payload: CreateDomainPayload) => void;
  onCancel: () => void;
  defaultPayload?: Partial<CreateDomainPayload>;
  size?: 'md' | 'lg' | 'sm';
}
const NewDomainForm: React.FC<NewDomainFormProps> = ({ defaultPayload, size = 'md', onCancel, onCreate }) => {
  const [name, setName] = useState(defaultPayload?.name || '');
  const [key, setKey] = useState(defaultPayload?.key || '');

  const [description, setDescription] = useState(defaultPayload?.description || undefined);
  return (
    <Stack spacing={4} w="100%">
      <Input
        placeholder="Name"
        size={size}
        variant="flushed"
        value={name}
        onChange={(e) => {
          if (key === generateUrlKey(name)) setKey(generateUrlKey(e.target.value));
          setName(e.target.value);
        }}
      ></Input>
      <Input
        placeholder="Key"
        size={size}
        variant="flushed"
        value={key}
        onChange={(e) => setKey(e.target.value)}
      ></Input>
      <Textarea
        placeholder="Description"
        size={size}
        variant="flushed"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></Textarea>

      <FormButtons
        isPrimaryDisabled={!name}
        onCancel={() => onCancel()}
        size={getChakraRelativeSize(size, 1)}
        onPrimaryClick={() => onCreate({ name, key, description })}
      />
    </Stack>
  );
};

interface NewDomainProps {
  parentDomainId?: string;
  defaultPayload?: Partial<CreateDomainPayload>;
  onCreated?: (createdDomain: DomainDataFragment) => void;
  onCancel: () => void;
  size?: 'md' | 'lg' | 'sm';
}

export const NewDomain: React.FC<NewDomainProps> = ({ parentDomainId, defaultPayload, onCreated, onCancel, size }) => {
  const { createDomain } = useCreateDomain();
  const [addDomainBelongsToDomainMutation] = useAddDomainBelongsToDomainMutation();
  return (
    <NewDomainForm
      onCreate={async (payload) => {
        const { data } = await createDomain({ variables: { payload } });
        if (!data) throw new Error();
        if (parentDomainId)
          await addDomainBelongsToDomainMutation({ variables: { parentDomainId, subDomainId: data.createDomain._id } });
        !!onCreated && onCreated(data.createDomain);
      }}
      onCancel={onCancel}
      defaultPayload={defaultPayload}
      size={size}
    />
  );
};
