import { ExternalLinkIcon } from '@chakra-ui/icons';
import {
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  LinkProps,
  Skeleton,
  Stack,
  Text,
  TextProps,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { BeatLoader } from 'react-spinners';
import { ResourcePreviewDataFragment } from '../../../graphql/resources/resources.fragments.generated';
import {
  useAnalyzeResourceUrlLazyQuery,
  useSetResourceOpenedMutation,
} from '../../../graphql/resources/resources.operations.generated';
import { AnalyzeResourceUrlResult } from '../../../graphql/types';
import { toUrlPreview, validateUrl } from '../../../services/url.service';
import { theme } from '../../../theme/theme';

export const ResourceUrlLinkWrapper: React.FC<
  {
    resource: Pick<ResourcePreviewDataFragment, '_id' | 'consumed' | 'url'>;
    isLoading?: boolean;
  } & Omit<LinkProps, 'href' | 'onClick' | 'isExternal' | 'resource'>
> = ({ resource, isLoading, children, ...linkProps }) => {
  const [setResourceOpened] = useSetResourceOpenedMutation({ variables: { resourceId: resource._id } });
  return (
    <Skeleton as="span" isLoaded={!isLoading}>
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
    resource: Pick<ResourcePreviewDataFragment, '_id' | 'consumed' | 'url'>;
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
    resource: Pick<ResourcePreviewDataFragment, '_id' | 'consumed' | 'url'>;
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
  const isValidUrl = validateUrl(value);

  const [analyzeResourceUrl, { loading }] = useAnalyzeResourceUrlLazyQuery({
    fetchPolicy: 'no-cache',
    onCompleted(data) {
      onAnalyzed && onAnalyzed(data.analyzeResourceUrl);
    },
  });

  useEffect(() => {
    if (!!value && analyze && isValidUrl) analyzeResourceUrl({ variables: { url: value } });
  }, [value]);
  return (
    <FormControl isRequired>
      <FormLabel htmlFor="url">Url</FormLabel>
      <InputGroup>
        <Input
          id="url"
          isInvalid={!!value && !isValidUrl}
          placeholder="https://example.com"
          size="md"
          value={value}
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
                  color={isValidUrl ? 'green.400' : 'red.400'}
                  icon={<ExternalLinkIcon />}
                />
              </Link>
            )}
          </Stack>
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );
};
