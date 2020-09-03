import { CurrentUser, UserRole } from '../../graphql/types';
import { useCurrentUser } from '../../graphql/users/users.hooks';
import { Access, AccessProps } from './Access';

export type RoleAccessAllowedRule = 'all' | 'loggedInUser' | 'admin' | 'notLoggedInUser' | 'contributorOrAdmin';

const accessRuleMapping: {
  [key in RoleAccessAllowedRule]: (currentUser: CurrentUser | false) => boolean;
} = {
  all: () => true,
  loggedInUser: (currentUser) => !!currentUser,
  notLoggedInUser: (currentUser) => !currentUser,
  admin: (currentUser) => !!currentUser && currentUser.role === UserRole.Admin,
  contributorOrAdmin: (currentUser) =>
    !!currentUser && (currentUser.role === UserRole.Contributor || currentUser.role === UserRole.Admin),
};

export const userHasAccess = (accessRule: RoleAccessAllowedRule, user: CurrentUser | false) =>
  accessRuleMapping[accessRule](user);

interface RoleAccessProps extends Omit<AccessProps, 'condition'> {
  accessRule: RoleAccessAllowedRule;
}

export const RoleAccess: React.FC<RoleAccessProps> = ({ children, accessRule, ...props }) => {
  const { currentUser } = useCurrentUser();
  return (
    <Access condition={userHasAccess(accessRule, currentUser)} {...props}>
      {children}
    </Access>
  );
};
