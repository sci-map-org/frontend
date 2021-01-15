import { Badge, Stack, Text } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { routerPushToPage } from '../../pages/PageInfo';
import { LearningPathPageInfo } from '../../pages/RoutesPageInfos';
import { LearningMaterialMiniCardContainer } from '../learning_materials/LearningMaterialMiniCardContainer';
import { StarsRatingViewer } from '../learning_materials/LearningMaterialStarsRating';
import { LearningPathMiniCardDataFragment } from './LearningPathMiniCard.generated';

export const LearningPathMiniCardData = gql`
  fragment LearningPathMiniCardData on LearningPath {
    _id
    key
    name
    rating
  }
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
      renderFirstRow={<Text fontSize="sm">{learningPath.name}</Text>}
      renderSecondRow={
        <Stack direction="row" spacing={1}>
          <Badge colorScheme="teal" fontSize="0.8em">
            Learning Path
          </Badge>
          <StarsRatingViewer pxSize={13} value={learningPath.rating} />
        </Stack>
      }
      onClick={() => routerPushToPage(LearningPathPageInfo(learningPath))}
    />
  );
};
