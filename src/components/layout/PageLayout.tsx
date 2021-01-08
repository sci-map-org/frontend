import { Box, Flex, FlexProps, Heading, Skeleton, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { useCurrentUser } from '../../graphql/users/users.hooks';
import { RoleAccessAllowedRule, userHasAccess } from '../auth/RoleAccess';
import { NavigationBreadcrumbs, NavigationBreadcrumbsProps } from './NavigationBreadcrumbs';

const marginSizesMapping: { [key in 'sm' | 'md' | 'lg' | 'xl']: { px: FlexProps['px'] } } = {
  sm: {
    px: { sm: '1%', md: '3%' },
  },
  md: {
    px: { sm: '2%', md: '5%' },
  },
  lg: {
    px: { sm: '3%', md: '8%' },
  },
  xl: {
    px: { sm: '5%', md: '16%' },
  },
};

interface PageLayoutProps {
  mode?: 'form';
  renderLeft?: ReactNode;
  renderRight?: ReactNode;
  breadCrumbsLinks?: NavigationBreadcrumbsProps['links'];
  title?: string;
  renderTopRight?: ReactNode;
  centerChildren?: boolean;
  isLoading?: boolean;
  accessRule?: RoleAccessAllowedRule | boolean;
  marginSize?: keyof typeof marginSizesMapping;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  mode,
  breadCrumbsLinks,
  title,
  renderTopRight,
  renderLeft,
  renderRight,
  centerChildren,
  isLoading,
  accessRule,
  marginSize = 'md',
}) => {
  const { currentUser } = useCurrentUser();
  if ((typeof accessRule === 'string' && !userHasAccess(accessRule, currentUser)) || accessRule === false)
    return (
      <Flex width="100%" alignItems="center" justifyContent="center">
        <Text fontSize="3xl" textAlign="center" mt="200px">
          Forbidden
        </Text>
      </Flex>
    );
  return (
    <Flex
      direction="column"
      px={marginSizesMapping[marginSize].px}
      pt="16px"
      pb="100px"
      justifyContent="flex-start"
      backgroundColor="backgroundColor.1"
      maxWidth={{ base: '100%', md: '1800px' }}
    >
      {(breadCrumbsLinks || renderTopRight) && (
        <Flex direction="row" justifyContent="space-between" pb="8px">
          {breadCrumbsLinks && breadCrumbsLinks.length ? (
            <Skeleton isLoaded={!isLoading}>
              <NavigationBreadcrumbs links={breadCrumbsLinks} />
            </Skeleton>
          ) : (
            <Box />
          )}
          <Box>{renderTopRight}</Box>
        </Flex>
      )}
      {title && (
        <Flex justifyContent="center" pb="20px">
          <Skeleton isLoaded={!isLoading}>
            <Heading textAlign="center" fontSize="4xl" fontWeight="light">
              {title}
            </Heading>
          </Skeleton>
        </Flex>
      )}
      <Flex direction="row" justifyContent="stretch">
        {renderLeft && <Box>{renderLeft}</Box>}
        <Box
          flexGrow={1}
          px={mode === 'form' ? '10rem' : '0px'}
          {...(centerChildren && { display: 'flex', flexDirection: 'column', alignItems: 'center' })}
        >
          {children}
        </Box>
        {renderRight && <Box>{renderRight}</Box>}
      </Flex>
    </Flex>
  );
};
