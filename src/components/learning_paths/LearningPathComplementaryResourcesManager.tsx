import gql from 'graphql-tag';
import { LearningPathData } from '../../graphql/learning_paths/learning_paths.fragments';
import { ResourceData } from '../../graphql/resources/resources.fragments';
import { ResourceDataFragment } from '../../graphql/resources/resources.fragments.generated';
import { StatelessSubResourcesManager } from '../resources/SubResourcesManager';
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
  complementaryResources: ResourceDataFragment[];
}> = ({ learningPathId, complementaryResources }) => {
  const [addComplementaryResource] = useAddComplementaryResourceToLearningPathMutation();
  const [removeComplementaryResource] = useRemoveComplementaryResourceFromLearningPathMutation();
  return (
    <StatelessSubResourcesManager
      subResources={complementaryResources}
      addSubResource={(resource) =>
        addComplementaryResource({ variables: { learningPathId, resourceId: resource._id } })
      }
      removeSubResource={(resource) =>
        removeComplementaryResource({ variables: { learningPathId, resourceId: resource._id } })
      }
    />
  );
};
