import {
  Box,
  Center,
  Flex,
  FlexProps,
  Heading,
  Image,
  ImageProps,
  Img,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import gql from 'graphql-tag';
import dynamic from 'next/dynamic';
import React, { ReactNode } from 'react';
import { LearningPathPreviewCardData } from '../components/learning_paths/LearningPathPreviewCard';
import { Accordeon } from '../components/lib/Accordeon';
import { InternalButtonLink } from '../components/navigation/InternalLink';
import { GlobalSearchBox } from '../components/navigation/search/GlobalSearchBox';
import { ResourceMiniCardData } from '../components/resources/ResourceMiniCard';
import { ExploreMapProps } from '../components/topics/ExploreMap';
import { useCurrentUser } from '../graphql/users/users.hooks';
import { HomeLearningPathsRecommendations } from './home/HomeLearningPathsRecommendations';
import { HomeTopicsRecommendations } from './home/HomeTopicsRecommendations';
import { HomeUserResourcesHistory } from './home/HomeUserResourcesHistory';
import { HomeUserStartedPaths, StartedLearningPathCardData } from './home/HomeUserStartedPaths';
import { GetHomePageDataQuery, useGetHomePageDataQuery } from './HomePage.generated';

// import('../components/topics/ExploreMap').then(
//   (res) => {
//     const { ExploreMap } = res;
//     return ExploreMap;
//   },
//   { ssr: false }
// );

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

      recommendedLearningPaths {
        ...LearningPathPreviewCardData
      }
    }
  }
  ${LearningPathPreviewCardData}
  ${StartedLearningPathCardData}
  ${ResourceMiniCardData}
