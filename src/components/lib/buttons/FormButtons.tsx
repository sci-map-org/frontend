import { Button, ButtonGroup, Flex } from '@chakra-ui/react';
import { StandardChakraSize } from '../../../util/chakra.util';

interface FormButtonsProps {
  size?: StandardChakraSize;
  onCancel: () => void;
  onPrimaryClick: () => void;
  isLoading?: boolean;
  isPrimaryDisabled?: boolean;
}
export const FormButtons: React.FC<FormButtonsProps> = ({
  size = 'md',
  onCancel,
  onPrimaryClick,
  isLoading,
  isPrimaryDisabled,
}) => {
  return (
    <Flex justifyContent="flex-end">
      <ButtonGroup size={size} spacing={8} w="60%" minWidth="25rem">
        <Button variant="outline" w="50%" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          isLoading={isLoading}
          w="50%"
          size="lg"
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
