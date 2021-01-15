import { Box, BoxProps } from '@chakra-ui/react';

export const BoxBlockDefaultClickPropagation: React.FC<BoxProps> = ({ children, ...props }) => {
  return (
    <Box
      _hover={{ cursor: 'auto' }}
      {...props}
      onClick={(e) => {
        e.stopPropagation();
        props.onClick && props.onClick(e);
      }}
    >
      {children}
    </Box>
  );
};
