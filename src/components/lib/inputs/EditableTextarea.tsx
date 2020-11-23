import { EditIcon } from '@chakra-ui/icons';
import { Flex, FlexProps, IconButton, Skeleton, Text, Textarea, useEditable, UseEditableProps } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const estimateNbRows = (value?: string) => Math.ceil((value?.length || 1) / 128);

export const EditableTextarea: React.FC<
  Pick<UseEditableProps, 'onSubmit' | 'placeholder' | 'isDisabled'> &
    FlexProps & { rows?: number; defaultValue?: string; isLoading?: boolean }
> = ({ defaultValue, onSubmit, isDisabled, placeholder, rows, isLoading, ...flexProps }) => {
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
        //onKeyDown: undefined => cancel submitting on pressing Enter. Can't render line breaks without <br />,
        // so in the future just use markdown editor.
        rows={rows || estimateNbRows(defaultValue)}
      ></Textarea>
      <Skeleton isLoaded={!isLoading}>
        {(!isDisabled || defaultValue) && (
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
        )}
      </Skeleton>
    </Flex>
  );
};
