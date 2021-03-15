import { EditIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import { Box, IconButton, Stack, Text } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { RoleAccess } from '../../components/auth/RoleAccess';
import { DomainsPicker } from '../../components/domains/DomainsPicker';
import { PageLayout } from '../../components/layout/PageLayout';
import { InternalLink } from '../../components/navigation/InternalLink';
import { DomainData, generateDomainData } from '../../graphql/domains/domains.fragments';
import {
  useAddDomainBelongsToDomainMutation,
  useRemoveDomainBelongsToDomainMutation,
} from '../../graphql/domains/domains.operations.generated';
import { routerPushToPage } from '../PageInfo';
import { DomainPageInfo, EditDomainPageInfo, ManageDomainPageInfo } from '../RoutesPageInfos';
import {
  GetDomainByKeyManageDomainPageQuery,
  useGetDomainByKeyManageDomainPageQuery,
} from './ManageDomainPage.generated';

export const getDomainByKeyManageDomainPage = gql`
  query getDomainByKeyManageDomainPage($key: String!) {
    getDomainByKey(key: $key) {
      ...DomainData
      subDomains {
        domain {
          ...DomainData
        }
      }
      parentDomains {
        domain {
          ...DomainData
        }
      }
    }
  }
  ${DomainData}
`;

const placeholderDomainData: GetDomainByKeyManageDomainPageQuery['getDomainByKey'] = generateDomainData();

export const ManageDomainPage: React.FC<{ domainKey: string }> = ({ domainKey }) => {
  const { data, loading } = useGetDomainByKeyManageDomainPageQuery({ variables: { key: domainKey } });
  const [addDomainBelongsToDomainMutation] = useAddDomainBelongsToDomainMutation();
  const [removeDomainBelongsToDomainMutation] = useRemoveDomainBelongsToDomainMutation();
  const domain = data?.getDomainByKey || placeholderDomainData;

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
            pickedDomainList={(domain.subDomains || []).map((subDomainItem) => subDomainItem.domain)}
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
        <Box>
          <DomainsPicker
            title="Parent Domains"
            pickedDomainList={(domain.parentDomains || []).map((parentDomainItem) => parentDomainItem.domain)}
            onSelect={(domainToAdd) =>
              addDomainBelongsToDomainMutation({
                variables: { parentDomainId: domainToAdd._id, subDomainId: domain._id },
              })
            }
            onRemove={(domainToRemove) =>
              removeDomainBelongsToDomainMutation({
                variables: { parentDomainId: domainToRemove._id, subDomainId: domain._id },
              })
            }
          />
        </Box>
      </Stack>
    </PageLayout>
  );
};
