import { Flex, FlexProps, FormControl, FormLabel, Stack } from '@chakra-ui/react';
import React, { forwardRef, PropsWithChildren, ReactNode } from 'react';
import { FormFieldHelperText, FormFieldLabelStyleProps } from '../Typography';

export interface FieldProps extends FlexProps {
  label: string | ReactNode;
  helperText?: string;
  renderRightOfLabel?: ReactNode;
  renderTopRight?: ReactNode;
  isInvalid?: boolean;
}

export const Field = forwardRef<HTMLDivElement, PropsWithChildren<FieldProps>>(
  ({ label, helperText, children, renderRightOfLabel, renderTopRight, isInvalid, ...props }, ref) => {
    return (
      <FormControl ref={ref} display="flex" flexDir="column" w="unset" isInvalid={isInvalid} {...props}>
        <Flex justifyContent="space-between" pb={1}>
          <Flex direction="row" alignItems="baseline">
            <FormLabel {...FormFieldLabelStyleProps} w="unset" mr={0}>
              {label}
            </FormLabel>
            {renderRightOfLabel}
          </Flex>
          {renderTopRight}
        </Flex>
        <Flex direction="column" pl={4}>
          {helperText && <FormFieldHelperText pb={3}>{helperText}</FormFieldHelperText>}
          {children}
        </Flex>
      </FormControl>
    );
  }
);
