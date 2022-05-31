import { FlexProps } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { getRandomPromptConfig, Prompt, PromptConfig } from './Prompt';

const PROMPT_SHOWED_FREQUENCY = 1 / 10;

export const RandomPrompt: React.FC<FlexProps> = ({ ...props }) => {
  const [promptConfig, setPromptConfig] = useState<PromptConfig>();

  useEffect(() => {
    if (Math.random() < PROMPT_SHOWED_FREQUENCY) setPromptConfig(getRandomPromptConfig());
  }, []);

  return promptConfig ? <Prompt onDismiss={() => setPromptConfig(undefined)} config={promptConfig} {...props} /> : null;
};
