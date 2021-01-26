import { Flex, Heading, HeadingProps, Image, Link, List, ListItem, Stack, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import breaks from 'remark-breaks';
import { validateUrl } from '../../services/url.service';
import { fonts } from '../../theme/theme';

type HeadingConfig = {
  fontSize: string;
  fontWeight: HeadingProps['fontWeight'];
  asTag: React.ElementType;
  mt: string;
  mb: string;
};

const headingConfigMap: { [key in number]: HeadingConfig } = {
  1: {
    fontSize: '36px',
    fontWeight: 500,
    asTag: 'h1',
    mt: '18px',
    mb: '8px',
  },
  2: {
    fontSize: '30px',
    fontWeight: 500,
    asTag: 'h2',
    mt: '16px',
    mb: '7px',
  },
  3: {
    fontSize: '26px',
    fontWeight: 500,
    asTag: 'h3',
    mt: '14px',
    mb: '6px',
  },
  4: {
    fontSize: '24px',
    fontWeight: 500,
    asTag: 'h4',
    mt: '14px',
    mb: '6px',
  },
  5: {
    fontSize: '22px',
    fontWeight: 500,
    asTag: 'h5',
    mt: '14px',
    mb: '7px',
  },
  6: {
    fontSize: '19px',
    fontWeight: 500,
    asTag: 'h6',
    mt: '12px',
    mb: '6px',
  },
};

export const ArticleMarkdownViewer: React.FC<{ content: string }> = ({ content }) => {
  const source = content.replace(/\n/gi, '&nbsp;\n');
  return (
    <ReactMarkdown
      source={source}
      plugins={[breaks]}
      renderers={{
        root: ({ children }) => {
          return <Flex direction="column">{children}</Flex>;
        },
        paragraph: ({ children }) => {
          return (
            <Text fontFamily={fonts.article} fontSize="19px" fontWeight={300} mt={0}>
              {children}
            </Text>
          );
        },
        strong: ({ children }) => {
          return (
            <Text as="span" fontWeight={600}>
              {children}
            </Text>
          );
        },
        heading: ({ level, children }: { level: number; children: ReactNode }) => {
          return (
            <Heading
              fontSize={headingConfigMap[level].fontSize}
              lineHeight={headingConfigMap[level].fontSize}
              fontWeight={headingConfigMap[level].fontWeight}
              as={headingConfigMap[level].asTag}
              mt={headingConfigMap[level].mt}
              mb={headingConfigMap[level].mb}
            >
              {children}
            </Heading>
          );
        },
        list: ({ children, ...p }) => {
          return (
            <List stylePosition="inside" styleType="disc">
              {children}
            </List>
          );
        },
        listItem: (a) => {
          return (
            <ListItem fontFamily={fonts.article} fontWeight={300} fontSize="19px">
              {a.children}
            </ListItem>
          );
        },
        link: (a) => {
          return (
            <Link href={a.href} isExternal={validateUrl(a.href)} color="blue.500">
              {a.children}
            </Link>
          );
        },
        image: (img: { src: string; alt: string }) => {
          return (
            <Flex width="100%" direction="column" alignItems="center">
              <Image src={img.src} alt={img.alt} />
            </Flex>
          );
        },
      }}
    />
  );
};
