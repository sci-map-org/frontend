import { EditIcon } from '@chakra-ui/icons';
import { Badge, Box, Center, Flex, Heading, IconButton, Skeleton, Stack, Text } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { RoleAccess } from '../../components/auth/RoleAccess';
import { PageLayout } from '../../components/layout/PageLayout';
import { UserAvatar } from '../../components/users/UserAvatar';
import { UserBio } from '../../components/users/UserBio';
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
      <Flex direction={{ base: 'column-reverse', md: 'row' }} justifyContent="space-between" mt={16}>
        <Stack alignItems="center" mt={{ base: 12, md: 0 }}>
          <Flex direction="row" alignItems="baseline" mb={6}>
            <Skeleton isLoaded={!loading}>
              <Heading fontWeight={400} color="gray.700">
                {user.displayName}
              </Heading>
            </Skeleton>
            <Skeleton isLoaded={!loading}>
              <Text ml={3} fontSize="xl" as="span" fontWeight={600} color="blue.600">
                @{user.key}
              </Text>
            </Skeleton>
          </Flex>
          <Box>
            <UserBio user={user} />
          </Box>
          {user.role !== UserRole.User && (
            <Box>
              <Skeleton isLoaded={!loading}>
                <Badge fontSize="md" colorScheme="teal">
                  {user.role}
                </Badge>
              </Skeleton>
            </Box>
          )}
        </Stack>
        <Center>
          <UserAvatar size="xl" user={user} isLoading={loading} disablePopover />
        </Center>
      </Flex>
    </PageLayout>
  );
};
