import { Box, Center, Flex, FlexProps, Heading, Image, ImageProps, Link, Stack, Text } from '@chakra-ui/react';
import gql from 'graphql-tag';
import React, { ReactNode } from 'react';
import { LearningGoalCardData } from '../components/learning_goals/cards/LearningGoalCard';
import { LearningPathPreviewCardData } from '../components/learning_paths/LearningPathPreviewCard';
import { Accordeon } from '../components/lib/Accordeon';
import { InternalButtonLink, InternalLink } from '../components/navigation/InternalLink';
import { GlobalSearchBox } from '../components/navigation/search/GlobalSearchBox';
import { ResourceMiniCardData } from '../components/resources/ResourceMiniCard';
import { useCurrentUser } from '../graphql/users/users.hooks';
import { HomeDomainsRecommendations } from './home/HomeDomainsRecommendations';
import { HomeLearningGoalsRecommendations } from './home/HomeLearningGoalsRecommendations';
import { HomeLearningPathsRecommendations } from './home/HomeLearningPathsRecommendations';
import { HomeUserResourcesHistory } from './home/HomeUserResourcesHistory';
import { HomeUserStartedGoals } from './home/HomeUserStartedGoals';
import { HomeUserStartedPaths, StartedLearningPathCardData } from './home/HomeUserStartedPaths';
import { GetHomePageDataQuery, useGetHomePageDataQuery } from './HomePage.generated';

export const getHomePageData = gql`
  query getHomePageData {
    getHomePageData {
      currentUser {
        _id
        key
        email
        displayName
        startedLearningPaths(options: {}) {
          startedAt
          learningPath {
            ...StartedLearningPathCardData
          }
        }
        startedLearningGoals(options: {}) {
          startedAt
          learningGoal {
            ...LearningGoalCardData
          }
        }
        consumedResources(options: { sorting: lastOpened, pagination: {}, filter: {} }) {
          count
          items {
            consumedAt
            openedAt
            resource {
              ...ResourceMiniCardData
            }
          }
        }
      }
      recommendedLearningGoals {
        ...LearningGoalCardData
      }
      recommendedLearningPaths {
        ...LearningPathPreviewCardData
      }
    }
  }
  ${LearningPathPreviewCardData}
  ${LearningGoalCardData}
  ${StartedLearningPathCardData}
  ${ResourceMiniCardData}
`;

