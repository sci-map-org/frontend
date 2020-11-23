import { Box, Flex, FlexProps, Heading, Link, Stack, Text, Divider } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import { MapIcon } from '../components/lib/icons/MapIcon';
import { SocialNetworkIcon } from '../components/lib/icons/SocialNetworkIcon';
import { UserCentricIcon } from '../components/lib/icons/UserCentricIcon';
import { InternalButtonLink, InternalLink } from '../components/navigation/InternalLink';

const Title: React.FC<{}> = () => {
  return (
    <Flex direction={{ base: 'column', lg: 'row' }} alignItems={{ base: 'center', lg: 'baseline' }}>
      <Heading fontSize="5xl" color="main" pr={3}>
        Sci-Map.org
      </Heading>
      <Heading fontSize="4xl" color="blackAlpha.500">
        (closed audience release)
      </Heading>
    </Flex>
  );
};

const LandingHeader: React.FC<{ layoutProps: FlexProps }> = ({ layoutProps }) => {
  return (
    <Flex direction="column" {...layoutProps}>
      <Box mb="10px">
        <Title />
      </Box>
      <Flex justifyContent="center" mb="30px" mt="18px">
        <Heading
          width="70%"
          textAlign="center"
          fontWeight="medium"
          color="blackAlpha.700"
          fontStyle="italic"
          fontSize="2xl"
        >
          An open and collaborative learning map embracing every learner's uniqueness, enabling users to navigate
          knowledge seamlessly.
        </Heading>
      </Flex>
      <Flex mb="40px" alignItems={{ base: 'center', md: 'start' }} direction={{ base: 'column', md: 'row' }}>
        <Flex direction="column" flexBasis={{ md: '800px' }} flexShrink={1} pr="10px">
          <Text mb={6}>
            <Text as="span" fontWeight={800}>
              Sci-map.org
            </Text>{' '}
            is a community-based, nonprofit project aiming to reshape online learning by providing a free and
            personalized learning experience for every topic. It allows you to explore knowledge intuitively, whether
            you have a specific goal in mind or you simply are following your curiosity. <br />
            <br />
            As of November 2020, it is in a state of closed audience release.
          </Text>
          <Stack direction="column" spacing={2} mb="15px">
            <Text>
              ⇒{' '}
              <Text as="span" fontWeight={800} color="main">
                Preview
              </Text>{' '}
              our first supported domain:{' '}
              <InternalLink
                color="blue.500"
                fontWeight={600}
                routePath="/domains/[key]"
                asHref="/domains/functional_programming"
              >
                Functional Programming
              </InternalLink>
            </Text>
            <Text>
              ⇒{' '}
              <Text as="span" fontWeight={800} color="main">
                Learn more
              </Text>{' '}
              about the project in the{' '}
              <InternalLink color="blue.500" fontWeight={600} routePath="/about" asHref="/about">
                About section
              </InternalLink>
            </Text>
          </Stack>
        </Flex>
        <Box flexGrow={1} />
        <Flex
          direction="column"
          alignItems="stretch"
          flexShrink={0}
          py={2}
          px={2}
          flexBasis={{ md: '350px' }}
          borderWidth="1px"
          borderRadius="7px"
          borderColor="grayDivider.400"
        >
          <Flex pl={2} pb={1}>
            <Text fontWeight={600} color="main" fontSize="lg">
              Find the best resources to learn...
            </Text>
          </Flex>
          <Stack spacing={0}>
            {[
              { name: 'Functional Programming', key: 'functional_programming' },
              { name: 'Machine Learning', key: 'machine_learning' },
              { name: 'UX Design', key: 'ux_design' },
              { name: 'Graph Theory', key: 'graph_theory' },
            ].map((domain) => (
              <Box key={domain.key} py={1} px={2}>
                <InternalLink asHref={`/domains/${domain.key}`} routePath={`/domains/[key]`}>
                  {domain.name}
                </InternalLink>
              </Box>
            ))}
            <Text py={1} px={2} fontStyle="italic">
              <InternalLink asHref="/domains" routePath="/domains">
                ...and much more coming soon !
              </InternalLink>
            </Text>
          </Stack>
        </Flex>
      </Flex>
    </Flex>
  );
};

const LandingContentItem: React.FC<{
  imagePosition: 'left' | 'right';
  darkBackground?: boolean;
  renderImage: ReactNode;
  layoutProps: FlexProps;
  title: string;
  renderTextContent: ReactNode;
}> = ({ layoutProps, imagePosition, renderImage, title, renderTextContent, darkBackground }) => {
  return (
    <Flex
      direction={{ base: imagePosition === 'left' ? 'column' : 'column-reverse', md: 'row' }}
      py="50px"
      alignItems="center"
      backgroundColor={darkBackground ? 'gray.200' : 'background.0'}
      {...layoutProps}
    >
      {imagePosition === 'left' && (
        <>
          <Box flexBasis="200px" flexGrow={0} flexShrink={0}>
            {renderImage}
          </Box>
          <Box w={16} h={4} />
        </>
      )}
      <Flex direction="column" justifyContent="center">
        <Heading size="xl" fontWeight={400} mb={5}>
          {title}
        </Heading>
        <Box color="gray.700">{renderTextContent}</Box>
      </Flex>
      {imagePosition === 'right' && (
        <>
          <Box w={16} h={4} />
          <Box width="200px" height="200px" flexGrow={0} flexShrink={0}>
            {renderImage}
          </Box>
        </>
      )}
    </Flex>
  );
};

