import { CloseIcon } from '@chakra-ui/icons';
import { Center, Flex, Wrap, WrapItem } from '@chakra-ui/react';
import { Domain } from 'domain';
import gql from 'graphql-tag';
import { ConceptData } from '../../graphql/concepts/concepts.fragments';
import { DomainData } from '../../graphql/domains/domains.fragments';
import { DeleteButtonWithConfirmation } from '../lib/buttons/DeleteButtonWithConfirmation';
import { InternalLink } from '../navigation/InternalLink';
import { ResourceDescription } from '../resources/elements/ResourceDescription';
import { LearningGoalBadge, LearningGoalBadgeData } from './LearningGoalBadge';
import {
  ConceptSubGoalCardDataFragment,
  LearningGoalSubGoalCardDataFragment,
  SubGoalCardDataFragment,
} from './SubGoalCard.generated';

export const ConceptSubGoalCardData = gql`
  fragment ConceptSubGoalCardData on Concept {
    _id
    key
    name
    domain {
      _id
      key
      name
    }
  }
`;

export const LearningGoalSubGoalCardData = gql`
  fragment LearningGoalSubGoalCardData on LearningGoal {
    _id
    name
    key
    description
    domain {
      contextualName
      contextualKey
      domain {
        ...DomainData
      }
    }
    requiredSubGoals {
      strength
      subGoal {
        ... on LearningGoal {
          ...LearningGoalBadgeData
        }
        ... on Concept {
          ...ConceptData
          domain {
            ...DomainData
          }
        }
      }
    }
  }
  ${ConceptData}
  ${DomainData}
  ${LearningGoalBadgeData}
`;

export const SubGoalCardData = gql`
  fragment SubGoalCardData on SubGoalItem {
    subGoal {
      ...LearningGoalSubGoalCardData
      ...ConceptSubGoalCardData
    }
    strength
    # to change to subgoal / make it compatible
  }
  ${LearningGoalSubGoalCardData}
  ${ConceptSubGoalCardData}
`;

interface SharedSubGoalCardProps {
  onRemove?: (subGoalId: string) => void;
  editMode?: boolean;
}

interface SubGoalCardProps extends SharedSubGoalCardProps {
  subGoalItem: SubGoalCardDataFragment;
}

export const SubGoalCard: React.FC<SubGoalCardProps> = ({ subGoalItem, ...props }) => {
  if (subGoalItem.subGoal.__typename === 'LearningGoal')
    return <LearningGoalSubGoalCard learningGoal={subGoalItem.subGoal} {...props} />;
  if (subGoalItem.subGoal.__typename === 'Concept')
    return <ConceptSubGoalCard concept={subGoalItem.subGoal} {...props} />;
  return <Flex borderWidth={1} direction="column" alignItems="stretch"></Flex>;
};

interface LearningGoalSubGoalCardProps extends SharedSubGoalCardProps {
  learningGoal: LearningGoalSubGoalCardDataFragment;
}

const LearningGoalSubGoalCard: React.FC<LearningGoalSubGoalCardProps> = ({ learningGoal, editMode, onRemove }) => {
  const domainItem = learningGoal.domain;
  return (
    <Flex direction="column" alignItems="stretch" h="100%" w="100%">
      <Center position="relative" flexGrow={1}>
        <InternalLink
          routePath={domainItem ? '/domains/[key]/goals/[learningGoalKey]' : '/goals/[learningGoalKey]'}
          asHref={
            domainItem
              ? `/domains/${domainItem.domain.key}/goals/${domainItem.contextualKey}`
              : `/goals/${learningGoal.key}`
          }
          fontSize="xl"
          mt={2}
          px={2}
          {...(editMode && { mr: 5 })}
        >
          {learningGoal.name}
        </InternalLink>
        {editMode && onRemove && (
          <DeleteButtonWithConfirmation
            // Future: remove and removeAndDelete
            position="absolute"
            top={1}
            right={1}
            modalBodyText={`Do you confirm removing "${learningGoal.name}" from this learning goal ?`}
            modalHeaderText="Confirm removing SubGoal ?"
            mode="iconButton"
            onConfirmation={() => onRemove(learningGoal._id)}
            size="xs"
            variant="ghost"
            icon={<CloseIcon />}
            confirmButtonText="Remove"
          />
        )}
      </Center>

      <Flex px={2} pb={2}>
        {learningGoal.description && <ResourceDescription description={learningGoal.description} noOfLines={2} />}
      </Flex>

      {learningGoal.requiredSubGoals && !!learningGoal.requiredSubGoals.length && (
        <Wrap px={2} pb={2}>
          {learningGoal.requiredSubGoals.map((subGoalItem) => (
            <WrapItem key={subGoalItem.subGoal._id}>
              {subGoalItem.subGoal.__typename === 'LearningGoal' && (
                <LearningGoalBadge learningGoal={subGoalItem.subGoal} />
              )}
              {subGoalItem.subGoal.__typename === 'Concept' && subGoalItem.subGoal.domain && (
                <Flex>
                  <InternalLink // Use PageLink with the pageinfo problem is fixed
                    routePath="/domains/[key]/concepts/[conceptKey]"
                    asHref={`/domains/${subGoalItem.subGoal.domain.key}/concepts/${subGoalItem.subGoal.key}`}
                  >
                    {subGoalItem.subGoal.name}
                  </InternalLink>
                </Flex>
                // <PageLink pageInfo={ConceptPageInfo(subSubGoal.subGoal.domain, subSubGoal.subGoal)} />
              )}
            </WrapItem>
          ))}
        </Wrap>
      )}
      {/* <Flex>
          <LearningGoalSelector
            placeholder="Add SubGoal"
            onSelect={(selected) =>
              attachLearningGoalRequiresSubGoal({
                variables: { learningGoalId: learningGoal._id, subGoalId: selected._id, payload: {} },
              })
            }
          />
        </Flex> */}
    </Flex>
  );
};

interface ConceptSubGoalCardProps extends SharedSubGoalCardProps {
  concept: ConceptSubGoalCardDataFragment;
}
export const ConceptSubGoalCard: React.FC<ConceptSubGoalCardProps> = ({ concept, editMode, onRemove }) => {
  const domain = concept.domain;
  if (!domain) return null;
  return (
    <Center h="100%" w="100%" direction="column" position="relative">
      <InternalLink
        mx={2}
        py={1}
        routePath="/domains/[key]/concepts/[conceptKey]"
        asHref={`/domains/${domain.key}/concepts/${concept.key}`}
        fontSize="lg"
        fontWeight={500}
        {...(editMode && { mr: 6 })}
      >
        {concept.name}
      </InternalLink>
      {editMode && onRemove && (
        <DeleteButtonWithConfirmation
          // Future: remove and removeAndDelete
          position="absolute"
          top={1}
          right={1}
          modalBodyText={`Do you confirm removing "${concept.name}" from this learning goal ?`}
          modalHeaderText="Confirm removing this concept ?"
          mode="iconButton"
          onConfirmation={() => onRemove(concept._id)}
          size="xs"
          variant="ghost"
          icon={<CloseIcon />}
          confirmButtonText="Remove"
        />
      )}
      {/* <PageLink pageInfo={ConceptPageInfo(concept.domain, concept)}>{concept.name}</PageLink> */}
    </Center>
  );
};
