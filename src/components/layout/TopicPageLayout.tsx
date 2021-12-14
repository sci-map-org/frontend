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
        <Flex
          w="100%"
          direction={{ base: 'column', lg: 'row' }}
          overflow="hidden"
          justifyContent={{ base: 'flex-start', md: 'space-between' }}
          alignItems="stretch"
          pb={4}
          {...layoutProps}
        >
          <Flex direction="column" flexGrow={1} position="relative" minH="280px" pr={{ md: '200px' }}>
            <>
              <Image
                display={{ base: 'none', md: 'initial' }}
                position="absolute"
                src="/images/tourist.svg"
                top={5}
                right={-2}
                h="280px"
                zIndex={1}
              />
              <Image
                position="absolute"
                src="/images/topostain_green_domain_page.svg"
                zIndex={0}
                top="-30%"
                right="0%"
                opacity={0.6}
                h={{ base: '300px', md: '500px' }}
              />
            </>
            {/* {topicType === TopicType.Concept && (
              <Image
                position="absolute"
                src="/static/search_stain.svg"
                zIndex={0}
                top="-5%"
                right="5%"
                opacity={0.6}
                h={{ base: '320px', md: '350px' }}
              />
            )} */}
            <Flex ml={{ base: 0, md: -6 }} mt={1} maxH={12} overflowY="scroll" position="absolute" zIndex={3}>
              {renderTopLeftNavigation}
            </Flex>

            <Stack spacing={0} pt={16} zIndex={2} alignItems="flex-start">
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
            <Box mb={2}>{renderTopRightNavigation}</Box>
            {renderMinimap(460, 260)}
          </Flex>
        </Flex>
      )}
    >
      {children}
    </BasePageLayout>
  );
};
