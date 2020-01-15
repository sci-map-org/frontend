import { PageLayout } from '../../../layout/Page';
import { CurrentUser, UserRole } from '../../../../graphql/types';
import { CurrentUserDataFragment } from '../../../../graphql/users/users.generated';
import { Text, Box, Stack, FormControl, FormLabel, Checkbox } from '@chakra-ui/core';
import { useMockedFeaturesEnabled } from '../../../../hooks/useMockedFeaturesEnabled';
import NoSSR from 'react-no-ssr';

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
