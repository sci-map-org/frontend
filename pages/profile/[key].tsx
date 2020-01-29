import { NextPage } from 'next';
import { useRouter } from 'next/router';

import { CurrentUserProfilePage } from '../../src/pages/profile/CurrentUserProfilePage';
import { UserProfilePage } from '../../src/pages/profile/UserProfilePage';
import { useCurrentUser } from '../../src/graphql/users/users.hooks';

const ProfilePage: NextPage<{}> = () => {
  const router = useRouter();

  const { key } = router.query;

  if (typeof key !== 'string') return null;

  const { currentUser } = useCurrentUser();

  if (currentUser && currentUser.key === key) {
    return <CurrentUserProfilePage currentUser={currentUser} />;
  }
  return <UserProfilePage userKey={key} />;
};

export default ProfilePage;
