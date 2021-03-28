import { Accordion, AccordionButton, AccordionItem, AccordionPanel, AccordionProps } from '@chakra-ui/accordion';
import { Box, BoxProps, Text } from '@chakra-ui/layout';
import { ReactNode } from 'react';

interface AccordeonItem {
  title: string;
  content: ReactNode | string;
}

interface AccordeonProps {
  items: AccordeonItem[];
  textAlign?: 'left' | 'right';
  h?: AccordionProps['h'];
  expandFirstItem?: boolean;
  color?: BoxProps['color'];
  borderColor?: BoxProps['borderColor'];
}

/**
 * Named like because Accordéons are french (:
 */
export const Accordeon: React.FC<AccordeonProps> = ({
  items,
  h,
  expandFirstItem,
  color = 'teal.500',
  borderColor = 'teal.400',
  textAlign = 'left',
}) => {
  return (
    <Accordion allowToggle h={h} {...(expandFirstItem && { defaultIndex: 0 })}>
      {items.map(({ title, content }, idx) => (
        <AccordionItem key={title} borderWidth={0} style={{ borderBottomWidth: 0 }}>
          <AccordionButton
            _focus={{}}
            _hover={{
              color,
            }}
            borderLeftWidth={textAlign === 'left' ? 2 : 0}
            borderRightWidth={textAlign === 'right' ? 2 : 0}
            borderColor="gray.500"
            fontWeight={600}
            color="gray.600"
            _expanded={{ borderColor, color }}
            mt={idx === 0 ? 0 : 2}
          >
            <Box flex="1" fontSize="lg" textAlign={textAlign} borderTopWidth={0}>
              {title}
            </Box>
          </AccordionButton>
          <AccordionPanel
            backgroundImage="linear-gradient(rgba(255,255,255,0.1), rgba(255,255,255,1), rgba(255,255,255,1), rgba(255,255,255,0.1))"
            textAlign={textAlign}
            pt={3}
            pb={2}
          >
            <Text>{content}</Text>
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
