import { Link } from '@chakra-ui/core';
import NextLink from 'next/link';

export const HeaderLink: React.FC<{ to: string }> = ({ to, children }) => {
  return (
    <NextLink href={to}>
      <Link mx={2}>{children}</Link>
    </NextLink>
  );
};
