import { Box } from '@chakra-ui/core';

export const Layout: React.FC = ({ children }) => {
  return <Box height="4rem" bg="gray.100">{children}</Box>;
};
