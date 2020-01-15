import { Box } from '@chakra-ui/core';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

import { useCurrentUser } from '../../src/graphql/users/users.hooks';
import { CurrentUserProfilePage } from '../../src/components/pages/resources/profile/CurrentUserProfilePage';
import { UserProfilePage } from '../../src/components/pages/resources/profile/UserProfilePage';

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
