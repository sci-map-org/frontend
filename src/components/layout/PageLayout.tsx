import { Box, Flex } from '@chakra-ui/core';

export const PageLayout: React.FC<{ mode?: 'form' }> = ({ children, mode }) => {
  return (
    <Flex direction="column" px={mode === 'form' ? '10rem' : '80px'} py="30px">
      {children}
    </Flex>
  );
};
