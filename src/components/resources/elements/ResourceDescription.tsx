import { FormControl, FormHelperText, Skeleton, Text, Textarea, TextProps } from '@chakra-ui/react';

const sizesMapping = {
  sm: {
    fontSize: '15px',
  },
  md: {
    fontSize: '17px',
  },
};
export const ResourceDescription: React.FC<
  {
    description?: string | null;
    isLoading?: boolean;
    size?: 'sm' | 'md';
  } & Pick<TextProps, 'noOfLines' | 'color'>
> = ({ description, isLoading, size = 'md', ...props }) => {
  return description ? (
    <Skeleton isLoaded={!isLoading}>
      <Text
        fontWeight={400}
        color="gray.600"
        fontSize={sizesMapping[size].fontSize}
        {...props}
        whiteSpace="pre-wrap"
        letterSpacing="-0.015em"
      >
        {description}
      </Text>
    </Skeleton>
  ) : null;
};

export const RESOURCE_DESCRIPTION_MAX_LENGTH = 1000;

export const ResourceDescriptionInput: React.FC<{
  value?: string;
  onChange: (value?: string) => void;
  isInvalid?: boolean;
}> = ({ value, onChange, isInvalid }) => {
  return (
    <FormControl>
      <Textarea
        placeholder="Write a description of this resource"
        size="md"
        minH="180px"
        value={value}
        onChange={(e) => onChange(e.target.value || undefined)}
        isInvalid={isInvalid || (!!value && value.length > RESOURCE_DESCRIPTION_MAX_LENGTH)}
      ></Textarea>
      <FormHelperText textAlign="right" id="description-helper-text">
        {value ? value.length : 0}/{RESOURCE_DESCRIPTION_MAX_LENGTH}
      </FormHelperText>
    </FormControl>
  );
};
