import { UserRole } from '../../graphql/types';
import { CurrentUserDataFragment } from '../../graphql/users/users.fragments.generated';
import { useCurrentUser } from '../../graphql/users/users.hooks';
import { Access, AccessProps } from './Access';

export type RoleAccessAllowedRule = 'all' | 'loggedInUser' | 'admin' | 'notLoggedInUser' | 'contributorOrAdmin';

const accessRuleMapping: {
  [key in RoleAccessAllowedRule]: (currentUser: CurrentUserDataFragment | false) => boolean;
} = {
  all: () => true,
  loggedInUser: (currentUser) => !!currentUser,
  notLoggedInUser: (currentUser) => !currentUser,
  admin: (currentUser) => !!currentUser && currentUser.role === UserRole.Admin,
  contributorOrAdmin: (currentUser) =>
    !!currentUser && (currentUser.role === UserRole.Contributor || currentUser.role === UserRole.Admin),
};

export const userHasAccess = (accessRule: RoleAccessAllowedRule, user: CurrentUserDataFragment | false) =>
  accessRuleMapping[accessRule](user);

interface RoleAccessProps extends Omit<AccessProps, 'condition'> {
  accessRule: boolean | RoleAccessAllowedRule;
}

export const RoleAccess: React.FC<RoleAccessProps> = ({ children, accessRule, ...props }) => {
  const { currentUser } = useCurrentUser();
  return (
    <Access
      condition={typeof accessRule === 'boolean' ? accessRule : userHasAccess(accessRule, currentUser)}
      {...props}
    >
      {children}
    </Access>
  );
};
