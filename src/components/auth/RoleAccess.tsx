import { Access, AccessProps } from './Access';
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

interface RoleAccessProps extends Omit<AccessProps, 'condition'> {
  accessRule: RoleAccessAllowedRule;
}

export const RoleAccess: React.FC<RoleAccessProps> = ({ children, accessRule, ...props }) => {
  const { currentUser } = useCurrentUser();
  return (
    <Access condition={accessRuleMapping[accessRule](currentUser)} {...props}>
      {children}
    </Access>
  );
};
