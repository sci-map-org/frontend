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
  Pick<UseEditableProps, 'onSubmit' | 'defaultValue' | 'placeholder' | 'isDisabled'> & FlexProps & { rows?: number }
> = ({ defaultValue, onSubmit, isDisabled, placeholder, rows, ...flexProps }) => {
  const { getInputProps, getPreviewProps, isEditing, onEdit } = useEditable({
    placeholder,
    onSubmit,
    defaultValue,
    isDisabled,
    isPreviewFocusable: false,
  });
  return (
    <Flex {...flexProps}>
      <Textarea rows={rows} {...getInputProps()}></Textarea>
      <Text {...getPreviewProps()}></Text>
      {!isEditing && !isDisabled && (
        <IconButton
          aria-label="t"
          icon={<EditIcon />}
          onClick={onEdit}
          size="xs"
          color="gray.600"
          variant="ghost"
          alignSelf="end"
        />
      )}
    </Flex>
  );
};
