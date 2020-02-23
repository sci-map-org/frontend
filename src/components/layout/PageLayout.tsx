import { Box, Flex, Text } from '@chakra-ui/core';
import { NavigationBreadcrumbs, NavigationBreadcrumbsProps } from './NavigationBreadcrumbs';
import { ReactNode } from 'react';

interface PageLayoutProps {
  mode?: 'form';
  breadCrumbsLinks?: NavigationBreadcrumbsProps['links'];
  title?: string;
  renderRight?: ReactNode;
}
export const PageLayout: React.FC<PageLayoutProps> = ({ children, mode, breadCrumbsLinks, title, renderRight }) => {
  return (
    <Flex direction="column" px="60px" py="16px" justifyContent="flex-start">
      <Flex direction="row" justifyContent="space-between" pb="8px">
        {breadCrumbsLinks && breadCrumbsLinks.length ? <NavigationBreadcrumbs links={breadCrumbsLinks} /> : null}
        <Box>{renderRight}</Box>
      </Flex>
      {title && (
        <Flex justifyContent="center" pb="20px">
          <Text fontSize="3xl">{title}</Text>
        </Flex>
      )}
      <Box px={mode === 'form' ? '10rem' : '0px'}>{children}</Box>
    </Flex>
  );
};
