import { Heading, HeadingProps, Text, TextProps } from '@chakra-ui/layout';

export const PageTitle: React.FC<HeadingProps> = ({ children, ...props }) => {
  return (
    <Heading color="gray.800" fontSize="52px" {...props}>
      {children}
    </Heading>
  );
};

export const TopicPageSectionHeader: React.FC<HeadingProps> = ({ children, ...props }) => {
  return (
    <Heading color="gray.800" fontSize="24px" fontWeight={600} {...props}>
      {children}
    </Heading>
  );
};

export const FormTitle: React.FC<HeadingProps> = ({ children, ...props }) => {
  return (
    <Heading color="gray.800" fontSize="4xl" fontWeight={400} {...props}>
      {children}
    </Heading>
  );
};

export const FormFieldLabelStyleProps: Pick<TextProps, 'fontSize' | 'fontWeight' | 'color'> = {
  fontSize: 'xl',
  fontWeight: 800,
  color: 'gray.700',
};

export const FormFieldLabel: React.FC<TextProps> = ({ children, ...props }) => {
  return (
    <Text {...FormFieldLabelStyleProps} {...props}>
      {children}
    </Text>
  );
};
