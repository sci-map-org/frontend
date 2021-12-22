import { Box, FormControl, FormLabel, Flex, Stack } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import { FormFieldHelperText, FormFieldLabelStyleProps } from './Typography';

export interface FieldProps {
  label: string | ReactNode;
  helperText?: string;
  renderRightOfLabel?: ReactNode;
  renderTopRight?: ReactNode;
}

export const Field: React.FC<FieldProps> = ({ label, helperText, children, renderRightOfLabel, renderTopRight }) => {
  return (
    <FormControl display="flex" flexDir="column" w="unset">
      <Flex justifyContent="space-between" pb={1}>
        <Stack direction="row" spacing={1} alignItems="baseline">
          <FormLabel {...FormFieldLabelStyleProps} w="unset">
            {label}
          </FormLabel>
          {renderRightOfLabel}
        </Stack>
        {renderTopRight}
      </Flex>
      <Flex direction="column" pl={4}>
        {helperText && <FormFieldHelperText pb={3}>{helperText}</FormFieldHelperText>}
        {children}
      </Flex>
    </FormControl>
  );
};
