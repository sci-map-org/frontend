import { Badge, Box, Center, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import 'react-image-crop/dist/ReactCrop.css';
import { PageLayout } from '../../components/layout/PageLayout';
import { EditableTextarea } from '../../components/lib/inputs/EditableTextarea';
import { EditableTextInput } from '../../components/lib/inputs/EditableTextInput';
import { UserAvatarEditor } from '../../components/users/UserAvatarEditor';
import { UserRole } from '../../graphql/types';
import { CurrentUserDataFragment } from '../../graphql/users/users.fragments.generated';
import { useUpdateCurrentUserMutation } from '../../graphql/users/users.operations.generated';

export const CurrentUserProfilePage: React.FC<{ currentUser: CurrentUserDataFragment }> = ({ currentUser }) => {
  const [updateCurrentUser] = useUpdateCurrentUserMutation();
  return (
    <PageLayout marginSize="2xl">
      <Center mb={10}>
        <Heading fontWeight={400}>
          My Profile (
          <Text as="span" fontWeight={500} color="blue.600">
            @{currentUser.key}
          </Text>
          )
        </Heading>
      </Center>
      <Flex justifyContent="space-between" direction={{ base: 'column-reverse', md: 'row' }}>
        <Stack spacing={6} mt={{ base: 12, md: 0 }} alignItems={{ base: 'center', md: 'stretch' }}>
          <Stack>
            <Text fontSize="xl" fontWeight={600}>
              Display Name:
            </Text>
            <EditableTextInput
              fontSize="lg"
              fontWeight={400}
              value={currentUser.displayName}
              onChange={(newDisplayName) =>
                updateCurrentUser({ variables: { payload: { displayName: newDisplayName } } })
              }
              editMode
              color="gray.800"
            />
          </Stack>
          <Stack>
            <Text fontSize="xl" fontWeight={600}>
              Bio:
            </Text>
            <EditableTextarea
              fontWeight={300}
              minRows={2}
              fontSize="lg"
              defaultValue={currentUser.bio || undefined}
              placeholder="Write about yourself..."
              onSubmit={(bio: string) => updateCurrentUser({ variables: { payload: { bio } } })}
            />
          </Stack>
          <Stack>
            <Text fontSize="xl" fontWeight={600}>
              Email:
            </Text>

            <Text fontSize="lg" fontWeight={400} color="gray.800">
              {currentUser.email}
            </Text>
          </Stack>
          {currentUser.role !== UserRole.User && (
            <Box>
              <Badge fontSize="md" colorScheme="teal">
                {currentUser.role}
              </Badge>
            </Box>
          )}
        </Stack>

        <UserAvatarEditor currentUser={currentUser} />
      </Flex>
    </PageLayout>
  );
};
