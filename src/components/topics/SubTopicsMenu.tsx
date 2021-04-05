import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { Box, Collapse, Divider, Flex, FlexProps, IconButton, Skeleton, Stack, Text } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { useState } from 'react';
import { ConceptLinkData } from '../../graphql/concepts/concepts.fragments';
import { ConceptDataFragment } from '../../graphql/concepts/concepts.fragments.generated';
import {
  useSetConceptsKnownMutation,
  useSetConceptsUnknownMutation,
} from '../../graphql/concepts/concepts.operations.generated';
import { DomainLinkData } from '../../graphql/domains/domains.fragments';
import { useCurrentUser } from '../../graphql/users/users.hooks';
import { ConceptPageInfo, DomainPageInfo } from '../../pages/RoutesPageInfos';
import { useUnauthentificatedModal } from '../auth/UnauthentificatedModal';
import { CompletedCheckbox } from '../lib/CompletedCheckbox';
import { PageLink } from '../navigation/InternalLink';
import { SubTopicsMenuDataFragment } from './SubTopicsMenu.generated';

type NestedConceptItem = {
  concept: ConceptDataFragment; //& { parentConcepts?: { concept: { _id: string } }[] | null };
  index: number; // ConceptBelongsToDomain or ConceptBelongsToConcept
  subConceptItems?: NestedConceptItem[];
};

export const SubTopicsMenuData = gql`
  fragment SubTopicsMenuData on TopicIsSubTopicOfTopic {
    index
    subTopic {
      _id
      ... on Concept {
        ...ConceptLinkData
        known {
          level
        }
        subTopics(options: { sorting: { type: index, direction: ASC } }) {
          index
          subTopic {
            _id
            ... on Concept {
              ...ConceptLinkData
              known {
                level
              }
            }
            ... on Domain {
              ...DomainLinkData
            }
          }
        }
      }
      ... on Domain {
        ...DomainLinkData
      }
    }
  }
  ${ConceptLinkData}
  ${DomainLinkData}
`;

// TODO: To Subtopics, add fragment here
export const SubTopicsMenu: React.FC<{
  topicId: string;
  subTopics: SubTopicsMenuDataFragment[];
  isLoading?: boolean;
  onConceptToggled?: (conceptId: string) => void;
  minWidth?: FlexProps['minWidth'];
}> = ({ topicId, subTopics, isLoading, onConceptToggled, minWidth = '260px' }) => {
  // Transform data into suitable one, as little as possible

  const { currentUser } = useCurrentUser();
  const [setConceptKnown] = useSetConceptsKnownMutation();
  const [setConceptUnknown] = useSetConceptsUnknownMutation();

  const unauthentificatedModalDisclosure = useUnauthentificatedModal();
  const toggleConceptKnown = async (concept: ConceptDataFragment) => {
    if (!currentUser) return unauthentificatedModalDisclosure.onOpen();
    if (!concept.known) {
      await setConceptKnown({
        variables: {
          payload: {
            concepts: [
              {
                conceptId: concept._id,
              },
            ],
          },
        },
        optimisticResponse: {
          __typename: 'Mutation',
          setConceptsKnown: [
            {
              ...concept,
              known: {
                __typename: 'KnownConcept',
                level: 100,
              },
            },
          ],
        },
      });
    } else {
      await setConceptUnknown({
        variables: { conceptIds: [concept._id] },
        optimisticResponse: {
          __typename: 'Mutation',
          setConceptsUnknown: [
            {
              ...concept,
              known: null,
            },
          ],
        },
      });
    }
    !!onConceptToggled && onConceptToggled(concept._id);
  };
  if (!isLoading && !subTopics.length) return null;
  return (
    <Flex
      direction="column"
      alignItems="stretch"
      backgroundColor="white"
      borderWidth={1}
      borderColor="gray.200"
      boxShadow="md"
      borderRadius={3}
      fontWeight={500}
      color="gray.500"
      minW={minWidth}
    >
      <Box bgColor="originalPalette.red" mt="-1px" mx="-1px" borderTopRadius="inherit">
        <Text fontSize="lg" textAlign="center" fontWeight={600} pt={2} pb={2} color="white">
          SubTopics
        </Text>
      </Box>
      <Flex pl={2}>
        <DomainConceptListMenuLevel
          topics={subTopics}
          rootTopicId={topicId}
          onToggle={toggleConceptKnown}
          isLoading={isLoading}
          level={0}
        />
      </Flex>
      {/* <Flex direction="row" justifyContent="center" pt={1} pb={3}>
        <PageLink
          color="originalPalette.red"
          fontSize="md"
          fontWeight={600}
          pageInfo={NewConceptPageInfo(domain)}
          isDisabled={isLoading}
        >
          + Add SubTopic
        </PageLink>
      </Flex> */}
    </Flex>
  );
};

