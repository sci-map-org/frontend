import { Center, Flex, Stack, Wrap, WrapItem } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { useMemo, useState } from 'react';
import { SubTopicSelector } from '../../components/domains/SubTopicSelector';
import { PageLayout } from '../../components/layout/PageLayout';
import { SubGoalCard, SubGoalCardData } from '../../components/learning_goals/SubGoalCard';
import { EditableTextarea } from '../../components/lib/inputs/EditableTextarea';
import { EditableTextInput } from '../../components/lib/inputs/EditableTextInput';
import { DomainData, generateDomainData } from '../../graphql/domains/domains.fragments';
import { DomainDataFragment } from '../../graphql/domains/domains.fragments.generated';
import { generateLearningGoalData, LearningGoalData } from '../../graphql/learning_goals/learning_goals.fragments';
import {
  useAttachLearningGoalRequiresSubGoalMutation,
  useDetachLearningGoalRequiresSubGoalMutation,
  useUpdateLearningGoalMutation,
} from '../../graphql/learning_goals/learning_goals.operations.generated';
import { LearningGoalBelongsToDomain, TopicType, UserRole } from '../../graphql/types';
import { useCurrentUser } from '../../graphql/users/users.hooks';
import { DomainPageInfo } from '../domains/DomainPage';
import { PageInfo } from '../PageInfo';
import {
  GetLearningGoalDomainLearningGoalPageQuery,
  useGetLearningGoalDomainLearningGoalPageQuery,
} from './DomainLearningGoalPage.generated';
import { LearningGoalPageRightIcons } from './LearningGoalPage';

export const DomainLearningGoalPagePath = (domainKey: string, contextualLearningGoalKey: string) =>
  `/domains/${domainKey}/goals/${contextualLearningGoalKey}`;

export const DomainLearningGoalPageInfo = (
  domain: Pick<DomainDataFragment, 'key' | 'name'>,
  { contextualKey, contextualName }: Pick<LearningGoalBelongsToDomain, 'contextualKey' | 'contextualName'>
): PageInfo => ({
  name: `${domain.name} - ${contextualName}`,
  path: DomainLearningGoalPagePath(domain.key, contextualKey),
  routePath: DomainLearningGoalPagePath('[key]', '[learningGoalKey]'),
});

export const getLearningGoalDomainLearningGoalPage = gql`
  query getLearningGoalDomainLearningGoalPage($domainKey: String!, $contextualLearningGoalKey: String!) {
    getDomainLearningGoalByKey(domainKey: $domainKey, contextualLearningGoalKey: $contextualLearningGoalKey) {
      domain {
        ...DomainData
      }
      learningGoal {
        ...LearningGoalData
        createdBy {
          _id
        }
        requiredSubGoals {
          ...SubGoalCardData
        }
      }
    }
  }
  ${DomainData}
  ${LearningGoalData}
  ${SubGoalCardData}
`;

const placeholderData: GetLearningGoalDomainLearningGoalPageQuery['getDomainLearningGoalByKey'] = {
  learningGoal: generateLearningGoalData(),
  domain: generateDomainData(),
};

export const DomainLearningGoalPage: React.FC<{ domainKey: string; contextualLearningGoalKey: string }> = ({
  contextualLearningGoalKey,
  domainKey,
}) => {
  const { data, loading } = useGetLearningGoalDomainLearningGoalPageQuery({
    variables: { domainKey, contextualLearningGoalKey },
  });
  const learningGoal = data?.getDomainLearningGoalByKey.learningGoal || placeholderData.learningGoal;
  const domain = data?.getDomainLearningGoalByKey.domain || placeholderData.domain;
  const [updateLearningGoal] = useUpdateLearningGoalMutation();
  const { currentUser } = useCurrentUser();
  const currentUserIsOwner = useMemo(
    () => !!learningGoal.createdBy && !!currentUser && learningGoal.createdBy._id === currentUser._id,
    [learningGoal, currentUser]
  );
  const [editMode, setEditMode] = useState(!!currentUser && currentUser.role === UserRole.Admin);
  const [attachLearningGoalRequiresSubGoal] = useAttachLearningGoalRequiresSubGoalMutation();
  const [detachLearningGoalRequiresSubGoal] = useDetachLearningGoalRequiresSubGoalMutation();
  return (
    <PageLayout
      breadCrumbsLinks={[DomainPageInfo(domain)]}
      renderTopRight={
        <LearningGoalPageRightIcons
          learningGoal={learningGoal}
          currentUserIsOwner={currentUserIsOwner}
          isDisabled={loading}
          editMode={editMode}
          setEditMode={setEditMode}
        />
      }
    >
      <Stack w="100%">
        <Center>
          <EditableTextInput
            value={learningGoal.name}
            centered
            editMode={false} // ? If overriding, the contextualName won't work anymore :/
            isLoading={loading}
            onChange={(newName) =>
              updateLearningGoal({
                variables: {
                  _id: learningGoal._id,
                  payload: { name: (newName as string) || null },
                },
              })
            }
          />
        </Center>
        <EditableTextarea
          textAlign="center"
          isLoading={loading}
          justifyContent="center"
          backgroundColor="backgroundColor.0"
          fontSize="lg"
          fontWeight={300}
          color="gray.700"
          defaultValue={learningGoal.description || ''}
          placeholder="Add a description..."
          onSubmit={(newDescription: any) =>
            updateLearningGoal({
              variables: {
                _id: learningGoal._id,
                payload: { description: (newDescription as string) || null },
              },
            })
          }
          isDisabled={!editMode}
        />
        <Flex>
          <Wrap>
            {learningGoal.requiredSubGoals &&
              learningGoal.requiredSubGoals.map((requiredSubGoalItem) => (
                <WrapItem
                  borderWidth="1px"
                  borderColor="gray.500"
                  boxShadow="md"
                  // w="45%"
                  borderRadius={5}
                  key={requiredSubGoalItem.subGoal._id}
                >
                  <SubGoalCard
                    editMode={editMode}
                    subGoalItem={requiredSubGoalItem}
                    onRemove={(subGoalId) =>
                      detachLearningGoalRequiresSubGoal({
                        variables: { learningGoalId: learningGoal._id, subGoalId: subGoalId },
                      })
                    }
                  />
                </WrapItem>
              ))}
            {editMode && (
              <WrapItem
              // w="45%"
              // borderWidth="1px"
              // borderColor="gray.500"
              // justifyContent="center"
              // alignItems="center"
              // py={3}
              // borderRadius={5}
              ></WrapItem>
            )}
          </Wrap>
          <SubTopicSelector
            domain={domain}
            onSelect={(selected) =>
              attachLearningGoalRequiresSubGoal({
                variables: { learningGoalId: learningGoal._id, subGoalId: selected._id, payload: {} },
              })
            }
            placeholder="Select or Create SubGoals"
            allowedSubTopicTypes={[TopicType.Concept, TopicType.LearningGoal]}
          />
        </Flex>
      </Stack>
    </PageLayout>
  );
};
