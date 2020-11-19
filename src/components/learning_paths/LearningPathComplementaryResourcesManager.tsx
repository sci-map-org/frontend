import { Heading, Stack } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { LearningPathData } from '../../graphql/learning_paths/learning_paths.fragments';
import { ResourceData } from '../../graphql/resources/resources.fragments';
import { SquareResourceCardDataFragment } from '../resources/SquareResourceCard.generated';
import { SquareResourceCardWrapper } from '../resources/SquareResourceCardsWrapper';
import {
  useAddComplementaryResourceToLearningPathMutation,
  useRemoveComplementaryResourceFromLearningPathMutation,
} from './LearningPathComplementaryResourcesManager.generated';

export const addComplementaryResourceToLearningPath = gql`
  mutation addComplementaryResourceToLearningPath($learningPathId: String!, $resourceId: String!) {
    addComplementaryResourceToLearningPath(learningPathId: $learningPathId, resourceId: $resourceId) {
      learningPath {
        ...LearningPathData
        complementaryResources {
          _id
        }
      }
      resource {
        ...ResourceData
      }
    }
  }
  ${LearningPathData}
  ${ResourceData}
`;

export const removeComplementaryResourceFromLearningPath = gql`
  mutation removeComplementaryResourceFromLearningPath($learningPathId: String!, $resourceId: String!) {
    removeComplementaryResourceFromLearningPath(learningPathId: $learningPathId, resourceId: $resourceId) {
      learningPath {
        ...LearningPathData
        complementaryResources {
          _id
        }
      }
    }
  }
  ${LearningPathData}
`;

export const LearningPathComplementaryResourcesManager: React.FC<{
  learningPathId: string;
  complementaryResources: SquareResourceCardDataFragment[];
  editMode?: boolean;
  isLoading?: boolean;
}> = ({ learningPathId, complementaryResources, editMode, isLoading }) => {
  const [addComplementaryResource] = useAddComplementaryResourceToLearningPathMutation();
  const [removeComplementaryResource] = useRemoveComplementaryResourceFromLearningPathMutation();
  if (!editMode && !complementaryResources?.length) return null;
  return (
    <Stack direction="column" spacing={3}>
      <Heading size="md" textAlign="center">
        Complementary Resources
      </Heading>
      <SquareResourceCardWrapper
        resources={complementaryResources}
        onRemove={(resource) =>
          removeComplementaryResource({ variables: { learningPathId, resourceId: resource._id } })
        }
        onAdd={(resource) => addComplementaryResource({ variables: { learningPathId, resourceId: resource._id } })}
        editable={editMode}
        isLoading={isLoading}
      />
    </Stack>
  );
};
