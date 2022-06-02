import { AvatarGroup, Center, Stack, Text } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { useMemo } from 'react';
import { useCurrentUser } from '../../graphql/users/users.hooks';
import { UserAvatar, UserAvatarData } from '../users/UserAvatar';
import { UserAvatarGroup } from '../users/UserAvatarGroup';
import { OtherLearnersViewerUserDataFragment } from './OtherLearnersViewer.generated';
import { SocialWidgetsLabelStyleProps } from './Typography';

export const OtherLearnersViewerUserData = gql`
  fragment OtherLearnersViewerUserData on User {
    _id
    ...UserAvatarData
  }
  ${UserAvatarData}
`;

interface OtherLearnersViewerProps {
  users: OtherLearnersViewerUserDataFragment[];
  totalCount: number;
  title: (otherUsersCount: number, otherUsers: OtherLearnersViewerUserDataFragment[]) => string;
  currentUserIsLearner: boolean;
  minUsers?: number;
  maxUserAvatarsToShow?: number;
}

export const OtherLearnersViewer: React.FC<OtherLearnersViewerProps> = ({
  users,
  totalCount,
  title,
  currentUserIsLearner,
  minUsers = 1,
  maxUserAvatarsToShow = 8,
}) => {
  const { currentUser } = useCurrentUser();
  const otherLearners = useMemo(
    () => (currentUser && currentUserIsLearner ? users.filter((user) => user._id !== currentUser._id) : users),
    [currentUserIsLearner, users]
  );
  const otherLearnersCount = useMemo(() => {
    return currentUser && currentUserIsLearner ? totalCount - 1 : totalCount;
  }, [currentUserIsLearner, totalCount, currentUser]);

  if (otherLearners.length < minUsers) return null;
  return (
    <Center>
      <Stack spacing={1}>
        <Text {...SocialWidgetsLabelStyleProps('md')}>{title(otherLearnersCount, otherLearners)}</Text>
        <Center>
          <UserAvatarGroup users={otherLearners} popoverTitle="Other Learners" size="lg" />
        </Center>
      </Stack>
    </Center>
  );
};
