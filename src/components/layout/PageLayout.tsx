import { Box, Flex, Heading, Skeleton, Text } from '@chakra-ui/core';
import { ReactNode } from 'react';
import { useCurrentUser } from '../../graphql/users/users.hooks';
import { RoleAccessAllowedRule, userHasAccess } from '../auth/RoleAccess';
import { NavigationBreadcrumbs, NavigationBreadcrumbsProps } from './NavigationBreadcrumbs';

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
      px="50px"
      pt="16px"
      pb="100px"
      justifyContent="flex-start"
      backgroundColor="backgroundColor.1"
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
            <Heading fontSize="4xl" fontWeight="light">
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
