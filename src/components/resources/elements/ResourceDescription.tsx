import { FormControl, FormHelperText, Skeleton, Text, Textarea } from '@chakra-ui/react';

export const ResourceDescription: React.FC<{
  description?: string | null;
  noOfLines?: number;
  isLoading?: boolean;
}> = ({ description, noOfLines, isLoading }) => {
  return description ? (
    <Skeleton isLoaded={!isLoading}>
      <Text fontWeight={300} noOfLines={noOfLines}>
        {description}
      </Text>
    </Skeleton>
  ) : null;
};
export const ResourceDescriptionInput: React.FC<{
  value?: string;
  onChange: (value?: string) => void;
  maxLength?: number;
}> = ({ value, onChange, maxLength = 1000 }) => {
  return (
    <FormControl isInvalid={!!value && value.length > maxLength}>
      <Textarea
        id="description"
        placeholder="Description (optional)"
        size="md"
        value={value}
        onChange={(e) => onChange(e.target.value || undefined)}
      ></Textarea>
      <FormHelperText textAlign="right" id="description-helper-text">
        {value ? value.length : 0}/{maxLength}
      </FormHelperText>
    </FormControl>
  );
};

export const shortenDescription = (description: string, maxLength = 200) => {
  return description.length > maxLength ? description.slice(0, maxLength) + '...' : description;
};
