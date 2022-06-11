import { CheckIcon, NotAllowedIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Stack,
  Switch,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import gql from 'graphql-tag';
import { useEffect, useState } from 'react';
import { generateUrlKey } from '../../services/url.service';
import { useCheckUserKeyAvailabilityLazyQuery } from './RegisterFormProfileInfo.generated';

export interface RegisterProfileInfo {
  displayName: string;
  key: string;
  subscribeToNewsletter?: boolean;
}

export const checkUserKeyAvailability = gql`
  query checkUserKeyAvailability($key: String!) {
    checkUserKeyAvailability(key: $key) {
      available
    }
  }
`;

const MIN_USER_KEY_LENGTH = 3;

export const RegisterFormProfileInfo: React.FC<{
  defaultProfileInfo: Partial<RegisterProfileInfo>;
  onRegister: (profileInfo: RegisterProfileInfo) => void;
  isRegistering: boolean;
}> = ({ defaultProfileInfo, onRegister, isRegistering }) => {
  const [displayName, setDisplayName] = useState(defaultProfileInfo.displayName || '');
  const [key, setKey] = useState(defaultProfileInfo.key || '');
  const [subscribeToNewsletter, setSubscribeToNewsletter] = useState(false);

  const [checkUserKeyAvailability, { loading, data }] = useCheckUserKeyAvailabilityLazyQuery();

  const isKeyAvailable = !loading && !!data?.checkUserKeyAvailability.available;

  const [isKeyValid, setIsKeyValid] = useState(false);
  useEffect(() => {
    try {
      setIsKeyValid(key === generateUrlKey(key) && key.length >= MIN_USER_KEY_LENGTH);
    } catch (err) {}
  }, [key]);

  return (
    <Stack spacing={6}>
      <Text fontSize="4xl">Your Profile Information</Text>
      <FormControl isRequired>
        <FormLabel htmlFor="display_name">Display name</FormLabel>
        <Input
          id="display_name"
          placeholder="John Doe"
          size="md"
          variant="outline"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
      </FormControl>
      <FormControl isRequired isInvalid={!!key && !isKeyValid}>
        <FormLabel htmlFor="key">Unique alias</FormLabel>
        <InputGroup size="sm">
          <Input
            id="key"
            placeholder="john_doe"
            variant="outline"
            value={key}
            onChange={(e) => {
              const newKey: string = e.target.value;
              setKey(newKey);
              if (newKey.length >= MIN_USER_KEY_LENGTH) {
                checkUserKeyAvailability({ variables: { key: newKey } });
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter')
                onRegister({
                  displayName,
                  key,
                  subscribeToNewsletter,
                });
            }}
          />
          {isKeyValid && (
            <InputRightElement
              children={
                !!loading ? (
                  <Spinner size="sm" />
                ) : isKeyValid && isKeyAvailable ? (
                  <CheckIcon color="green.500" />
                ) : (
                  <Tooltip
                    hasArrow
                    aria-label="User alias already in use"
                    label="User alias already in use"
                    placement="top"
                    bg="red.600"
                  >
                    <NotAllowedIcon color="red.500" />
                  </Tooltip>
                )
              }
            />
          )}
        </InputGroup>
        <FormErrorMessage>
          The user alias must be at least 3 characters long and url readable (no caps, spaces, special characters aside
          from underscores)
        </FormErrorMessage>
      </FormControl>

      <FormControl pt={5}>
        <Flex display="flex" alignItems="baseline">
          <FormLabel htmlFor="subscribe-newsletter" mb="0">
            Follow our newsletter ?
          </FormLabel>
          <Switch
            id="subscribe-newsletter"
            size="sm"
            isChecked={subscribeToNewsletter}
            onChange={(e) => setSubscribeToNewsletter(e.target.checked)}
          />
        </Flex>
        <FormHelperText>
          Stay up to date with the journey of Mapedia, and receive updates from our community
        </FormHelperText>
      </FormControl>
      <Button
        isDisabled={!displayName || !key || !isKeyAvailable || !isKeyValid}
        isLoading={isRegistering}
        size="lg"
        variant="solid"
        colorScheme="teal"
        onClick={() =>
          onRegister({
            displayName,
            key,
            subscribeToNewsletter,
          })
        }
      >
        Register
      </Button>
    </Stack>
  );
};
