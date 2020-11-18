import {
  Center,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  IconButton,
  Skeleton,
  Tooltip,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import gql from 'graphql-tag';
import { useMemo } from 'react';
import { ImPlay2 } from 'react-icons/im';
import { useStartLearningPathMutation } from '../../graphql/learning_paths/learning_paths.operations.generated';
import { useCurrentUser } from '../../graphql/users/users.hooks';
import { useUnauthentificatedModal } from '../auth/UnauthentificatedModal';
import { LearningPathCompletionDataFragment } from './LearningPathCompletion.generated';

export const LearningPathCompletionData = gql`
  fragment LearningPathCompletionData on LearningPath {
    _id
    durationMs
    started {
      startedAt
    }
    resourceItems {
      resource {
        _id
        consumed {
          openedAt
          consumedAt
        }
        durationMs
      }
    }
  }
`;

interface LearningPathCompletionProps {
  learningPath: LearningPathCompletionDataFragment;
  isLoading?: boolean;
}

// TODO find a good name. Badge / widget ? urgh
export const LearningPathCompletion: React.FC<LearningPathCompletionProps> = ({ learningPath, isLoading }) => {
  const resourceItems = learningPath.resourceItems || [];

  return (
    <Skeleton isLoaded={!isLoading}>
      <Flex direction="column" alignItems="stretch" w="100px">
        <Center>
          <LearningPathCircularCompletion size="lg" learningPath={learningPath} />
        </Center>
        <Wrap spacing="9px" mt={3} justify="center">
          {resourceItems.map((resourceItem) => (
            <WrapItem
              key={resourceItem.resource._id}
              borderRadius={1}
              w="18px"
              h="9px"
              bgColor={resourceItem.resource.consumed?.consumedAt ? 'teal.400' : 'gray.200'}
            />
          ))}
        </Wrap>
      </Flex>
    </Skeleton>
  );
};

const sizes: {
  [key in 'sm' | 'lg']: {
    progressWidth: string | number;
    progressThickness: string;
    buttonHeight: string;
    iconSize: number;
  };
} = {
  sm: { progressWidth: '56px', progressThickness: '7px', buttonHeight: '50px', iconSize: 50 },
  lg: { progressWidth: '90px', progressThickness: '9px', buttonHeight: '83px', iconSize: 83 },
};

export const LearningPathCircularCompletion: React.FC<{
  learningPath: LearningPathCompletionDataFragment;
  size: 'lg' | 'sm';
  onStarted?: () => void;
}> = ({ learningPath, size, onStarted }) => {
  const [startLearningPath] = useStartLearningPathMutation();
  const { currentUser } = useCurrentUser();
  const unauthentificatedModalDisclosure = useUnauthentificatedModal();

  const resourceItems = learningPath.resourceItems || [];

  const completedResources = useMemo(() => {
    return learningPath.resourceItems
      ? learningPath.resourceItems.filter((i) => i.resource.consumed && i.resource.consumed.consumedAt)
      : [];
  }, [resourceItems]);

  const completionRate = useMemo(() => {
    return resourceItems.length ? completedResources.length / resourceItems.length : 1;
  }, [resourceItems, completedResources]);

  return learningPath.started ? (
    <CircularProgress
      value={completionRate * 100}
      color="teal.400"
      trackColor="gray.200"
      size={sizes[size].progressWidth}
      thickness={sizes[size].progressThickness}
      capIsRound
    >
      <CircularProgressLabel color="teal.400" fontWeight={500}>
        {(completionRate * 100).toFixed(0)}%{/* <Text transform="scaleX(.8)"></Text */}
      </CircularProgressLabel>
    </CircularProgress>
  ) : (
    <Tooltip openDelay={1000} label="Start this path">
      <IconButton
        aria-label="start learning path"
        icon={<ImPlay2 title="title" size={sizes[size].iconSize} />}
        color="teal.400"
        _hover={{ color: 'teal.500' }}
        _focus={{}}
        _active={{}}
        variant="ghost"
        h={sizes[size].buttonHeight}
        isRound
        onClick={async () => {
          if (!currentUser) return unauthentificatedModalDisclosure.onOpen();
          await startLearningPath({ variables: { learningPathId: learningPath._id } });
          onStarted && onStarted();
        }}
      />
    </Tooltip>
  );
};