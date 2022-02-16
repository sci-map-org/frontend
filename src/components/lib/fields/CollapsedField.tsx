import { ChevronDownIcon, ChevronUpIcon, Icon } from '@chakra-ui/icons';
import { Box, Collapse, Flex } from '@chakra-ui/react';
import { FieldProps } from './Field';
import { FormFieldHelperText, FormFieldLabel } from '../Typography';

interface CollapsedFieldProps extends FieldProps {
  isOpen: boolean;
  onToggle: () => void;
  alignLabel?: 'left' | 'right';
}

export const CollapsedField: React.FC<CollapsedFieldProps> = ({
  isOpen,
  onToggle,
  label,
  alignLabel = 'left',
  helperText,
  children,
  isInvalid,
  ...props
}) => {
  return (
    <Flex direction="column" alignItems="stretch" {...props}>
      <Flex
        justifyContent={alignLabel === 'left' ? 'flex-start' : 'flex-end'}
        w="100%"
        alignItems="center"
        _hover={{ cursor: 'pointer' }}
        onClick={onToggle}
      >
        <FormFieldLabel mr={2}>{label}</FormFieldLabel>
        <Icon as={isOpen ? ChevronUpIcon : ChevronDownIcon} boxSize={6} {...(isInvalid && { color: 'red.500' })} />
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <Flex direction="column" pl={4}>
          {helperText && <FormFieldHelperText pb={3}>{helperText}</FormFieldHelperText>}
          <Box mt={3} pr={0}>
            {children}
          </Box>
        </Flex>
      </Collapse>
    </Flex>
  );
};
