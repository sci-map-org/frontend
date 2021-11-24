import gql from 'graphql-tag';
import {
  useSetConceptsKnownMutation,
  useSetConceptsUnknownMutation,
} from '../../graphql/concepts/concepts.operations.generated';
import { useCurrentUser } from '../../graphql/users/users.hooks';
import { useUnauthentificatedModal } from '../auth/UnauthentificatedModal';
import { CompletedCheckbox, CompletedCheckboxProps } from '../lib/CompletedCheckbox';
import { ConceptKnownCheckboxDataFragment } from './ConceptKnownCheckbox.generated';

export const ConceptKnownCheckboxData = gql`
  fragment ConceptKnownCheckboxData on Topic {
    _id
    # known {
    #   level
    # }
  }
`;

interface ConceptKnownCheckboxProps
  extends Omit<
    CompletedCheckboxProps,
    'resource' | 'onChange' | 'isChecked' | 'tooltipLabel' | 'tooltipDelay' | 'isDisabled'
  > {
  concept: ConceptKnownCheckboxDataFragment;
  onConceptKnown?: (conceptId: string, known: boolean) => void;
  isLoading?: boolean;
}

export const ConceptKnownCheckbox: React.FC<ConceptKnownCheckboxProps> = ({
  concept,
  onConceptKnown,
  isLoading,
  ...checkBoxProps
}) => {
  const { currentUser } = useCurrentUser();
  const [setConceptKnown] = useSetConceptsKnownMutation();
  const [setConceptUnknown] = useSetConceptsUnknownMutation();
  const unauthentificatedModalDisclosure = useUnauthentificatedModal();

  const toggleConceptKnown = async (concept: ConceptKnownCheckboxDataFragment) => {
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
  };
  return (
    <CompletedCheckbox
      uncheckedColor="gray.400"
      tooltipLabel={!!concept.known ? 'Mark this concept as unknown' : 'Mark this concept as known'}
      tooltipDelay={500}
      onChange={() => {
        toggleConceptKnown(concept);
      }}
      isChecked={!!concept.known}
      {...checkBoxProps}
    />
  );
};
