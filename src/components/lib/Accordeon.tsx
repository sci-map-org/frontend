import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel } from '@chakra-ui/accordion';
import { Box } from '@chakra-ui/layout';
import { ReactNode } from 'react';

interface AccordeonItem {
  title: string;
  content: ReactNode | string;
}

interface AccordeonProps {
  items: AccordeonItem[];
}

/**
 * Named like because Accordéons are french (:
 */
export const Accordeon: React.FC<AccordeonProps> = ({ items }) => {
  return (
    <Accordion allowToggle>
      {items.map(({ title, content }, idx) => (
        <AccordionItem borderWidth={0} style={{ borderBottomWidth: 0 }}>
          <AccordionButton
            _focus={{}}
            _hover={{
              color: 'blue.500',
            }}
            borderLeftWidth={2}
            borderColor="gray.500"
            fontWeight={600}
            color="gray.600"
            _expanded={{ borderColor: 'blue.400', color: 'blue.500' }}
            mt={idx === 0 ? 0 : 2}
          >
            <Box flex="1" textAlign="left" borderTopWidth={0}>
              {title}
            </Box>
            {/* <AccordionIcon /> */}
          </AccordionButton>
          <AccordionPanel pb={4}>{content}</AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
