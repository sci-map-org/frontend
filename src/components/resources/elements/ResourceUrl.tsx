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
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import gql from 'graphql-tag';
import { ResourcePreviewDataFragment } from '../../../graphql/resources/resources.fragments.generated';
import { toUrlPreview, validateUrl } from '../../../services/url.service';
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

export const ResourceUrlInput: React.FC<{ value: string; onChange: (value: string) => void }> = ({
  value,
  onChange,
}) => {
  const isValidUrl = validateUrl(value);
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
        <InputRightElement
          children={
            value && (
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
            )
          }
        />
      </InputGroup>
    </FormControl>
  );
};
