import { Box, Heading, Text } from '@chakra-ui/core';
import React from 'react';

export const LandingPage: React.FC = () => (
  <Box px="50px" py="20px">
    <Box p={5}>
      <Heading fontSize="5xl">Sci-Map.org (WIP)</Heading>
      <Heading fontWeight="medium" color="blackAlpha.800" fontStyle="italic" fontSize="3xl">
        Making knowledge contagious
      </Heading>
    </Box>
    <Box p={5}>
      <Heading fontSize="3xl">The project</Heading>
      <Text>
        Sci-map.org aims to be an open and collaborative platform for personalized learning. It will do so by modelling
        the knowledge space as graph, indexing online learning material and curating it based on what the user already
        knows, his learning profile, his goals and motivations, etc.
      </Text>
      <br />
      <Text>
        The project is open source, and plans to be incorporated as a non profit. It is very young, as of June 2020 I am
        starting to work full time on it. It aims to be collaborative and community based (a forum will soon open). In
        the meanwhile, if you are interested to contribute in any way, or just to give me feedback you can drop me a
        message at olivier@sci-map.org
      </Text>
      <br />
      <Text fontStyle="italic">Olivier Ramier</Text>
    </Box>

    {/* <Box p={5} textAlign="right">
      <Text fontSize="2xl">The project</Text>
      <Text>Present the team, the status, etc.</Text>
    </Box>
    <Box p={5}>
      <Text fontSize="2xl">How to contribute</Text>
      <Text>Links to forum, discord, github, patreon. Explain the many different ways to contribute.</Text>
      <Text>Follow me on Twitter, etc.</Text>
    </Box> */}
  </Box>
);
