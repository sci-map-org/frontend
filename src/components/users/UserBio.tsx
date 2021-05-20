import { Text, TextProps } from '@chakra-ui/layout';
import { Skeleton } from '@chakra-ui/skeleton';
import { User } from '../../graphql/types';

export const UserBio: React.FC<
  { user: Pick<User, 'bio'>; isLoading?: boolean } & Pick<TextProps, 'fontSize' | 'noOfLines' | 'color'>
> = ({ user, isLoading, ...props }) => {
  return (
    <Skeleton isLoaded={!isLoading}>
      <Text fontWeight={300} fontSize="md" {...props} whiteSpace="pre-wrap">
        {user.bio}
      </Text>
    </Skeleton>
  );
};
