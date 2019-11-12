import { Box } from '@chakra-ui/core';
import { Header } from './Header';

export const Layout: React.FC = ({ children }) => {
  return (
    <Box>
      <Header />
      {children}
    </Box>
  );
};
