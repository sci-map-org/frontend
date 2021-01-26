import { Button, ButtonGroup, Flex } from '@chakra-ui/react';
import { StandardChakraSize } from '../../../util/chakra.util';

interface FormButtonsProps {
  size?: StandardChakraSize;
  onCancel: () => void;
  onPrimaryClick: () => void;
  isPrimaryLoading?: boolean;
  isPrimaryDisabled?: boolean;
}
export const FormButtons: React.FC<FormButtonsProps> = ({
  size = 'md',
  onCancel,
  onPrimaryClick,
  isPrimaryLoading,
  isPrimaryDisabled,
}) => {
  return (
    <Flex justifyContent="flex-end">
      <ButtonGroup size={size} spacing={8} w="60%" minWidth="18rem">
        <Button variant="outline" w="50%" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          isLoading={isPrimaryLoading}
          w="50%"
          colorScheme="brand"
          variant="solid"
          isDisabled={isPrimaryDisabled}
          onClick={onPrimaryClick}
        >
          Create
        </Button>
      </ButtonGroup>
    </Flex>
  );
};
