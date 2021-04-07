import { EditIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import { Box, IconButton, Stack, Text } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { RoleAccess } from '../../components/auth/RoleAccess';
import { DomainsPicker } from '../../components/domains/DomainsPicker';
import { PageLayout } from '../../components/layout/PageLayout';
import { PageLink } from '../../components/navigation/InternalLink';
import { DomainData, generateDomainData } from '../../graphql/domains/domains.fragments';
import { DomainDataFragment } from '../../graphql/domains/domains.fragments.generated';
import {
  useAttachTopicIsSubTopicOfTopicMutation,
  useDetachTopicIsSubTopicOfTopicMutation,
} from '../../graphql/topics/topics.operations.generated';
import { routerPushToPage } from '../PageInfo';
import {
  DomainPageInfo,
  DomainResourceListPageInfo,
  EditDomainPageInfo,
  ManageDomainPageInfo,
} from '../RoutesPageInfos';
import {
  GetDomainByKeyManageDomainPageQuery,
  useGetDomainByKeyManageDomainPageQuery,
} from './ManageDomainPage.generated';

export const getDomainByKeyManageDomainPage = gql`
  query getDomainByKeyManageDomainPage($key: String!) {
    getDomainByKey(key: $key) {
      ...DomainData
      subTopics(options: { sorting: { type: index, direction: ASC }, topicTypeIn: [Domain] }) {
        index
        subTopic {
          ...DomainData
        }
      }
      parentTopics(options: { sorting: { type: index, direction: ASC }, topicTypeIn: [Domain] }) {
        index
        parentTopic {
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
  const [attachTopicIsSubTopicOfTopicMutation] = useAttachTopicIsSubTopicOfTopicMutation();
  const [detachTopicIsSubTopicOfTopicMutation] = useDetachTopicIsSubTopicOfTopicMutation();
  const domain = data?.getDomainByKey || placeholderDomainData;

  return (
    <PageLayout
      isLoading={loading}
      title={`Manage Area - ${domain.name}`}
      breadCrumbsLinks={[DomainPageInfo(domain), ManageDomainPageInfo(domain)]}
      renderTopRight={
        <RoleAccess accessRule="contributorOrAdmin">
          <IconButton
            aria-label="edit area"
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
          <PageLink pageInfo={DomainResourceListPageInfo(domain)}>
            <Text fontSize="lg">
              Full Resource List
              <ExternalLinkIcon />
            </Text>
          </PageLink>
        </Box>
        <Box>
          <b>Description</b>
          <Text>{domain.description}</Text>
        </Box>
        <Box>
          <DomainsPicker
            title="Sub Areas"
            pickedDomainList={
              (domain.subTopics || [])
                .map((subDomainItem) => subDomainItem.subTopic)
                .filter((topic) => topic.__typename === 'Domain') as DomainDataFragment[]
            }
            onSelect={(domainToAdd) =>
              attachTopicIsSubTopicOfTopicMutation({
                variables: { parentTopicId: domain._id, subTopicId: domainToAdd._id, payload: {} },
              })
            }
            onRemove={(domainToRemove) =>
              detachTopicIsSubTopicOfTopicMutation({
                variables: { parentTopicId: domain._id, subTopicId: domainToRemove._id },
              })
            }
          />
        </Box>
        <Box>
          <DomainsPicker
            title="Parent Areas"
            pickedDomainList={
              (domain.parentTopics || [])
                .map((parentDomainItem) => parentDomainItem.parentTopic)
                .filter((topic) => topic.__typename === 'Domain') as DomainDataFragment[]
            }
            onSelect={(domainToAdd) =>
              attachTopicIsSubTopicOfTopicMutation({
                variables: { parentTopicId: domainToAdd._id, subTopicId: domain._id, payload: {} },
              })
            }
            onRemove={(domainToRemove) =>
              detachTopicIsSubTopicOfTopicMutation({
                variables: { parentTopicId: domainToRemove._id, subTopicId: domain._id },
              })
            }
          />
        </Box>
      </Stack>
    </PageLayout>
  );
};
