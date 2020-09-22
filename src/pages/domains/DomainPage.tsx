import { Box, Flex, Heading, IconButton, Skeleton } from '@chakra-ui/core';
import { SettingsIcon } from '@chakra-ui/icons';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import { RoleAccess } from '../../components/auth/RoleAccess';
import { DomainConceptGraph } from '../../components/concepts/DomainConceptGraph';
import { DomainConceptList } from '../../components/concepts/DomainConceptList';
import { PageLayout } from '../../components/layout/PageLayout';
import { InternalButtonLink } from '../../components/navigation/InternalLink';
import { DomainRecommendedResources } from '../../components/resources/DomainRecommendedResources';
import { ConceptData, generateConceptData } from '../../graphql/concepts/concepts.fragments';
import { DomainData, generateDomainData } from '../../graphql/domains/domains.fragments';
import { DomainDataFragment } from '../../graphql/domains/domains.fragments.generated';
import { useMockedFeaturesEnabled } from '../../hooks/useMockedFeaturesEnabled';
import { PageInfo, routerPushToPage } from '../PageInfo';
import { GetDomainByKeyDomainPageQuery, useGetDomainByKeyDomainPageQuery } from './DomainPage.generated';
import { ManageDomainPageInfo } from './ManageDomainPage';

export const DomainPagePath = (domainKey: string) => `/domains/${domainKey}`;

export const DomainPageInfo = (domain: DomainDataFragment): PageInfo => ({
  name: domain.name,
  path: DomainPagePath(domain.key),
  routePath: DomainPagePath('[key]'),
});

export const getDomainByKeyDomainPage = gql`
  query getDomainByKeyDomainPage($key: String!) {
    getDomainByKey(key: $key) {
      ...DomainData
      concepts(options: { sorting: { entity: relationship, field: index, direction: ASC } }) {
        items {
          concept {
            ...ConceptData
            referencedByConcepts {
              concept {
                _id
              }
            }
            subConcepts {
              concept {
                _id
              }
            }
          }
          relationship {
            index
          }
        }
      }
      # resources(options: $resourcesOptions) {
      #   items {
      #     ...ResourcePreviewData
      #   }
      # }
    }
  }
  ${DomainData}
  ${ConceptData}
`;

// const DomainPageResourceFeedOptionsState = memoize((domainKey: string) =>
//   atom({
//     key: `DomainPageResourceFeedOptions_${domainKey}`,
//     default: {
//       sortingType: DomainResourcesSortingType.Recommended,
//     },
//   })
// );

// console.log('yo');
// const DomainPageResourceFeedOptionsState = atom({
//   key: `DomainPageResourceFeedOptions`,
//   default: {
//     sortingType: DomainResourcesSortingType.Recommended,
//   },
// });

// const resourcePreviews = selector({
//   key: 'CurrentUserName',
//   get: async ({get}) => {
//     const response = await myDBQuery({
//       userID: get(DomainPageResourceFeedOptionsState),
//     });
//     return response.name;
//   },
// });

// const useDomainPageState = (domainKey: string, initialResourcesOptions: DomainResourcesOptions) => {
//   const [domainData, setDomainData] = useState(placeholderDomainData);
//   const [resources, setResources] = useState(placeholderDomainData.resources);
//   const [concepts, setConcepts] = useState(placeholderDomainData.concepts);
//   useEffect(() => {
//     const { data, error, loading, refetch } = useGetDomainByKeyDomainPageQuery({
//       variables: { key: domainKey, resourcesOptions: initialResourcesOptions },
//       onCompleted(data) {
//         setDomainData(data.getDomainByKey);
//         setResources(data.getDomainByKey.resources);
//         setConcepts(data.getDomainByKey.concepts);
//       },
//       // partialRefetch: true,
//       // fetchPolicy: 'cache-and-network',
//       // notifyOnNetworkStatusChange: true,
//     });
//   }, []);
//   const [
//     getDomainRecommendedResourcesLazyQuery,
//     { loading: resourcesReloading },
//   ] = useGetDomainRecommendedResourcesLazyQuery({
//     onCompleted(data) {
//       setResources(data.getDomainByKey.resources);
//     },
//   });
//   const client = useApolloClient();
//   client.query<GetDomainRecommendedResourcesQuery, GetDomainRecommendedResourcesQueryVariables>({
//     query: getDomainRecommendedResources,
//     variables: { key },
//   });
//   const refetchResources = (options: DomainResourcesOptions) =>
//     getDomainRecommendedResourcesLazyQuery({
//       variables: {
//         resourcesOptions: options,
//         key: domainKey,
//       },
//     });
//   return { domainData, resources, concepts, refetchResources };
// };

const placeholderDomainData: GetDomainByKeyDomainPageQuery['getDomainByKey'] = {
  ...generateDomainData(),
  concepts: {
    items: [
      {
        concept: generateConceptData(),
        relationship: {
          index: 0,
        },
      },
      {
        concept: generateConceptData(),
        relationship: {
          index: 0,
        },
      },
    ],
  },
};

