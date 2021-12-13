import { AddIcon } from '@chakra-ui/icons';
import { IconButton, Stack, Text, Wrap, WrapItem } from '@chakra-ui/react';
import { ResourceDataFragment } from '../../graphql/resources/resources.fragments.generated';
import { ResourceSelectorModal } from './ResourceSelector';
import { SquareResourceCard, SquareResourceCardContainer } from './SquareResourceCard';
import { SquareResourceCardDataFragment } from './SquareResourceCard.generated';

interface SquareResourceCardWrapperProps {
  resources: SquareResourceCardDataFragment[];
  onRemove?: (resource: SquareResourceCardDataFragment) => void;
  onAdd?: (resource: ResourceDataFragment) => void;
  editable?: boolean;
  isLoading?: boolean;
}

export const SquareResourceCardWrapper: React.FC<SquareResourceCardWrapperProps> = ({
  resources,
  onRemove,
  onAdd,
  editable,
  isLoading,
}) => {
  return (
    <Wrap>
      {resources.map((resource) => (
        <WrapItem key={resource._id}>
          <SquareResourceCard resource={resource} onRemove={editable ? onRemove : undefined} />
        </WrapItem>
      ))}
      {onAdd && editable && (
        <WrapItem>
          <ResourceSelectorModal
            onSelect={(subResource) => onAdd(subResource)}
            renderTrigger={({ openModal }) => (
              <SquareResourceCardContainer onClick={() => openModal()}>
                <Stack align="center" spacing={2}>
                  <IconButton
                    aria-label="add resource"
                    icon={<AddIcon />}
                    variant="outline"
                    size="lg"
                    isRound
                    onClick={() => openModal()}
                    isDisabled={isLoading}
                  />

                  <Text fontWeight={300} fontSize="lg">
                    Add a resource
                  </Text>
                </Stack>
              </SquareResourceCardContainer>
            )}
          />
        </WrapItem>
      )}
    </Wrap>
  );
};
