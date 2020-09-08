import { IconButton, Stack, Text } from '@chakra-ui/core';
import { EditIcon } from '@chakra-ui/icons';
import gql from 'graphql-tag';
import { RoleAccess } from '../../components/auth/RoleAccess';
import { PageLayout } from '../../components/layout/PageLayout';
import { UserRole } from '../../graphql/types';
import { generatePublicUserData, PublicUserData } from '../../graphql/users/users.fragments';
import { GetUserUserProfilePageQuery, useGetUserUserProfilePageQuery } from './UserProfilePage.generated';

export const getUserUserProfilePage = gql`
  query getUserUserProfilePage($key: String!) {
    getUser(key: $key) {
      ...PublicUserData
    }
  }
  ${PublicUserData}
`;

const userDataPlaceholder: GetUserUserProfilePageQuery['getUser'] = generatePublicUserData();

export const UserProfilePage: React.FC<{ userKey: string }> = ({ userKey }) => {
  const { data, loading } = useGetUserUserProfilePageQuery({ variables: { key: userKey } });
  const user = data?.getUser || userDataPlaceholder;
  return (
    <PageLayout
      title={`Profile of ${user.displayName} (@${userKey})`}
      isLoading={loading}
      centerChildren
      renderRight={
        <RoleAccess accessRule="admin">
          <IconButton size="sm" aria-label="edit_user" icon={<EditIcon />} />
        </RoleAccess>
      }
    >
      <Stack direction="column" width="40rem" alignItems="center">
        {user.role !== UserRole.User && (
          <Text>
            <b>Role:</b> {user.role}
          </Text>
        )}
      </Stack>
    </PageLayout>
  );
};
