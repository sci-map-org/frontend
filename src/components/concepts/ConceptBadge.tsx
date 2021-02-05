import { ConceptLinkDataFragment } from '../../graphql/concepts/concepts.fragments.generated';
import { InternalLink } from '../navigation/InternalLink';

export const ConceptBadge: React.FC<{ concept: ConceptLinkDataFragment; domainKey: string }> = ({
  concept,
  domainKey,
}) => {
  return (
    <InternalLink
      borderRadius={11}
      px="6px"
      bgColor="white"
      color="gray.800"
      fontWeight={400}
      borderWidth="1px"
      borderColor="gray.800"
      textAlign="center"
      fontSize="sm"
      routePath="/domains/[key]/concepts/[conceptKey]"
      asHref={`/domains/${domainKey}/concepts/${concept.key}`}
      _hover={{
        backgroundColor: 'gray.100',
        cursor: 'pointer',
      }}
    >
      {concept.name}
    </InternalLink>
  );
};
