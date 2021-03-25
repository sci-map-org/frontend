import { Center, Divider, Flex, Link, Stack, Text } from '@chakra-ui/layout';
import { FaDiscourse } from '@react-icons/all-files/fa/FaDiscourse';
import { RiGithubFill } from '@react-icons/all-files/ri/RiGithubFill';
import { RiTwitterLine } from '@react-icons/all-files/ri/RiTwitterLine';
import { env } from '../../env';

export const Footer: React.FC<{}> = () => {
  return (
    <Flex direction="column" alignItems="stretch">
      <Flex
        bgColor="teal.600"
        w="100%"
        px={{ base: '2%', md: '5%', lg: '8%' }}
        pt={8}
        pb={8}
        justifyContent="space-between"
        color="white"
      >
        <Flex alignItems="center" w="40%" mr={4}>
          <Text fontSize="lg" fontWeight={500}>
            © 2021 Sci-Map.org
          </Text>
        </Flex>

        <Flex direction="row" alignItems="stretch" justifyContent="space-between" w="60%">
          <Flex justifyContent="center" flexGrow={1}>
            <Stack spacing={2} mr={3}>
              <Link href="https://github.com/sci-map-org/" _hover={{}} fontWeight={500} fontSize="lg" isExternal>
                <Stack direction="row" spacing={1} alignItems="center">
                  <RiGithubFill />
                  <Text>Github</Text>
                </Stack>
              </Link>
              <Link href="https://twitter.com/sci_map_org" _hover={{}} fontWeight={500} fontSize="lg" isExternal>
                <Stack direction="row" spacing={1} alignItems="center">
                  <RiTwitterLine />
                  <Text>Twitter</Text>
                </Stack>
              </Link>
              <Link href={env.DISCOURSE_FORUM_URL} _hover={{}} fontWeight={500} fontSize="lg" isExternal>
                <Stack direction="row" spacing={1} alignItems="center">
                  <FaDiscourse />
                  <Text>Forum</Text>
                </Stack>
              </Link>
            </Stack>
          </Flex>
          <Stack direction="row" spacing={{ base: 2, sm: 5, md: 12 }}>
            <Stack direction="column" spacing={2} alignItems="center">
              <Link href="/about" isExternal>
                About
              </Link>
              <Link href="mailto:olivier@sci-map.org">Contact</Link>
            </Stack>
            <Stack direction="column" spacing={2} alignItems="center" textAlign="center">
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
    </Flex>
  );
};
