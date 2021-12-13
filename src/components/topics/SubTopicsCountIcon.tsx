import { Stack, Text } from "@chakra-ui/layout"
import { Tooltip } from "@chakra-ui/tooltip"
import { TopicIcon } from "../lib/icons/TopicIcon"

interface SubTopicsCountIconProps{
    totalCount: number
    tooltipLabel: string
}

export const SubTopicsCountIcon: React.FC<SubTopicsCountIconProps> = ({totalCount, tooltipLabel}) => {
    return (<Tooltip label={tooltipLabel}>
    <Stack direction="row" spacing="2px"  alignItems="start">
      <Text fontWeight={500} color="gray.700">
        {totalCount}
      </Text>
      <TopicIcon boxSize={5} color="gray.700" />
    </Stack>
  </Tooltip>)
}