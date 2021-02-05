import { CloseButton, Stack, Text } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { InternalLink } from '../navigation/InternalLink';
import { ConceptBadgeDataFragment } from './ConceptBadge.generated';

export const ConceptBadgeData = gql`
  fragment ConceptBadgeData on Concept {
    _id
    key
    name
    domain {
      _id
      key
      name
    }
    known {
      level
    }
  }
`;
interface ConceptBadgeProps {
  size?: 'md' | 'sm';
  concept: ConceptBadgeDataFragment;
  onRemove?: () => void;
  removable?: boolean;
}
export const ConceptBadge: React.FC<ConceptBadgeProps> = ({ concept, removable, onRemove, size = 'md' }) => {
  const domain = concept.domain;
  if (!domain) {
    throw new Error(`Concept ${concept._id} does not have a domain`);
  }

  return (
    <InternalLink
      borderRadius={11}
      px="6px"
      bgColor={concept.known ? 'teal.50' : 'white'}
      color="gray.800"
      fontWeight={400}
      borderWidth="1px"
      borderColor={concept.known ? 'teal.800' : 'gray.800'}
      textAlign="center"
      fontSize={size}
      routePath="/domains/[key]/concepts/[conceptKey]"
      asHref={`/domains/${domain.key}/concepts/${concept.key}`}
      _hover={{
        backgroundColor: 'gray.100',
        cursor: 'pointer',
      }}
    >
      <Stack spacing={1} direction="row" alignItems="center">
        {removable && (
          <CloseButton
            size={size}
            boxSize={{ sm: '20px', md: '24px' }[size]}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onRemove && onRemove();
            }}
          />
        )}
        <Text textAlign="center" noOfLines={1}>
          {concept.name}
        </Text>
      </Stack>
    </InternalLink>
  );
};
