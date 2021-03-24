import { Box, BoxProps, LinkProps, CloseButton, Stack, Text } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { DomainLinkDataFragment } from '../../graphql/domains/domains.fragments.generated';
import { ConceptPageInfo } from '../../pages/RoutesPageInfos';
import { InternalLink, PageLink } from '../navigation/InternalLink';
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
  size?: 'md' | 'sm' | 'xs';
  concept: ConceptBadgeDataFragment;
  domain?: DomainLinkDataFragment;
  onRemove?: () => void;
  removable?: boolean;
  clickable?: boolean;
}

const badgeStyleProps = (concept: ConceptBadgeDataFragment, size: 'md' | 'sm' | 'xs'): LinkProps & BoxProps => ({
  borderRadius: 11,
  px: { xs: '3px', sm: '4px', md: '6px' }[size],
  bgColor: concept.known ? 'teal.50' : 'white',
  color: 'gray.800',
  fontWeight: 400,
  borderWidth: '1px',
  borderColor: concept.known ? 'teal.800' : 'gray.800',
  textAlign: 'center',
  fontSize: size,
});
export const ConceptBadge: React.FC<ConceptBadgeProps> = ({
  concept,
  domain: domainProp,
  removable,
  onRemove,
  clickable = true,
  size = 'md',
}) => {
  const domain = concept.domain || domainProp;
  if (!domain) {
    throw new Error(`Concept ${concept._id} does not have a domain`);
  }

  const content = (
    <Stack spacing={1} direction="row" alignItems="center">
      {removable && (
        <CloseButton
          size={size}
          boxSize={{ xs: '16px', sm: '20px', md: '24px' }[size]}
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
  );
  return clickable ? (
    <PageLink {...badgeStyleProps(concept, size)} pageInfo={ConceptPageInfo(domain, concept)}>
      {content}
    </PageLink>
  ) : (
    <Box {...badgeStyleProps(concept, size)}>{content}</Box>
  );
};