export const DomainConceptListMenuLevel: React.FC<{
  topics: SubTopicsMenuDataFragment[];
  rootTopicId: string;
  onToggle: (concept: ConceptDataFragment) => void;
  isLoading?: boolean;
  level: number;
}> = ({ topics, rootTopicId, onToggle, isLoading, level }) => {
  return (
    <Stack direction="column" spacing="6px" alignItems="flex-start" py="6px">
      {topics.map(({ subTopic: topic }) => {
        if (topic.__typename === 'Concept' && !!topic.subTopics?.length) {
          return (
            <CollapsableMenuLink
              key={topic._id}
              rootTopicId={rootTopicId}
              topic={topic}
              subTopics={topic.subTopics}
              onToggle={onToggle}
              isLoading={isLoading}
              level={level}
            />
          );
        } else {
          return (
            <SubTopicMenuLink
              key={topic._id}
              rootTopicId={rootTopicId}
              topic={topic}
              onToggle={onToggle}
              isLoading={isLoading}
            />
          );
        }
      })}
    </Stack>
  );
};

export const CollapsableMenuLink: React.FC<{
  topic: SubTopicsMenuDataFragment['subTopic'];
  subTopics: SubTopicsMenuDataFragment[];
  rootTopicId: string;
  onToggle: (concept: ConceptDataFragment) => void;
  isLoading?: boolean;
  level: number;
}> = ({ topic, subTopics, rootTopicId, isLoading, onToggle, level }) => {
  const [show, setShow] = useState(level === 0);

  const handleExpand = () => setShow(!show);
  return (
    <Box>
      <SubTopicMenuLink
        rootTopicId={rootTopicId}
        topic={topic}
        onToggle={onToggle}
        isLoading={isLoading}
        expandable={true}
        expanded={show}
        onExpand={handleExpand}
      />
      <Collapse in={show} unmountOnExit={true}>
        {/* Remove unmountOnExit={true} once resolved: https://github.com/chakra-ui/chakra-ui/issues/2534 */}
        <Flex direction="row">
          <Divider
            orientation="vertical"
            ml="8px"
            mr="10px"
            mb={2}
            mt={1}
            borderColor="gray.300"
            borderStyle="dashed"
          />
          <DomainConceptListMenuLevel
            topics={subTopics}
            rootTopicId={rootTopicId}
            onToggle={onToggle}
            isLoading={isLoading}
            level={level + 1}
          />
        </Flex>
      </Collapse>
    </Box>
  );
};

const SubTopicMenuLink: React.FC<{
  rootTopicId: string;
  topic: SubTopicsMenuDataFragment['subTopic'];
  onToggle: (concept: ConceptDataFragment) => void;
  isLoading?: boolean;
  expandable?: boolean;
  expanded?: boolean;
  onExpand?: () => void;
}> = ({ rootTopicId, topic, onToggle, isLoading, expandable, onExpand, expanded }) => {
  if (topic.__typename === 'Concept' && !!topic.domain)
    return (
      <Flex direction="row" alignItems="center" px={expandable ? 1 : 5}>
        {expandable && (
          <IconButton
            isRound
            aria-label="expand-menu"
            size="16px"
            variant="ghost"
            color="gray.400"
            icon={expanded ? <MinusIcon boxSize="12px" /> : <AddIcon boxSize="12px" />}
            onClick={() => onExpand && onExpand()}
          />
        )}
        <Skeleton isLoaded={!isLoading} display="flex" alignItems="center">
          <PageLink
            ml={expandable ? 1 : 0}
            fontSize="sm"
            pageInfo={ConceptPageInfo(topic.domain, topic)}
            color={!!topic.known ? 'teal.600' : undefined}
            _hover={{ textDecoration: 'none', color: 'gray.600' }}
            _activeLink={{}}
            _focus={{}}
          >
            {topic.name}
          </PageLink>
          <CompletedCheckbox
            ml={1}
            size="xs"
            uncheckedColor="gray.400"
            tooltipLabel={!!topic.known ? 'Mark this concept as unknown' : 'Mark this concept as known'}
            tooltipDelay={500}
            onChange={() => {
              onToggle(topic);
            }}
            isChecked={!!topic.known}
          />
        </Skeleton>
      </Flex>
    );
  if (topic.__typename === 'Domain')
    return (
      <Flex direction="row" alignItems="center" px={expandable ? 1 : 5}>
        <Skeleton isLoaded={!isLoading} display="flex" alignItems="center">
          <PageLink
            ml={expandable ? 1 : 0}
            fontSize="sm"
            pageInfo={DomainPageInfo(topic)}
            // color={!!topic.known ? 'teal.600' : undefined}
            _hover={{ textDecoration: 'none', color: 'gray.600' }}
            _activeLink={{}}
            _focus={{}}
          >
            {topic.name}
          </PageLink>
        </Skeleton>
      </Flex>
    );
  return null;
};
