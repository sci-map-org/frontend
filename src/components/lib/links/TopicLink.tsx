import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Link, Text } from '@chakra-ui/react';
import { TopicLinkDataFragment } from '../../../graphql/topics/topics.fragments.generated';
import { TopicPageInfo } from '../../../pages/RoutesPageInfos';
import { PageLink, PageLinkProps } from '../../navigation/InternalLink';

export const topicLinkStyles: { [key in 'topicName' | 'contextName']: Pick<PageLinkProps, 'color' | 'fontWeight'> } = {
  topicName: {
    fontWeight: 700,
    color: 'gray.700',
  },
  contextName: { fontWeight: 700, color: 'gray.500' },
};

const sizesMapping = {
  sm: {
    topicNameFontSize: 'sm',
    contextNameFontSize: 'xs',
    externalLinkIconSize: 3,
  },
  md: {
    topicNameFontSize: 'md',
    contextNameFontSize: 'sm',
    externalLinkIconSize: 4,
  },
  lg: {
    topicNameFontSize: 'lg',
    contextNameFontSize: 'md',
    externalLinkIconSize: '18px',
  },
};
interface TopicLinkProps {
  topic: TopicLinkDataFragment;
  /* if supplying onClick prop, won't be rendered as an <a> */
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  showContext?: boolean;
  newTab?: boolean;
}
export const TopicLink: React.FC<TopicLinkProps> = ({ topic, onClick, size = 'md', showContext, newTab }) => {
  return onClick ? (
    <Link onClick={onClick} {...topicLinkStyles.topicName} fontSize={sizesMapping[size].topicNameFontSize} _focus={{}}>
      {topic.name}{' '}
      {topic.context && (
        <Text as="span" {...topicLinkStyles.contextName} fontSize={sizesMapping[size].contextNameFontSize}>
          ({topic.context})
        </Text>
      )}
      {newTab && <ExternalLinkIcon ml={2} boxSize={6} />}
    </Link>
  ) : (
    <PageLink
      pageInfo={TopicPageInfo(topic)}
      {...topicLinkStyles.topicName}
      fontSize={sizesMapping[size].topicNameFontSize}
      isExternal={newTab}
      _focus={{}}
    >
      {topic.name}{' '}
      {topic.context && (
        <Text as="span" {...topicLinkStyles.contextName} fontSize={sizesMapping[size].contextNameFontSize}>
          ({topic.context})
        </Text>
      )}
      {newTab && <ExternalLinkIcon mb={1} ml={1} boxSize={sizesMapping[size].externalLinkIconSize} />}
    </PageLink>
  );
};
