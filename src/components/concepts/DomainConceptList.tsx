import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { Box, Collapse, Divider, Flex, FlexProps, IconButton, Skeleton, Stack, Text } from '@chakra-ui/react';
import { partition } from 'lodash';
import { useMemo, useState } from 'react';
import { ConceptDataFragment } from '../../graphql/concepts/concepts.fragments.generated';
import {
  useSetConceptsKnownMutation,
  useSetConceptsUnknownMutation,
} from '../../graphql/concepts/concepts.operations.generated';
import { DomainLinkDataFragment } from '../../graphql/domains/domains.fragments.generated';
import { useCurrentUser } from '../../graphql/users/users.hooks';
import { GetDomainByKeyDomainPageQuery } from '../../pages/domains/DomainPage.generated';
import { ConceptPageInfo, NewConceptPageInfo } from '../../pages/RoutesPageInfos';
import { useUnauthentificatedModal } from '../auth/UnauthentificatedModal';
import { CompletedCheckbox } from '../lib/CompletedCheckbox';
import { InternalLink, PageLink } from '../navigation/InternalLink';

type NestedConceptItem = {
  concept: ConceptDataFragment & { parentConcepts?: { concept: { _id: string } }[] | null };
  relationship: { index: number }; // ConceptBelongsToDomain or ConceptBelongsToConcept
  subConceptItems?: NestedConceptItem[];
};

// TODO: To Subtopics, add fragment here
export const DomainConceptList: React.FC<{
  domain: GetDomainByKeyDomainPageQuery['getDomainByKey'];
  isLoading?: boolean;
  onConceptToggled?: (conceptId: string) => void;
  minWidth?: FlexProps['minWidth'];
}> = ({ domain, isLoading, onConceptToggled, minWidth = '260px' }) => {
  // Transform data into suitable one, as little as possible
  const { currentUser } = useCurrentUser();
  const [setConceptKnown] = useSetConceptsKnownMutation();
  const [setConceptUnknown] = useSetConceptsUnknownMutation();

  const recursiveSearchParent = (
    parentConceptId: string,
    nestedList: NestedConceptItem[]
  ): NestedConceptItem | null => {
    for (let i = 0; i < nestedList.length; i++) {
      const currentItem = nestedList[i];

      if (currentItem.concept._id === parentConceptId) {
        return currentItem;
      }
      if (currentItem.subConceptItems?.length) {
        const nestedParent = recursiveSearchParent(parentConceptId, currentItem.subConceptItems);
        if (nestedParent) return nestedParent;
      }
    }

    return null;
  };
  /**
   * TODO: Very hacky, refactor. Ideally with IS_SUBTOPIC relationship
   */
  const conceptNestedList = useMemo(() => {
    if (!domain.concepts) return [];
    const [hasParentConceptItemList, conceptItemList]: [NestedConceptItem[], NestedConceptItem[]] = partition(
      domain.concepts.items.map((i) => JSON.parse(JSON.stringify(i))),
      (c) => !!c.concept.parentConcepts?.length
    );
    let leftToSort = hasParentConceptItemList;
    while (leftToSort.length > 0) {
      const tmp: NestedConceptItem[] = [];
      leftToSort.forEach((item) => {
        item.concept.parentConcepts?.forEach(({ concept: parentConcept }) => {
          const parent = recursiveSearchParent(parentConcept._id, conceptItemList);
          if (parent) {
            parent.subConceptItems = [...(parent.subConceptItems || []), item];
          } else {
            tmp.push(item);
          }
        });
      });
      leftToSort = tmp;
    }

    return conceptItemList;
  }, [domain.concepts?.items]);

  const domainConceptItems = domain?.concepts?.items;
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
  if (!domainConceptItems) return null;
  if (!isLoading && !domainConceptItems.length) return null;
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
          nestedConceptItems={conceptNestedList}
          domain={domain}
          onToggle={toggleConceptKnown}
          isLoading={isLoading}
          level={0}
        />
      </Flex>
      <Flex direction="row" justifyContent="center" pt={1} pb={3}>
        <PageLink
          color="originalPalette.red"
          fontSize="md"
          fontWeight={600}
          pageInfo={NewConceptPageInfo(domain)}
          isDisabled={isLoading}
        >
          + Add SubTopic
        </PageLink>
      </Flex>
    </Flex>
  );
};

export const DomainConceptListMenuLevel: React.FC<{
  nestedConceptItems: NestedConceptItem[];
  domain: DomainLinkDataFragment;
  onToggle: (concept: ConceptDataFragment) => void;
  isLoading?: boolean;
  level: number;
}> = ({ nestedConceptItems, domain, onToggle, isLoading, level }) => {
  return (
    <Stack direction="column" spacing="6px" alignItems="flex-start" py="6px">
      {nestedConceptItems.map((conceptItem) => {
        if (!!conceptItem.subConceptItems) {
          return (
            <CollapsableMenuLink
              key={conceptItem.concept._id}
              domain={domain}
              concept={conceptItem.concept}
              subConceptItems={conceptItem.subConceptItems}
              onToggle={onToggle}
              isLoading={isLoading}
              level={level}
            />
          );
        } else {
          return (
            <DomainConceptListMenuLink
              key={conceptItem.concept._id}
              domain={domain}
              concept={conceptItem.concept}
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
  concept: ConceptDataFragment;
  subConceptItems: NestedConceptItem[];
  domain: DomainLinkDataFragment;
  onToggle: (concept: ConceptDataFragment) => void;
  isLoading?: boolean;
  level: number;
}> = ({ concept, subConceptItems, domain, isLoading, onToggle, level }) => {
  const [show, setShow] = useState(level === 0);

  const handleExpand = () => setShow(!show);
  return (
    <Box key={concept._id}>
      <DomainConceptListMenuLink
        domain={domain}
        concept={concept}
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
            nestedConceptItems={subConceptItems}
            domain={domain}
            onToggle={onToggle}
            isLoading={isLoading}
            level={level + 1}
          />
        </Flex>
      </Collapse>
    </Box>
  );
};

export const DomainConceptListMenuLink: React.FC<{
  domain: DomainLinkDataFragment;
  concept: ConceptDataFragment;
  onToggle: (concept: ConceptDataFragment) => void;
  isLoading?: boolean;
  expandable?: boolean;
  expanded?: boolean;
  onExpand?: () => void;
}> = ({ domain, concept, onToggle, isLoading, expandable, onExpand, expanded }) => {
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
          pageInfo={ConceptPageInfo(domain, concept)}
          color={!!concept.known ? 'teal.600' : undefined}
          _hover={{ textDecoration: 'none', color: 'gray.600' }}
          _activeLink={{}}
          _focus={{}}
        >
          {concept.name}
        </PageLink>
        <CompletedCheckbox
          ml={1}
          size="xs"
          uncheckedColor="gray.400"
          tooltipLabel={!!concept.known ? 'Mark this concept as unknown' : 'Mark this concept as known'}
          tooltipDelay={500}
          onChange={() => {
            onToggle(concept);
          }}
          isChecked={!!concept.known}
        />
      </Skeleton>
    </Flex>
  );
};
