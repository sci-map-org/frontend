import { Center, CenterProps } from '@chakra-ui/layout';
import { Tooltip } from '@chakra-ui/tooltip';
import { upperFirst } from 'lodash';
import { LearningGoalType } from '../../graphql/types';
import { ModuleIcon } from '../lib/icons/ModuleIcon';
import { RoadmapIcon } from '../lib/icons/RoadmapIcon';

export const LearningGoalTypeIcon: React.FC<{ type: LearningGoalType; boxSize?: string | number } & CenterProps> = ({
  type,
  boxSize,
  ...centerProps
}) => {
  return (
    <Tooltip
      label={{ [LearningGoalType.Roadmap]: 'Roadmap', [LearningGoalType.SubGoal]: 'Module' }[type]}
      fontSize="sm"
    >
      <Center {...centerProps}>
        {type === LearningGoalType.Roadmap ? <RoadmapIcon boxSize={boxSize} /> : <ModuleIcon boxSize={boxSize} />}
      </Center>
    </Tooltip>
  );
};
