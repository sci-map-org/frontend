import { CheckIcon, NotAllowedIcon } from '@chakra-ui/icons';
import {
  FormControl,
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
import { generateUrlKey } from '../../../services/url.service';

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
    checkTopicKeyAvailability({ variables: { key: keyValueToCheck } });
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
  onChange: (newKeyValue: string) => void;
  isChecking: boolean;
  isAvailable?: boolean;
}> = ({ size, value, onChange, isChecking, isAvailable }) => {
  return (
    <FormControl id="key" size={size}>
      <InputGroup>
        <Input
          placeholder="Topic Url Key"
          value={value}
          size={size}
          onChange={(e) => onChange(generateUrlKey(e.target.value))}
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
      </InputGroup>
      {value && (
        <FormHelperText fontSize="xs" {...(!isAvailable && { color: 'red.500' })}>
          {isAvailable && (
            <>
              Url will look like{' '}
              <Text as="span" fontWeight={500}>
                /topics/{value}
              </Text>
            </>
          )}
          {isAvailable === false && (
            <>
              <Text as="span" fontWeight={500}>
                /topics/{value}
              </Text>{' '}
              is not available
            </>
          )}
        </FormHelperText>
      )}
    </FormControl>
  );
};
