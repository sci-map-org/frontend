import { Flex, Stack, Text } from '@chakra-ui/layout';
import { Skeleton } from '@chakra-ui/skeleton';
import { ReactNode } from 'react';
import { TopicType } from '../../graphql/types';
import { ConceptIcon } from '../lib/icons/ConceptIcon';
import { DomainIcon } from '../lib/icons/DomainIcon';
import { BasePageLayout } from './PageLayout';

const TopicPageTypeIcon: React.FC<{ topicType: TopicType }> = ({ topicType }) => {
  return (
    <Stack direction="row" spacing={1} alignItems="center" color="gray.800">
      {topicType === TopicType.Domain && <DomainIcon boxSize="20px" mb="4px" />}
      {topicType === TopicType.Concept && <ConceptIcon boxSize="20px" mb="4px" />}
      <Text fontSize="lg" fontWeight={400}>
        {topicType === TopicType.Domain && 'Area'}
        {topicType === TopicType.Concept && 'Topic'}
      </Text>
    </Stack>
  );
};

interface TopicPageLayoutProps {
  renderTopLeftNavigation: ReactNode;
  renderTopRightIconButtons?: ReactNode;
  renderTitle: ReactNode;
  renderBlockBelowTitle: ReactNode;
  renderManagementIcons?: ReactNode;
  renderMinimap: (pxWidth: number, pxHeight: number) => ReactNode;
  isLoading?: boolean;
  topicType: TopicType; // for different aestetic
}

export const TopicPageLayout: React.FC<TopicPageLayoutProps> = ({
  renderTopLeftNavigation,
  renderManagementIcons,
  renderTitle,
  renderBlockBelowTitle,
  renderMinimap,
  isLoading,
  topicType,
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
            <Flex ml={-6} mt={1} maxH={12} overflowY="scroll" position="absolute" zIndex={3}>
              {renderTopLeftNavigation}
            </Flex>

            <Stack spacing={0} pt={16} zIndex={2} alignItems="flex-start">
              <Stack direction="row">
                <TopicPageTypeIcon topicType={topicType} />
                {renderManagementIcons}
              </Stack>

              <Skeleton isLoaded={!isLoading}>{renderTitle}</Skeleton>
              {renderBlockBelowTitle}
            </Stack>
          </Flex>
          <Flex
            direction="row-reverse"
            pl={{ lg: 8 }}
            pr={0}
            pt={{ lg: 8 }}
            justifyContent={{ base: 'center', lg: 'flex-start' }}
            alignItems={{ base: 'center', lg: 'flex-start' }}
          >
            {renderMinimap(300, 200)}
          </Flex>
        </Flex>
      )}
    >
      {children}
    </BasePageLayout>
  );
};
