import { Heading, HeadingProps, Text, TextProps, LinkProps } from '@chakra-ui/layout';
import { graphqlSync } from 'graphql';
import { TopicLinkDataFragment } from '../../graphql/topics/topics.fragments.generated';
import { TopicPageInfo } from '../../pages/RoutesPageInfos';
import { PageLink } from '../navigation/InternalLink';

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

// Topics

export const TopicLinkStyleProps: {
  [key in 'topicName' | 'contextName']: Pick<LinkProps, 'color' | 'fontWeight'>;
} = {
  topicName: {
    fontWeight: 700,
    color: 'gray.700',
  },
  contextName: { fontWeight: 700, color: 'gray.500' },
};

export const TopicDescriptionStyleProps: Pick<TextProps, 'fontSize' | 'color' | 'fontWeight'> = {
  fontWeight: 500,
  color: 'gray.700',
  fontSize: '15px',
};

export const EditLinkStyleProps: Pick<LinkProps, 'color' | 'fontSize'> = {
  color: 'blue.500',
  fontSize: 'sm',
};

export const ShowedInTopicHeadingStyleProps = (
  size: 'sm' | 'md'
): Pick<LinkProps, 'color' | 'fontSize' | 'fontWeight'> => ({
  color: 'gray.400',
  fontSize: { sm: '17px', md: '20px' }[size],
});

export const ShowedInTopicHeading: React.FC<HeadingProps & { size?: 'sm' | 'md' }> = ({
  children,
  size = 'md',
  ...props
}) => {
  return (
    <Heading {...ShowedInTopicHeadingStyleProps(size)} {...props}>
      {children}
    </Heading>
  );
};

export const ShowedInTopicLink: React.FC<{ topic: TopicLinkDataFragment; size?: 'sm' | 'md' } & HeadingProps> = ({
  topic,
  children,
  size = 'md',
  ...props
}) => {
  return (
    <PageLink pageInfo={TopicPageInfo(topic)} _hover={{}}>
      <ShowedInTopicHeading _hover={{ color: 'gray.500' }} transition="color ease-in 0.2s" size={size} {...props}>
        {children || topic.name}
      </ShowedInTopicHeading>
    </PageLink>
  );
};

// Users

export const UserDisplayName: React.FC<TextProps> = ({ children, ...props }) => {
  return (
    <Text {...props} {...UserDisplayNameStyleProps}>
      {children}
    </Text>
  );
};

export const UserDisplayNameStyleProps: Pick<TextProps, 'color' | 'fontWeight'> = {
  color: 'gray.800',
  fontWeight: 500,
};

export const UserKeyLinkStyleProps: Pick<LinkProps, 'color' | 'fontWeight'> = {
  color: 'blue.600',
  fontWeight: 600,
};

// e.g. Recommended By, Shared By, Created By...
export const SocialWidgetsLabelStyleProps = (
  size: 'sm' | 'md' | 'lg'
): Pick<TextProps, 'color' | 'fontWeight' | 'fontSize'> => ({
  color: 'gray.500',
  fontWeight: 600,
  fontSize: { sm: '13px', md: '14px', lg: 'md' }[size],
});
