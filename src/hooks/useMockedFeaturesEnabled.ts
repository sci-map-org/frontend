import { useLocalStorage } from 'react-use';

export const useMockedFeaturesEnabled = () => {
  const [mockedFeaturesEnabled, setMockedFeaturesEnabled] = useLocalStorage('MOCKED_FEATURES_ENABLED', false);
  return { mockedFeaturesEnabled, setMockedFeaturesEnabled };
};
