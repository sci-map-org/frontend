import { Box } from '@chakra-ui/core';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

import { withApollo } from '../../src/graphql/apollo';
import { useCurrentUser } from '../../src/graphql/users/users.hooks';

const ProfilePage: NextPage<{}> = () => {
  const router = useRouter();

  const { key } = router.query;
  const { currentUser, loading } = useCurrentUser();

  if (currentUser && currentUser.key === key) {
    return <Box>{currentUser.key}</Box>;
  }
  return <Box>Profile of another user</Box>;
};

export default withApollo(ProfilePage);
