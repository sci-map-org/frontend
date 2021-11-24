import { Stack, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { InternalLink } from '../navigation/InternalLink';

const links: { name: string; url_suffix: string }[] = [
  {
    name: 'Best Courses',
    url_suffix: 'best_courses',
  },
  {
    name: 'Best Articles',
    url_suffix: 'best_articles',
  },
  {
    name: 'Best Podcasts',
    url_suffix: 'best_podcasts',
  },
  {
    name: 'Best Books',
    url_suffix: 'best_books',
  },
  {
    name: 'Best Videos',
    url_suffix: 'best_videos',
  },
];
export const BestXPagesLinks: React.FC<{ topicKey: string }> = ({ topicKey }) => {
  const router = useRouter();

  return (
    <Stack
      direction="column"
      spacing={2}
      backgroundColor="white"
      boxShadow="md"
      borderRadius={3}
      pt={1}
      pb={3}
      borderWidth={1}
      borderColor="gray.200"
    >
      <Text fontSize="xl" textAlign="center" fontWeight={600} color="gray.600">
        Quick Links
      </Text>
      <Stack spacing={1} pl={5} pr={5}>
        {links.map((link) =>
          router.route === '/topics/[topicKey]/' + link.url_suffix ? (
            <Text key={link.url_suffix} fontWeight={500} color="blue.800">
              {link.name}
            </Text>
          ) : (
            <InternalLink
              fontWeight={500}
              color="blue.800"
              textDecoration="underline"
              key={link.url_suffix}
              routePath={'/topics/[key]/' + link.url_suffix}
              asHref={`/topics/${topicKey}/${link.url_suffix}`}
            >
              {link.name}
            </InternalLink>
          )
        )}
      </Stack>
    </Stack>
  );
};