export const DomainPage: React.FC<{ domainKey: string }> = ({ domainKey }) => {
  const router = useRouter();
  // const resourcesOptions = useRecoilValue(DomainPageResourceFeedOptionsState);
  // const setResourcesOptions = useSetRecoilState(DomainPageResourceFeedOptionsState);
  // const [resourcesOptions, setResourcesOptions] = useState<DomainResourcesOptions>({
  //   sortingType: DomainResourcesSortingType.Recommended,
  // });

  const { data, loading } = useGetDomainByKeyDomainPageQuery({
    variables: { key: domainKey },
    // partialRefetch: true,
    // fetchPolicy: 'cache-and-network',
    // notifyOnNetworkStatusChange: true,
  });
  // console.log(networkStatus);

  // useEffect(() => {
  //   (async () => {
  //     setReloading(true);
  //     await refetch({ resourcesOptions });
  //     setReloading(false);
  //   })();
  // }, [resourcesOptions]);

  // const [reloading, setReloading] = useState(false);
  const domain = data?.getDomainByKey || placeholderDomainData;
  // const {
  //   domain,
  //   resources,
  //   concepts,
  //   setResourcesOptions,
  //   resourcesOptions,
  //   refetchResources,
  //   resourcesReloading,
  //   loading,
  // } = useDomainPageState(domainKey);
  // console.log(domain, resources, concepts, resourcesOptions, loading);
  const { mockedFeaturesEnabled } = useMockedFeaturesEnabled();
  // const reloadRecommendedResources = async () => {
  //   // setReloading(true);
  //   await refetchResources();
  //   // setReloading(false);
  // };
  // if (error) return <Box>Domain not found !</Box>;

  return (
    <PageLayout>
      <Flex direction="row" alignItems="center" pb={5}>
        <Skeleton isLoaded={!loading}>
          <Heading fontSize="4xl" fontWeight="normal" color="blackAlpha.800">
            Learn {domain.name}
          </Heading>
        </Skeleton>
        <Box flexGrow={1} />
        <InternalButtonLink
          variant="outline"
          borderColor="blue.500"
          color="blue.700"
          borderWidth="1px"
          routePath="/domains/[key]/resources/new"
          asHref={router.asPath + '/resources/new'}
          loggedInOnly
          isDisabled={loading}
        >
          + Add resource
        </InternalButtonLink>
        <RoleAccess accessRule="contributorOrAdmin">
          <IconButton
            ml={2}
            variant="outline"
            aria-label="manage_domain"
            icon={<SettingsIcon />}
            onClick={() => routerPushToPage(ManageDomainPageInfo(domain))}
          />
        </RoleAccess>
        {mockedFeaturesEnabled && (
          <Box ml={2}>
            <InternalButtonLink
              routePath="/domains/[key]/resources/indexing_queue"
              asHref={router.asPath + '/resources/indexing_queue'}
              variant="solid"
              fontStyle="italic"
            >
              32 Pending Resources
            </InternalButtonLink>
          </Box>
        )}
      </Flex>
      {domain && domain.description && (
        <Box mb={2} fontWeight={250}>
          {domain.description}
        </Box>
      )}
      <Flex direction={{ base: 'column-reverse', md: 'row' }} mb="100px">
        <Flex direction="column" flexShrink={0}>
          <DomainConceptList
            domain={domain}
            isLoading={loading}
            onConceptToggled={() => {}} // reloadRecommendedResources()
          />
        </Flex>
        {/* {domain.resources && ( */}
        <Flex direction="column" flexShrink={1} flexGrow={1}>
          <DomainRecommendedResources
            domainKey={domainKey}
            // resourcePreviews={resources?.items || []}
            // isLoading={loading}
            // isReloading={resourcesReloading}
            // reloadRecommendedResources={(ro) => refetchResources(ro)} //
            // initialResourcesOptions={resourcesOptions}
            // setResourcesOptions={setResourcesOptions}
          />
          <DomainConceptGraph domain={domain} isLoading={loading} minNbRelationships={5} />
          {/* {mockedFeaturesEnabled && <DomainLearningPaths domain={domain} />} */}
        </Flex>
        {/* )} */}
        {/* {mockedFeaturesEnabled && (
          <Stack spacing={4} direction="column" ml={6} flexShrink={1}>
            <Box>
              <Text fontSize="2xl">Sub domains</Text>
              <Stack direction="column" spacing={1}>
                {[
                  { _id: 1, name: 'Elixir' },
                  { _id: 2, name: 'Clojure' },
                  { _id: 3, name: 'Haskell' },
                  { _id: 4, name: 'JavaScript Functional Programming' },
                ].map((domain) => (
                  <Link key={domain._id}>{domain.name}</Link>
                ))}
              </Stack>
            </Box>
            <Box>
              <Text fontSize="2xl">Related domains</Text>
              <Stack direction="column" spacing={1}>
                {[
                  { _id: 1, name: 'Category Theory' },
                  { _id: 2, name: 'Object Oriented Programming' },
                ].map((domain) => (
                  <Link key={domain._id}>{domain.name}</Link>
                ))}
              </Stack>
            </Box>
            <Box>
              <Text fontSize="2xl">Links</Text>
              <Stack direction="column"></Stack>
            </Box>
          </Stack>
        )} */}
      </Flex>
    </PageLayout>
  );
};
