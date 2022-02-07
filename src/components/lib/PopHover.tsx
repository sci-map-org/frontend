import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverBodyProps,
  PopoverContent,
  PopoverHeader,
  PopoverHeaderProps,
  PopoverTrigger,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

const colorSchemeMapping = {
  teal: {
    headerBgColor: 'teal.600',
  },
  blue: {
    headerBgColor: 'blue.700',
  },
};
interface PopHoverProps {
  renderTrigger: ReactNode;
  title: string;
  colorScheme?: 'teal' | 'blue';
  minW?: PopoverBodyProps['minW'];
  maxW?: PopoverBodyProps['maxW'];
}

export const PopHover: React.FC<PopHoverProps> = ({
  renderTrigger,
  minW = '240px',
  maxW = '360px',
  colorScheme = 'teal',
  title,
  children,
}) => {
  return (
    <Popover trigger="hover" isLazy>
      <PopoverTrigger>{renderTrigger}</PopoverTrigger>
      <PopoverContent minW={minW} w="auto" maxW={maxW}>
        <PopoverArrow />
        <PopoverHeader bgColor={colorSchemeMapping[colorScheme].headerBgColor} color="white" fontWeight={600}>
          {title}
        </PopoverHeader>
        <PopoverBody maxH="240px" overflowY="scroll" maxW="100%" bgColor="white">
          {children}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
