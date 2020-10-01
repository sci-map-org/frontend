import { Box, IconButton, Stack, Text } from '@chakra-ui/core';
import { EditIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import gql from 'graphql-tag';
import { RoleAccess } from '../../components/auth/RoleAccess';
import { DomainsPicker } from '../../components/domains/DomainsPicker';
import { PageLayout } from '../../components/layout/PageLayout';
import { InternalLink } from '../../components/navigation/InternalLink';
import { DomainData, generateDomainData } from '../../graphql/domains/domains.fragments';
import { DomainDataFragment } from '../../graphql/domains/domains.fragments.generated';
import { PageInfo, routerPushToPage } from '../PageInfo';
import { DomainPageInfo } from './DomainPage';
import { EditDomainPageInfo } from './EditDomainPage';
import {
  GetDomainByKeyManageDomainPageQuery,
  useAddDomainBelongsToDomainMutation,
  useGetDomainByKeyManageDomainPageQuery,
  useRemoveDomainBelongsToDomainMutation,
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
      subDomains {
        domain {
          ...DomainData
        }
      }
    }
  }
  ${DomainData}
`;

export const addDomainBelongsToDomain = gql`
  mutation addDomainBelongsToDomain($parentDomainId: String!, $subDomainId: String!) {
    addDomainBelongsToDomain(parentDomainId: $parentDomainId, subDomainId: $subDomainId) {
      _id
      subDomains {
        domain {
          _id
        }
      }
    }
  }
`;

export const removeDomainBelongsToDomain = gql`
  mutation removeDomainBelongsToDomain($parentDomainId: String!, $subDomainId: String!) {
    removeDomainBelongsToDomain(parentDomainId: $parentDomainId, subDomainId: $subDomainId) {
      _id
      subDomains {
        domain {
          _id
        }
      }
    }
  }
`;

const placeholderDomainData: GetDomainByKeyManageDomainPageQuery['getDomainByKey'] = generateDomainData();

export const ManageDomainPage: React.FC<{ domainKey: string }> = ({ domainKey }) => {
  const { data, loading } = useGetDomainByKeyManageDomainPageQuery({ variables: { key: domainKey } });
  const [addDomainBelongsToDomainMutation] = useAddDomainBelongsToDomainMutation();
  const [removeDomainBelongsToDomainMutation] = useRemoveDomainBelongsToDomainMutation();
  const domain = data?.getDomainByKey || placeholderDomainData;
  const subDomains = domain.subDomains?.map((subDomainItem) => subDomainItem.domain) || [];
  return (
    <PageLayout
      isLoading={loading}
      title={`Manage Domain - ${domain.name}`}
      breadCrumbsLinks={[DomainPageInfo(domain), ManageDomainPageInfo(domain)]}
      renderTopRight={
        <RoleAccess accessRule="contributorOrAdmin">
          <IconButton
            aria-label="edit domain"
            size="sm"
            variant="outline"
            icon={<EditIcon />}
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
              <ExternalLinkIcon />
            </Text>
          </InternalLink>
        </Box>
        <Box>
          <b>Description</b>
          <Text>{domain.description}</Text>
        </Box>
        <Box>
          <DomainsPicker
            title="Sub Domains"
            pickedDomainList={subDomains}
            onSelect={(domainToAdd) =>
              addDomainBelongsToDomainMutation({
                variables: { parentDomainId: domain._id, subDomainId: domainToAdd._id },
              })
            }
            onRemove={(domainToRemove) =>
              removeDomainBelongsToDomainMutation({
                variables: { parentDomainId: domain._id, subDomainId: domainToRemove._id },
              })
            }
          />
        </Box>
      </Stack>
    </PageLayout>
  );
};
