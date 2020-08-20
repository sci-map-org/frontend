import { useRouter } from 'next/router';
import React from 'react';
import { AboutPage } from '../../src/pages/AboutPage';

const About: React.FC = () => {
  const router = useRouter();

  const { key } = router.query;

  if (typeof key !== 'string') return null;

  return <AboutPage pageKey={key} />;
};

export default About;
