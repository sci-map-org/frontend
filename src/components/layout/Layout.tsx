import { Box, Divider } from '@chakra-ui/core';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { pageview } from '../../services/google_analytics.service';
import { Header } from './Header';

export const Layout: React.FC = ({ children }) => {
  // const router = useRouter();
  // useEffect(() => {
  //   const handleRouteChange = (url: string) => {
  //     console.log('route change'); // missing init
  //     pageview(url);
  //   };
  //   router.events.on('routeChangeComplete', handleRouteChange);
  //   return () => {
  //     router.events.off('routeChangeComplete', handleRouteChange);
  //   };
  // }, [router.events]);

  return (
    <Box color="grayFont.800">
      <Header />
      {children}
    </Box>
  );
};
