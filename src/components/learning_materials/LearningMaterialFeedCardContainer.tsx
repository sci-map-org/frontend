import { Box, Center, Flex, Stack, useBreakpointValue } from '@chakra-ui/react';
import React, { forwardRef, ReactNode } from 'react';
import { BoxBlockDefaultClickPropagation } from '../lib/BoxBlockDefaultClickPropagation';
import { LearningMaterialRecommendationsViewer } from './LearningMaterialRecommendationsViewer';
import { LearningMaterialRecommendationsViewerDataFragment } from './LearningMaterialRecommendationsViewer.generated';

interface LearningMaterialFeedCardContainerProps {
  learningMaterial: LearningMaterialRecommendationsViewerDataFragment;
  renderTitle: ReactNode;
  renderTopRight?: ReactNode;
  renderSubTitle: ReactNode;
  renderCentralBlock: ReactNode;
  renderPreview?: ReactNode;
  playerIsOpen?: boolean;
  interactionButtons: ReactNode[];
  renderBottomLeft: ReactNode;
  renderBottomRight: ReactNode;
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
    const layout = useBreakpointValue<'mobile' | 'desktop'>({
      base: 'mobile',
      md: 'desktop',
    });
    return (
      <Flex
        ref={ref}
        boxShadow="sm"
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
              size="sm"
            />
          </BoxBlockDefaultClickPropagation>
        )}
        <Flex direction="column" alignItems="stretch" flexGrow={1} ml={layout === 'desktop' ? '6px' : 0} pt="3px">
          <Flex justifyContent="space-between" mb="3px" alignItems="flex-start">
            {renderTitle}
            {renderTopRight}
          </Flex>
          <Flex
            direction={renderPreview && playerIsOpen ? 'column' : 'row'}
            justifyContent="space-between"
            flexWrap={layout === 'mobile' ? 'wrap' : 'nowrap'}
          >
            <Stack direction="column" flexGrow={12} alignItems="flex-start">
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
              <BoxBlockDefaultClickPropagation>
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
              {renderBottomLeft}
              {renderBottomRight}
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
