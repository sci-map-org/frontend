import { Box, Flex } from '@chakra-ui/core';

export const PageLayout: React.FC<{}> = ({ children }) => {
  return (
    <Flex direction="column" px="80px" py="30px">
      {children}
    </Flex>
  );
};
