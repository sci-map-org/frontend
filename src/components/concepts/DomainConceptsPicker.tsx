import { MinusIcon } from '@chakra-ui/icons';
import { Box, Button, IconButton, Skeleton, Stack, Text, useDisclosure } from '@chakra-ui/react';
import { take } from 'lodash';
import { useState } from 'react';
import { ConceptDataFragment, ConceptLinkDataFragment } from '../../graphql/concepts/concepts.fragments.generated';
import { DomainLinkDataFragment } from '../../graphql/domains/domains.fragments.generated';
import { AddConceptToDomainPayload } from '../../graphql/types';
import { ConceptPageInfo } from '../../pages/RoutesPageInfos';
import { generateUrlKey } from '../../services/url.service';
import { EntitySelector } from '../lib/selectors/EntitySelector';
import { PageLink } from '../navigation/InternalLink';
import { NewConceptModal } from './NewConcept';

const getConceptSuggestions = (entities: ConceptLinkDataFragment[], value: string): ConceptLinkDataFragment[] => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? entities
    : entities.filter((entity) => entity.name.toLowerCase().indexOf(inputValue) >= 0).slice(0, 10);
};

interface DomainConceptsPickerProps {
  title?: string;
  placeholder?: string;
  pickableConceptList: ConceptLinkDataFragment[];
  pickedConceptList: ConceptLinkDataFragment[];
  onSelect: (concept: ConceptLinkDataFragment) => void;
  onRemove: (concept: ConceptLinkDataFragment) => void;
  maxNbConceptsShown?: number;
  domain: DomainLinkDataFragment;
  isLoading?: boolean;
  allowCreation?: boolean;
}

export const DomainConceptsPicker: React.FC<DomainConceptsPickerProps> = ({
  title,
  placeholder,
  pickableConceptList,
  pickedConceptList,
  maxNbConceptsShown = 5,
  onSelect,
  onRemove,
  domain,
  isLoading,
  allowCreation,
}) => {
  const [conceptSuggestions, setConceptSuggestions] = useState<ConceptLinkDataFragment[]>([]);
  const [showAll, setShowAll] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [createConceptDefaultPayload, setCreateConceptDefaultPayload] = useState<Partial<AddConceptToDomainPayload>>(
    {}
  );
  return (
    <Stack direction="column" spacing={0} alignItems="start">
      {title && <Text fontWeight={700}>{title}</Text>}

      {(showAll ? pickedConceptList : take(pickedConceptList, maxNbConceptsShown)).map((pickedConcept) => {
        return (
          <Stack spacing={2} direction="row" alignItems="center" key={pickedConcept._id}>
            <IconButton
              aria-label="remove concept"
              onClick={() => onRemove(pickedConcept)}
              size="xs"
              icon={<MinusIcon />}
              isDisabled={isLoading}
            />
            <Text fontSize="sm">
              <Skeleton isLoaded={!isLoading} as="span">
                <PageLink pageInfo={ConceptPageInfo(domain, pickedConcept)}>{pickedConcept.name}</PageLink>
              </Skeleton>
            </Text>
          </Stack>
        );
      })}
      {pickedConceptList.length > maxNbConceptsShown && !showAll && (
        <Button onClick={() => setShowAll(true)} size="xs">
          Show all (+{pickedConceptList.length - maxNbConceptsShown})
        </Button>
      )}
      {showAll && (
        <Button onClick={() => setShowAll(false)} size="xs">
          Show less
        </Button>
      )}
      <Box pl={4}>
        <EntitySelector
          inputSize="sm"
          width="170px"
          placeholder={placeholder || 'Add concept'}
          entitySuggestions={conceptSuggestions}
          fetchEntitySuggestions={(v: string) => setConceptSuggestions(getConceptSuggestions(pickableConceptList, v))}
          onSelect={onSelect}
          isDisabled={isLoading}
          allowCreation={allowCreation}
          onCreate={({ name }) => {
            setCreateConceptDefaultPayload({
              name,
              key: generateUrlKey(name),
            });
            onOpen();
          }}
        />
        <NewConceptModal
          isOpen={isOpen}
          defaultPayload={createConceptDefaultPayload}
          onClose={onClose}
          domain={domain}
          onCreated={(createdConcept) => onSelect(createdConcept)}
          onCancel={onClose}
        />
      </Box>
    </Stack>
  );
};
