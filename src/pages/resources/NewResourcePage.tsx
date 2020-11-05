import { useApolloClient } from '@apollo/client';
import gql from 'graphql-tag';
import Router from 'next/router';
import { useEffect } from 'react';
import { PageLayout } from '../../components/layout/PageLayout';
import { NewResource } from '../../components/resources/NewResource';
import { GetDomainByKeyQueryVariables } from '../../graphql/domains/domains.operations.generated';
import { GetDomainByKeyTestQuery } from './NewResourcePage.generated';

export const getDomainByKeyTest = gql`
  query getDomainByKeyTest($key: String!) {
    getDomainByKey(key: $key) {
      name
      concepts(options: {}) {
        items {
          concept {
            name
          }
        }
      }
    }
  }
`;

export const NewResourcePage: React.FC<{}> = () => {
  const client = useApolloClient();
  useEffect(() => {
    const run = async () => {
      const { data } = await client.query<GetDomainByKeyTestQuery, GetDomainByKeyQueryVariables>({
        query: getDomainByKeyTest,
        variables: { key: 'functional_programming' },
      });
      if (data && data.getDomainByKey.concepts) {
        const s = `functional Programming concept list:
        """`;
        const r =
          data.getDomainByKey.concepts.items.reduce((acc, item) => {
            return acc + `${item.concept.name},`;
          }, s) + '"""';
        console.log(r);
      }
    };

    run();
  }, []);
  return (
    <PageLayout mode="form" title={`Create new Resource`}>
      <NewResource onResourceCreated={(createdResource) => Router.push(`/resources/${createdResource._id}`)} />
    </PageLayout>
  );
};
