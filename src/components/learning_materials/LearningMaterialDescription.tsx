import { FormControl, FormHelperText, Skeleton, Text, Textarea, TextProps } from '@chakra-ui/react';
import { EditableTextarea, EditableTextareaProps } from '../lib/inputs/EditableTextarea';
import { LearningMaterialDescriptionStyleProps } from '../lib/Typography';

export const LearningMaterialDescription: React.FC<
  {
    description?: string | null;
    isLoading?: boolean;
    size?: 'sm' | 'md';
  } & Pick<TextProps, 'noOfLines' | 'color'>
> = ({ description, isLoading, size = 'md', ...props }) => {
  return description ? (
    <Skeleton isLoaded={!isLoading}>
      <Text {...LearningMaterialDescriptionStyleProps(size)} {...props}>
        {description}
      </Text>
    </Skeleton>
  ) : null;
};

export const RESOURCE_DESCRIPTION_MAX_LENGTH = 1000;

export const LearningMaterialDescriptionInput: React.FC<{
  value?: string;
  onChange: (value?: string) => void;
  isInvalid?: boolean;
  placeholder?: string;
}> = ({ value, onChange, isInvalid, placeholder = 'Write a description of this resource' }) => {
  return (
    <FormControl>
      <Textarea
        placeholder={placeholder}
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

export const EditableLearningMaterialDescription: React.FC<Omit<EditableTextareaProps, 'previewProps'>> = (props) => {
  return <EditableTextarea {...props} previewProps={LearningMaterialDescriptionStyleProps()} />;
};
