import { Center, Flex, Stack } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { ReactElement } from 'react';
import { shortenString } from '../../util/utils';
import { StarsRatingViewer } from '../learning_materials/LearningMaterialStarsRating';
import { DeleteButtonWithConfirmation } from '../lib/buttons/DeleteButtonWithConfirmation';
import { InternalLink } from '../navigation/InternalLink';
import { ResourceTypeBadge } from './elements/ResourceType';
import { SquareResourceCardDataFragment } from './SquareResourceCard.generated';

export const SquareResourceCardData = gql`
  fragment SquareResourceCardData on Resource {
    _id
    name
    type
    rating
  }
`;

interface SquareResourceCardProps {
  resource: SquareResourceCardDataFragment;
  onRemove?: (resource: SquareResourceCardDataFragment) => void;
}

export const SquareResourceCard: React.FC<SquareResourceCardProps> = ({ resource, onRemove }) => {
  return (
    <SquareResourceCardContainer
      renderTopRight={
        onRemove && (
          <DeleteButtonWithConfirmation
            mode="iconButton"
            modalBodyText="Confirm removing this resource ? This will not delete the resource in itself."
            modalHeaderText="Remove resource"
            confirmButtonText="Remove"
            justifySelf="start"
            alignSelf="flex-end"
            size="xs"
            aria-label="remove sub resource"
            onConfirmation={() => onRemove(resource)}
          />
        )
      }
      renderBottom={
        <Stack direction="row">
          <StarsRatingViewer value={resource.rating} pxSize={13} />
          <ResourceTypeBadge type={resource.type} />
        </Stack>
      }
    >
      <InternalLink textAlign="center" fontSize="sm" routePath="/resources/[_id]" asHref={`/resources/${resource._id}`}>
        {shortenString(resource.name, 90)}
      </InternalLink>
    </SquareResourceCardContainer>
  );
};

export const SquareResourceCardContainer: React.FC<{ renderTopRight?: ReactElement; renderBottom?: ReactElement }> = ({
  children,
  renderTopRight,
  renderBottom,
}) => {
  return (
    <Flex
      backgroundColor="whiteAlpha.500"
      boxSize="10rem"
      direction="column"
      alignItems="center"
      justifyContent="center"
      borderWidth="1px"
      borderColor="gray.200"
      _hover={{ borderColor: 'gray.400' }}
      p={2}
      mb={4}
      mx={2}
      borderRadius={4}
    >
      <Flex direction="column" w="100%" h="100%" justifyContent="stretch" alignItems="stretch">
        {renderTopRight && (
          <Flex direction="row" justifyContent="flex-end">
            {renderTopRight}
          </Flex>
        )}
        <Center flexGrow={1}>{children}</Center>
        {renderBottom}
      </Flex>
    </Flex>
  );
};
