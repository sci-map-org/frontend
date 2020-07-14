import { Box, Flex, Heading, Skeleton } from '@chakra-ui/core';
import { ReactNode } from 'react';
import { NavigationBreadcrumbs, NavigationBreadcrumbsProps } from './NavigationBreadcrumbs';

interface PageLayoutProps {
  mode?: 'form';
  breadCrumbsLinks?: NavigationBreadcrumbsProps['links'];
  title?: string;
  renderRight?: ReactNode;
  centerChildren?: boolean;
  isLoading?: boolean;
}
export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  mode,
  breadCrumbsLinks,
  title,
  renderRight,
  centerChildren,
  isLoading,
}) => {
  return (
    <Flex
      direction="column"
      px="50px"
      py="16px"
      justifyContent="flex-start"
      backgroundColor="backgroundColor.1"
      height="100%"
    >
      {(breadCrumbsLinks || renderRight) && (
        <Flex direction="row" justifyContent="space-between" pb="8px">
          {breadCrumbsLinks && breadCrumbsLinks.length ? (
            <Skeleton isLoaded={!isLoading}>
              <NavigationBreadcrumbs links={breadCrumbsLinks} />
            </Skeleton>
          ) : (
            <Box />
          )}
          <Box>{renderRight}</Box>
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
      <Box
        px={mode === 'form' ? '10rem' : '0px'}
        {...(centerChildren && { display: 'flex', flexDirection: 'column', alignItems: 'center' })}
      >
        {children}
      </Box>
    </Flex>
  );
};
