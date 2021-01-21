import { Heading, Stack, StackProps } from '@chakra-ui/react';
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
    <RoleAccess
      accessRule={editMode}
      renderAccessDenied={() =>
        !!learningMaterial.coveredConceptsByDomain?.length && (
          <CoveredTopicsContainer w={w}>
            <LearningMaterialCoveredConceptsByDomainViewer learningMaterial={learningMaterial} isLoading={isLoading} />
          </CoveredTopicsContainer>
        )
      }
    >
      <CoveredTopicsContainer w={w}>
        <LearningMaterialDomainAndCoveredConceptsSelector
          allowConceptCreation
          learningMaterial={learningMaterial}
          isLoading={isLoading}
        />
      </CoveredTopicsContainer>
    </RoleAccess>
  );
};

const CoveredTopicsContainer: React.FC<{ w?: StackProps['w'] }> = ({ w, children }) => {
  return (
    <Stack w={w} backgroundColor="gray.100" px={4} mt={4} py={3} borderRadius={5}>
      <Heading size="sm">Covered Topics</Heading>
      {children}
    </Stack>
  );
};
