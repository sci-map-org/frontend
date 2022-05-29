import { Box, Center, Flex, Skeleton, Stack, Text, useBreakpointValue, Wrap, WrapItem } from '@chakra-ui/react';
import React, { forwardRef, ReactNode } from 'react';
import { LearningMaterialWithCoveredTopicsDataFragment } from '../../graphql/learning_materials/learning_materials.fragments.generated';
import { LearningPathFeedCardDataFragment } from '../../graphql/learning_paths/learning_paths.fragments.generated';
import { ResourceFeedCardDataFragment } from '../../graphql/resources/resources.fragments.generated';
import { BoxBlockDefaultClickPropagation } from '../lib/BoxBlockDefaultClickPropagation';
import { PopHover } from '../lib/PopHover';
import { TopicBadge } from '../topics/TopicBadge';
import { LearningMaterialRecommendationsViewer } from './LearningMaterialRecommendationsViewer';
import { LearningMaterialTagViewer } from './LearningMaterialTagViewer';

interface LearningMaterialFeedCardContainerProps {
  learningMaterial: ResourceFeedCardDataFragment | LearningPathFeedCardDataFragment;
  renderTitle: ReactNode;
  renderTopRight?: ReactNode;
  renderSubTitle: ReactNode;
  renderCentralBlock: ReactNode;
  renderPreview?: ReactNode;
  playerIsOpen?: boolean;
  interactionButtons: ReactNode[];
  renderBottomLeft?: ReactNode;
  renderBottomRight?: ReactNode;
  onClick: () => void;
  isLoading: boolean;
}

export const LearningMaterialFeedCardContainer = forwardRef<HTMLDivElement, LearningMaterialFeedCardContainerProps>(
  (
    {
      learningMaterial,
      renderTitle,
      renderTopRight,
      renderSubTitle,
      renderCentralBlock,
      renderPreview,
      playerIsOpen,
      interactionButtons,
      renderBottomLeft,
      renderBottomRight,
      onClick,
      isLoading,
    },
    ref
  ) => {
    const responsiveLayout = useBreakpointValue<'mobile' | 'desktop'>({
      base: 'mobile',
      md: 'desktop',
    });
    const layout = responsiveLayout || 'desktop'; // sometimes responsiveLayout is undefined ?
    return (
      <Flex
        ref={ref}
        boxShadow="sm"
        minH={{ base: '220px', md: '160px' }}
        py="3px"
        px="3px"
        display="flex"
        flexDir="row"
        alignItems="stretch"
        borderWidth={1}
        borderColor="gray.300"
        {...(!isLoading && {
          _hover: {
            cursor: 'pointer',
            borderColor: 'gray.400',
            boxShadow: 'md',
          },
        })}
        // TODO: Accessibility! Haven't found a clean solution so far, but it needs a <a> tag somewhere for the resource page
        // Maybe the comments count component, like reddit ?
        onClick={() => onClick()}
      >
        {layout === 'desktop' && (
          <BoxBlockDefaultClickPropagation
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexShrink={0}
            flexBasis="140px"
            py={2}
          >
            <LearningMaterialRecommendationsViewer
              learningMaterial={learningMaterial}
              isLoading={isLoading}
              display="vertical"
              size="md"
              p={1}
            />
          </BoxBlockDefaultClickPropagation>
        )}
        <Flex direction="column" alignItems="stretch" flexGrow={1} ml="6px" pt="3px">
          <Flex justifyContent="space-between" mb="3px" alignItems="flex-start">
            {renderTitle}
            {renderTopRight}
          </Flex>
          <Flex
            direction={renderPreview && playerIsOpen ? 'column' : 'row'}
            justifyContent="space-between"
            flexWrap={layout === 'mobile' ? 'wrap' : 'nowrap'}
          >
            <Stack py="2px" direction="column" flexGrow={12} alignItems="flex-start">
              {renderSubTitle}
              {renderCentralBlock}
            </Stack>
            <Center flexGrow={1} py={2} pl={layout === 'desktop' ? '3px' : 0}>
              {renderPreview}
            </Center>
          </Flex>
          <Flex flexGrow={1} />
          <Flex direction="row" alignItems="stretch" mt="3px">
            {layout === 'mobile' && (
              <BoxBlockDefaultClickPropagation display="flex" justifyContent="center" alignItems="center" pb="2px">
                <LearningMaterialRecommendationsViewer
                  learningMaterial={learningMaterial}
                  isLoading={isLoading}
                  display="horizontal"
                  size="sm"
                />
              </BoxBlockDefaultClickPropagation>
            )}
            <Flex
              alignItems="center"
              flexGrow={1}
              justifyContent="space-between"
              my="3px"
              flexWrap="wrap"
              ml={layout === 'mobile' ? '3px' : 0}
            >
              {renderBottomLeft || (
                <LearningMaterialFeedCardBottomLeftBar learningMaterial={learningMaterial} isLoading={isLoading} />
              )}
              {renderBottomRight || (
                <LearningMaterialFeedCardBottomRightBar
                  learningMaterial={learningMaterial}
                  isLoading={isLoading}
                  view={layout === 'mobile' ? 'compact' : 'expanded'}
                />
              )}
            </Flex>
          </Flex>
        </Flex>
        <Flex ml="6px" alignItems="center" justifyContent="flex-end">
          <BoxBlockDefaultClickPropagation>
            <Stack px="2px" alignItems="center">
              {interactionButtons.map((iteractionButton, idx) => (
                <Box key={idx}>{iteractionButton}</Box>
              ))}
            </Stack>
          </BoxBlockDefaultClickPropagation>
        </Flex>
      </Flex>
    );
  }
);

