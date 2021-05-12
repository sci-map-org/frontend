import { Badge, Box, Center, Checkbox, EditableInput, Heading, Stack, Text } from '@chakra-ui/react';
import NoSSR from 'react-no-ssr';
import { PageLayout } from '../../components/layout/PageLayout';
import { EditableTextInput } from '../../components/lib/inputs/EditableTextInput';
import { UserRole } from '../../graphql/types';
import { CurrentUserDataFragment } from '../../graphql/users/users.fragments.generated';

export const CurrentUserProfilePage: React.FC<{ currentUser: CurrentUserDataFragment }> = ({ currentUser }) => {
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
            onChange={(r) => console.log(r)}
            editMode
            color="gray.800"
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
