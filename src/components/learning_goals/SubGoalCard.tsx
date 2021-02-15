import { CloseIcon } from '@chakra-ui/icons';
import { Center, Flex, Wrap, WrapItem } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { useRef, useState } from 'react';
import { ConceptData } from '../../graphql/concepts/concepts.fragments';
import { DomainData } from '../../graphql/domains/domains.fragments';
import { LearningGoalLinkData } from '../../graphql/learning_goals/learning_goals.fragments';
import { routerPushToPage } from '../../pages/PageInfo';
import { LearningGoalPageInfo } from '../../pages/RoutesPageInfos';
import { ConceptBadge } from '../concepts/ConceptBadge';
import { BoxBlockDefaultClickPropagation } from '../lib/BoxBlockDefaultClickPropagation';
import { DeleteButtonWithConfirmation } from '../lib/buttons/DeleteButtonWithConfirmation';
import { InternalLink, PageLink } from '../navigation/InternalLink';
import { ResourceDescription } from '../resources/elements/ResourceDescription';
import { LearningGoalBadge, LearningGoalBadgeData } from './LearningGoalBadge';
import { LearningGoalCircularProgress, LearningGoalCircularProgressData } from './LearningGoalCircularProgress';
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
    ...LearningGoalLinkData
    description
    ...LearningGoalCircularProgressData
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
  ${LearningGoalLinkData}
  ${LearningGoalBadgeData}
  ${LearningGoalCircularProgressData}
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
  const [mouseHover, setMouseHover] = useState(false);
  const ref = useRef<any>(null);
  return (
    <Flex
      ref={ref}
      id={learningGoal._id}
      direction="column"
      overflow="hidden"
      alignItems="stretch"
      justifyContent="space-between"
      h="100%"
      w="100%"
      bgColor={learningGoal.progress?.level === 100 ? 'green.100' : mouseHover ? 'gray.300' : 'gray.100'}
      pl={3}
      pr={1}
      onMouseOver={(event) => {
        !mouseHover && setMouseHover(true);
      }}
      onMouseOut={(event) => {
        if (!mouseHover) return;
        const current = ref.current;
        if (current && !current.contains(event.relatedTarget)) {
          setMouseHover(false);
        }
      }}
      _hover={{ cursor: 'pointer' }}
      onClick={() =>
        routerPushToPage(LearningGoalPageInfo(learningGoal), { query: { editMode: (!!editMode).toString() } })
      }
    >
      <Flex direction="row" position="relative">
        <PageLink
          pageInfo={LearningGoalPageInfo(learningGoal)}
          fontSize="lg"
          fontWeight={500}
          mt={3}
          overflowWrap="break-word"
          {...(editMode && { mr: 5 })}
        >
          {learningGoal.name}
        </PageLink>
        {editMode && onRemove && (
          <BoxBlockDefaultClickPropagation position="absolute" top={1} right={1}>
            <DeleteButtonWithConfirmation
              // Future: remove and removeAndDelete

              modalBodyText={`Do you confirm removing "${learningGoal.name}" from this learning goal ?`}
              modalHeaderText="Confirm removing SubGoal ?"
              mode="iconButton"
              onConfirmation={() => onRemove(learningGoal._id)}
              size="xs"
              variant="ghost"
              icon={<CloseIcon />}
              confirmButtonText="Remove"
            />
          </BoxBlockDefaultClickPropagation>
        )}
      </Flex>

      <Flex pt={1} flexGrow={1} position="relative" direction="column">
        {!mouseHover && learningGoal.description && (
          <ResourceDescription description={learningGoal.description} noOfLines={2} />
        )}
        {!mouseHover && (
          <Center position="absolute" bottom={3} right={3}>
            <LearningGoalCircularProgress learningGoal={learningGoal} />
          </Center>
        )}
        {mouseHover && learningGoal.requiredSubGoals && !!learningGoal.requiredSubGoals.length && (
          <Wrap pt={2} pb={3} justifySelf="end">
            {learningGoal.requiredSubGoals.map((subGoalItem) => (
              <BoxBlockDefaultClickPropagation key={subGoalItem.subGoal._id}>
                <WrapItem>
                  {subGoalItem.subGoal.__typename === 'LearningGoal' && (
                    <LearningGoalBadge size="sm" learningGoal={subGoalItem.subGoal} />
                  )}
                  {subGoalItem.subGoal.__typename === 'Concept' && subGoalItem.subGoal.domain && (
                    <ConceptBadge size="sm" concept={subGoalItem.subGoal} />
                  )}
                </WrapItem>
              </BoxBlockDefaultClickPropagation>
            ))}
          </Wrap>
        )}
      </Flex>
    </Flex>
  );
};

interface ConceptSubGoalCardProps extends SharedSubGoalCardProps {
  concept: ConceptSubGoalCardDataFragment;
}

/**
 * Deprecated as roadmaps don't have concept children anymore
 */
export const ConceptSubGoalCard: React.FC<ConceptSubGoalCardProps> = ({ concept, editMode, onRemove }) => {
  console.error('Should never be used now');
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
