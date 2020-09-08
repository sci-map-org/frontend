import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Stack,
  Text,
  Tooltip,
} from '@chakra-ui/core';
import { CheckIcon, NotAllowedIcon } from '@chakra-ui/icons';
import gql from 'graphql-tag';
import { useState } from 'react';
import { generateUrlKey } from '../../services/url.service';
import { useGetUserByKeyQuery } from './RegisterFormProfileInfo.generated';

export interface RegisterProfileInfo {
  displayName: string;
  key: string;
}

export const getUserByKey = gql`
  query getUserByKey($key: String!) {
    getUser(key: $key) {
      _id
    }
  }
`;

const MIN_USER_KEY_LENGTH = 3;

export const RegisterFormProfileInfo: React.FC<{
  defaultProfileInfo: Partial<RegisterProfileInfo>;
  onRegister: (profileInfo: RegisterProfileInfo) => void;
}> = ({ defaultProfileInfo, onRegister }) => {
  const [displayName, setDisplayName] = useState(defaultProfileInfo.displayName || '');
  const [key, setKey] = useState(defaultProfileInfo.key || '');

  const { loading, refetch, data } = useGetUserByKeyQuery({
    variables: { key },
    errorPolicy: 'ignore',
  });

  const isKeyAvailable = !loading && !data;
  const isKeyValid = key === generateUrlKey(key) && key.length >= MIN_USER_KEY_LENGTH;
  return (
    <Stack spacing={6}>
      <Text fontSize="4xl">Your Profile Information</Text>
      <FormControl isRequired>
        <FormLabel htmlFor="display_name">Display name</FormLabel>
        <Input
          id="display_name"
          placeholder="John Doe"
          size="md"
          variant="flushed"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
      </FormControl>
      <FormControl isRequired isInvalid={!!key && !isKeyValid}>
        <FormLabel htmlFor="key">Unique alias</FormLabel>
        <InputGroup>
          <Input
            id="key"
            placeholder="john_doe"
            size="sm"
            variant="flushed"
            value={key}
            onChange={(e) => {
              const newKey: string = e.target.value;
              setKey(newKey);
              if (newKey.length >= MIN_USER_KEY_LENGTH) {
                refetch();
              }
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
          The user alias must be at least 3 characters long and by url readable (no caps, spaces, special characters
          aside from underscores)
        </FormErrorMessage>
      </FormControl>
      <Button
        isDisabled={!displayName || !key || !isKeyAvailable || !isKeyValid}
        size="lg"
        variant="solid"
        onClick={() =>
          onRegister({
            displayName,
            key,
          })
        }
      >
        Register
      </Button>
    </Stack>
  );
};
