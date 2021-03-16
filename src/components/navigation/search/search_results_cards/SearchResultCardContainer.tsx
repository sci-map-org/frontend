import { Icon, IconProps } from '@chakra-ui/icons';
import { Flex, Stack } from '@chakra-ui/layout';
import { ReactNode } from 'react';
import { PageInfo, routerPushToPage } from '../../../../pages/PageInfo';

export interface SearchResultCardContainerProps {
  isHighlighted?: boolean;
  entityPageInfo: PageInfo;
  renderIcon?: (props: Pick<IconProps, 'boxSize'>) => ReactNode;
}
export const SearchResultCardContainer: React.FC<SearchResultCardContainerProps> = ({
  isHighlighted,
  entityPageInfo,
  renderIcon,
  children,
}) => {
  return (
    <Stack
      direction="row"
      px={3}
      py={1}
      borderWidth={1}
      w="100%"
      onClick={() => routerPushToPage(entityPageInfo)}
      alignItems="center"
      _hover={{
        cursor: 'pointer',
      }}
      borderRadius={3}
      fontSize="sm"
      {...(isHighlighted && { backgroundColor: 'gray.50', borderColor: 'blue.600' })}
    >
      {renderIcon && renderIcon({ boxSize: 6 })}
      <Flex direction="row">{children}</Flex>
    </Stack>
  );
};
