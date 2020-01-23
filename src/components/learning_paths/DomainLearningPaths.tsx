import { DomainDataFragment } from '../../graphql/domains/domains.generated';
import { Box, Flex, Text, Link, Tag } from '@chakra-ui/core';

export const DomainLearningPaths: React.FC<{ domain: DomainDataFragment }> = ({ domain }) => {
  const learningPaths = [
    {
      _id: 1,
      priorKnowledgeLevel: ['Programming Basics'],
      posteriorKnowledgeLevel: ['Big Picture', 'Main Ideas', `What it's about`],
      name: 'FP Introduction',
    },
    {
      _id: 2,
      priorKnowledgeLevel: ['Programming Basics'],
      posteriorKnowledgeLevel: ['Basics'],
      name: 'FP Basics',
    },
    {
      _id: 3,
      name: 'Proficient',
      priorKnowledgeLevel: ['Programming Basics'],
      posteriorKnowledgeLevel: ['Write a program'],
    },
  ];
  return (
    <Flex direction="column">
      <Text fontSize="2xl">Learning Paths</Text>
      <Flex direction="row" flexWrap="wrap" justifyContent="space-between">
        {learningPaths.map(learningPath => (
          <Flex key={learningPath._id} direction="column" borderWidth={1} borderRadius={1} p={1} width="15rem" my={2}>
            <Flex justifyContent="center">
              <Link fontSize="xl">{learningPath.name}</Link>
            </Flex>
            <Box>
              <Text fontStyle="italic" color="gray.600" fontWeight={300}>
                What you'll get out of it:
              </Text>
              <Flex direction="row" flexWrap="wrap">
                {learningPath.posteriorKnowledgeLevel.map(postkl => (
                  <Tag key={postkl} size="sm" m={1}>
                    {postkl}
                  </Tag>
                ))}
              </Flex>
            </Box>
            <Box flexGrow={1} />
            <Box>
              <Text fontStyle="italic" color="gray.600" fontWeight={300}>
                Expected prior knowledge:
              </Text>
              <Flex direction="row" flexWrap="wrap">
                {learningPath.priorKnowledgeLevel.map(priorkl => (
                  <Tag key={priorkl} size="sm" m={1}>
                    {priorkl}
                  </Tag>
                ))}
              </Flex>
            </Box>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};
