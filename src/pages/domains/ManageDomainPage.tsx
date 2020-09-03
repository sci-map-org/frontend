import { Box, Icon, IconButton, Stack, Text } from '@chakra-ui/core';
import gql from 'graphql-tag';
import { RoleAccess } from '../../components/auth/RoleAccess';
import { PageLayout } from '../../components/layout/PageLayout';
import { InternalLink } from '../../components/navigation/InternalLink';
import { DomainData, generateDomainData } from '../../graphql/domains/domains.fragments';
import { DomainDataFragment } from '../../graphql/domains/domains.fragments.generated';
import { PageInfo, routerPushToPage } from '../PageInfo';
import { DomainPageInfo } from './DomainPage';
import { EditDomainPageInfo } from './EditDomainPage';
import {
  GetDomainByKeyManageDomainPageQuery,
  useGetDomainByKeyManageDomainPageQuery,
} from './ManageDomainPage.generated';

export const ManageDomainPagePath = (domainKey: string) => `/domains/${domainKey}/manage`;

export const ManageDomainPageInfo = (domain: DomainDataFragment): PageInfo => ({
  name: 'Manage',
  path: ManageDomainPagePath(domain.key),
  routePath: ManageDomainPagePath('[key]'),
});

export const getDomainByKeyManageDomainPage = gql`
  query getDomainByKeyManageDomainPage($key: String!) {
    getDomainByKey(key: $key) {
      ...DomainData
    }
  }
  ${DomainData}
`;
const placeholderDomainData: GetDomainByKeyManageDomainPageQuery['getDomainByKey'] = generateDomainData();

export const ManageDomainPage: React.FC<{ domainKey: string }> = ({ domainKey }) => {
  const { data, loading } = useGetDomainByKeyManageDomainPageQuery({ variables: { key: domainKey } });
  const domain = data?.getDomainByKey || placeholderDomainData;
  return (
    <PageLayout
      isLoading={loading}
      title={`Manage Domain - ${domain.name}`}
      breadCrumbsLinks={[DomainPageInfo(domain), ManageDomainPageInfo(domain)]}
      renderRight={
        <RoleAccess accessRule="contributorOrAdmin">
          <IconButton
            aria-label="edit domain"
            size="sm"
            variant="outline"
            icon="edit"
            onClick={() => routerPushToPage(EditDomainPageInfo(domain))}
          />
        </RoleAccess>
      }
      accessRule="contributorOrAdmin"
    >
      <Stack spacing={4}>
        <Box>
          <InternalLink routePath="/domains/[key]/resources" asHref={`/domains/${domainKey}/resources`}>
            <Text fontSize="lg">
              Full Resource List
              <Icon name="external-link" />
            </Text>
          </InternalLink>
        </Box>
        <Box>
          <b>Description</b>
          <Text>{domain.description}</Text>
        </Box>
      </Stack>
    </PageLayout>
  );
};
