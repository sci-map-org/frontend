import { PageLayout } from '../../layout/Page';

export const UserProfilePage: React.FC<{ userKey: string }> = ({ userKey }) => {
  return <PageLayout>Profile of {userKey}</PageLayout>;
};
