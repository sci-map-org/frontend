import { CloseIcon } from '@chakra-ui/icons';
import { IconButton, Input, Link, Stack } from '@chakra-ui/react';

export interface TopicNameAlias {
  id: string;
  value: string;
}

interface TopicAliasesFieldProps {
  aliases: TopicNameAlias[];
  onChange: (aliases: TopicNameAlias[]) => void;
}

export const TopicAliasesField: React.FC<TopicAliasesFieldProps> = ({ aliases, onChange }) => {
  return (
    <Stack spacing={1}>
      {aliases.map((alias) => (
        <Stack key={alias.id} direction="row" alignItems="center" spacing={1}>
          <Input
            size="xs"
            placeholder="e.g. NLP"
            value={alias.value}
            onChange={(e) => {
              const updatedAliases = [...aliases];
              const index = updatedAliases.findIndex(({ id }) => id === alias.id);
              updatedAliases[index].value = e.target.value;
              onChange(updatedAliases);
            }}
          />
          <IconButton
            aria-label="remove alias"
            icon={<CloseIcon />}
            variant="ghost"
            size="xs"
            onClick={() => {
              let updatedAliases = [...aliases];
              const index = updatedAliases.findIndex(({ id }) => id === alias.id);
              updatedAliases.splice(index, 1);
              onChange(updatedAliases);
            }}
          />
        </Stack>
      ))}
      <Link
        color="blue.500"
        fontSize="sm"
        onClick={() =>
          onChange([
            ...aliases,
            {
              id: Math.random().toString(),
              value: '',
            },
          ])
        }
      >
        Add alias
      </Link>
    </Stack>
  );
};
