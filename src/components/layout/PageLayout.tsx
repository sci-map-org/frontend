import { Box, Flex, Text, Heading, Stack } from '@chakra-ui/core';
import { NavigationBreadcrumbs, NavigationBreadcrumbsProps } from './NavigationBreadcrumbs';
import { ReactNode } from 'react';

interface PageLayoutProps {
  mode?: 'form';
  breadCrumbsLinks?: NavigationBreadcrumbsProps['links'];
  title?: string;
  renderRight?: ReactNode;
  centerChildren?: boolean;
}
export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  mode,
  breadCrumbsLinks,
  title,
  renderRight,
  centerChildren,
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
      <Flex direction="row" justifyContent="space-between" pb="8px">
        {breadCrumbsLinks && breadCrumbsLinks.length ? <NavigationBreadcrumbs links={breadCrumbsLinks} /> : null}
        <Box>{renderRight}</Box>
      </Flex>
      {title && (
        <Flex justifyContent="center" pb="20px">
          <Heading fontSize="4xl" fontWeight="light">
            {title}
          </Heading>
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
