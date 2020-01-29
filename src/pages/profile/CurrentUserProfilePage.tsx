import { Box, Checkbox, Stack, Text } from '@chakra-ui/core';
import NoSSR from 'react-no-ssr';

import { UserRole } from '../../graphql/types';
import { CurrentUserDataFragment } from '../../graphql/users/users.generated';
import { useMockedFeaturesEnabled } from '../../hooks/useMockedFeaturesEnabled';
import { PageLayout } from '../../components/layout/PageLayout';

export const CurrentUserProfilePage: React.FC<{ currentUser: CurrentUserDataFragment }> = ({ currentUser }) => {
  const { mockedFeaturesEnabled, setMockedFeaturesEnabled } = useMockedFeaturesEnabled();
  return (
    <PageLayout>
      <Text fontSize="3xl">My Profile</Text>
      <Box my={4}>
        <Text fontSize="2xl">Settings</Text>
        <Stack direction="column">
          {currentUser.role === UserRole.Admin && (
            <NoSSR>
              <Checkbox
                id="mockedFeaturesEnabled"
                isChecked={mockedFeaturesEnabled}
                onChange={e => setMockedFeaturesEnabled(e.target.checked)}
              >
                Mocked Features Enabled
              </Checkbox>
            </NoSSR>
          )}
        </Stack>
      </Box>
    </PageLayout>
  );
};
