import { InputProps, InputGroup, Input, InputRightElement, Button } from '@chakra-ui/core';
import { useState } from 'react';

export const PasswordInput: React.FC<InputProps> = props => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <InputGroup size="md">
      <Input
        pr="4.5rem"
        variant="flushed"
        type={showPassword ? 'text' : 'password'}
        placeholder="Enter password"
        {...props}
      />
      <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};
