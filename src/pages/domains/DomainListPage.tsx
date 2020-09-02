import { Flex, Stack } from '@chakra-ui/core';
import { RoleAccess } from '../../components/auth/RoleAccess';
import { PageLayout } from '../../components/layout/PageLayout';
import { DeleteButtonWithConfirmation } from '../../components/lib/buttons/DeleteButtonWithConfirmation';
import { InternalButtonLink, InternalLink } from '../../components/navigation/InternalLink';
import { useSearchDomains } from '../../graphql/domains/domains.hooks';
import { UserRole } from '../../graphql/types';
import { useCurrentUser } from '../../graphql/users/users.hooks';

export const DomainsListPage: React.FC = () => {
  const { currentUser } = useCurrentUser();
  const { domains } = useSearchDomains();
  return (
    <PageLayout title="Domains" centerChildren>
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
                  justifyContent="space-between"
                >
                  <InternalLink routePath="/domains/[key]" asHref={`/domains/${domain.key}`} fontWeight={500}>
                    {domain.name}
                  </InternalLink>
                  <RoleAccess accessRule="admin">
                    <DeleteButtonWithConfirmation
                      modalBodyText="Confirm deleting this domain ?"
                      modalHeaderText="Delete Domain"
                      onConfirmation={() => {}}
                    />
                  </RoleAccess>
                </Flex>
              );
            })}
        </Flex>
        <RoleAccess accessRule="contributorOrAdmin">
          <InternalButtonLink variant="outline" routePath="/domains/new" asHref="/domains/new">
            + New Domain
          </InternalButtonLink>
        </RoleAccess>
      </Stack>
    </PageLayout>
  );
};
