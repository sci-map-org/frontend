import { Box } from '@chakra-ui/react';
import { Footer } from './Footer';
import { Header } from './Header';

export const Layout: React.FC = ({ children }) => {
  return (
    <Box color="grayFont.800">
      <Header />
      {children}
      <Footer />
    </Box>
  );
};