export const HomePage: React.FC = () => {
  const { data, loading: l } = useGetHomePageDataQuery({ fetchPolicy: 'cache-and-network' });

  const loading = !data && l;
  const { currentUser } = useCurrentUser();
  const isReturningUser = !!currentUser;
  const outerLayoutProps = {
    px: ['5px', '10px', '5%', '15%'],
  };
  return (
    <Flex direction="column" justifyContent="center" alignItems="stretch">
      {!isReturningUser ? (
        <Center>
          <HomeHeader />
        </Center>
      ) : (
        <UserDashboard data={data} loading={loading} />
      )}

      <RecommendationsBlock data={data} loading={loading} />
      <Center>
        <Box position="relative" px={5}>
          <Image
            position="absolute"
            src="./static/search_dots_pin.svg"
            right="-160px"
            bottom="10px"
            w="320px"
            zIndex={20}
          />
          <Image
            position="absolute"
            src="./static/search_stain.svg"
            zIndex={-3}
            right="-200px"
            bottom="-80px"
            opacity={0.8}
            w="360px"
          />
          <Stack py="100px" alignItems="center" spacing={10}>
            <Heading fontSize="4xl" color="gray.800" textAlign="center">
              What would you like to{' '}
              <Text color="blue.600" as="span">
                learn
              </Text>
              ?
            </Heading>
            <GlobalSearchBox inputSize="lg" width={{ base: '300px', sm: '400px' }} />
          </Stack>
        </Box>
      </Center>
      <Flex
        px="5%"
        mt={10}
        mb="40px"
        alignItems={{ base: 'center', md: 'start' }}
        direction={{ base: 'column', md: 'row' }}
      >
        <Flex direction="column" flexShrink={1} pr="10px">
          <Text mb={6}>
            <Text as="span" fontWeight={800}>
              Sci-map.org
            </Text>{' '}
            is a community-based, nonprofit project aiming to reshape online learning by providing a free and
            personalized learning experience for every topic. It allows you to explore knowledge intuitively, whether
            you have a specific goal in mind or you simply are following your curiosity.
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
      </Flex>
      <HomeContentItem
        renderTopoStain={(props) => (
          <Image {...props} src="./static/topostain_brown.svg" w="400px" opacity={0.7} right="2%" />
        )}
        imagePosition="left"
        layoutProps={outerLayoutProps}
        darkBackground
        renderImage={<Image src="./static/map.svg" w="400px" ml="-90px" mr="-40px" />}
        title="A collaborative learning map"
        // "An open, graph-based learning map"
        renderTextContent={
          <Accordeon
            items={[
              {
                title: 'Find the best learning content out there',
                content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.`,
              },
              {
                title: "Get a bird's eye view of all knowledge",
                content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.`,
              },
              {
                title: 'Built by you and me',
                content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.`,
              },
              {
                title: 'Free and open source',
                content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.`,
              },
            ]}
          />
          // <Text>
          //   Find out what you don't know, what you need to learn next, take a deep dive, or explore seamlessly with an{' '}
          //   <Text fontWeight={600} as="span">
          //     open map
          //   </Text>{' '}
          //   of the knowledge space.
          //   <br />
          //   <br />
          //   We leverage{' '}
          //   <Text fontWeight={600} as="span">
          //     graph database
          //   </Text>{' '}
          //   technology to build an abstract and precise modeling of knowledge, locate learning material in it, and serve
          //   it at the right time to the learner.
          // </Text>
        }
      />
      <HomeContentItem
        renderTopoStain={(props) => (
          <Image {...props} src="./static/topostain_teal.svg" w="400px" opacity={0.7} left="2%" />
        )}
        imagePosition="right"
        layoutProps={outerLayoutProps}
        renderImage={<Image src="./static/boatymacboatface.svg" w="400px" />}
        title="Navigate seamlessly"
        renderTextContent={
          <Accordeon
            items={[
              {
                title: 'Get a tailored experience',
                content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.`,
              },
              {
                title: 'Follow your curiosity',
                content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.`,
              },
              {
                title: 'Switch pedagogical approaches in one click',
                content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.`,
              },
              {
                title: 'Learn optimally, whatever your goal is',
                content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.`,
              },
            ]}
          />
          // <Text>
          //   From what the learner already knows, his learning profile, his goals and interests, we will provide an{' '}
          //   <Text fontWeight={600} as="span">
          //     optimal
          //   </Text>{' '}
          //   and{' '}
          //   <Text fontWeight={600} as="span">
          //     fully personalized
          //   </Text>{' '}
          //   experience.
          //   <br />
          //   <br />
          //   We plan to provide smart recommendations while enabling the learner to keep control over their path, for
          //   instance by finding{' '}
          //   <Text fontWeight={600} as="span">
          //     alternative pedagogical
          //   </Text>{' '}
          //   approaches in one click.
          //   <br />
          //   <br />
          //   By providing{' '}
          //   <Text fontWeight={600} as="span">
          //     personal learning management
          //   </Text>{' '}
          //   features, and building an increasingly precise leaning profile for each user,{' '}
          //   <Text as="span" fontWeight={600} color="main">
          //     Sci-map.org
          //   </Text>{' '}
          //   aims to be the perfect tool for{' '}
          //   <Text fontWeight={600} as="span">
          //     continuous learning
          //   </Text>{' '}
          //   across a wide range of domains.
          // </Text>
        }
      />
      <HomeContentItem
        imagePosition="left"
        renderTopoStain={(props) => (
          <Image {...props} src="./static/topostain_green.svg" w="260px" opacity={0.7} right="6%" />
        )}
        layoutProps={outerLayoutProps}
        darkBackground
        renderImage={<Image src="./static/together_goal.svg" w="400px" />}
        title="Collaborative and community based"
        renderTextContent={
          <Accordeon
            items={[
              {
                title: 'Connect with other learners',
                content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.`,
              },

              {
                title: 'Keep track of what your learn',
                content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.`,
              },
              {
                title: 'Share your learning journey',
                content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.`,
              },
              //     {
              //       title: 'Learn optimally, whatever your goal is',
              //       content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
              // magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              // consequat.`,
              //     },
            ]}
          />
          // <Text>
          //   This project is{' '}
          //   <Text fontWeight={600} as="span">
          //     community-based
          //   </Text>
          //   ; we intend to build a modeling of the knowledge space, assess the content quality, and improve upon it{' '}
          //   <Text fontWeight={600} as="span">
          //     collaboratively
          //   </Text>
          //   . <br />
          //   <br />
          //   We aim to enable new communities to form around different domains, foster{' '}
          //   <Text fontWeight={600} as="span">
          //     learning with peers
          //   </Text>
          //   , receiving support and feedback, and connecting people at the right time. <br />
          //   <br />
          //   By improving content collaboratively based on community feedback and data, we aim to reach a better quality
          //   than what an individual alone could achieve.
          // </Text>
        }
      />

      <Flex justifyContent="center" my={10}>
        <InternalButtonLink size="lg" routePath="/about" asHref="/about" colorScheme="blue" variant="outline">
          Learn more
        </InternalButtonLink>
      </Flex>
    </Flex>
  );
};

const UserDashboard: React.FC<{ data?: GetHomePageDataQuery; loading?: boolean }> = ({ data, loading }) => {
  return (
    <Flex direction="column" px="5%" mt={8}>
      <Box>
        <HomeUserStartedGoals
          startedGoals={(data?.getHomePageData.currentUser?.startedLearningGoals || []).map((i) => i.learningGoal)}
          isLoading={loading}
        />
      </Box>
      <Flex direction={{ base: 'column', md: 'row' }} justifyContent="space-between" mt={8}>
        <Box w={{ base: '100%', md: '45%' }}>
          <HomeUserStartedPaths
            startedPaths={(data?.getHomePageData.currentUser?.startedLearningPaths || []).map((i) => i.learningPath)}
            isLoading={loading}
          />
        </Box>

        <Flex w={20} h={8}></Flex>

        <Flex w={{ base: '100%', md: '45%' }}>
          <HomeUserResourcesHistory
            consumedResourcesItems={data?.getHomePageData.currentUser?.consumedResources?.items || []}
            isLoading={loading}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

const RecommendationsBlock: React.FC<{ data?: GetHomePageDataQuery; loading?: boolean }> = ({ data, loading }) => {
  return (
    <>
      <Center px="5%" mb={10} mt={12}>
        <HomeDomainsRecommendations />
      </Center>
      <Center px="5%" mb={3}>
        <Flex direction={{ base: 'column', lg: 'row' }} flexGrow={1} justifyContent="space-between">
          <Flex maxWidth={{ base: '100%', lg: '60%' }} minWidth={{ lg: '40%' }}>
            <HomeLearningGoalsRecommendations learningGoals={data?.getHomePageData.recommendedLearningGoals || []} />
          </Flex>
          <Flex w={20} h={8}></Flex>
          <Flex minWidth={{ lg: '40%' }} maxWidth={{ lg: '60%' }} flexGrow={2}>
            <HomeLearningPathsRecommendations
              learningPaths={data?.getHomePageData.recommendedLearningPaths || []}
              isLoading={loading}
            />
          </Flex>
        </Flex>
      </Center>
    </>
  );
};

const Title: React.FC<{}> = () => {
  return (
    <Flex direction={{ base: 'column', lg: 'row' }} alignItems={{ base: 'center', lg: 'baseline' }}>
      <Heading fontSize="5xl" color="main" pr={3}>
        Sci-Map.org
      </Heading>
      <Heading fontSize="4xl" color="blackAlpha.500">
        (Beta)
      </Heading>
    </Flex>
  );
};

const HomeHeader: React.FC<{ layoutProps?: FlexProps }> = ({ layoutProps = {} }) => {
  return (
    <Flex
      direction="column"
      {...layoutProps}
      // id="homeHeader1"
      id="homeHeader2"
      w="100%"
      px="5%"
    >
      <Flex justifyContent="space-between" alignItems="stretch" w="100%">
        {/* <Flex w="50%" direction="column-reverse" alignItems="center" pt={20}>
          <Image src="./static/walker no bg cropped.png" w="322px" opacity={0.9} />
        </Flex> */}
        <Center w="50%">
          <Image src="./static/walker no bg.png" w="400px" />
        </Center>
        <Flex w="50%" pl={10} pr={3} pt={16} direction="column">
          <Heading size="2xl" maxW="250px" color="blackAlpha.900" lineHeight={1.1}>
            Learn{' '}
            <Text as="span" bgColor="teal.600" ml="-6px" px="6px" pb="3px" color="white">
              anything
            </Text>{' '}
            in a smart way
          </Heading>
          {/* <Flex mt={10} mb={10} opacity={0.8} w="100%" direction="column" alignItems="center">
            <Text
              bgColor="#974b31"
              borderRadius={6}
              px={4}
              py={2}
              w="80%"
              fontSize="xl"
              color="white"
              // opacity={0.5}
              fontWeight={500}
              // py="2px"
            >
              Find the best online resources, learn from curated learning paths and community created roadmaps, etc.
            </Text>
          </Flex> */}
        </Flex>
        {/* <Flex>
          
        </Flex> */}
        {/* <Flex justifyContent="center" mb="30px" mt="18px">
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
        </Flex> */}
      </Flex>
    </Flex>
  );
};

const HomeContentItem: React.FC<{
  imagePosition: 'left' | 'right';
  darkBackground?: boolean;
  renderImage: ReactNode;
  layoutProps: FlexProps;
  title: string;
  renderTextContent: ReactNode;
  renderTopoStain: (props: Partial<ImageProps>) => ReactNode;
}> = ({ layoutProps, renderTopoStain, imagePosition, renderImage, title, renderTextContent, darkBackground }) => {
  return (
    <Flex
      direction={{ base: imagePosition === 'left' ? 'column' : 'column-reverse', md: 'row' }}
      my="50px"
      alignItems="center"
      // backgroundColor={darkBackground ? 'gray.200' : 'background.0'}
      // backgroundImage="url("
      position="relative"
      {...layoutProps}
    >
      {renderTopoStain({ position: 'absolute', zIndex: -1 })}
      {imagePosition === 'left' && (
        <>
          {/* <Box> */}
          {/* flexBasis="200px" flexGrow={0} flexShrink={0} */}
          {renderImage}
          {/* </Box> */}
          <Box w={16} h={4} />
        </>
      )}
      <Flex direction="column" justifyContent="center">
        <Heading size="xl" fontWeight={400} mb={5}>
          {title}
        </Heading>
        <Box color="gray.700" flexGrow={1}>
          {renderTextContent}
        </Box>
      </Flex>
      {imagePosition === 'right' && (
        <>
          <Box w={16} h={4} />
          {/* <Box> */}
          {/* width="200px" height="200px" flexGrow={0} flexShrink={0} */}
          {renderImage}
          {/* </Box> */}
        </>
      )}
    </Flex>
  );
};

const HomeFooter: React.FC<{ layoutProps: FlexProps }> = ({ layoutProps }) => (
  <Flex direction="column" mt={10} mb="100px" {...layoutProps}>
    <Heading textAlign="center" size="2xl" fontWeight={200} mb={4}>
      State of the project
    </Heading>
    <Text>
      The project is currently in a beta release in order to gather feedback and enhance the product iteratively. It is
      open-source (checkout our{' '}
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
