import gql from 'graphql-tag';
import Router from 'next/router';
import { PageLayout } from '../../components/layout/PageLayout';
import { NewResource } from '../../components/resources/NewResource';
import { ResourceData } from '../../graphql/resources/resources.fragments';
import { useCreateResourceMutation } from './NewResourcePage.generated';

export const createResource = gql`
  mutation createResource($payload: CreateResourcePayload!) {
    createResource(payload: $payload) {
      ...ResourceData
    }
  }
  ${ResourceData}
`;

export const NewResourcePage: React.FC<{}> = () => {
  const [createResourceMutation] = useCreateResourceMutation({
    onCompleted: (data) => Router.push(`/resources/${data.createResource._id}`),
  });
  return (
    <PageLayout mode="form" title={`Create new Resource`}>
      <NewResource onCreate={(resourceData) => createResourceMutation({ variables: { payload: resourceData } })} />
    </PageLayout>
  );
};
