import { Box, Flex, IconButton, Stack } from '@chakra-ui/react';
import { SettingsIcon } from '@chakra-ui/icons';
import { RoleAccess } from '../../components/auth/RoleAccess';
import { PageLayout } from '../../components/layout/PageLayout';
import { DeleteButtonWithConfirmation } from '../../components/lib/buttons/DeleteButtonWithConfirmation';
import { InternalButtonLink, InternalLink, PageLink } from '../../components/navigation/InternalLink';
import { useSearchDomains } from '../../graphql/domains/domains.hooks';
import { useDeleteDomainMutation } from '../../graphql/domains/domains.operations.generated';
import { routerPushToPage } from '../PageInfo';
import { DomainPageInfo, ManageDomainPageInfo } from '../RoutesPageInfos';

export const DomainsListPage: React.FC = () => {
  const { domains, refetch } = useSearchDomains();
  const [deleteDomainMutation] = useDeleteDomainMutation();
  return (
    <PageLayout title="Topics" centerChildren>
      <Stack spacing={8} direction="column" width="36rem">
        <Flex
          direction="column"
          borderBottomWidth="1px"
          borderColor="grayDivider.400"
          backgroundColor="backgroundColor.0"
        >
          {!!domains &&
            domains.map((domain) => {
              return (
                <Flex
                  key={domain._id}
                  borderWidth="1px"
                  borderBottomWidth={0}
                  borderColor="grayDivider.400"
                  py={2}
                  px={4}
                  direction="row"
                  alignItems="center"
                >
                  <PageLink pageInfo={DomainPageInfo(domain)} fontWeight={500}>
                    {domain.name}
                  </PageLink>
                  <Box flexGrow={1} />
                  <RoleAccess accessRule="contributorOrAdmin">
                    <IconButton
                      aria-label="manage domain"
                      size="sm"
                      icon={<SettingsIcon />}
                      onClick={() => routerPushToPage(ManageDomainPageInfo(domain))}
                    />
                  </RoleAccess>
                  <RoleAccess accessRule="admin">
                    <Box width={4} />
                    <DeleteButtonWithConfirmation
                      modalBodyText="Confirm deleting this domain ?"
                      modalHeaderText="Delete Domain"
                      onConfirmation={() =>
                        deleteDomainMutation({ variables: { id: domain._id } }).then(() => refetch())
                      }
                    />
                  </RoleAccess>
                </Flex>
              );
            })}
        </Flex>
        <RoleAccess accessRule="contributorOrAdmin">
          <InternalButtonLink variant="outline" routePath="/areas/new" asHref="/areas/new">
            + New Area
          </InternalButtonLink>
        </RoleAccess>
      </Stack>
    </PageLayout>
  );
};
