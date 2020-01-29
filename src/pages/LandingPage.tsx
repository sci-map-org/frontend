import { Box, Text } from '@chakra-ui/core';
import React from 'react';

export const LandingPage: React.FC = () => (
  <Box px="50px" py="20px">
    <Box p={5}>
      <Text fontSize="3xl">Apollo Project</Text>
      <Text fontSize="xl">The open platform for personalized learning</Text>
    </Box>
    <Box p={5}>
      <Text fontSize="2xl">The vision</Text>
      <Text>Learn anything based on what you know, how you learn best and your specific goals.</Text>
      <Text>
        Encourage creativity in terms of pedagogical approach: practical vs theoretical, visual, interactive,
        gamified...
      </Text>
    </Box>

    <Box p={5} textAlign="right">
      <Text fontSize="2xl">The project</Text>
      <Text>Present the team, the status, etc.</Text>
    </Box>
    <Box p={5}>
      <Text fontSize="2xl">How to contribute</Text>
      <Text>Links to forum, discord, github, patreon. Explain the many different ways to contribute.</Text>
      <Text>Follow me on Twitter, etc.</Text>
    </Box>
  </Box>
);
