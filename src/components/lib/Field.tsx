import { Box, FormControl, FormLabel } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import { FormFieldLabelStyleProps } from './Typography';

interface FieldProps {
  id?: string;
  label: string | ReactNode;
}

export const Field: React.FC<FieldProps> = ({ id, label, children }) => {
  return (
    <FormControl w="unset">
      <FormLabel {...FormFieldLabelStyleProps}>{label}</FormLabel>
      <Box pl={4}>{children}</Box>
    </FormControl>
  );
};
