import { BreadcrumbLinkProps, Link } from '@chakra-ui/react';
import { LinkProps } from 'next/link';
import { LearningGoalLinkDataFragment } from '../../../graphql/learning_goals/learning_goals.fragments.generated';
import { LearningGoalPageInfo } from '../../../pages/RoutesPageInfos';
import { PageLink, PageLinkProps } from '../../navigation/InternalLink';

export const learningGoalLinkStyleProps: Pick<LinkProps & BreadcrumbLinkProps, 'fontWeight' | 'color'> = {
  fontWeight: 500,
  color: 'gray.600',
};

interface LearningGoalLinkProps extends Omit<PageLinkProps, 'pageInfo'> {
  learningGoal: LearningGoalLinkDataFragment;
}
export const LearningGoalLink: React.FC<LearningGoalLinkProps> = ({ learningGoal, children, ...props }) => {
  return props.onClick ? (
    <Link onClick={props.onClick} {...learningGoalLinkStyleProps} {...props}>
      {children || learningGoal.name}
    </Link>
  ) : (
    <PageLink pageInfo={LearningGoalPageInfo(learningGoal)} {...learningGoalLinkStyleProps} {...props}>
      {children || learningGoal.name}
    </PageLink>
  );
};
