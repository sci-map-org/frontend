import { Box, FormControl, FormLabel, Flex, Stack } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import { FormFieldHelperText, FormFieldLabelStyleProps } from './Typography';

interface FieldProps {
  id?: string;
  label: string | ReactNode;
  helperText?: string;
  renderRightOfLabel?: ReactNode;
  renderTopRight?: ReactNode;
}

export const Field: React.FC<FieldProps> = ({
  id,
  label,
  helperText,
  children,
  renderRightOfLabel,
  renderTopRight,
}) => {
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
      {helperText && (
        <FormFieldHelperText pb={3} pl={4}>
          {helperText}
        </FormFieldHelperText>
      )}
      <Box pl={4}>{children}</Box>
    </FormControl>
  );
};
