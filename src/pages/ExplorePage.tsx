import { Box, Center } from '@chakra-ui/layout';
import { SimulationNodeDatum } from 'd3-force';
import gql from 'graphql-tag';
import { PageLayout } from '../components/layout/PageLayout';
import { ExploreMapCirclePacking } from './explore/ExploreMapCirclePacking';
import { ExploreMapForceLayout } from './explore/ExploreMapForceLayout';
import { useGetTopLevelDomainsQuery } from './ExplorePage.generated';

export const getTopLevelDomains = gql`
  query getTopLevelDomains {
    getTopLevelDomains {
      items {
        _id
        name
        size
      }
    }
  }
`;

const pxWidth = 500;
const pxHeight = 500;

type NodeElement = SimulationNodeDatum & {
  _id: string;
  name: string;
  size?: number;
};

export const ExplorePage: React.FC<{}> = () => {
  const { data, loading } = useGetTopLevelDomainsQuery();

  return (
    <PageLayout marginSize="md">
      <Center>
        <Box boxShadow="lg">
          {data && <ExploreMapForceLayout data={data.getTopLevelDomains} pxWidth={pxWidth} pxHeight={pxHeight} />}
          {/* {data && <ExploreMapCirclePacking data={data.getTopLevelDomains} pxWidth={pxWidth} pxHeight={pxHeight} />} */}
        </Box>
      </Center>
    </PageLayout>
  );
};