const LandingFooter: React.FC<{ layoutProps: FlexProps }> = ({ layoutProps }) => (
  <Flex direction="column" mt={10} mb="100px" {...layoutProps}>
    <Heading textAlign="center" size="2xl" fontWeight={200} mb={4}>
      State of the project
    </Heading>
    <Text>
      The project is currently in a closed audience release in order to gather feedback and enhance tne product
      iteratively. It is open-source (checkout{' '}
      <Link color="blue.500" href="https://github.com/sci-map-org/">
        Github
      </Link>
      ), and will be registered as a non-profit.
      <br />
      Our mission is simple:{' '}
      <Text fontWeight={600} as="span">
        Improving access to education
      </Text>
      . As such, the product will be free and we will never charge for access to content.
      <br />
      <br />
      Our initial focus is around tech domains such as{' '}
      <InternalLink color="blue.500" routePath="/domains/[key]" asHref="/domains/functional_programming">
        Functional Programming
      </InternalLink>
      ,{' '}
      <InternalLink color="blue.500" routePath="/domains/[key]" asHref="/domains/machine_learning">
        Machine Learning
      </InternalLink>{' '}
      or{' '}
      <InternalLink color="blue.500" routePath="/domains/[key]" asHref="/domains/ux_design">
        User Experience Design
      </InternalLink>
      . The first version of the product entails a recommendation feed of external learning resources, based on a
      mapping of the dependencies between concepts and the current knowledge of the learner.
      <br />
      Our goal is to support learners by indexing free external learning resources and serving it in a useful way
      (recommendations, learning paths, etc.). Afterwards, we plan to collect feedback around resources, develop social
      features, and drive contributions towards user-generated content.
      <br />
      <br />
      To learn more about the project, you can check out the{' '}
      <InternalLink color="blue.500" routePath="/about" asHref="/about">
        About section
      </InternalLink>{' '}
      where we explain in detail the motivations behind the project, our vision, and the approach we are undertaking to
      bring it to life. <br />
      At the current stage, feedback is highly appreciated. Please let us know what you think on the{' '}
      <Link color="blue.500" href="https://forum.sci-map.org" isExternal>
        Forum
      </Link>
      .
    </Text>
    <Text textAlign="center" fontStyle="italic" mt="25px">
      Finally, to stay up to date with the state of the project, you can follow us on{' '}
      <Link color="blue.500" href="https://twitter.com/sci_map_org" isExternal>
        Twitter
      </Link>
      .
    </Text>
  </Flex>
);

export const LandingPage: React.FC = () => {
  const outerLayoutProps = {
    px: ['5px', '10px', '5%', '15%'],
    // maxWidth: '1400px',
  };
  return (
    <Flex direction="column" justifyContent="center" alignItems="stretch">
      <Box height={['10px', '20px', '30px', '50px']} />
      <Flex justifyContent="center">
        <LandingHeader layoutProps={outerLayoutProps} />
      </Flex>
      <LandingContentItem
        imagePosition="left"
        layoutProps={outerLayoutProps}
        darkBackground
        renderImage={<MapIcon w="200px" h="200px" color="mainDarker" />}
        title="An open, graph-based learning map"
        renderTextContent={
          <Text>
            Find out what you don't know, what you need to learn next, take a deep dive, or explore seamlessly with an
            open map of the knowledge space.
            <br />
            <br />
            We leverage graph database technology to build an abstract and precise modeling of knowledge, locate
            learning material in it, and serve it at the right time to the learner.
          </Text>
        }
      />
      <LandingContentItem
        imagePosition="right"
        layoutProps={outerLayoutProps}
        renderImage={<UserCentricIcon w="200px" h="200px" color="mainDarker" />}
        title="An experience tailored to each learner"
        renderTextContent={
          <Text>
            From what the learner already knows, his learning profile, his goals and interests, we will provide an
            optimal and fully personalized experience.
            <br />
            <br />
            We plan to provide smart recommendations while enabling the learner to keep control over their path, for
            instance by finding alternative pedagogical approaches in one click.
            <br />
            <br />
            By providing personal learning management features, and building an increasingly precise leaning profile for
            each user,{' '}
            <Text as="span" fontWeight={600} color="main">
              Sci-map.org
            </Text>{' '}
            aims to be the perfect tool for continuous learning across a wide range of domains.
          </Text>
        }
      />
      <LandingContentItem
        imagePosition="left"
        layoutProps={outerLayoutProps}
        darkBackground
        renderImage={<SocialNetworkIcon w="200px" h="200px" color="mainDarker" />}
        title="Collaborative and community based"
        renderTextContent={
          <Text>
            This project is community-based; we intend to build a modeling of the knowledge space, assess the content
            quality, and improve upon it collaboratively. <br />
            <br />
            We aim to enable new communities to form around different domains, foster learning with peers, receiving
            support and feedback, and connecting people at the right time. <br />
            <br />
            By improving content collaboratively based on community feedback and data, we aim to reach a better quality
            than what an individual alone could achieve.
          </Text>
        }
      />
      <Flex justifyContent="center" my={10}>
        <InternalButtonLink size="lg" routePath="/about" asHref="/about" colorScheme="blue" variant="outline">
          Learn more
        </InternalButtonLink>
      </Flex>
      <Flex justifyContent="center">
        <Divider width="50%" />
      </Flex>
      <LandingFooter layoutProps={outerLayoutProps} />
    </Flex>
  );
};
