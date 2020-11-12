import { Heading, Stack, StackProps } from '@chakra-ui/core';
import { LearningMaterialWithCoveredConceptsByDomainDataFragment } from '../../graphql/learning_materials/learning_materials.fragments.generated';
import { RoleAccess, RoleAccessAllowedRule } from '../auth/RoleAccess';
import { LearningMaterialCoveredConceptsByDomainViewer } from './LearningMaterialCoveredConceptsByDomainViewer';
import { LearningMaterialDomainAndCoveredConceptsSelector } from './LearningMaterialDomainAndCoveredConceptsSelector';

export const LearningMaterialCoveredTopics: React.FC<{
  learningMaterial: LearningMaterialWithCoveredConceptsByDomainDataFragment;
  isLoading?: boolean;
  editMode: boolean | RoleAccessAllowedRule;
  w?: StackProps['w'];
}> = ({ w, learningMaterial, isLoading, editMode }) => {
  return (
    <Stack w={w} backgroundColor="gray.100" px={4} mt={4} py={3} borderRadius={5}>
      <Heading size="sm">Covered Topics</Heading>
      <RoleAccess
        accessRule={editMode}
        renderAccessDenied={() =>
          learningMaterial.coveredConceptsByDomain?.length && (
            <LearningMaterialCoveredConceptsByDomainViewer learningMaterial={learningMaterial} isLoading={isLoading} />
          )
        }
      >
        <LearningMaterialDomainAndCoveredConceptsSelector learningMaterial={learningMaterial} isLoading={isLoading} />
      </RoleAccess>
    </Stack>
  );
};
