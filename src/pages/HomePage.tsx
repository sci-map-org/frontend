import { Box, Center, Flex, FlexProps, Heading, Image, ImageProps, Stack, Text } from '@chakra-ui/react';
import gql from 'graphql-tag';
import React, { ReactNode } from 'react';
import { LearningGoalCardData } from '../components/learning_goals/cards/LearningGoalCard';
import { LearningPathPreviewCardData } from '../components/learning_paths/LearningPathPreviewCard';
import { Accordeon } from '../components/lib/Accordeon';
import { InternalButtonLink } from '../components/navigation/InternalLink';
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
    <Flex direction="column" justifyContent="center" alignItems="stretch" overflow="hidden">
      {!isReturningUser ? (
        <Center>
          <HomeHeader />
        </Center>
      ) : (
        <UserDashboard data={data} loading={loading} />
      )}

      <RecommendationsBlock data={data} loading={loading} />
      {isReturningUser && <SearchBox leftTopoStainPosition="bottom" />}
      <Box h={8} />
      <HomeContentItem
        renderTopoStain={(props) => (
          <Image
            {...props}
            src="./static/topostain_brown.svg"
            w="400px"
            opacity={0.5}
            right={{ base: '-20%', md: '2%' }}
            top={{ base: '60%', md: '30%' }}
          />
        )}
        imagePosition="left"
        layoutProps={outerLayoutProps}
        renderImage={<Image src="./static/graph_illustration_bold.svg" px="20px" />}
        title="A collaborative learning map"
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
        }
      />
      <HomeContentItem
        renderTopoStain={(props) => (
          <Image
            {...props}
            src="./static/topostain_teal.svg"
            w={{ base: '360px', md: '400px' }}
            opacity={0.5}
            left={{ base: '-25%', md: '-1%' }}
            top={{ base: '60%', md: '25%' }}
          />
        )}
        imagePosition="right"
        layoutProps={outerLayoutProps}
        renderImage={<Image src="./static/boatymacboatface_reframed.svg" w={{ base: '300px', md: '360px' }} />}
        title="Navigate seamlessly"
        renderTextContent={
          <Accordeon
            textAlign="right"
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
        }
      />
      <HomeContentItem
        imagePosition="left"
        renderTopoStain={(props) => (
          <Image
            {...props}
            src="./static/topostain_green.svg"
            w={{ base: '300px', md: '360px' }}
            opacity={0.5}
            right={{ base: '-10%', md: '6%' }}
            top={{ base: '45%', md: '-15%' }}
          />
        )}
        layoutProps={outerLayoutProps}
        renderImage={<Image src="./static/together_goal_reframed.svg" w={{ base: '250px', md: '320px' }} />}
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
            ]}
          />
        }
      />
      <Flex justifyContent="center">
        <Stack spacing={8} direction="row">
          <InternalButtonLink size="lg" routePath="/about" asHref="/about" colorScheme="blue" variant="outline">
            Learn more
          </InternalButtonLink>
          <InternalButtonLink size="lg" routePath="/register" asHref="/register" colorScheme="teal" variant="solid">
            Register
          </InternalButtonLink>
        </Stack>
      </Flex>
      {!isReturningUser && <SearchBox leftTopoStainPosition="top" />}
      <Box h={32} />
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

const HomeHeader: React.FC<{ layoutProps?: FlexProps }> = ({ layoutProps = {} }) => {
  return (
    <Flex direction="column" {...layoutProps} id="homeHeader" w="100%" px="5%">
      <Flex justifyContent="space-between" alignItems="stretch" w="100%">
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
        </Flex>
      </Flex>
    </Flex>
  );
};

const HomeContentItem: React.FC<{
  imagePosition: 'left' | 'right';
  renderImage: ReactNode;
  layoutProps: FlexProps;
  title: string;
  renderTextContent: ReactNode;
  renderTopoStain: (props: Partial<ImageProps>) => ReactNode;
}> = ({ layoutProps, renderTopoStain, imagePosition, renderImage, title, renderTextContent }) => {
  return (
    <Flex
      textAlign={imagePosition === 'left' ? 'left' : 'right'}
      direction={{ base: imagePosition === 'left' ? 'column' : 'column-reverse', md: 'row' }}
      px={['5px', '10px', '10%', '15%']}
      alignItems="center"
      position="relative"
      my={10}
      {...layoutProps}
    >
      {renderTopoStain({ position: 'absolute', zIndex: -1 })}
      {imagePosition === 'left' && (
        <>
          <Flex
            direction="column"
            alignItems="center"
            py="30px"
            w={{ base: '100%', md: '50%' }}
            h={{ base: '50%', md: '100%' }}
          >
            {renderImage}
          </Flex>
        </>
      )}
      <Flex direction="column" justifyContent="center" w={{ base: '100%', md: '50%' }} px={{ base: '5%', md: 0 }}>
        <Heading size="xl" fontWeight={400} mb={5}>
          {title}
        </Heading>
        <Box color="gray.700" flexGrow={1}>
          {renderTextContent}
        </Box>
      </Flex>
      {imagePosition === 'right' && (
        <>
          <Flex
            direction="column"
            alignItems="center"
            py="30px"
            w={{ base: '100%', md: '50%' }}
            h={{ base: '50%', md: '100%' }}
          >
            {renderImage}
          </Flex>
        </>
      )}
    </Flex>
  );
};

const SearchBox: React.FC<{ leftTopoStainPosition?: 'top' | 'bottom' }> = ({ leftTopoStainPosition }) => {
  return (
    <Center w="100%" position="relative">
      <Image
        position="absolute"
        src="./static/topostain_blue.svg"
        zIndex={-3}
        left={{ base: '-20%', md: '0px' }}
        {...(leftTopoStainPosition === 'bottom' && {
          bottom: { base: '-120px', md: '-30%' },
        })}
        {...(leftTopoStainPosition === 'top' && {
          top: { base: '1%', md: '-80px' },
        })}
        opacity={0.7}
        w={{ base: '320px', md: '340px' }}
      />
      <Center mt={8} mb={12}>
        <Box position="relative" px={5}>
          <Image
            position="absolute"
            src="./static/search_dots_pin.svg"
            right={{ base: '-30px', md: '-160px' }}
            bottom={{ base: '-30px', md: '10px' }}
            w={{ base: '300px', md: '320px' }}
            zIndex={-2}
          />
          <Image
            position="absolute"
            src="./static/search_stain.svg"
            zIndex={-3}
            right={{ base: '-20px', md: '-200px' }}
            bottom={{ base: '-120px', md: '-80px' }}
            opacity={0.8}
            w={{ base: '340px', md: '360px' }}
          />

          <Stack py="100px" alignItems="center" spacing={10}>
            <Heading fontSize="4xl" color="gray.800" textAlign="center">
              What would you like to{' '}
              <Text color="blue.600" as="span">
                learn
              </Text>
              ?
            </Heading>
            <GlobalSearchBox inputBgColor="white" inputSize="lg" width={{ base: '160px', sm: '300px', md: '400px' }} />
          </Stack>
        </Box>
      </Center>
    </Center>
  );
};
