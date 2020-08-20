import { Box, Flex, Heading, Image, Link, Stack, Text } from '@chakra-ui/core';
import React from 'react';
import { InternalLink } from '../components/navigation/InternalLink';

export const LandingPage: React.FC = () => (
  <Box px="80px" py="20px">
    <Box p={5}>
      <Heading fontSize="5xl">Sci-Map.org (beta release)</Heading>
      <Heading mt={4} textAlign="center" fontWeight="medium" color="blackAlpha.800" fontStyle="italic" fontSize="2xl">
        An open and collaborative learning map embracing every learner's uniqueness, enabling users to navigate
        knowledge seamlessly.
      </Heading>
    </Box>
    <Box p={5}>
      <Text>
        <b>Sci-map.org</b> is a community-based, nonprofit project aiming to reshape online learning by providing a
        free, personalized learning experience for any topic and allowing learners to explore knowledge intuitively. As
        of August 2020, it is in a state of semi-private release. You can preview the product by checking out the first
        supported knowledge domain (namely{' '}
        <InternalLink color="blue.500" routePath="/domains/[key]" asHref="/domains/functional_programming">
          Functional Programming
        </InternalLink>
        ) or learn more about the project in the{' '}
        <InternalLink color="blue.500" routePath="/about" asHref="/about">
          About section
        </InternalLink>
      </Text>
      <br />
    </Box>
    <Stack direction="column" spacing={6}>
      <Stack direction="row" spacing={16}>
        <Box width="200px">
          <Image src="map.svg" />
        </Box>
        <Flex direction="column" justifyContent="center">
          <Heading size="lg">An open, graph-based learning map</Heading>
          <Text>
            Find out what you don't know, what to learn next, take a deep dive into a topic you love, or explore new
            ones seamlessly with an open map of the knowledge space.
            <br />
            We leverage graph database technology to build an abstract yet precise modeling of knowledge, locate
            learning material in it, and serve it at the right time to the learner.
          </Text>
        </Flex>
      </Stack>
      <Stack direction="row" spacing={16}>
        <Flex direction="column" justifyContent="center">
          <Heading size="lg">An experience tailored to each learner</Heading>
          <Text>
            From what the learner already knows, his learning profile, his goals and interests, we aim to provide an
            optimal and fully personalized learning experience.
            <br />
            We plan to provide smart recommendations while enabling the learner to keep control over their path, for
            instance by finding alternative pedagogical approaches in one click.
            <br />
            By integrating personal learning management features, and building an increasingly precise leaning profile
            for each user, <b>Sci-map.org</b> aims to be the perfect tool for continuous learning across a wide range of
            domains.
          </Text>
        </Flex>
        <Flex justifyContent="center" alignItems="center">
          <Image width="200px" src="user_centric_icon.svg" />
        </Flex>
      </Stack>
      <Stack direction="row" spacing={16}>
        <Flex direction="column" justifyContent="center" alignItems="center">
          <Image width="200px" src="social_network_icon.svg" />
        </Flex>
        <Flex direction="column" justifyContent="center">
          <Heading size="lg">Collaborative and community based</Heading>
          <Text>
            This project is community-based: we intend to build this modeling of the knowledge space, assess the content
            quality, and improve upon it collaboratively. <br />
            We aim to enable communities to form around different domains, foster learning with peers, receiving support
            and feedback, and connecting people at the right time. <br />
            By improving content collaboratively based on community feedback and data, and aiming to achieve a quality
            better than what a creator alone could do.
          </Text>
        </Flex>
      </Stack>
    </Stack>
    <Box mt={10} mb={20}>
      <Heading textAlign="center" size="xl" mb={4}>
        State of the project
      </Heading>
      <Text>
        The project is currently in a semi-private release (the name will change) in order to gather feedback and start
        improving it iteratively. It is open-source (checkout{' '}
        <Link color="blue.500" href="https://github.com/sci-map-org/">
          Github
        </Link>
        ), and will be registered as a non-profit.
        <br />
        Our mission is simple: <b>Improving access to education</b>. As such, the product will be free to use and we
        will never charge for access to content.
        <br />
        Our initial focus is around tech domains, the first one being{' '}
        <InternalLink color="blue.500" routePath="/domains/[key]" asHref="/domains/functional_programming">
          Functional Programming
        </InternalLink>
        . The first version of the product consists of a recommendation feed of external learning resources, based on a
        mapping of the dependencies between concepts and the current knowledge of the learner. Our first goal is to
        support learners by indexing free external learning resources and serving it in a valuable way (recommendations,
        learning paths, etc.). We then plan to integrate feedback, develop social features, and drive contributions
        towards user-generated content.
        <br />
        To learn more about the project, you can check out the{' '}
        <InternalLink color="blue.500" routePath="/about" asHref="/about">
          About section
        </InternalLink>{' '}
        where we explain in detail the motivations behind the project, our vision, and the approach we are undertaking
        to bring it to life. At the current stage, feedback is highly valuable. Please let us know what you think on the{' '}
        <Link color="blue.500" href="https://forum.sci-map.org" isExternal>
          Forum
        </Link>
        .
        <br />
        Finally, to stay up to date with the state of the project, you can follow us on{' '}
        <Link color="blue.500" href="https://twitter.com/sci_map_org" isExternal>
          Twitter
        </Link>
        .
      </Text>
    </Box>
  </Box>
);
