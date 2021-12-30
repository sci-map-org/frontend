import { Heading, HeadingProps, Text, TextProps, LinkProps } from '@chakra-ui/layout';

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

export const FormFieldHelperTextStyleProps: Pick<TextProps, 'fontSize' | 'fontWeight' | 'color' | 'letterSpacing'> = {
  fontSize: 'md',
  letterSpacing: '0.3px',
  fontWeight: 600,
  color: 'gray.500',
};

export const FormFieldHelperText: React.FC<TextProps> = ({ children, ...props }) => {
  return (
    <Text {...FormFieldHelperTextStyleProps} {...props}>
      {children}
    </Text>
  );
};

export const TopicDescriptionStyleProps: Pick<TextProps, 'fontSize' | 'color' | 'fontWeight'> = {
  fontWeight: 500,
  color: 'gray.700',
  fontSize: '15px',
};

export const TopicLinkStyleProps: {
  [key in 'topicName' | 'contextName']: Pick<LinkProps, 'color' | 'fontWeight'>;
} = {
  topicName: {
    fontWeight: 700,
    color: 'gray.700',
  },
  contextName: { fontWeight: 700, color: 'gray.500' },
};
