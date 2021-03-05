import { Badge, Center, Flex, Icon, Stack, Text } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { ResourcePreviewData } from '../../graphql/resources/resources.fragments';
import { LearningPathPreviewCard, LearningPathPreviewCardData } from '../learning_paths/LearningPathPreviewCard';
import { LearningMaterialPreviewCardList } from '../resources/LearningMaterialPreviewCardList';
import { ResourcePreviewCard } from '../resources/ResourcePreviewCard';
import { LearningGoalRelevantLearningMaterialsDataFragment } from './LearningGoalRelevantLearningMaterials.generated';
import { ImRadioUnchecked } from '@react-icons/all-files/im/ImRadioUnchecked';
import { ImRadioChecked } from '@react-icons/all-files/im/ImRadioChecked';
import { useMemo } from 'react';

export const LearningGoalRelevantLearningMaterialsData = gql`
  fragment LearningGoalRelevantLearningMaterialsData on LearningGoal {
    _id
    relevantLearningMaterials(options: {}) {
      items {
        learningMaterial {
          ...ResourcePreviewData
          ...LearningPathPreviewCardData
        }
        coverage
      }
    }
  }
  ${ResourcePreviewData}
  ${LearningPathPreviewCardData}
`;
interface LearningGoalRelevantLearningMaterialsProps {
  learningGoal: LearningGoalRelevantLearningMaterialsDataFragment;
  isLoading?: boolean;
}
export const LearningGoalRelevantLearningMaterials: React.FC<LearningGoalRelevantLearningMaterialsProps> = ({
  learningGoal,
  isLoading,
}) => {
  return (
    <Flex direction="column" w="100%" justifyContent="stretch" alignItems="stretch">
      <LearningMaterialPreviewCardList
        learningMaterialsPreviewItems={learningGoal.relevantLearningMaterials?.items || []}
        renderCard={({ learningMaterial, coverage }, idx) => {
          if (learningMaterial.__typename === 'Resource')
            return (
              <ResourcePreviewCard
                key={learningMaterial._id}
                resource={learningMaterial}
                leftBlockWidth="120px"
                inCompactList
                firstItemInCompactList={idx === 0}
                renderTopRight={
                  <CardIncludeElement
                    coverage={coverage}
                    learningMaterialIndex={idx}
                    learningMaterialLength={learningGoal.relevantLearningMaterials?.items.length || 0}
                  />
                }
              />
            );
          if (learningMaterial.__typename === 'LearningPath')
            return (
              <LearningPathPreviewCard
                learningPath={learningMaterial}
                key={learningMaterial._id}
                leftBlockWidth="120px"
                inCompactList
                firstItemInCompactList={idx === 0}
                renderTopRight={
                  <CardIncludeElement
                    coverage={coverage}
                    learningMaterialIndex={idx}
                    learningMaterialLength={learningGoal.relevantLearningMaterials?.items.length || 0}
                  />
                }
              />
            );
        }}
        isLoading={isLoading}
      />
    </Flex>
  );
};

const CardIncludeElement: React.FC<{
  coverage?: number | null;
  learningMaterialIndex: number;
  learningMaterialLength: number;
}> = ({ coverage, learningMaterialIndex, learningMaterialLength }) => {
  // Is this acceptable ? In itself everything is recommended already
  const recommended = useMemo(() => {
    return learningMaterialLength > 5 ? learningMaterialIndex < 2 : learningMaterialIndex === 0;
  }, [learningMaterialIndex, learningMaterialLength]);
  return recommended || coverage ? (
    <Center>
      <Stack direction="row" alignItems="baseline">
        {recommended && <RecommendedBadge />}
        {coverage && <LearningMaterialCoverage coverage={coverage} />}
      </Stack>
    </Center>
  ) : null;
};

const RecommendedBadge: React.FC<{}> = () => {
  return <Badge colorScheme="purple">Recommended for you</Badge>;
};

const LearningMaterialCoverage: React.FC<{ coverage: number }> = ({ coverage }) => {
  const coveragePoints = useMemo(() => {
    return Math.ceil(coverage * 5);
  }, [coverage]);
  return (
    <Stack spacing={1} direction="row" alignItems="center" mr={2}>
      <Text fontSize="sm" color="gray.600" fontWeight={500} pb="2px">
        Coverage:{' '}
      </Text>
      <Stack direction="row" spacing={1}>
        {[...Array(coveragePoints)].map((_, idx) => (
          <Icon key={idx} as={ImRadioChecked} color="gray.800" />
        ))}
        {[...Array(5 - coveragePoints)].map((_, idx) => (
          <Icon key={idx} as={ImRadioUnchecked} color="gray.800" />
        ))}
      </Stack>
    </Stack>
  );
};
