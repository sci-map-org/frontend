import { CloseIcon, EditIcon } from '@chakra-ui/icons';
import { Center, Flex, IconButton, LinkProps, Wrap, WrapItem } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { ReactElement, useMemo, useRef, useState } from 'react';
import { LearningGoalLinkData } from '../../graphql/learning_goals/learning_goals.fragments';
import { routerPushToPage } from '../../pages/PageInfo';
import { LearningGoalPageInfo } from '../../pages/RoutesPageInfos';
import { getChakraRelativeSize } from '../../util/chakra.util';
// import { ConceptBadge } from '../concepts/TopicBadge';
import { BoxBlockDefaultClickPropagation } from '../lib/BoxBlockDefaultClickPropagation';
import { DeleteButtonWithConfirmation } from '../lib/buttons/DeleteButtonWithConfirmation';
import { SubGoalStatus } from '../lib/DagreViewer';
import { PageLink } from '../navigation/InternalLink';
import { LearningMaterialDescription } from '../learning_materials/LearningMaterialDescription';
import { LearningGoalBadge, LearningGoalBadgeData } from './LearningGoalBadge';
import { LearningGoalCircularProgress, LearningGoalCircularProgressData } from './LearningGoalCircularProgress';
import { LearningGoalSubGoalCardDataFragment } from './SubGoalCard.generated';

