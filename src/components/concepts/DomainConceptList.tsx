import { Box, Checkbox, Collapse, Divider, Flex, IconButton, Skeleton, Stack } from '@chakra-ui/core';
import { remove } from 'lodash';
import Router from 'next/router';
import { useMemo, useState } from 'react';
import { ConceptDataFragment } from '../../graphql/concepts/concepts.fragments.generated';
import {
  useSetConceptsKnownMutation,
  useSetConceptsUnknownMutation,
} from '../../graphql/concepts/concepts.operations.generated';
import { UserRole } from '../../graphql/types';
import { useCurrentUser } from '../../graphql/users/users.hooks';
import { GetDomainByKeyDomainPageQuery } from '../../pages/domains/DomainPage.generated';
import { useUnauthentificatedModal } from '../auth/UnauthentificatedModal';
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
}> = ({ domain, isLoading, onConceptToggled }) => {
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
      });
    } else {
      await setConceptUnknown({ variables: { conceptIds: [concept._id] } });
    }
    onConceptToggled(concept._id);
  };
  if (!domainConceptItems) return null;
  return (
    <Flex mr={8} direction="column" backgroundColor="backgroundColor.0">
      <Stack direction="row" spacing={2}>
        <Box>
          <InternalLink
            fontSize="2xl"
            routePath="/domains/[key]/concepts"
            asHref={`/domains/${domain.key}/concepts`}
            isDisabled={isLoading}
          >
            Concepts
          </InternalLink>
        </Box>

        {!!currentUser && currentUser.role === UserRole.Admin && !isLoading && (
          <IconButton
            aria-label="add-concept"
            variant="ghost"
            color="blue.700"
            icon="add"
            size="sm"
            alignSelf="center"
            borderRadius={16}
            onClick={() => Router.push('/domains/[key]/concepts/new', `/domains/${domain.key}/concepts/new`)}
          ></IconButton>
        )}
      </Stack>
      <DomainConceptListMenuLevel
        nestedConceptItems={conceptNestedList}
        domainKey={domain.key}
        onToggle={toggleConceptKnown}
        isLoading={isLoading}
        level={0}
      />
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
  console.log(nestedConceptItems);
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
        expandable={level > 0}
        expanded={show || level === 0}
        onExpand={handleExpand}
      />
      <Collapse isOpen={show} display="flex" flexDir="row">
        <Divider orientation="vertical" ml="7px" mr="10px" mb={2} mt={1} borderColor="gray.300" borderStyle="dashed" />
        <DomainConceptListMenuLevel
          nestedConceptItems={subConceptItems}
          domainKey={domainKey}
          onToggle={onToggle}
          isLoading={isLoading}
          level={level + 1}
        />
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
    <Stack direction="row" alignItems="center">
      <Skeleton isLoaded={!isLoading}>
        <Checkbox
          mr={2}
          onChange={() => {
            onToggle(concept);
          }}
          isChecked={!!concept.known}
        />
        <InternalLink
          routePath="/domains/[key]/concepts/[conceptKey]"
          asHref={`/domains/${domainKey}/concepts/${concept.key}`}
        >
          {concept.name}
        </InternalLink>
        {expandable && (
          <IconButton
            ml={2}
            isRound
            aria-label="expand-menu"
            size="xs"
            variant="ghost"
            color="gray.400"
            icon={expanded ? 'minus' : 'add'}
            onClick={() => onExpand && onExpand()}
          />
        )}
      </Skeleton>
    </Stack>
  );
};
