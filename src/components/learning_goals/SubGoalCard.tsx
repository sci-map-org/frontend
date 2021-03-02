import { CloseIcon, EditIcon } from '@chakra-ui/icons';
import { Center, Flex, IconButton, Stack, Text, Wrap, WrapItem } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { Children, ReactElement, useRef, useState } from 'react';
import { ConceptData } from '../../graphql/concepts/concepts.fragments';
import { DomainData } from '../../graphql/domains/domains.fragments';
import { LearningGoalLinkData } from '../../graphql/learning_goals/learning_goals.fragments';
import { routerPushToPage } from '../../pages/PageInfo';
import { LearningGoalPageInfo } from '../../pages/RoutesPageInfos';
import { ConceptBadge } from '../concepts/ConceptBadge';
import { BoxBlockDefaultClickPropagation } from '../lib/BoxBlockDefaultClickPropagation';
import { DeleteButtonWithConfirmation } from '../lib/buttons/DeleteButtonWithConfirmation';
import { EntitySelector } from '../lib/selectors/EntitySelector';
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
    dependsOnLearningGoals {
      learningGoal {
        _id
      }
      parentLearningGoalId
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

// interface SubGoalCardProps {
//   subGoalItem: SubGoalCardDataFragment;
// }

// export const SubGoalCard: React.FC<SubGoalCardProps> = ({ subGoalItem, ...props }) => {
//   if (subGoalItem.subGoal.__typename === 'LearningGoal')
//     return <LearningGoalSubGoalCard learningGoal={subGoalItem.subGoal} {...props} />;
//   else {
//     return null;
//   }
// };

export const LearningGoalSubGoalCardContainer: React.FC<{
  learningGoal: LearningGoalSubGoalCardDataFragment;
  children: (hover: boolean) => ReactElement<any>;
  editMode?: boolean;
}> = ({ children, learningGoal, editMode }) => {
  const [mouseHover, setMouseHover] = useState(false);
  const ref = useRef<any>(null);
  return (
    <Flex
      ref={ref}
      id={learningGoal._id}
      direction="column"
      // overflow="hidden"
      alignItems="stretch"
      justifyContent="space-between"
      h="100%"
      w="100%"
      bgColor={learningGoal.progress?.level === 100 ? 'teal.600' : mouseHover ? 'gray.50' : 'white'}
      borderWidth={2}
      borderColor="teal.600"
      borderRadius={10}
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
      {children(mouseHover)}
    </Flex>
  );
};

interface LearningGoalSubGoalCardProps {
  learningGoal: LearningGoalSubGoalCardDataFragment;
}

export const LearningGoalSubGoalCard: React.FC<LearningGoalSubGoalCardProps> = ({ learningGoal }) => {
  return (
    <LearningGoalSubGoalCardContainer learningGoal={learningGoal}>
      {(mouseHover) => (
        <>
          <Flex direction="row" position="relative">
            <PageLink
              pageInfo={LearningGoalPageInfo(learningGoal)}
              fontSize="lg"
              fontWeight={500}
              mt={3}
              overflowWrap="break-word"
            >
              {learningGoal.name}
            </PageLink>
            {/* {onRemove && (
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
            )} */}
          </Flex>

          <Flex pt={1} flexGrow={1} position="relative" direction="column">
            {/* {editMode && (
              <BoxBlockDefaultClickPropagation>
                <SubGoalDependenciesEditor />
              </BoxBlockDefaultClickPropagation>
            )} */}
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
        </>
      )}
    </LearningGoalSubGoalCardContainer>
  );
};

export const LearningGoalSubGoalCardEditor: React.FC<{
  learningGoal: LearningGoalSubGoalCardDataFragment;
  onRemove: (id: string) => void;
  onEdit: (id: string) => void;
}> = ({ learningGoal, onRemove, onEdit }) => {
  return (
    <LearningGoalSubGoalCardContainer learningGoal={learningGoal} editMode>
      {(onHover) => (
        <>
          <Flex direction="row" position="relative">
            <PageLink
              pageInfo={LearningGoalPageInfo(learningGoal)}
              fontSize="lg"
              fontWeight={500}
              mt={3}
              overflowWrap="break-word"
              mr={5}
            >
              {learningGoal.name}
            </PageLink>

            <BoxBlockDefaultClickPropagation
              display="flex"
              flexDirection="column"
              alignItems="center"
              position="absolute"
              top={1}
              right={1}
            >
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
              <IconButton
                aria-label="edit subGoal"
                onClick={() => onEdit(learningGoal._id)}
                size="xs"
                variant="ghost"
                icon={<EditIcon />}
              ></IconButton>
            </BoxBlockDefaultClickPropagation>
          </Flex>
          <Flex flexGrow={1}></Flex>
        </>
      )}
    </LearningGoalSubGoalCardContainer>
  );
};
