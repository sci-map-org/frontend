import { FormControl, Textarea, FormHelperText } from '@chakra-ui/core';

export const ResourceDescriptionInput: React.FC<{ value?: string; onChange: (value?: string) => void }> = ({
  value,
  onChange,
}) => {
  return (
    <FormControl isInvalid={!!value && value.length > 200}>
      <Textarea
        id="description"
        placeholder="Description (optional)"
        size="md"
        value={value}
        onChange={(e) => onChange(e.target.value || undefined)}
      ></Textarea>
      <FormHelperText textAlign="right" id="description-helper-text">
        {value ? value.length : 0}/200
      </FormHelperText>
    </FormControl>
  );
};

export const shortenDescription = (description: string, maxLength = 200) => {
  return description.length > maxLength ? description.slice(0, maxLength) + '...' : description;
};
