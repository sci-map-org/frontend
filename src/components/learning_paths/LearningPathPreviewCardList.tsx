import { LearningMaterialPreviewCardList } from '../resources/LearningMaterialPreviewCardList';
import { LearningPathPreviewCard } from './LearningPathPreviewCard';
import { LearningPathPreviewCardDataFragment } from './LearningPathPreviewCard.generated';

interface LearningPathPreviewCardListProps {
  learningPaths: LearningPathPreviewCardDataFragment[];
  isLoading?: boolean;
}

export const LearningPathPreviewCardList: React.FC<LearningPathPreviewCardListProps> = ({
  learningPaths,
  isLoading,
}) => {
  return (
    <LearningMaterialPreviewCardList
      isLoading={isLoading}
      learningMaterialsPreviewItems={learningPaths}
      renderCard={(learningPath, idx) => (
        <LearningPathPreviewCard
          key={learningPath._id}
          learningPath={learningPath}
          inCompactList
          firstItemInCompactList={idx === 0}
        />
      )}
    />
  );
};
