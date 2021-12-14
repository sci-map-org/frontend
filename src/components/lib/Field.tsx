import { Box, FormControl, FormLabel, Flex } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import { FormFieldLabelStyleProps } from './Typography';

interface FieldProps {
  id?: string;
  label: string | ReactNode;
  renderTopRight?: ReactNode;
}

export const Field: React.FC<FieldProps> = ({ id, label, children, renderTopRight }) => {
  return (
    <FormControl display="flex" flexDir="column" w="unset">
      <Flex justifyContent="space-between">
        <FormLabel {...FormFieldLabelStyleProps} w="unset">
          {label}
        </FormLabel>
        {renderTopRight}
      </Flex>
      <Box pl={4}>{children}</Box>
    </FormControl>
  );
};
