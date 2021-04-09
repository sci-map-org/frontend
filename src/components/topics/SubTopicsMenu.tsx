import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import {
  Box,
  Center,
  Collapse,
  Divider,
  Flex,
  FlexProps,
  IconButton,
  Link,
  Skeleton,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import gql from 'graphql-tag';
import { useState } from 'react';
import { ConceptLinkData } from '../../graphql/concepts/concepts.fragments';
import { ConceptDataFragment } from '../../graphql/concepts/concepts.fragments.generated';
import { DomainLinkData } from '../../graphql/domains/domains.fragments';
import { DomainLinkDataFragment } from '../../graphql/domains/domains.fragments.generated';
import { ConceptPageInfo, DomainPageInfo } from '../../pages/RoutesPageInfos';
import { RoleAccess } from '../auth/RoleAccess';
import { ConceptKnownCheckbox } from '../concepts/ConceptKnownCheckbox';
import { PageLink } from '../navigation/InternalLink';
import { AddSubTopicModal } from './AddSubTopic';
import { SubTopicsMenuDataFragment } from './SubTopicsMenu.generated';

export const SubTopicsMenuData = gql`
  fragment SubTopicsMenuData on TopicIsSubTopicOfTopic {
    index
    subTopic {
      _id
      ... on Concept {
        ...ConceptLinkData
        types
        known {
          level
        }
        subTopics(options: { sorting: { type: index, direction: ASC } }) {
          index
          subTopic {
            _id
            ... on Concept {
              ...ConceptLinkData
              types
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
  domain: DomainLinkDataFragment;
  subTopics: SubTopicsMenuDataFragment[];
  isLoading?: boolean;
  onConceptToggled?: (conceptId: string) => void;
  minWidth?: FlexProps['minWidth'];
}> = ({ topicId, domain, subTopics, isLoading, onConceptToggled, minWidth = '260px' }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      direction="column"
      alignItems="stretch"
      backgroundColor="white"
      borderWidth={1}
      pb={2}
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
      <Flex px={2}>
        {!isLoading && !subTopics.length ? (
          <Center w="100%" py={2}>
            <Text textAlign="center" fontWeight={600} fontStyle="italic" color="gray.400">
              No SubTopics found
            </Text>
          </Center>
        ) : (
          <DomainConceptListMenuLevel
            topics={subTopics}
            rootTopicId={topicId}
            onConceptToggled={(concept) => onConceptToggled && onConceptToggled(concept._id)}
            isLoading={isLoading}
            level={0}
          />
        )}
      </Flex>
      <RoleAccess accessRule="loggedInUser">
        <Flex direction="row" justifyContent="center" pt={1} pb={1}>
          <Link color="originalPalette.red" fontSize="md" fontWeight={600} onClick={() => onOpen()}>
            + Add SubTopic
          </Link>
        </Flex>
      </RoleAccess>
      <AddSubTopicModal
        domain={domain}
        parentTopicId={topicId}
        isOpen={isOpen}
        onClose={onClose}
        onCancel={() => onClose()}
      />
    </Flex>
  );
};

export const DomainConceptListMenuLevel: React.FC<{
  topics: SubTopicsMenuDataFragment[];
  rootTopicId: string;
  onConceptToggled: (concept: ConceptDataFragment) => void;
  isLoading?: boolean;
  level: number;
}> = ({ topics, rootTopicId, onConceptToggled, isLoading, level }) => {
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
              onConceptToggled={onConceptToggled}
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
              onConceptToggled={onConceptToggled}
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
  onConceptToggled: (concept: ConceptDataFragment) => void;
  isLoading?: boolean;
  level: number;
}> = ({ topic, subTopics, rootTopicId, isLoading, onConceptToggled, level }) => {
  const [show, setShow] = useState(level === 0);

  const handleExpand = () => setShow(!show);
  return (
    <Box>
      <SubTopicMenuLink
        rootTopicId={rootTopicId}
        topic={topic}
        onConceptToggled={onConceptToggled}
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
            onConceptToggled={onConceptToggled}
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
  onConceptToggled: (concept: ConceptDataFragment) => void;
  isLoading?: boolean;
  expandable?: boolean;
  expanded?: boolean;
  onExpand?: () => void;
}> = ({ rootTopicId, topic, onConceptToggled, isLoading, expandable, onExpand, expanded }) => {
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
          <ConceptKnownCheckbox ml={1} size="xxs" concept={topic} onConceptKnown={() => onConceptToggled(topic)} />
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