`;

export const HomePage: React.FC = () => {
  const { data, loading: l } = useGetHomePageDataQuery({ fetchPolicy: 'cache-and-network' });

  const loading = !data && l;
  const { currentUser } = useCurrentUser();
  const isReturningUser = !!currentUser;
  const outerLayoutProps = {
    mx: ['5px', '10px', '3%', '6%'],
    maxW: { lg: '2000px' },
  };

  const mapProps = useBreakpointValue<{ direction: 'column' | 'row'; mapPxWidth: number; mapPxHeight: number }>({
    base: { direction: 'column', mapPxWidth: 340, mapPxHeight: 400 },
    sm: { direction: 'column', mapPxWidth: 420, mapPxHeight: 400 },
    md: { direction: 'row', mapPxWidth: 400, mapPxHeight: 300 },
    lg: { direction: 'row', mapPxWidth: 590, mapPxHeight: 360 },
  });

  return (
    <Flex direction="column" justifyContent="center" alignItems="stretch" overflowX="hidden">
      {!isReturningUser ? (
        <Center>
          <HomeHeader layoutProps={outerLayoutProps} />
        </Center>
      ) : (
        <UserDashboard data={data} loading={loading} />
      )}

      <Flex {...outerLayoutProps} pt={20} pb={4}>
        <Flex w="100%" direction="column" alignItems="stretch">
          {/* <ExploreMap
            {...(mapProps || { direction: 'column', mapPxWidth: 400, mapPxHeight: 360 })}
            mapContainerProps={{ borderWidth: 1, borderColor: 'gray.500' }}
          /> */}
        </Flex>
      </Flex>

      <Center mb={10} mt={12}>
        <Flex {...outerLayoutProps} overflow="auto">
          <HomeTopicsRecommendations />
        </Flex>
      </Center>
      {isReturningUser && <RecommendationsBlock data={data} loading={loading} layoutProps={outerLayoutProps} />}
      {isReturningUser && <SearchBox leftTopoStainPosition="bottom" layoutProps={outerLayoutProps} />}
      <Box h={8} />
      <HomeContentItem
        renderTopoStain={(props) => (
          <Image
            {...props}
            src="./images/topostain_brown.svg"
            w="400px"
            opacity={0.5}
            right={{ base: '-20%', md: '2%' }}
            top={{ base: '60%', md: '30%' }}
          />
        )}
        imagePosition="left"
        layoutProps={outerLayoutProps}
        renderImage={<Image src="./images/graph_illustration_bold.svg" mt={{ md: '-40px' }} pr={{ md: '20px' }} />}
        title={
          <>
            Explore a{' '}
            <Text fontWeight={500} as="span" color="yellow.700">
              {/* y.700 /500 ou 600 */}
              {/* orange.600 / 600 */}
              {/* color="white" as="span" bgColor="teal.600" */}
              learning map
            </Text>{' '}
            built collectively
          </>
        }
        renderTextContent={
          <Accordeon
            h="270px"
            color="yellow.700"
            borderColor="yellow.600"
            items={[
              {
                title: 'Find the best learning content out there',
                content: `Don’t waste your time going through hundreds of search results. Mapedia provides a curated selection of the web's finest learning resources reviewed by the community.`,
              },
              {
                title: 'Visualize what you know... and what you don’t',
                content: `Find out what to learn next, how concepts are related, and discover multiple ways to reach your goals. Mapedia is powered by graph database technology, which allows for a precise representation of the concepts that constitute any area of knowledge.`,
              },
              {
                title: 'Powered by the people',
                content: `Take advantage of the web’s collective intelligence with Mapedia's collaboratively built map of knowledge. Enjoy a range of crowdsourced content, continuously improved through feedback and suggestions.`,
              },
              {
                title: 'Free, non profit and open source',
                content: `Mapedia is free to use and its recommendations favor free content by default. 
                Our mission is to accelerate the spreading of knowledge by structuring it in an innovative way. In order to remain unbiased and transparent, the project is open source and not for profit.`,
              },
            ]}
          />
        }
      />
      <HomeContentItem
        renderTopoStain={(props) => (
          <Image
            {...props}
            src="./images/topostain_teal.svg"
            w={{ base: '360px', md: '400px' }}
            opacity={0.5}
            left={{ base: '-25%', md: '-1%' }}
            top={{ base: '60%', md: '25%' }}
          />
        )}
        imagePosition="right"
        layoutProps={outerLayoutProps}
        renderImage={<Image src="./images/boatymacboatface.svg" w={{ base: '300px', md: '360px' }} />}
        title={
          <>
            Navigate{' '}
            <Text fontWeight={500} as="span" color="blue.500">
              seamlessly
            </Text>
          </>
        }
        renderTextContent={
          <Accordeon
            textAlign="right"
            color="blue.500"
            borderColor="blue.400"
            h="300px"
            items={[
              {
                title: 'Follow your curiosity...',
                content: `Explore new topics, dive deeper into your favourite ones, wander around and broaden your horizon. Discover exciting ideas intuitively and jump from one aha-moment to the next.`,
              },
              {
                title: '...or go straight to what you need.',
                content: `Reach your goals in the most efficient way by cutting down to what matters.  Instead of one-size-fits-all courses, learn precisely what you need to, no more, no less and be in control of your time.`,
              },
              {
                title: 'Enjoy a tailored experience',
                content: `Get smart recommendations and learning paths built specifically for you based on what you already know, your goals and interests and how you learn best.`,
              },
              {
                title: 'Be in control',
                content: `Feeling bored in the middle of a course or stuck on a concept? Just switch to another path and find an alternative explanation in one click.`,
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
            src="./images/topostain_green.svg"
            w={{ base: '300px', md: '360px' }}
            opacity={0.5}
            right={{ base: '-10%', md: '6%' }}
            top={{ base: '45%', md: '-15%' }}
          />
        )}
        layoutProps={outerLayoutProps}
        renderImage={<Image src="./images/together_goal.svg" w={{ base: '250px', md: '320px' }} />}
        title={
          <>
            Grow{' '}
            <Text fontWeight={500} as="span" color="teal.500">
              together
            </Text>
          </>
        }
        renderTextContent={
          <Accordeon
            h="270px"
            color="teal.500"
            borderColor="teal.400"
            items={[
              {
                title: 'All your learning in one place',
                content: `Track what you learn, pause and resume your paths, navigate your history or save learning material for later.`,
              },

              {
                title: 'Share your journey',
                content: `Display your progress and achievements on your public profile page, or help future learners by sharing the learning paths you’ve taken.`,
              },
              {
                title: 'Connect with other learners',
                content: `Learning online doesn’t have to be lonely, even if you’re a self-directed learner. With Mapedia you can easily meet other like-minded learners on the same trajectory as yours and support each other to reach your goals. `,
              },
              {
                title: 'Follow in other users’ footsteps',
                content: `Receive advice at any point of your journey from people who have been there before. See what worked for them, what they suggest to get unstuck and avoid the various pitfalls.`,
              },
            ]}
          />
        }
      />
      {!isReturningUser && <RecommendationsBlock data={data} loading={loading} layoutProps={outerLayoutProps} />}
      <Flex justifyContent="center" mt={16}>
        <Stack spacing={8} direction="row">
          <InternalButtonLink size="lg" routePath="/about" asHref="/about" colorScheme="blue" variant="outline">
            Learn more
          </InternalButtonLink>
          {!isReturningUser && (
            <InternalButtonLink size="lg" routePath="/register" asHref="/register" colorScheme="teal" variant="solid">
              Register
            </InternalButtonLink>
          )}
        </Stack>
      </Flex>
      {!isReturningUser && <SearchBox leftTopoStainPosition="top" layoutProps={outerLayoutProps} />}
      <Box h={32} />
    </Flex>
  );
};

