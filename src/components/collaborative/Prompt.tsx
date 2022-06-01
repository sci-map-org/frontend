import { CloseIcon } from '@chakra-ui/icons';
import { Box, Flex, FlexProps, IconButton, Link, Text } from '@chakra-ui/react';
import { random } from 'lodash';
import { PageInfo } from '../../pages/PageInfo';
import { NewLearningPathPageInfo, NewResourcePageInfo } from '../../pages/RoutesPageInfos';
import { PageLink } from '../navigation/InternalLink';

export type PromptConfig = {
  mainBackgroundColor: FlexProps['bgColor'];
  borderColor: FlexProps['borderColor'];
  promptLabel: string;
  linkLabel: string;
  linkedPage: PageInfo | string; // if string: handled as external url
};

const promptStyles = {
  teal: {
    mainBackgroundColor: 'teal.600',
    borderColor: 'teal.800',
  },
  orange: {
    mainBackgroundColor: 'orange.600',
    borderColor: 'orange.700',
  },
  green: {
    mainBackgroundColor: 'green.600',
    borderColor: 'green.700',
  },
};

export const promptConfigs: { [key in string]: PromptConfig } = {
  book: {
    ...promptStyles.teal,
    promptLabel: `What's the best book you learned from recently ?`,
    linkLabel: 'Share Resource',
    linkedPage: NewResourcePageInfo,
  },
  podcast: {
    ...promptStyles.teal,
    promptLabel: `What's the best podcast you learned from recently ?`,
    linkLabel: 'Share Resource',
    linkedPage: NewResourcePageInfo,
  },
  course: {
    ...promptStyles.teal,
    promptLabel: `What's the best course you learned from recently ?`,
    linkLabel: 'Share Resource',
    linkedPage: NewResourcePageInfo,
  },
  // TODO
  feedback: {
    ...promptStyles.orange,
    promptLabel: `Do you have any feedback for us ? Help us build a great learning map`,
    linkLabel: 'Give Feedback',
    linkedPage: 'https://forms.gle/uiRKX8qMrCP9SV3W9',
  },
  learning_path: {
    ...promptStyles.green,
    promptLabel: 'Have you successfully learned a topic recently ? Help others by sharing your learning journey',
    linkLabel: 'Share your path',
    linkedPage: NewLearningPathPageInfo,
  },
};

export const getRandomPromptConfig = (): PromptConfig => {
  return Object.values(promptConfigs)[random(0, Object.keys(promptConfigs).length - 1)];
};

export const Prompt: React.FC<{ onDismiss: () => void; config: PromptConfig } & Omit<FlexProps, 'borderColor'>> = ({
  onDismiss,
  config,
  ...props
}) => {
  return (
    <Flex
      alignItems="center"
      px={3}
      py={2}
      borderRadius={8}
      borderWidth={2}
      bgColor={config.mainBackgroundColor}
      borderColor={config.borderColor}
      {...props}
    >
      <Flex
        direction={{ base: 'column', md: 'row' }}
        justifyContent={{ md: 'space-between' }}
        alignItems="center"
        flexGrow={1}
        mr={2}
      >
        <Text color="white" fontSize="15px" fontWeight={600} textAlign={{ base: 'center', md: 'left' }}>
          {config.promptLabel}
        </Text>
        {typeof config.linkedPage === 'string' ? (
          <Link
            color={config.mainBackgroundColor}
            href={config.linkedPage}
            bgColor="white"
            borderWidth={2}
            borderColor={config.borderColor}
            px={2}
            ml={5}
            my={2}
            borderRadius={8}
            fontWeight={600}
            _hover={{
              opacity: 0.9,
            }}
            whiteSpace="nowrap"
            flexShrink={0}
            isExternal
          >
            {config.linkLabel}
          </Link>
        ) : (
          <PageLink
            pageInfo={config.linkedPage}
            color={config.mainBackgroundColor}
            bgColor="white"
            borderWidth={2}
            borderColor={config.borderColor}
            px={2}
            ml={5}
            my={2}
            borderRadius={8}
            fontWeight={600}
            _hover={{
              opacity: 0.9,
            }}
            whiteSpace="nowrap"
            flexShrink={0}
          >
            {config.linkLabel}
          </PageLink>
        )}
      </Flex>
      <IconButton
        size="sm"
        variant="ghost"
        colorScheme="white"
        color="white"
        borderWidth={1}
        borderColor="transparent"
        _hover={{ borderColor: 'white' }}
        _active={{}}
        aria-label="close prompt"
        icon={<CloseIcon />}
        onClick={() => onDismiss()}
      />
    </Flex>
  );
};
