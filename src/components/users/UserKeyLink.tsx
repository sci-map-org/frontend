import { LinkProps } from '@chakra-ui/react';
import { CurrentUserDataFragment, UserLinkDataFragment } from '../../graphql/users/users.fragments.generated';
import { UserProfilePageInfo } from '../../pages/RoutesPageInfos';
import { UserKeyLinkStyleProps } from '../lib/Typography';
import { PageLink } from '../navigation/InternalLink';

export const UserKeyLink: React.FC<LinkProps & { user: UserLinkDataFragment | CurrentUserDataFragment }> = ({
  user,
  ...props
}) => {
  return (
    <PageLink pageInfo={UserProfilePageInfo(user)} {...UserKeyLinkStyleProps} {...props} _active={{}} _focus={{}}>
      @{user.key}
    </PageLink>
  );
};
