import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Center, Flex, Heading, LinkBox, LinkOverlay, Stack } from '@chakra-ui/react';
import { PageInfo } from '../../pages/PageInfo';
import { LearningPathMiniCardDataFragment } from '../learning_paths/LearningPathMiniCard.generated';
import { ResourceUrlLinkWrapper } from '../resources/elements/ResourceUrl';
import { ResourceMiniCardDataFragment } from '../resources/ResourceMiniCard.generated';
import { LearningMaterialRecommendButton } from './LearningMaterialRecommendButton';
import { LearningMaterialType } from './LearningMaterialTypeBadge';
import { LearningMaterialTypesViewer } from './LearningMaterialTypesViewer';

interface LearningMaterialMiniCardContainerProps {
  learningMaterial: ResourceMiniCardDataFragment | LearningPathMiniCardDataFragment;
  learningMaterialTypes: LearningMaterialType[];
  pageInfo: PageInfo;
}
export const LearningMaterialMiniCardContainer: React.FC<LearningMaterialMiniCardContainerProps> = ({
  learningMaterial,
  learningMaterialTypes,
  pageInfo,
}) => {
  return (
    <LinkBox as="div" display="flex" flexDir="row" alignItems="stretch" p="2px" maxW="100%">
      <Center mr="3px">
        <LearningMaterialRecommendButton
          learningMaterialId={learningMaterial._id}
          isRecommended={!!learningMaterial.recommended}
          size="sm"
          recommendationsTotalCount={learningMaterial.recommendationsCount ?? undefined}
          zIndex={1}
        />
      </Center>
      <Flex direction="column" alignItems="stretch" overflow="hidden">
        {/* <Heading
          as="h3"
          fontSize="18px"
          fontWeight={600}
          color="gray.700"
          // noOfLines={1}
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
        >
          {learningMaterial.name}
        </Heading> */}
        <LinkOverlay href={pageInfo.path}>
          <Heading
            as="h3"
            fontSize="18px"
            fontWeight={600}
            color="gray.700"
            // noOfLines={1}
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {learningMaterial.name}
          </Heading>
        </LinkOverlay>
        <Stack pt="3px" direction="row" alignItems="center" spacing="3px">
          <LearningMaterialTypesViewer learningMaterialTypes={learningMaterialTypes} maxShown={1} size="sm" />
          {learningMaterial.__typename === 'Resource' && (
            <ResourceUrlLinkWrapper resource={learningMaterial} display="flex" alignItems="center">
              <ExternalLinkIcon color="blue.500" />
            </ResourceUrlLinkWrapper>
          )}
        </Stack>
      </Flex>
      {/* <Flex>{renderFirstRow}</Flex>
      <Flex>{renderSecondRow}</Flex> */}
    </LinkBox>
  );
};
