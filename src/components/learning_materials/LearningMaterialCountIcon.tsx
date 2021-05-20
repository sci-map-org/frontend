import { Stack, Text } from '@chakra-ui/layout';
import { Tooltip } from '@chakra-ui/tooltip';
import { ResourceSeriesIcon } from '../lib/icons/ResourceSeriesIcon';

export const LearningMaterialCountIcon: React.FC<{ totalCount: number; tooltipLabel: string }> = ({
  totalCount,
  tooltipLabel,
}) => {
  return (
    <Tooltip label={tooltipLabel}>
      <Stack direction="row" spacing="2px" alignItems="start">
        <Text fontWeight={500} color="gray.700">
          {totalCount}
        </Text>
        <ResourceSeriesIcon boxSize={6} color="gray.700" />
      </Stack>
    </Tooltip>
  );
};
