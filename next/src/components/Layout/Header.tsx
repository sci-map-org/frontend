import { Box, Link } from '@chakra-ui/core';
import { HeaderLink } from './HeaderLink';

export const Header: React.FC = () => {
  return (
    <Box py={2} bg="gray.200" pl={2} fontSize="lg" display="flex" flexDirection="row">
      <HeaderLink to="/">Apollo Project</HeaderLink>
      <Box flexGrow={1} />
      <HeaderLink to="/about">About</HeaderLink>
      <HeaderLink to="/register">Register</HeaderLink>
      <HeaderLink to="/login">Login</HeaderLink>
    </Box>
  );
};
