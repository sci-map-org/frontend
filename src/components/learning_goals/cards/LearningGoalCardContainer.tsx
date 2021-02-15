import { Flex } from '@chakra-ui/react';
import { PropsWithChildren, ReactNode, useRef, useState } from 'react';
import { LearningGoal } from '../../../graphql/types';

interface LearningGoalCardContainerProps<T extends { learningGoal: Pick<LearningGoal, '_id' | '__typename'> }> {
  children(mouseHover: boolean): ReactNode;
}
export const LearningGoalCardContainer = <T extends { learningGoal: Pick<LearningGoal, '_id' | '__typename'> }>({
  children,
}: PropsWithChildren<LearningGoalCardContainerProps<T>>) => {
  const [mouseHover, setMouseHover] = useState(false);
  const ref = useRef<any>(null);
  return (
    <Flex
      ref={ref}
      onMouseOver={() => {
        !mouseHover && setMouseHover(true);
      }}
      onMouseOut={(event) => {
        if (!mouseHover) return;
        const current = ref.current;
        if (current && !current.contains(event.relatedTarget)) {
          setMouseHover(false);
        }
      }}
      w="100%"
      h="100%"
    >
      {children(mouseHover)}
    </Flex>
  );
};
