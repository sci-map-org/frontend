import {
  Flex,
  FlexProps,
  IconButton,
  Text,
  Textarea,
  useEditable,
  UseEditableProps,
  useEditableState,
} from '@chakra-ui/react';
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
      <Text {...getPreviewProps()}>
        <>
          {!isEditing && !isDisabled && (
            <IconButton
              aria-label="edit"
              icon={<EditIcon />}
              onClick={onEdit}
              size="xs"
              color="gray.700"
              variant="ghost"
              float="right"
              ml={2}
              mb={2}
              // position="absolute"
              // top="10px"
              // right="10px"
              // float="right"
              // alignSelf="end"
            />
          )}
          {getPreviewProps().children}
        </>
      </Text>
    </Flex>
  );
};
