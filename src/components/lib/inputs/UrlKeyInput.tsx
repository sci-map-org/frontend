import { FormControl, FormHelperText } from '@chakra-ui/form-control';
import { CheckIcon, NotAllowedIcon } from '@chakra-ui/icons';
import { Input, InputGroup, InputProps, InputRightElement } from '@chakra-ui/input';
import { Text } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import { Tooltip } from '@chakra-ui/tooltip';
import { StandardChakraSize } from '../../../util/chakra.util';

export enum UrlKeyAvailability {
  Loading = 'loading',
  Available = 'available',
  Unavailable = 'unavailable',
}
interface UrlKeyInputProps {
  placeholder: string;
  size: StandardChakraSize;
  onChange: (key: string) => void;
  variant?: InputProps['variant'];
  getUrlPreview: (key: string) => string | null;
  value: string;
  availability: UrlKeyAvailability;
}
/**
 * Deprecated ?
 */
export const UrlKeyInput: React.FC<UrlKeyInputProps> = ({
  size,
  placeholder,
  onChange,
  variant = 'flushed',
  value,
  availability,
  getUrlPreview,
}) => {
  return (
    <FormControl id="key" size={size}>
      <InputGroup>
        <Input
          placeholder={placeholder}
          size={size}
          variant={variant}
          value={value}
          onChange={async (e) => {
            const key: string = e.target.value;
            onChange(key);
          }}
        ></Input>
        {value && (
          <InputRightElement
            children={
              availability === UrlKeyAvailability.Loading ? (
                <Spinner size="sm" />
              ) : availability === UrlKeyAvailability.Available ? (
                <CheckIcon color="green.500" />
              ) : (
                <Tooltip
                  hasArrow
                  aria-label="Key already in use"
                  label="key already in use"
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
      {value && (
        <FormHelperText fontSize="xs">
          Url will look like{' '}
          <Text as="span" fontWeight={500}>
            {getUrlPreview(value)}
          </Text>
        </FormHelperText>
      )}
    </FormControl>
  );
};
