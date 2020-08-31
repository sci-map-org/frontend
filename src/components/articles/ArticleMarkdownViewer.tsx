import { Flex, Heading, Image, Link, List, ListItem, Stack, Text } from '@chakra-ui/core';
import { ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import breaks from 'remark-breaks';
import { validateUrl } from '../../services/url.service';
import { fonts } from '../../theme/theme';

type HeadingConfig = {
  fontSize: string;
  fontWeight: string;
  asTag: React.ElementType;
  mt: string;
  mb: string;
};

const headingConfigMap: { [key in number]: HeadingConfig } = {
  1: {
    fontSize: '36px',
    fontWeight: 'bold',
    asTag: 'h1',
    mt: '20px',
    mb: '10px',
  },
  2: {
    fontSize: '32px',
    fontWeight: 'bold',
    asTag: 'h2',
    mt: '10px',
    mb: '6px',
  },
  3: {
    fontSize: '32px',
    fontWeight: 'normal',
    asTag: 'h3',
    mt: '10px',
    mb: '6px',
  },
  4: {
    fontSize: '28px',
    fontWeight: 'normal',
    asTag: 'h4',
    mt: '10px',
    mb: '6px',
  },
  5: {
    fontSize: '28px',
    fontWeight: 'thin',
    asTag: 'h5',
    mt: '10px',
    mb: '6px',
  },
  6: {
    fontSize: '24px',
    fontWeight: 'thin',
    asTag: 'h6',
    mt: '10px',
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
          return <Stack>{children}</Stack>;
        },
        paragraph: ({ children }) => {
          return (
            <Text fontFamily={fonts.article} fontSize="19px">
              {children}
            </Text>
          );
        },
        heading: ({ level, children }: { level: number; children: ReactNode }) => {
          return (
            <Heading
              fontSize={headingConfigMap[level].fontSize}
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
          return <List styleType="disc">{children}</List>;
        },
        listItem: (a) => {
          return (
            <ListItem fontFamily={fonts.article} fontSize="19px">
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
