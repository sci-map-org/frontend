import { Image } from '@chakra-ui/image';
import { Center, Flex, Link, Stack, Text } from '@chakra-ui/layout';

export const Footer: React.FC<{}> = () => {
  return (
    <Flex direction="column" alignItems="stretch">
      <Image src="./static/caravan_bg2.svg" mt={16} mb={-1} />
      <Flex
        bgColor="gray.600"
        w="100%"
        px={{ base: '2%', md: '5%', lg: '8%' }}
        pt={5}
        pb={10}
        justifyContent="space-between"
        color="white"
      >
        <Center w="40%" mr={4}>
          <Text fontSize="lg" fontWeight={500}>
            © 2021 Sci-Map.org
          </Text>
        </Center>
        <Stack direction="row" spacing={{ base: 3, sm: 5, md: 12, lg: 20 }}>
          <Stack direction="column" spacing={2}>
            <Link href="https://github.com/sci-map-org/" isExternal>
              Github
            </Link>
            <Link href="https://twitter.com/sci_map_org" isExternal>
              Twitter
            </Link>
            <Link href="https://forum.sci-map.org/" isExternal>
              Forum
            </Link>
          </Stack>
          <Stack direction="column" spacing={2}>
            <Link href="/about" isExternal>
              About Sci-Map.org
            </Link>
            <Link href="mailto:olivier@sci-map.org">Contact</Link>
          </Stack>
          <Stack direction="column" spacing={2}>
            <Link href="https://forum.sci-map.org/c/tech/bugs/8" isExternal>
              Report a bug
            </Link>
            <Link href="https://forum.sci-map.org/c/tech/feature-requests/9" isExternal>
              Suggest a feature
            </Link>
            <Link href="/about/contributing" isExternal>
              Contribute
            </Link>
          </Stack>
        </Stack>
      </Flex>
    </Flex>
  );
};
