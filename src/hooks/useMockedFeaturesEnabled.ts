import { useState } from 'react';

export const useMockedFeaturesEnabled = () => {
  const [mockedFeaturesEnabled, setMockedFeaturesEnabled] = useState(false); //useLocalStorage('MOCKED_FEATURES_ENABLED', false);
  return { mockedFeaturesEnabled, setMockedFeaturesEnabled };
};
