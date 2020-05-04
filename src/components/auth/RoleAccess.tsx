import { Access } from './Access';
import { useCurrentUser } from '../../graphql/users/users.hooks';
import { UserRole, CurrentUser } from '../../graphql/types';

type RoleAccessAllowedRule = 'all' | 'loggedInUser' | 'admin' | 'notLoggedInUser';

const accessRuleMapping: {
  [key in RoleAccessAllowedRule]: (currentUser: CurrentUser | false) => boolean;
} = {
  all: () => true,
  loggedInUser: (currentUser) => !!currentUser,
  notLoggedInUser: (currentUser) => !currentUser,
  admin: (currentUser) => !!currentUser && currentUser.role === UserRole.Admin,
};

interface RoleAccessProps {
  accessRule: RoleAccessAllowedRule;
}
export const RoleAccess: React.FC<RoleAccessProps> = ({ children, accessRule }) => {
  const { currentUser } = useCurrentUser();
  return <Access condition={accessRuleMapping[accessRule](currentUser)}>{children}</Access>;
};
