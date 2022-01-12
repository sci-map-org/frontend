import { Image } from '@chakra-ui/image';
import { Flex, Box, Stack, Text } from '@chakra-ui/layout';
import { Skeleton } from '@chakra-ui/skeleton';
import { ReactNode } from 'react';
import { BasePageLayout } from './PageLayout';

interface TopicPageLayoutProps {
  renderTopLeftNavigation: ReactNode;
  renderTopRightNavigation?: ReactNode;
  renderTopRightIconButtons?: ReactNode;
  renderTitle: ReactNode;
  renderBlockBelowTitle: ReactNode;
  renderManagementIcons?: ReactNode;
  renderMinimap: (pxWidth: number, pxHeight: number) => ReactNode;
  isLoading?: boolean;
}

export const TopicPageLayout: React.FC<TopicPageLayoutProps> = ({
  renderTopLeftNavigation,
  renderTopRightNavigation,
  renderManagementIcons,
  renderTitle,
  renderBlockBelowTitle,
  renderMinimap,
  isLoading,
  children,
}) => {
  return (
    <BasePageLayout
      marginSize="md"
      renderHeader={(layoutProps) => (
        <Flex w="100%" direction="column" alignItems="stretch" position="relative">
          <Flex w="100%" direction="row" justifyContent="space-between" px={6} pt={3} minH="60px">
            <Flex>{renderTopLeftNavigation}</Flex>
            <Box mb={2}>{renderTopRightNavigation}</Box>
          </Flex>

          <Flex
            w="100%"
            direction={{ base: 'column', lg: 'row' }}
            overflow="hidden"
            justifyContent={{ base: 'flex-start', lg: 'space-between' }}
            alignItems="stretch"
            pb={4}
            {...layoutProps}
          >
            <Flex direction="column" flexGrow={1} minH="280px" pr={{ lg: '8%' }}>
              <>
                <Image
                  position="absolute"
                  src="/images/topostain_green_domain_page.svg"
                  zIndex={-1}
                  top="-10%"
                  left="41%"
                  opacity={0.6}
                  h={{ base: '300px', lg: '350px' }}
                />
              </>

              <Stack spacing={0} pt={2} zIndex={2} alignItems="flex-start">
                <Stack direction="row">{renderManagementIcons}</Stack>

                <Skeleton isLoaded={!isLoading}>{renderTitle}</Skeleton>
                {renderBlockBelowTitle}
              </Stack>
            </Flex>
            <Flex
              direction="column"
              pl={{ lg: 8 }}
              pr={0}
              pt={{ lg: 2 }}
              justifyContent={{ base: 'center', lg: 'flex-start' }}
              alignItems={{ base: 'center', lg: 'flex-end' }}
            >
              {renderMinimap(460, 260)}
            </Flex>
          </Flex>
        </Flex>
      )}
    >
      {children}
    </BasePageLayout>
  );
};
