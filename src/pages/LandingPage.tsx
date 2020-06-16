import { Box, Text, Heading } from '@chakra-ui/core';
import React from 'react';

export const LandingPage: React.FC = () => (
  <Box px="50px" py="20px">
    <Box p={5}>
      <Heading fontSize="5xl">Sci-Map.org (WIP)</Heading>
      <Heading fontWeight="medium" color="blackAlpha.800" fontSize="3xl">
        The open and collaborative platform for personalized learning
      </Heading>
    </Box>
    <Box p={5}>
      Coming soon...
      {/* <Heading fontSize="3xl">The vision</Heading>
      <Text>Learn anything based on what you know, how you learn best and your specific goals.</Text> */}
      {/* <Text>
        Encourage creativity in terms of pedagogical approach: practical vs theoretical, visual, interactive,
        gamified...
      </Text> */}
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
