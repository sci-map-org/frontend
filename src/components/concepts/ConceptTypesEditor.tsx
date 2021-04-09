import { Stack, Text, Wrap, WrapItem } from '@chakra-ui/layout';
import { values } from 'lodash';
import { ConceptType } from '../../graphql/types';
import { ConceptTypeBadge } from './ConceptType';

interface StatelessConceptTypesEditorProps {
  selectedTypes: ConceptType[];
  onAdded: (type: ConceptType) => void;
  onRemove: (type: ConceptType) => void;
}

export const StatelessConceptTypesEditor: React.FC<StatelessConceptTypesEditorProps> = ({
  selectedTypes,
  onAdded,
  onRemove,
}) => {
  return (
    <Stack>
      {selectedTypes.length && (
        <Wrap mb={2}>
          <WrapItem>
            <Text fontWeight={600} mr={2}>
              Selected:
            </Text>
          </WrapItem>
          {selectedTypes.map((type) => (
            <WrapItem key={type}>
              <ConceptTypeBadge colorScheme="blue" editable type={type} onRemove={onRemove} />
            </WrapItem>
          ))}
        </Wrap>
      )}
      <Wrap>
        {values(ConceptType)
          .filter((t) => selectedTypes.indexOf(t) === -1)
          .map((type) => (
            <WrapItem key={type}>
              <ConceptTypeBadge editable type={type} onAdded={onAdded} />
            </WrapItem>
          ))}
      </Wrap>
    </Stack>
  );
};
