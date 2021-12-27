import { Button, Flex, Link, Stack } from '@chakra-ui/react';
import { ReactNode, useRef, useState } from 'react';
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
          <Link color="blue.500" mb="8px" fontSize="sm" onClick={() => setEditMode(true)} ml="6px">
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

// Hook
// function useHover(ref: RefObject<HTMLElement>) {
//   const [value, setValue] = useState(false);
//   // const ref = useRef<HTMLElement>(null);
//   const handleMouseOver = () => setValue(true);
//   const handleMouseOut = () => setValue(false);
//   useEffect(
//     () => {
//       const node = ref.current;
//       if (node) {
//         node.addEventListener('mouseover', handleMouseOver);
//         node.addEventListener('mouseout', handleMouseOut);
//         return () => {
//           node.removeEventListener('mouseover', handleMouseOver);
//           node.removeEventListener('mouseout', handleMouseOut);
//         };
//       }
//     },
//     [ref.current] // Recall only if ref changes
//   );
//   return value;
// }

// function useHover() {
//   const [value, setValue] = useState(false);

//   // Wrap in useCallback so we can use in dependencies below
//   const handleMouseOver = useCallback(() => setValue(true), []);
//   const handleMouseOut = useCallback(() => setValue(false), []);

//   // Keep track of the last node passed to callbackRef
//   // so we can remove its event listeners.
//   const ref = useRef<HTMLElement | null>(null);

//   // Use a callback ref instead of useEffect so that event listeners
//   // get changed in the case that the returned ref gets added to
//   // a different element later. With useEffect, changes to ref.current
//   // wouldn't cause a rerender and thus the effect would run again.
//   const callbackRef = useCallback(
//     (node) => {
//       if (ref.current) {
//         ref.current.removeEventListener('mouseover', handleMouseOver);
//         ref.current.removeEventListener('mouseout', handleMouseOut);
//       }

//       ref.current = node;

//       if (ref.current) {
//         ref.current.addEventListener('mouseover', handleMouseOver);
//         ref.current.addEventListener('mouseout', handleMouseOut);
//       }
//     },
//     [handleMouseOver, handleMouseOut]
//   );

//   return [callbackRef, value] as const;
// }
