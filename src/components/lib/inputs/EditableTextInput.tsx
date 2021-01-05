import { EditIcon } from '@chakra-ui/icons';
import { Box, Editable, EditableInput, EditablePreview, EditableProps, IconButton, Skeleton } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export const EditableTextInput: React.FC<{
  value: string;
  isLoading?: boolean;
  onChange: (newValue: string) => void;
  editMode?: boolean;
  fontSize?: EditableProps['fontSize'];
  centered?: boolean;
}> = ({ value, isLoading, onChange, editMode, fontSize = '5xl', centered }) => {
  const [updatedValue, setUpdatedValue] = useState(value);
  useEffect(() => {
    setUpdatedValue(value);
  }, [value]);
  return (
    <Skeleton isLoaded={!isLoading}>
      <Editable
        value={updatedValue}
        onChange={setUpdatedValue}
        fontSize={fontSize}
        fontWeight={600}
        color="gray.700"
        isPreviewFocusable={false}
        onSubmit={onChange}
        {...(centered && { textAlign: 'center' })}
        whiteSpace="nowrap"
        variant="solid"
        display="flex"
        isDisabled={!editMode}
      >
        {(props: any) => (
          <>
            {!props.isEditing && editMode && centered && (
              <Box w="24px" /> // used to center the title properly. Change when changing the size of the edit icon button
            )}
            <EditablePreview />
            {!props.isEditing && editMode && (
              <IconButton
                aria-label="t"
                icon={<EditIcon />}
                onClick={props.onEdit}
                size="xs"
                color="gray.700"
                variant="ghost"
                alignSelf="end"
              />
            )}
            <EditableInput />
          </>
        )}
      </Editable>
    </Skeleton>
  );
};
