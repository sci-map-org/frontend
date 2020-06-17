import gql from 'graphql-tag';
import Router from 'next/router';

import { PageLayout } from '../../components/layout/PageLayout';
import { NewResource } from '../../components/resources/NewResource';
import { ResourceData } from '../../graphql/resources/resources.fragments';
import { useCreateResourceMutation } from './NewResourcePage.generated';
import { CreateResourcePayload } from '../../graphql/types';
import { ResourceDataFragment } from '../../graphql/resources/resources.fragments.generated';
import { useAttachResourceCoversConceptsMutation } from '../../graphql/resources/resources.operations.generated';

export const createResource = gql`
  mutation createResource($payload: CreateResourcePayload!) {
    createResource(payload: $payload) {
      ...ResourceData
    }
  }
  ${ResourceData}
`;

const useCreateResourceAndAddCoveredConcepts = (options: { onCompleted: (resource: ResourceDataFragment) => {} }) => {
  const [attachResourceCoveredConcepts] = useAttachResourceCoversConceptsMutation();
  const [createResource] = useCreateResourceMutation();

  const createResourceAndAddCoveredConcepts = async (
    resourcePayload: CreateResourcePayload,
    coveredConceptsIds: string[]
  ) => {
    const { data } = await createResource({ variables: { payload: resourcePayload } });
    if (!data) throw new Error('Resource Creation failed');
    const res = await attachResourceCoveredConcepts({
      variables: { resourceId: data.createResource._id, conceptIds: coveredConceptsIds },
    });
    if (!res.data) throw new Error('Attaching concepts failed');
    options.onCompleted && options.onCompleted({ ...data.createResource, ...res.data.attachResourceCoversConcepts });
  };
  return [createResourceAndAddCoveredConcepts];
};

export const NewResourcePage: React.FC<{}> = () => {
  const [createResourceAndAddCoveredConcepts] = useCreateResourceAndAddCoveredConcepts({
    onCompleted: (resource) => Router.push(`/resources/${resource._id}`),
  });
  return (
    <PageLayout mode="form" title={`Create new Resource`}>
      <NewResource onCreate={createResourceAndAddCoveredConcepts} />
    </PageLayout>
  );
};
