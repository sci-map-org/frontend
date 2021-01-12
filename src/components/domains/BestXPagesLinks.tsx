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
export const BestXPagesLinks: React.FC<{ domainKey: string }> = ({ domainKey }) => {
  const router = useRouter();

  return (
    <Stack direction="column" spacing={2} backgroundColor="gray.100" borderRadius={5} pt={1} pb={3}>
      <Text fontSize="xl" textAlign="center" fontWeight={600} color="gray.600">
        Quick Links
      </Text>
      <Stack spacing={1} pl={5}>
        {links.map((link) =>
          router.route === '/domains/[key]/' + link.url_suffix ? (
            <Text key={link.url_suffix} fontWeight={500} color="blue.800">
              {link.name}
            </Text>
          ) : (
            <InternalLink
              fontWeight={500}
              color="blue.800"
              textDecoration="underline"
              key={link.url_suffix}
              routePath={'/domains/[key]/' + link.url_suffix}
              asHref={`/domains/${domainKey}/${link.url_suffix}`}
            >
              {link.name}
            </InternalLink>
          )
        )}
      </Stack>
    </Stack>
  );
};