// export const ConceptSubGoalCardData = gql`
//   fragment ConceptSubGoalCardData on Concept {
//     _id
//     key
//     name
//     domain {
//       _id
//       key
//       name
//     }
//   }
// `;

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
        ... on Topic {
          _id
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
  ${LearningGoalLinkData}
  ${LearningGoalBadgeData}
  ${LearningGoalCircularProgressData}
`;

export const SubGoalCardData = gql`
  fragment SubGoalCardData on SubGoalItem {
    subGoal {
      ... on Topic {
        _id
      }
      # ...LearningGoalSubGoalCardData
      # ...ConceptSubGoalCardData
    }
    strength
    # to change to subgoal / make it compatible
  }
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
  status: SubGoalStatus;
}> = ({ children, learningGoal, editMode, status }) => {
  const [mouseHover, setMouseHover] = useState(false);
  const ref = useRef<any>(null);

  return (
    <Flex
      ref={ref}
      id={learningGoal._id}
      direction="column"
      alignItems="stretch"
      overflowY="scroll"
      overflowX="hidden"
      justifyContent="space-between"
      h="100%"
      w="100%"
      bgColor={subGoalStatusStyleMapping.cardBackgroundColor[status]}
      borderWidth={2}
      borderColor={subGoalStatusStyleMapping.cardBorderColor[status]}
      borderRadius={10}
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

const subGoalStatusStyleMapping: {
  fontColor: {
    [key in SubGoalStatus]: string;
  };
  cardBackgroundColor: {
    [key in SubGoalStatus]: string;
  };
  cardBorderColor: {
    [key in SubGoalStatus]: string;
  };
} = {
  fontColor: {
    [SubGoalStatus.Completed]: 'white',
    [SubGoalStatus.Available]: 'teal.600',
    [SubGoalStatus.Locked]: 'gray.500',
  },
  cardBackgroundColor: {
    [SubGoalStatus.Completed]: 'teal.600',
    [SubGoalStatus.Available]: 'white',
    [SubGoalStatus.Locked]: 'gray.50',
  },
  cardBorderColor: {
    [SubGoalStatus.Completed]: 'teal.600',
    [SubGoalStatus.Available]: 'teal.600',
    [SubGoalStatus.Locked]: 'gray.500',
  },
};
interface LearningGoalSubGoalCardProps {
  learningGoal: LearningGoalSubGoalCardDataFragment;
  size?: 'sm' | 'md' | 'lg';
  status: SubGoalStatus;
}

export const LearningGoalSubGoalCard: React.FC<LearningGoalSubGoalCardProps> = ({
  learningGoal,
  status,
  size = 'md',
}) => {
  return (
    <LearningGoalSubGoalCardContainer status={status} learningGoal={learningGoal}>
      {(mouseHover) => (
        <>
          <Flex>
            <LearningGoalSubGoalCardTitle learningGoal={learningGoal} status={status} size={size} />
          </Flex>

          <Flex pt={1} ml={{ sm: 1, md: 2, lg: 3 }[size]} flexGrow={1} position="relative" direction="column">
            {!mouseHover && learningGoal.description && (
              <LearningMaterialDescription
                color={subGoalStatusStyleMapping.fontColor[status]}
                // size={getChakraRelativeSize(size, -1)}
                size="sm"
                description={learningGoal.description}
                noOfLines={2}
              />
            )}
            {!mouseHover && status === SubGoalStatus.Available && (
              <Center position="absolute" bottom={{ sm: 1, md: 2, lg: 3 }[size]} right={{ sm: 1, md: 2, lg: 3 }[size]}>
                <LearningGoalCircularProgress pxSize={{ sm: 15, md: 20, lg: 30 }[size]} learningGoal={learningGoal} />
              </Center>
            )}
            {/* {mouseHover && learningGoal.requiredSubGoals && !!learningGoal.requiredSubGoals.length && (
              <Wrap pt={2} pb={3} justifySelf="end" spacing={1}>
                {learningGoal.requiredSubGoals.map((subGoalItem) => (
                  <WrapItem key={subGoalItem.subGoal._id}>
                    {subGoalItem.subGoal.__typename === 'LearningGoal' && (
                      <LearningGoalBadge
                        clickable={false}
                        size={getChakraRelativeSize(size, -1) as 'md' | 'sm' | 'xs'}
                        learningGoal={subGoalItem.subGoal}
                      />
                    )}
                    {subGoalItem.subGoal.__typename === 'Concept' && subGoalItem.subGoal.domain && (
                      <ConceptBadge
                        size={getChakraRelativeSize(size, -1) as 'md' | 'sm' | 'xs'}
                        clickable={false}
                        concept={subGoalItem.subGoal}
                      />
                    )}
                  </WrapItem>
                ))}
              </Wrap>
            )} */}
          </Flex>
        </>
      )}
    </LearningGoalSubGoalCardContainer>
  );
};

export const LearningGoalSubGoalCardEditor: React.FC<{
  learningGoal: LearningGoalSubGoalCardDataFragment;
  size?: 'sm' | 'md' | 'lg';
  onRemove: (id: string) => void;
  onEdit: (id: string) => void;
  status: SubGoalStatus;
}> = ({ learningGoal, onRemove, status, onEdit, size = 'md' }) => {
  return (
    <LearningGoalSubGoalCardContainer status={status} learningGoal={learningGoal} editMode>
      {(onHover) => (
        <>
          <Flex direction="row" position="relative">
            <LearningGoalSubGoalCardTitle status={status} learningGoal={learningGoal} size={size} mr={5} />

            <BoxBlockDefaultClickPropagation
              display="flex"
              flexDirection="column"
              alignItems="center"
              position="absolute"
              top={1}
              right={1}
              preventDefault
            >
              <DeleteButtonWithConfirmation
                // Future: remove and removeAndDelete

                modalBodyText={`Do you confirm removing "${learningGoal.name}" from this learning goal ?`}
                modalHeaderText="Confirm removing SubGoal ?"
                mode="iconButton"
                onConfirmation={() => onRemove(learningGoal._id)}
                size="xs"
                variant="ghost"
                color={subGoalStatusStyleMapping.fontColor[status]}
                icon={<CloseIcon />}
                confirmButtonText="Remove"
              />
              <IconButton
                aria-label="edit subGoal"
                onClick={(e) => {
                  e.preventDefault();
                  onEdit(learningGoal._id);
                }}
                color={subGoalStatusStyleMapping.fontColor[status]}
                size="xs"
                variant="ghost"
                icon={<EditIcon />}
              ></IconButton>
            </BoxBlockDefaultClickPropagation>
          </Flex>
        </>
      )}
    </LearningGoalSubGoalCardContainer>
  );
};

const LearningGoalSubGoalCardTitle: React.FC<
  {
    learningGoal: LearningGoalSubGoalCardDataFragment;
    size: 'sm' | 'md' | 'lg';
    status: SubGoalStatus;
  } & LinkProps
> = ({ learningGoal, size, status, ...props }) => {
  return (
    <PageLink
      pageInfo={LearningGoalPageInfo(learningGoal)}
      fontSize={size}
      mt={{ sm: 1, md: 2, lg: 3 }[size as 'sm' | 'md' | 'lg']} // no idea why i need to do that
      ml={{ sm: 1, md: 2, lg: 3 }[size as 'sm' | 'md' | 'lg']}
      mr={1}
      fontWeight={500}
      color={subGoalStatusStyleMapping.fontColor[status]}
      overflowWrap="break-word"
      {...props}
    >
      {learningGoal.name}
    </PageLink>
  );
};
