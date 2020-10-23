import {
  Flex,
  FlexProps,
  IconButton,
  Text,
  Textarea,
  useEditable,
  UseEditableProps,
  useEditableState,
} from '@chakra-ui/core';
import { EditIcon } from '@chakra-ui/icons';

export const EditableTextarea: React.FC<
  Pick<UseEditableProps, 'onSubmit' | 'defaultValue' | 'placeholder'> & FlexProps
> = ({ defaultValue, onSubmit, placeholder, ...flexProps }) => {
  const { getInputProps, getPreviewProps, isEditing, onEdit } = useEditable({
    placeholder,
    onSubmit,
    defaultValue,
    isPreviewFocusable: false,
  });
  return (
    <Flex {...flexProps}>
      <Textarea {...getInputProps()}></Textarea>
      <Text {...getPreviewProps()}></Text>
      {!isEditing && (
        <IconButton aria-label="t" icon={<EditIcon />} onClick={onEdit} size="xs" color="gray.600" alignSelf="end" />
      )}
    </Flex>
  );
};
