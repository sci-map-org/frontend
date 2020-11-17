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

const estimateNbRows = (value?: string) => Math.ceil((value?.length || 1) / 128);

export const EditableTextarea: React.FC<
  Pick<UseEditableProps, 'onSubmit' | 'placeholder' | 'isDisabled'> &
    FlexProps & { rows?: number; defaultValue?: string }
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
      <Textarea
        {...getInputProps()}
        //onKeyDown: undefined => cancel submitting on pressing Enter. Can't render line breaks without <br />,
        // so in the future just use markdown editor.
        rows={rows || estimateNbRows(defaultValue)}
      ></Textarea>
      <Text {...getPreviewProps()} {...(!defaultValue && { color: 'gray.500' })}>
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
            />
          )}
          {getPreviewProps().children}
        </>
      </Text>
    </Flex>
  );
};
