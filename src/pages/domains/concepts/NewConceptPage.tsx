import { Box } from '@chakra-ui/react';
import Router from 'next/router';
import { NewConcept } from '../../../components/concepts/NewConcept';
import { PageLayout } from '../../../components/layout/PageLayout';
import { useGetDomainByKey } from '../../../graphql/domains/domains.hooks';
import { routerPushToPage } from '../../PageInfo';
import { ConceptListPageInfo, ConceptPageInfo, DomainPageInfo } from '../../RoutesPageInfos';

export const NewConceptPage: React.FC<{ domainKey: string }> = ({ domainKey }) => {
  const { domain } = useGetDomainByKey(domainKey);

  if (!domain) return <Box>Area not found !</Box>;
  return (
    <PageLayout
      marginSize="xl"
      title={`Add concept to ${domain.name}`}
      breadCrumbsLinks={[DomainPageInfo(domain), ConceptListPageInfo(domain)]}
      accessRule="contributorOrAdmin"
    >
      <NewConcept
        domain={domain}
        onCancel={() => Router.back()}
        onCreated={(createdConcept) => routerPushToPage(ConceptPageInfo(domain, createdConcept))}
      />
    </PageLayout>
  );
};
