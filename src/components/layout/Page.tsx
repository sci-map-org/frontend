import { Box, Flex } from '@chakra-ui/core';

export const PageLayout: React.FC<{}> = ({ children }) => {
  return (
    <Flex direction="column" px={50} py={50} mx={50} mt={10} borderWidth={1} borderRadius={2}>
      {children}
    </Flex>
  );
};
