import { Box, Flex } from '@chakra-ui/react';
import { Footer } from './Footer';
import { Header } from './Header';

export const Layout: React.FC = ({ children }) => {
  return (
    <Flex direction="column" alignItems="stretch" justifyContent="stretch" color="grayFont.800" minH="100%">
      <Header />
      <Box flexGrow={1}>{children}</Box>
      <Footer />
    </Flex>
  );
};
