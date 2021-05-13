import { EditIcon } from '@chakra-ui/icons';
import { Badge, Box, Center, Flex, Heading, IconButton, Stack, Text } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { RoleAccess } from '../../components/auth/RoleAccess';
import { PageLayout } from '../../components/layout/PageLayout';
import { UserAvatar } from '../../components/users/UserAvatar';
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
      isLoading={loading}
      renderTopRight={
        <RoleAccess accessRule="admin">
          <IconButton size="sm" aria-label="edit_user" icon={<EditIcon />} />
        </RoleAccess>
      }
      marginSize="2xl"
    >
      <Stack direction="column">
        <Center mb={10}>
          <Heading fontWeight={400}>
            {user.displayName}(
            <Text as="span" fontWeight={500} color="blue.600">
              @{user.key}
            </Text>
            )
          </Heading>
        </Center>
        <Flex justifyContent="space-between">
          <Stack>
            {user.role !== UserRole.User && (
              <Box>
                <Badge fontSize="md" colorScheme="teal">
                  {user.role}
                </Badge>
              </Box>
            )}
          </Stack>
          <UserAvatar size="xl" user={user} />
        </Flex>
      </Stack>
    </PageLayout>
  );
};
