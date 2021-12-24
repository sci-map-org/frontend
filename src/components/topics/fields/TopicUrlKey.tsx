import { CheckIcon, NotAllowedIcon } from '@chakra-ui/icons';
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useCheckTopicKeyAvailabilityLazyQuery } from '../../../graphql/topics/topics.operations.generated';

export const useCheckTopicKeyAvailability = (key: string) => {
  const [isChecking, setIsChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean>();
  const [checkTopicKeyAvailability] = useCheckTopicKeyAvailabilityLazyQuery({
    onCompleted(data) {
      setIsAvailable(!!data.checkTopicKeyAvailability.available);
      setIsChecking(false);
    },
  });

  const [keyValueToCheck] = useDebounce(key, 300);
  useEffect(() => {
    setIsChecking(true);
  }, [key]);
  useEffect(() => {
    if (keyValueToCheck.length) checkTopicKeyAvailability({ variables: { key: keyValueToCheck } });
  }, [keyValueToCheck]);

  return {
    isAvailable,
    isChecking,
  };
};
/**
 * Use along with useCheckTopicKeyAvailability in the controlling parent component
 */
export const TopicUrlKeyField: React.FC<{
  size?: 'md' | 'lg' | 'sm';
  value: string;
  fullTopicKey: string;
  onChange: (newKeyValue: string) => void;
  isChecking: boolean;
  isAvailable?: boolean;
  isInvalid?: boolean;
}> = ({ size, value, fullTopicKey, onChange, isChecking, isAvailable, isInvalid }) => {
  return (
    <FormControl id="key" size={size} isInvalid={isInvalid}>
      <InputGroup position="relative" left={0} right={0} zIndex={1}>
        <Input
          placeholder="Topic Url Key"
          position="absolute"
          value={value}
          zIndex={1}
          onChange={(e) => onChange(e.target.value)}
        />

        {value && (
          <InputRightElement
            children={
              !!isChecking ? (
                <Spinner size="sm" />
              ) : (
                <>
                  {isAvailable && <CheckIcon color="green.500" />}
                  {isAvailable === false && (
                    <Tooltip
                      hasArrow
                      aria-label="Key already in use"
                      label="key already in use"
                      placement="top"
                      bg="red.600"
                    >
                      <NotAllowedIcon color="red.500" />
                    </Tooltip>
                  )}
                </>
              )
            }
          />
        )}
        {/* Input element below is used to show the grayed out suffix */}
        <Input value={value ? fullTopicKey : ''} zIndex={0} color="gray.400" readOnly />
      </InputGroup>
      <InputGroup position="absolute" left={0} right={0} zIndex={0}></InputGroup>

      {value && (
        <FormHelperText fontSize="xs" {...(!isAvailable && { color: 'red.500' })}>
          {isAvailable && (
            <>
              Url will look like{' '}
              <Text as="span" fontWeight={500}>
                /topics/{fullTopicKey}
              </Text>
            </>
          )}
          {isAvailable === false && (
            <>
              <Text as="span" fontWeight={500}>
                /topics/{fullTopicKey}
              </Text>{' '}
              is not available
            </>
          )}
        </FormHelperText>
      )}
      {!value && <FormErrorMessage>Url Key is required</FormErrorMessage>}
    </FormControl>
  );
};