export const LearningMaterialFeedCardBottomLeftBar: React.FC<{
  learningMaterial: ResourceFeedCardDataFragment | LearningPathFeedCardDataFragment;
  isLoading?: boolean;
}> = ({ learningMaterial, isLoading }) => {
  return learningMaterial.tags ? (
    <Skeleton isLoaded={!isLoading}>
      <Wrap direction="row">
        {learningMaterial.tags.map((tag) => (
          <WrapItem key={tag.name}>
            <LearningMaterialTagViewer tagName={tag.name} size="sm" />
          </WrapItem>
        ))}
      </Wrap>
    </Skeleton>
  ) : null;
};

const MAX_COVERED_SUBTOPICS_DISPLAYED = 2;

export const LearningMaterialFeedCardBottomRightBar: React.FC<{
  learningMaterial: ResourceFeedCardDataFragment | LearningPathFeedCardDataFragment;
  isLoading?: boolean;
  view?: 'expanded' | 'compact';
}> = ({ learningMaterial, isLoading, view = 'expanded' }) => {
  return (
    <Skeleton isLoaded={!isLoading}>
      <BoxBlockDefaultClickPropagation>
        <Stack direction="row">
          {!!learningMaterial.prerequisites?.length && (
            <PopHover
              renderTrigger={
                <Text fontSize="sm" fontWeight={600} color="gray.400" whiteSpace="nowrap">
                  {learningMaterial.prerequisites.length} Prerequisites
                </Text>
              }
              title="Prerequisites"
              colorScheme="blue"
            >
              <Wrap justify="center">
                {learningMaterial.prerequisites.map(({ topic }) => (
                  <WrapItem key={topic._id}>
                    <TopicBadge topic={topic} size="md" />
                  </WrapItem>
                ))}
              </Wrap>
            </PopHover>
          )}

          {!!learningMaterial.prerequisites?.length && !!learningMaterial.coveredSubTopics?.items.length && (
            <Text fontSize="sm" fontWeight={600} color="gray.400">
              |
            </Text>
          )}
          <LearningMaterialCardCoveredSubTopicsViewer
            learningMaterial={learningMaterial}
            isLoading={isLoading}
            view={view}
          />
        </Stack>
      </BoxBlockDefaultClickPropagation>
    </Skeleton>
  );
};

export const LearningMaterialCardCoveredSubTopicsViewer: React.FC<{
  learningMaterial: LearningMaterialWithCoveredTopicsDataFragment;
  isLoading?: boolean;
  view?: 'expanded' | 'compact';
}> = ({ learningMaterial, isLoading, view = 'expanded' }) => {
  const renderPopover = (renderTrigger: ReactNode) =>
    learningMaterial.coveredSubTopics?.items.length ? (
      <PopHover renderTrigger={renderTrigger} title="Covered SubTopics" maxW="360px" minW="320px" colorScheme="blue">
        <Wrap justify="center">
          {learningMaterial.coveredSubTopics.items.map((topic) => (
            <WrapItem key={topic._id}>
              <TopicBadge topic={topic} size="md" />
            </WrapItem>
          ))}
        </Wrap>
      </PopHover>
    ) : null;

  return learningMaterial.coveredSubTopics?.items.length ? (
    <Skeleton isLoaded={!isLoading}>
      {view === 'expanded' ? (
        <Stack direction="row" flexWrap="wrap">
          <Text fontSize="sm" fontWeight={600} color="gray.600" whiteSpace="nowrap">
            Covered SubTopics:
          </Text>
          <Wrap direction="row" spacing={1} alignItems="baseline">
            {learningMaterial.coveredSubTopics.items.slice(0, MAX_COVERED_SUBTOPICS_DISPLAYED).map((topic) => (
              <WrapItem key={topic._id}>
                <TopicBadge topic={topic} size="sm" />
              </WrapItem>
            ))}
            {learningMaterial.coveredSubTopics.items.length > MAX_COVERED_SUBTOPICS_DISPLAYED && (
              <WrapItem>
                {renderPopover(
                  <Text fontWeight={600} color="gray.800" fontSize="sm">
                    ... +{learningMaterial.coveredSubTopics.items.length}
                  </Text>
                )}
              </WrapItem>
            )}
          </Wrap>
        </Stack>
      ) : (
        renderPopover(
          <Text fontSize="sm" fontWeight={600} color="gray.600" whiteSpace="nowrap">
            {learningMaterial.coveredSubTopics.items.length} Covered SubTopics
          </Text>
        )
      )}
    </Skeleton>
  ) : null;
};
