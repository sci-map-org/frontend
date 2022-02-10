import { ExternalLinkIcon } from '@chakra-ui/icons';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Center, IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  LinkProps,
  Skeleton,
  Stack,
  Text,
  TextProps
} from '@chakra-ui/react';
import gql from 'graphql-tag';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BeatLoader } from 'react-spinners';
import { ResourceDataFragment } from '../../../graphql/resources/resources.fragments.generated';
import {
  useAnalyzeResourceUrlLazyQuery,
  useSetResourceOpenedMutation
} from '../../../graphql/resources/resources.operations.generated';
import { AnalyzeResourceUrlResult } from '../../../graphql/types';
import { routerPushToPage } from '../../../pages/PageInfo';
import { ResourcePageInfo } from '../../../pages/RoutesPageInfos';
import { toUrlPreview, validateUrl } from '../../../services/url.service';
import { theme } from '../../../theme/theme';
import { PageLink } from '../../navigation/InternalLink';
import { ResourceUrlDataFragment } from './ResourceUrl.generated';

export const ResourceUrlData = gql`
  fragment ResourceUrlData on Resource {
    _id
    consumed {
      openedAt
      lastOpenedAt
      consumedAt
    }
    url
  }
`;

export const ResourceUrlLinkWrapper: React.FC<
  {
    resource: ResourceUrlDataFragment;
    isLoading?: boolean;
  } & Omit<LinkProps, 'href' | 'onClick' | 'isExternal' | 'resource'>
> = ({ resource, isLoading, children, ...linkProps }) => {
  const [setResourceOpened] = useSetResourceOpenedMutation({ variables: { resourceId: resource._id } });
  return (
    <Skeleton isLoaded={!isLoading}>
      <Link
        {...linkProps}
        href={resource.url}
        onClick={() => {
          setResourceOpened();
        }}
        isExternal
      >
        {children}
      </Link>
    </Skeleton>
  );
};

export const ResourceUrlLinkViewer: React.FC<
  {
    resource: ResourceUrlDataFragment;
    maxLength?: number;
  } & Omit<TextProps, 'resource'>
> = ({ resource, maxLength, ...props }) => {
  return (
    <Text
      whiteSpace="nowrap"
      color={resource.consumed && resource.consumed.openedAt ? 'blue.700' : 'blue.400'}
      fontSize="sm"
      {...props}
    >
      {toUrlPreview(resource.url, maxLength)}
      <ExternalLinkIcon mx="2px" />
    </Text>
  );
};
export const ResourceUrlLink: React.FC<
  {
    resource: ResourceUrlDataFragment;
    isLoading?: boolean;
    maxLength?: number;
  } & Omit<LinkProps, 'href' | 'onClick' | 'isExternal' | 'resource'>
> = ({ resource, isLoading, maxLength, children, ...linkProps }) => {
  return (
    <ResourceUrlLinkWrapper resource={resource} isLoading={isLoading} {...linkProps}>
      <ResourceUrlLinkViewer resource={resource} maxLength={maxLength} />
    </ResourceUrlLinkWrapper>
  );
};

interface ResourceUrlInputProps {
  value: string;
  onChange: (value: string) => void;
  analyze?: boolean;
  onAnalyzed?: (resourceData: AnalyzeResourceUrlResult) => void;
}
export const ResourceUrlInput: React.FC<ResourceUrlInputProps> = ({ value, onChange, analyze, onAnalyzed }) => {
  const isValidUrl = useMemo(() => validateUrl(value), [value]);
  const [existingResource, setExistingResource] = useState<ResourceDataFragment>();

  const closeAlertDialog = useCallback(() => {
    onChange('');
    setExistingResource(undefined);
  }, [])

  const cancelRef = useRef<HTMLButtonElement>(null);

  const [analyzeResourceUrl, { loading }] = useAnalyzeResourceUrlLazyQuery({
    fetchPolicy: 'no-cache',
    onCompleted(data) {
      setExistingResource(undefined);
      onAnalyzed && onAnalyzed(data.analyzeResourceUrl);
    },
    onError(err) {
      const errorCodes = err.graphQLErrors.map((gqlErr) => gqlErr.extensions.code);
      const existingResourceErrorIndex = errorCodes.indexOf('RESOURCE_ALREADY_EXISTS');
      if (existingResourceErrorIndex > -1) {
        const error = err.graphQLErrors[existingResourceErrorIndex];
        if (!error.extensions.existingResource)
          throw new Error('existingResource not supplied in RESOURCE_ALREADY_EXISTS error');
        setExistingResource(error.extensions.existingResource);
      }
    },
  });
  

  useEffect(() => {
    if (!!value && analyze && isValidUrl) analyzeResourceUrl({ variables: { url: value } });
  }, [value]);
  return (
    <>
      <InputGroup>
        <Input
          isInvalid={!!value && !isValidUrl}
          placeholder="https://example.com"
          size="md"
          value={value}
          {...(!!value &&
            isValidUrl && {
              color: 'blue.500',
              textDecoration: 'underline',
            })}
          onChange={(e) => onChange(e.target.value)}
        ></Input>
        <InputRightElement w="auto" display="flex" justifyContent="center">
          <Stack direction="row" align="center" mr={2}>
            {loading && <BeatLoader size={8} margin={2} color={theme.colors.main} />}

            {value && (
              <Link
                href={value}
                isExternal
                onClick={(e) => {
                  if (!isValidUrl) e.preventDefault(); // Not good for accessibility. Refactor to entirely remove link
                }}
              >
                <IconButton
                  isDisabled={!isValidUrl}
                  size="xs"
                  aria-label="Open link"
                  variant="ghost"
                  color={isValidUrl ? 'blue.500' : 'red.400'}
                  icon={<ExternalLinkIcon />}
                />
              </Link>
            )}
          </Stack>
        </InputRightElement>
      </InputGroup>

      {existingResource && (
        <AlertDialog isOpen={!!existingResource} leastDestructiveRef={cancelRef} onClose={closeAlertDialog}>
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Resource already exists
              </AlertDialogHeader>

              <AlertDialogBody display="flex" flexDir="column" alignItems="stretch">
                <Text textAlign="center" fontWeight={500}>A resource with the url <br /><ResourceUrlLink resource={existingResource} maxLength={40}/> already exists</Text>
                <Center py={8}>
                <PageLink pageInfo={ResourcePageInfo(existingResource)} fontWeight={600} fontSize="lg"  color="gray.700" isExternal>{existingResource.name}<ExternalLinkIcon ml={1} /></PageLink>
                </Center>
              </AlertDialogBody>

              <AlertDialogFooter>
                <Stack direction="row"> 
                <Button
                  ref={cancelRef}
                  onClick={closeAlertDialog}
                  variant="outline"
                >
                  Close
                </Button>
                <Button
                  onClick={() => routerPushToPage(ResourcePageInfo(existingResource))}
                  colorScheme="blue"
                >
                  Go to existing Resource
                </Button></Stack>

              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      )}
    </>
  );
};
