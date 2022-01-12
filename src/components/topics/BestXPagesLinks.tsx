import { Stack, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { TopicPageSectionHeader } from '../lib/Typography';
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
    <Stack direction="column" alignItems="flex-end" spacing={2} pl={2} pb={2}>
      <TopicPageSectionHeader>Quick Links</TopicPageSectionHeader>
      <Stack spacing="2px" alignItems="flex-end">
        {links.map((link) =>
          router.route === '/topics/[topicKey]/' + link.url_suffix ? (
            <Text fontSize="16px" key={link.url_suffix} fontWeight={500} color="blue.900">
              {link.name}
            </Text>
          ) : (
            <InternalLink
              fontSize="15px"
              fontWeight={500}
              color="blue.900"
              textDecoration="underline"
              key={link.url_suffix}
              routePath={'/topics/[topicKey]/' + link.url_suffix}
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
