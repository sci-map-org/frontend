import { FormControl, FormHelperText, Skeleton, Text, Textarea, TextProps } from '@chakra-ui/react';

export const ResourceDescription: React.FC<
  {
    description?: string | null;
    isLoading?: boolean;
  } & Pick<TextProps, 'fontSize' | 'noOfLines' | 'color'>
> = ({ description, isLoading, fontSize = 'md', ...props }) => {
  return description ? (
    <Skeleton isLoaded={!isLoading}>
      <Text fontWeight={300} fontSize={fontSize} {...props} whiteSpace="pre-wrap">
        {description}
      </Text>
    </Skeleton>
  ) : null;
};
export const ResourceDescriptionInput: React.FC<{
  value?: string;
  onChange: (value?: string) => void;
  maxLength?: number;
}> = ({ value, onChange, maxLength }) => {
  return (
    <FormControl>
      <Textarea
        isInvalid={!(!maxLength || (!!value && value.length <= maxLength))}
        id="description"
        placeholder="Description (optional)"
        size="md"
        value={value}
        onChange={(e) => onChange(e.target.value || undefined)}
      ></Textarea>
      {maxLength && (
        <FormHelperText textAlign="right" id="description-helper-text">
          {value ? value.length : 0}/{maxLength}
        </FormHelperText>
      )}
    </FormControl>
  );
};
