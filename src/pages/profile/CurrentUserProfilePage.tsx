import { Badge, Box, Center, Heading, Stack, Text } from '@chakra-ui/react';
import { PageLayout } from '../../components/layout/PageLayout';
import { EditableTextarea } from '../../components/lib/inputs/EditableTextarea';
import { EditableTextInput } from '../../components/lib/inputs/EditableTextInput';
import { UserRole } from '../../graphql/types';
import { CurrentUserDataFragment } from '../../graphql/users/users.fragments.generated';
import { useUpdateCurrentUserMutation } from '../../graphql/users/users.operations.generated';

export const CurrentUserProfilePage: React.FC<{ currentUser: CurrentUserDataFragment }> = ({ currentUser }) => {
  const [updateCurrentUser] = useUpdateCurrentUserMutation();
  return (
    <PageLayout marginSize="xl">
      <Center mb={10}>
        <Heading fontWeight={400}>
          My Profile (
          <Text as="span" fontWeight={500} color="blue.600">
            @{currentUser.key}
          </Text>
          )
        </Heading>
      </Center>
      <Stack spacing={6}>
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
    </PageLayout>
  );
};
