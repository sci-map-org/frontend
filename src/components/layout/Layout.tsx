import { Box, Divider } from '@chakra-ui/core';
import { Header } from './Header';

export const Layout: React.FC = ({ children }) => {
  return (
    <Box color="grayFont.800">
      <Header />
      {children}
    </Box>
  );
};
