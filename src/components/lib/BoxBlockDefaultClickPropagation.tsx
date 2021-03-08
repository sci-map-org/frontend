import { Box, BoxProps } from '@chakra-ui/react';

export const BoxBlockDefaultClickPropagation: React.FC<BoxProps & { preventDefault?: boolean }> = ({
  children,
  preventDefault,
  ...props
}) => {
  return (
    <Box
      _hover={{ cursor: 'auto' }}
      {...props}
      onClick={(e) => {
        preventDefault && e.preventDefault();
        e.stopPropagation();
        props.onClick && props.onClick(e);
      }}
    >
      {children}
    </Box>
  );
};
