import { Box, Flex } from '@chakra-ui/core';
import { NewResource } from '../../src/components/resources/NewResource';

const NewResourcePage: React.FC = () => {
  return (
    <Flex direction="column" alignItems="center">
      <Box width="46rem">
        <NewResource />
      </Box>
    </Flex>
  );
};

export default NewResourcePage;
