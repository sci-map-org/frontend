import { Flex, Box } from '@chakra-ui/core';
import { ReactNode } from 'react';

export const ArticleLayout: React.FC<{ renderLeft: ReactNode; renderRight: ReactNode }> = ({
  children,
  renderLeft,
  renderRight,
}) => {
  return (
    <Flex color="grayFont.700" direction="row" width="100%" height="100%" alignItems="stretch" pb="100px">
      <Box flexBasis="100px" flex="8 0 20px">
        {renderLeft}
      </Box>
      <Box flex="0 1 750px">{children}</Box>
      <Box flexBasis="100px" flex="10 0 30px">
        {renderRight}
      </Box>
    </Flex>
  );
};
