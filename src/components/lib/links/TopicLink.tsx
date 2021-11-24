// import { TopicLinkDataFragment } from '../../../graphql/topics/topics.fragments.generated';
// import { TopicType } from '../../../graphql/types';
// import { PageLinkProps } from '../../navigation/InternalLink';
// import { ConceptLink } from './ConceptLink';
// import { DomainLink } from './DomainLink';
// import { LearningGoalLink } from './LearningGoalLink';

// interface TopicLinkProps extends Omit<PageLinkProps, 'pageInfo'> {
//   topic: TopicLinkDataFragment;
// }

// export const TopicLink: React.FC<TopicLinkProps> = ({ topic, ...props }) => {
//   if (topic.__typename === TopicType.Domain) return <DomainLink key={topic._id} domain={topic} {...props} />;
//   if (topic.__typename === TopicType.Concept && topic.domain)
//     return <ConceptLink key={topic._id} domain={topic.domain} concept={topic} {...props} />;
//   if (topic.__typename === TopicType.LearningGoal && topic.domain)
//     return <LearningGoalLink key={topic._id} learningGoal={topic} {...props} />;

//   return null;
// };

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
export const DomainLink: React.FC<TopicLinkProps> = ({ topic, children, ...props }) => {
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
