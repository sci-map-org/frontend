import { TopicLinkDataFragment } from '../../graphql/topics/topics.fragments.generated';
import { TopicPageInfo } from '../../pages/RoutesPageInfos';
import { PageLink } from '../navigation/InternalLink';

export const TopicCard: React.FC<{ topic: TopicLinkDataFragment }> = ({ topic }) => {
  return (
    <PageLink
      minW="140px"
      w="180px"
      minH="70px"
      h="90px"
      bgColor="teal.500"
      color="white"
      borderRadius={5}
      px={3}
      py={2}
      pageInfo={TopicPageInfo(topic)}
      _hover={{}}
      _active={{}}
    >
      {topic.name}
    </PageLink>
  );
};
