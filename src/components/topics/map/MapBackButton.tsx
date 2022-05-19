import { Icon } from '@chakra-ui/icons';
import { Flex, Link } from '@chakra-ui/react';
import { BsArrowReturnLeft } from '@react-icons/all-files/bs/BsArrowReturnLeft';

export const MapBackButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <Flex opacity={0.7} _hover={{ opacity: 1 }}>
      <Link
        color="white"
        display="flex"
        onClick={() => onClick()}
        py={1}
        fontWeight={600}
        _hover={{}}
        alignItems="center"
      >
        <Icon as={BsArrowReturnLeft} boxSize={6} mr="2px" pt="4px" />
        Back
      </Link>
    </Flex>
  );
};
