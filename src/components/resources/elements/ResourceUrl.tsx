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
} from '@chakra-ui/react';
import gql from 'graphql-tag';
import { useEffect } from 'react';
import { BeatLoader } from 'react-spinners';
import { ResourcePreviewDataFragment } from '../../../graphql/resources/resources.fragments.generated';
import { useAnalyzeResourceUrlLazyQuery } from '../../../graphql/resources/resources.operations.generated';
import { AnalyzeResourceUrlResult } from '../../../graphql/types';
import { toUrlPreview, validateUrl } from '../../../services/url.service';
import { theme } from '../../../theme/theme';
import { useSetResourceOpenedMutation } from './ResourceUrl.generated';

export const setResourceOpened = gql`
  mutation setResourceOpened($resourceId: String!) {
    setResourcesConsumed(payload: { resources: [{ resourceId: $resourceId, opened: true }] }) {
      _id
      consumed {
        openedAt
      }
    }
  }
`;

export const ResourceUrlLink: React.FC<
  {
    resource: Pick<ResourcePreviewDataFragment, '_id' | 'consumed' | 'url'>;
    isLoading?: boolean;
    maxLength?: number;
  } & Omit<LinkProps, 'href' | 'onClick' | 'isExternal' | 'resource'>
> = ({ resource, isLoading, maxLength, ...linkProps }) => {
  const [setResourceOpened] = useSetResourceOpenedMutation({ variables: { resourceId: resource._id } });
  return (
    <Skeleton as="span" isLoaded={!isLoading}>
      <Link
        whiteSpace="nowrap"
        color={resource.consumed && resource.consumed.openedAt ? 'blue.400' : 'blue.700'}
        fontSize="sm"
        {...linkProps}
        href={resource.url}
        onClick={() => {
          if (!resource.consumed || !resource.consumed.openedAt) {
            setResourceOpened();
          }
        }}
        isExternal
      >
        {toUrlPreview(resource.url, maxLength)}
        <ExternalLinkIcon mx="2px" />
      </Link>
    </Skeleton>
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
