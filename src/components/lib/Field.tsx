import { Box, FormControl, FormLabel } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

interface FieldProps {
  id?: string;
  label: string | ReactNode;
}

export const Field: React.FC<FieldProps> = ({ id, label, children }) => {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Box pl={4}>{children}</Box>
    </FormControl>
  );
};
