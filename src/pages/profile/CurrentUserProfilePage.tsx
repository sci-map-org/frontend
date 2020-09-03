import { Checkbox, Stack, Text } from '@chakra-ui/core';
import NoSSR from 'react-no-ssr';
import { PageLayout } from '../../components/layout/PageLayout';
import { UserRole } from '../../graphql/types';
import { CurrentUserDataFragment } from '../../graphql/users/users.fragments.generated';
import { useMockedFeaturesEnabled } from '../../hooks/useMockedFeaturesEnabled';

export const CurrentUserProfilePage: React.FC<{ currentUser: CurrentUserDataFragment }> = ({ currentUser }) => {
  const { mockedFeaturesEnabled, setMockedFeaturesEnabled } = useMockedFeaturesEnabled();
  return (
    <PageLayout title={`My Profile (@${currentUser.key})`} centerChildren>
      <Stack spacing={10} alignItems="center">
        <Stack alignItems="center">
          <Stack alignItems="center">
            <Text>
              <b>Display Name:</b> {currentUser.displayName}
            </Text>
            <Text>
              <b>Email:</b> {currentUser.email}
            </Text>
            {currentUser.role !== UserRole.User && (
              <Text>
                <b>Role:</b> {currentUser.role}
              </Text>
            )}
          </Stack>
        </Stack>
        {currentUser.role === UserRole.Admin && (
          <Stack alignItems="center">
            <Text fontSize="2xl">Settings</Text>
            <Stack direction="column">
              <NoSSR>
                <Checkbox
                  id="mockedFeaturesEnabled"
                  isChecked={mockedFeaturesEnabled}
                  onChange={(e) => setMockedFeaturesEnabled(e.target.checked)}
                >
                  Mocked Features Enabled
                </Checkbox>
              </NoSSR>
            </Stack>
          </Stack>
        )}
      </Stack>
    </PageLayout>
  );
};