const UserDashboard: React.FC<{ data?: GetHomePageDataQuery; loading?: boolean }> = ({ data, loading }) => {
  return (
    <Flex direction={{ base: 'column', md: 'row' }} justifyContent="space-between" mt={8} px="5%">
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
  );
};

const RecommendationsBlock: React.FC<{ data?: GetHomePageDataQuery; loading?: boolean; layoutProps?: FlexProps }> = ({
  data,
  loading,
  layoutProps = {},
}) => {
  return (
    <>
      <Center mb={3} {...layoutProps}>
        <HomeLearningPathsRecommendations
          learningPaths={data?.getHomePageData.recommendedLearningPaths || []}
          isLoading={loading}
        />
      </Center>
    </>
  );
};

const HomeHeader: React.FC<{ layoutProps?: FlexProps }> = ({ layoutProps = {} }) => {
  const headingProps = useBreakpointValue({ base: { fontSize: '30px' }, sm: {} });
  return (
    <Flex direction="column" id="homeHeader" w="100%" alignItems="center">
      <Flex justifyContent="space-between" alignItems="stretch" w="100%" {...layoutProps}>
        <Center w="50%">
          <Img src="./images/walker.svg" w="400px" />
        </Center>
        <Flex
          w="50%"
          pl={{ base: 2, sm: 10, md: 10 }}
          pr={{ base: 0, sm: 3 }}
          pt={{ base: 5, sm: 8, md: 16 }}
          pb={2}
          direction="column"
        >
          <Heading
            size="2xl"
            maxW={{ base: '200px', sm: '230px', md: '250px' }}
            color="blackAlpha.800"
            lineHeight={1.1}
            {...headingProps}
          >
            Learn{' '}
            <Text as="span" bgColor="teal.600" ml="-6px" px="6px" pb="3px" color="white">
              anything
            </Text>{' '}
            <br />
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
  title: string | ReactNode;
  renderTextContent: ReactNode;
  renderTopoStain: (props: Partial<ImageProps>) => ReactNode;
}> = ({ layoutProps, renderTopoStain, imagePosition, renderImage, title, renderTextContent }) => {
  return (
    <Center>
      <Flex
        w="100%"
        textAlign={imagePosition === 'left' ? 'left' : 'right'}
        direction={{ base: imagePosition === 'left' ? 'column' : 'column-reverse', md: 'row' }}
        // px={['5px', '10px', '10%', '15%']}
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
    </Center>
  );
};

const SearchBox: React.FC<{ layoutProps?: FlexProps; leftTopoStainPosition?: 'top' | 'bottom' }> = ({
  leftTopoStainPosition,
  layoutProps = {},
}) => {
  return (
    <Center>
      <Center w="100%" position="relative" {...layoutProps}>
        <Image
          position="absolute"
          src="./images/topostain_blue.svg"
          zIndex={-3}
          left={{ base: '-33%', sm: '-20%', md: '0px' }}
          {...(leftTopoStainPosition === 'bottom' && {
            bottom: { base: '-120px', md: '-30%' },
          })}
          {...(leftTopoStainPosition === 'top' && {
            top: { base: '1%', sm: '1%', md: '-80px' },
          })}
          opacity={0.7}
          w={{ base: '300px', sm: '320px', md: '340px' }}
        />
        <Center mt={8} mb={12}>
          <Box position="relative" px={5}>
            <Image
              position="absolute"
              src="./images/search_dots_pin.svg"
              right={{ base: '-30px', md: '-160px' }}
              bottom={{ base: '-30px', md: '10px' }}
              w={{ base: '300px', md: '320px' }}
              zIndex={-2}
            />
            <Image
              position="absolute"
              src="./images/search_stain.svg"
              zIndex={-3}
              right={{ base: '-20px', md: '-200px' }}
              bottom={{ base: '-120px', md: '-80px' }}
              opacity={0.8}
              w={{ base: '340px', md: '360px' }}
            />

            <Stack pt="100px" pb="120px" alignItems="center" spacing={10}>
              <Heading fontSize="4xl" color="gray.800" textAlign="center">
                What would you like to{' '}
                <Text color="blue.600" as="span">
                  learn
                </Text>
                ?
              </Heading>
              <GlobalSearchBox
                inputBgColor="white"
                inputSize="lg"
                width={{ base: '160px', sm: '300px', md: '400px' }}
              />
            </Stack>
          </Box>
        </Center>
      </Center>
    </Center>
  );
};
