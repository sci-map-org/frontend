import { Accordion, AccordionButton, AccordionItem, AccordionPanel } from '@chakra-ui/accordion';
import { Box } from '@chakra-ui/layout';
import { ReactNode } from 'react';

interface AccordeonItem {
  title: string;
  content: ReactNode | string;
}

interface AccordeonProps {
  items: AccordeonItem[];
  textAlign?: 'left' | 'right';
}

/**
 * Named like because Accordéons are french (:
 */
export const Accordeon: React.FC<AccordeonProps> = ({ items, textAlign = 'left' }) => {
  return (
    <Accordion allowToggle>
      {items.map(({ title, content }, idx) => (
        <AccordionItem key={title} borderWidth={0} style={{ borderBottomWidth: 0 }}>
          <AccordionButton
            _focus={{}}
            _hover={{
              color: 'blue.500',
            }}
            borderLeftWidth={textAlign === 'left' ? 2 : 0}
            borderRightWidth={textAlign === 'right' ? 2 : 0}
            borderColor="gray.500"
            fontWeight={600}
            color="gray.600"
            _expanded={{ borderColor: 'blue.400', color: 'blue.500' }}
            mt={idx === 0 ? 0 : 2}
          >
            <Box flex="1" fontSize="lg" textAlign={textAlign} borderTopWidth={0}>
              {title}
            </Box>
          </AccordionButton>
          <AccordionPanel textAlign={textAlign} pb={4}>
            {content}
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
