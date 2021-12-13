import { BreadcrumbLinkProps, Link } from '@chakra-ui/react';
import { LinkProps } from 'next/link';
import { TopicLinkDataFragment } from '../../../graphql/topics/topics.fragments.generated';
import { TopicPageInfo } from '../../../pages/RoutesPageInfos';
import { PageLink, PageLinkProps } from '../../navigation/InternalLink';

export const topicLinkStyleProps: Pick<LinkProps & BreadcrumbLinkProps, 'fontWeight' | 'color'> = {
  fontWeight: 700,
  color: 'gray.600',
};

interface TopicLinkProps extends Omit<PageLinkProps, 'pageInfo'> {
  topic: TopicLinkDataFragment;
}
export const TopicLink: React.FC<TopicLinkProps> = ({ topic, children, ...props }) => {
  return props.onClick ? (
    <Link onClick={props.onClick} {...topicLinkStyleProps} {...props}>
      {children || topic.name}
    </Link>
  ) : (
    <PageLink pageInfo={TopicPageInfo(topic)} {...topicLinkStyleProps} {...props}>
      {children || topic.name}
    </PageLink>
  );
};
