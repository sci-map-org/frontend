import { Badge, Stack, Text } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { routerPushToPage } from '../../pages/PageInfo';
import { LearningPathPageInfo } from '../../pages/RoutesPageInfos';
import { shortenString } from '../../util/utils';
import { LearningMaterialMiniCardContainer } from '../learning_materials/LearningMaterialMiniCardContainer';
import {
  LearningMaterialStarsRater,
  LearningMaterialStarsRaterData,
} from '../learning_materials/LearningMaterialStarsRating';
import { BoxBlockDefaultClickPropagation } from '../lib/BoxBlockDefaultClickPropagation';
import { StarsRatingViewer } from '../lib/StarsRating';
import { LearningPathMiniCardDataFragment } from './LearningPathMiniCard.generated';

export const LearningPathMiniCardData = gql`
  fragment LearningPathMiniCardData on LearningPath {
    _id
    key
    name
    rating
    ...LearningMaterialStarsRaterData
  }
  ${LearningMaterialStarsRaterData}
`;

interface LearningPathMiniCardProps {
  learningPath: LearningPathMiniCardDataFragment;
  inCompactList?: boolean;
  firstItemInCompactList?: boolean;
}

export const LearningPathMiniCard: React.FC<LearningPathMiniCardProps> = ({
  learningPath,
  inCompactList,
  firstItemInCompactList,
}) => {
  return (
    <LearningMaterialMiniCardContainer
      inCompactList={inCompactList}
      firstItemInCompactList={firstItemInCompactList}
      renderFirstRow={<Text fontSize="sm">{shortenString(learningPath.name, 32)}</Text>}
      renderSecondRow={
        <Stack direction="row" spacing={1} alignItems="center">
          <Badge colorScheme="teal" fontSize="0.8em">
            Learning Path
          </Badge>
          <StarsRatingViewer pxSize={13} value={learningPath.rating} />
          <BoxBlockDefaultClickPropagation>
            <LearningMaterialStarsRater learningMaterial={learningPath} size="xs" />
          </BoxBlockDefaultClickPropagation>
        </Stack>
      }
      onClick={() => routerPushToPage(LearningPathPageInfo(learningPath))}
    />
  );
};
