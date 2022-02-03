import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverBodyProps,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

interface PopHoverProps {
  renderTrigger: ReactNode;
  title: string;
  minW?: PopoverBodyProps['minW'];
  maxW?: PopoverBodyProps['maxW'];
}

export const PopHover: React.FC<PopHoverProps> = ({
  renderTrigger,
  minW = '240px',
  maxW = '360px',
  title,
  children,
}) => {
  return (
    <Popover trigger="hover" isLazy>
      <PopoverTrigger>{renderTrigger}</PopoverTrigger>
      <PopoverContent minW={minW} w="auto" maxW={maxW}>
        <PopoverArrow />
        <PopoverHeader bgColor="teal.600" color="white" fontWeight={600}>
          {title}
        </PopoverHeader>
        <PopoverBody maxH="240px" overflowY="scroll" maxW="100%" bgColor="white">
          {children}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
