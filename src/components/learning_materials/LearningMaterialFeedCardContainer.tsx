import { Center, Flex, LinkBox, LinkOverlay, Stack } from '@chakra-ui/react';
import NextLink from 'next/link';
import React, { forwardRef, ReactNode } from 'react';
import { PageInfo } from '../../pages/PageInfo';
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
  interactionButtons: ReactNode[];
  renderBottomLeft: ReactNode;
  renderBottomRight: ReactNode;
  onClick: () => void;
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
      interactionButtons,
      renderBottomLeft,
      renderBottomRight,
      onClick,
    },
    ref
  ) => {
    return (
      <Flex
        ref={ref}
        boxShadow="sm"
        display="flex"
        flexDir="row"
        alignItems="stretch"
        borderWidth={1}
        borderColor="gray.300"
        _hover={{
          cursor: 'pointer',
          borderColor: 'gray.400',
          boxShadow: 'md',
        }}
        // TODO: Accessibility! Haven't found a clean solution so far, but it needs a <a> tag somewhere for the resource page
        // Maybe the comments count component, like reddit ?
        onClick={() => onClick()}
      >
        <BoxBlockDefaultClickPropagation
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexShrink={0}
          flexBasis="140px"
          py={2}
          bgColor="red.100"
        >
          <LearningMaterialRecommendationsViewer
            learningMaterial={learningMaterial}
            isLoading={false} // TODO
            size="sm"
          />
        </BoxBlockDefaultClickPropagation>

        <Flex direction="column" alignItems="stretch" flexGrow={1} ml="6px" pt="3px">
          <Flex justifyContent="space-between" flexWrap="wrap" mb="3px">
            {renderTitle}
            {renderTopRight}
          </Flex>
          <Flex justifyContent="space-between" flexWrap="wrap">
            <Stack direction="column" flexGrow={12} alignItems="flex-start">
              {renderSubTitle}
              {renderCentralBlock}
            </Stack>
            <Center flexGrow={1} py={2}>
              {renderPreview}
            </Center>
          </Flex>
          <Flex justifyContent="space-between" my="3px" flexWrap="wrap">
            {renderBottomLeft}
            {renderBottomRight}
          </Flex>
        </Flex>
        <Flex ml="6px" alignItems="center" justifyContent="flex-end" bgColor="blue.100">
          <BoxBlockDefaultClickPropagation>
            <Stack px="2px" alignItems="center">
              {interactionButtons.map((iteractionButton) => iteractionButton)}
            </Stack>
          </BoxBlockDefaultClickPropagation>
        </Flex>
      </Flex>
    );
  }
);
