import { IconProps } from '@chakra-ui/icons';
import { Flex, Stack, StackProps } from '@chakra-ui/layout';
import { ReactNode } from 'react';
import { PageInfo, routerPushToPage } from '../../../../pages/PageInfo';

export interface SearchResultCardContainerProps extends StackProps {
  isHighlighted?: boolean;
  entityPageInfo: PageInfo;
  borderLeftColor: StackProps['borderColor'];
  renderIcon?: (props: Pick<IconProps, 'boxSize'>) => ReactNode;
}
export const SearchResultCardContainer: React.FC<SearchResultCardContainerProps> = ({
  isHighlighted,
  entityPageInfo,
  renderIcon,
  borderLeftColor,
  children,
  ...stackProps
}) => {
  return (
    <Stack
      direction="row"
      px={3}
      py="6px"
      borderWidth={1}
      borderTopWidth={0}
      onClick={() => routerPushToPage(entityPageInfo)}
      alignItems="center"
      _hover={{
        cursor: 'pointer',
      }}
      w="400px"
      borderLeftRadius={0}
      fontSize="md"
      {...(isHighlighted && {
        borderTopWidth: 1,
        mt: '-1px',
        backgroundColor: 'gray.50',
        borderColor: 'blue.600',
        pl: 4,
      })}
      {...(!isHighlighted && { borderLeftColor, borderLeftWidth: 2 })}
      {...stackProps}
    >
      {renderIcon && renderIcon({ boxSize: 7 })}
      <Flex direction="row" flexGrow={1}>
        {children}
      </Flex>
    </Stack>
  );
};
