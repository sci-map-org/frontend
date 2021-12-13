// import { Skeleton, Stack } from '@chakra-ui/react';
// import { LearningMaterialWithCoveredTopicsDataFragment } from '../../graphql/learning_materials/learning_materials.fragments.generated';
// import { TopicBadge } from '../topics/TopicBadge';

// interface LearningMaterialCoveredTopicsViewerProps {
//   learningMaterial: LearningMaterialWithCoveredTopicsDataFragment;
//   isLoading?: boolean;
// }

// export const LearningMaterialCoveredTopicsViewer: React.FC<LearningMaterialCoveredTopicsViewerProps> = ({
//   learningMaterial,
//   isLoading,
// }) => {
//   if (!learningMaterial.coveredSubTopics) return null;
//   return (
//     <Stack spacing={2}>
//       {learningMaterial.coveredSubTopics?.items.map((topic) => (
//           <Skeleton isLoaded={!isLoading}>
//           <TopicBadge topic={topic}/>
//         </Skeleton>
//       ))}
//     </Stack>
//   );
// };

export default {};
