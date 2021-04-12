import { Input, Stack, Textarea } from '@chakra-ui/react';
import gql from 'graphql-tag';
import Router from 'next/router';
import { useState } from 'react';
import { PageLayout } from '../../../components/layout/PageLayout';
import { FormButtons } from '../../../components/lib/buttons/FormButtons';
import { ConceptData } from '../../../graphql/concepts/concepts.fragments';
import { ConceptDataFragment } from '../../../graphql/concepts/concepts.fragments.generated';
import { useUpdateConcept } from '../../../graphql/concepts/concepts.hooks';
import { DomainData } from '../../../graphql/domains/domains.fragments';
import { DomainDataFragment } from '../../../graphql/domains/domains.fragments.generated';
import { NotFoundPage } from '../../NotFoundPage';
import { routerPushToPage } from '../../PageInfo';
import { ConceptListPageInfo, ConceptPageInfo, DomainPageInfo, EditConceptPageInfo } from '../../RoutesPageInfos';

import { useGetConceptEditConceptPageQuery } from './EditConceptPage.generated';

export const getConceptEditConceptPage = gql`
  query getConceptEditConceptPage($domainKey: String!, $conceptKey: String!) {
    getDomainConceptByKey(domainKey: $domainKey, conceptKey: $conceptKey) {
      ...ConceptData
      domain {
        ...DomainData
      }
    }
  }
  ${ConceptData}
  ${DomainData}
`;

export const EditConceptPage: React.FC<{ domainKey: string; conceptKey: string }> = ({ conceptKey, domainKey }) => {
  const { data } = useGetConceptEditConceptPageQuery({ variables: { conceptKey, domainKey } });
  const concept = data?.getDomainConceptByKey;
  const domain = concept?.domain;
  if (!concept || !domain) return <NotFoundPage />;

  const { updateConcept } = useUpdateConcept();
  const [name, setName] = useState(concept.name);
  const [key, setKey] = useState(concept.key);
  const [description, setDescription] = useState(concept.description || '');
  return (
    <PageLayout
      marginSize="xl"
      breadCrumbsLinks={[
        DomainPageInfo(domain),
        ConceptListPageInfo(domain),
        ConceptPageInfo(domain, concept),
        EditConceptPageInfo(domain, concept),
      ]}
      title={`Edit ${domain.name} - ${concept.name}`}
      accessRule="contributorOrAdmin"
      centerChildren
    >
      <Stack direction="column" spacing={4} alignItems="stretch" w="100%">
        <Input
          placeholder="Concept Name"
          size="md"
          variant="flushed"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></Input>
        <Input
          placeholder="Concept Key"
          size="md"
          variant="flushed"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        ></Input>
        <Textarea
          placeholder="Description"
          size="md"
          variant="flushed"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></Textarea>
        <FormButtons
          isPrimaryDisabled={!name}
          onCancel={() => Router.back()}
          size="lg"
          onPrimaryClick={() =>
            updateConcept({ variables: { _id: concept._id, payload: { name, key, description } } }).then(
              ({ data }) => data && routerPushToPage(ConceptPageInfo(domain, data.updateConcept))
            )
          }
          primaryText="Edit"
        />
      </Stack>
    </PageLayout>
  );
};
