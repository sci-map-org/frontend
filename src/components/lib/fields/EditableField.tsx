import { Button, Flex, Link, Stack } from '@chakra-ui/react';
import { ReactNode, useRef, useState } from 'react';
import { EditLinkStyleProps } from '../Typography';
import { Field, FieldProps } from './Field';

interface EditableFieldProps extends Omit<FieldProps, 'renderRightOfLabel'> {
  editModeChildren?: ReactNode;
  editModeRenderField?: ReactNode;
  onSave: () => Promise<void>;
  disableSaveButton?: boolean;
}

export const EditableField: React.FC<EditableFieldProps> = ({
  editModeChildren,
  editModeRenderField,
  onSave,
  children,
  disableSaveButton,
  ...props
}) => {
  const [editMode, setEditMode] = useState(false);
  const fieldRef = useRef<HTMLDivElement | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const buttonStack = (
    <Stack spacing={1}>
      <Button
        colorScheme="blue"
        size="xs"
        isLoading={isSaving}
        isDisabled={disableSaveButton}
        onClick={async () => {
          setIsSaving(true);
          await onSave();
          setIsSaving(false);
          setEditMode(false);
        }}
      >
        Save
      </Button>
      <Button
        colorScheme="red"
        variant="outline"
        size="xs"
        onClick={() => {
          setEditMode(false);
        }}
      >
        Cancel
      </Button>
    </Stack>
  );
  if (editMode && editModeRenderField)
    return (
      <Flex direction="row">
        <Flex flexGrow={1}>{editModeRenderField}</Flex>
        <Flex direction="column" pl={10}>
          {buttonStack}
        </Flex>
      </Flex>
    );
  return (
    <Field
      ref={fieldRef}
      {...props}
      renderRightOfLabel={
        !editMode && (
          <Link {...EditLinkStyleProps} mb="8px" onClick={() => setEditMode(true)} ml="2px">
            edit
          </Link>
        )
      }
    >
      {editMode ? (
        <Flex direction="row" alignItems="stretch" flexGrow={1}>
          <Flex flexGrow={1}>{editModeChildren}</Flex>
          <Flex direction="column" pl={10}>
            {buttonStack}
          </Flex>
        </Flex>
      ) : (
        children
      )}
    </Field>
  );
};
