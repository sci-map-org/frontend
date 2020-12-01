import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { Box, Collapse, Divider, Flex, FlexProps, IconButton, Skeleton, Stack, Text } from '@chakra-ui/react';
import { remove } from 'lodash';
import { useMemo, useState } from 'react';
import { ConceptDataFragment } from '../../graphql/concepts/concepts.fragments.generated';
import {
  useSetConceptsKnownMutation,
  useSetConceptsUnknownMutation,
} from '../../graphql/concepts/concepts.operations.generated';
import { useCurrentUser } from '../../graphql/users/users.hooks';
import { GetDomainByKeyDomainPageQuery } from '../../pages/domains/DomainPage.generated';
import { useUnauthentificatedModal } from '../auth/UnauthentificatedModal';
import { CompletedCheckbox } from '../lib/CompletedCheckbox';
import { InternalLink } from '../navigation/InternalLink';

type NestedConceptItem = {
  concept: ConceptDataFragment & { subConcepts?: { concept: { _id: string } }[] | null };
  relationship: { index: number }; // ConceptBelongsToDomain or ConceptBelongsToConcept
  subConceptItems?: NestedConceptItem[];
};

export const DomainConceptList: React.FC<{
  domain: GetDomainByKeyDomainPageQuery['getDomainByKey'];
  isLoading?: boolean;
  onConceptToggled: (conceptId: string) => void;
  minWidth?: FlexProps['minWidth'];
}> = ({ domain, isLoading, onConceptToggled, minWidth = '260px' }) => {
  // Transform data into suitable one, as little as possible
  const { currentUser } = useCurrentUser();
  const [setConceptKnown] = useSetConceptsKnownMutation();
  const [setConceptUnknown] = useSetConceptsUnknownMutation();

  const addSubConceptItems = (
    conceptItemList: NestedConceptItem[],
    parentItem: NestedConceptItem
  ): NestedConceptItem => {
    if (!parentItem.concept.subConcepts?.length) return parentItem;

    const subConceptsIds = parentItem.concept.subConcepts.map((i) => i.concept._id);
    const subConceptItems = remove(conceptItemList, (c) => subConceptsIds.indexOf(c.concept._id) > -1);

    return {
      ...parentItem,
      subConceptItems: subConceptItems.map((sci) => addSubConceptItems(conceptItemList, sci)),
    };
  };

  const conceptNestedList = useMemo(() => {
    if (!domain.concepts) return [];
    const conceptItemList: NestedConceptItem[] = [...domain.concepts.items];

    // TODO: refactor (mutating an array while iterating on it isn't exactly what they call _clean_)
    const nestedConceptItemList: NestedConceptItem[] = [];
    conceptItemList.forEach((item) => {
      if (item) nestedConceptItemList.push(addSubConceptItems(conceptItemList, item));
    });

    return nestedConceptItemList;
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
    onConceptToggled(concept._id);
  };
  if (!domainConceptItems) return null;
  if (!isLoading && !domainConceptItems.length) return null;
  return (
    <Flex direction="column" backgroundColor="gray.100" borderRadius={5} px={5} pt={1} pb={2} minW={minWidth}>
      <Box>
        <Text fontSize="xl" textAlign="center" fontWeight={600} color="gray.600" pb={2}>
          My Progress
        </Text>
      </Box>

      <DomainConceptListMenuLevel
        nestedConceptItems={conceptNestedList}
        domainKey={domain.key}
        onToggle={toggleConceptKnown}
        isLoading={isLoading}
        level={0}
      />
      <Flex direction="row" justifyContent="center" pt={2} pb={1}>
        <InternalLink
          color="gray.600"
          fontWeight={600}
          routePath="/domains/[key]/concepts/new"
          asHref={`/domains/${domain.key}/concepts/new`}
          isDisabled={isLoading}
        >
          + Add Concept
        </InternalLink>
      </Flex>
    </Flex>
  );
};

export const DomainConceptListMenuLevel: React.FC<{
  nestedConceptItems: NestedConceptItem[];
  domainKey: string;
  onToggle: (concept: ConceptDataFragment) => void;
  isLoading?: boolean;
  level: number;
}> = ({ nestedConceptItems, domainKey, onToggle, isLoading, level }) => {
  return (
    <Stack direction="column" spacing={1} alignItems="flex-start">
      {nestedConceptItems.map((conceptItem) => {
        if (!!conceptItem.subConceptItems) {
          return (
            <CollapsableMenuLink
              key={conceptItem.concept._id}
              domainKey={domainKey}
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
              domainKey={domainKey}
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
  domainKey: string;
  onToggle: (concept: ConceptDataFragment) => void;
  isLoading?: boolean;
  level: number;
}> = ({ concept, subConceptItems, domainKey, isLoading, onToggle, level }) => {
  const [show, setShow] = useState(level === 0);

  const handleExpand = () => setShow(!show);
  return (
    <Box key={concept._id}>
      <DomainConceptListMenuLink
        domainKey={domainKey}
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
            ml="7px"
            mr="10px"
            mb={2}
            mt={1}
            borderColor="gray.300"
            borderStyle="dashed"
          />
          <DomainConceptListMenuLevel
            nestedConceptItems={subConceptItems}
            domainKey={domainKey}
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
  domainKey: string;
  concept: ConceptDataFragment;
  onToggle: (concept: ConceptDataFragment) => void;
  isLoading?: boolean;
  expandable?: boolean;
  expanded?: boolean;
  onExpand?: () => void;
}> = ({ domainKey, concept, onToggle, isLoading, expandable, onExpand, expanded }) => {
  return (
    <Skeleton isLoaded={!isLoading}>
      <Stack direction="row" spacing={2} alignItems="center">
        {expandable && (
          <IconButton
            isRound
            aria-label="expand-menu"
            size="xs"
            variant="ghost"
            color="gray.400"
            icon={expanded ? <MinusIcon /> : <AddIcon />}
            onClick={() => onExpand && onExpand()}
          />
        )}
        <InternalLink
          routePath="/domains/[key]/concepts/[conceptKey]"
          asHref={`/domains/${domainKey}/concepts/${concept.key}`}
        >
          {concept.name}
        </InternalLink>
        <CompletedCheckbox
          size="xs"
          uncheckedColor="gray.400"
          tooltipLabel={!!concept.known ? 'Mark this concept as unknown' : 'Mark this concept as known'}
          tooltipDelay={500}
          onChange={() => {
            onToggle(concept);
          }}
          isChecked={!!concept.known}
        />
      </Stack>
    </Skeleton>
  );
};
