import { EditIcon } from '@chakra-ui/icons';
import {
  Flex,
  FlexProps,
  IconButton,
  Skeleton,
  Text,
  Textarea,
  TextProps,
  useEditable,
  UseEditableProps,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const estimateNbRows = (value?: string) =>
  value ? Math.ceil(value.length / 128) + value.split(/\r\n|\r|\n/).length : 1;

export interface EditableTextareaProps
  extends Pick<UseEditableProps, 'onSubmit' | 'placeholder' | 'isDisabled'>,
    Omit<FlexProps, 'onSubmit'> {
  minRows?: number;
  rows?: number;
  defaultValue?: string;
  isLoading?: boolean;
  previewProps?: TextProps;
}
export const EditableTextarea: React.FC<EditableTextareaProps> = ({
  defaultValue,
  onSubmit,
  isDisabled,
  placeholder,
  rows,
  minRows,
  isLoading,
  previewProps,
  ...flexProps
}) => {
  const [updatedValue, setUpdatedValue] = useState(defaultValue);
  useEffect(() => {
    setUpdatedValue(defaultValue);
  }, [defaultValue]);
  const { getInputProps, getPreviewProps, isEditing, onEdit } = useEditable({
    placeholder,
    onSubmit,
    value: updatedValue,
    isDisabled,
    isPreviewFocusable: false,
    onChange: setUpdatedValue,
  });

  return (
    <Flex {...flexProps}>
      <Textarea
        {...getInputProps()}
        onKeyDown={(e) => undefined}
        rows={rows || (!minRows || estimateNbRows(defaultValue) > minRows ? estimateNbRows(defaultValue) : minRows)}
      ></Textarea>
      <Skeleton isLoaded={!isLoading}>
        {!(isDisabled && !defaultValue) && (
          <Text
            {...getPreviewProps()}
            {...(!defaultValue && { color: 'gray.500' })}
            whiteSpace="pre-wrap"
            {...previewProps}
          >
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
                  // mb={2} Check if breaks other stuff. necessary in ConceptGroup (edit/non edit height)
                />
              )}
              {getPreviewProps().children}
            </>
          </Text>
        )}
      </Skeleton>
    </Flex>
  );
};
