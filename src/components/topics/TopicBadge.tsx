import { Box, BoxProps, CloseButton, LinkProps, Stack, Text } from '@chakra-ui/react';
import { TopicLinkDataFragment } from '../../graphql/topics/topics.fragments.generated';
import { TopicPageInfo } from '../../pages/RoutesPageInfos';
import { PageLink } from '../navigation/InternalLink';

type TopicBadgeColorScheme = 'default' | 'teal';

const sizesMapping = {
  sm: {
    px: '4px',
    pt: '1px',
    pb: '1px',
    fontSize: '12px',
    lineHeight: '14px',
  },
  md: {
    px: '6px',
    py: '3px',
    fontSize: '14px',
  },
};

const badgeStyleProps = (
  topic: TopicLinkDataFragment,
  size: 'md' | 'sm',
  colorScheme: TopicBadgeColorScheme
): LinkProps & BoxProps => ({
  borderRadius: 16,
  fontWeight: 400,
  borderWidth: '1px',
  textAlign: 'center',
  color: colorScheme === 'default' ? 'gray.800' : 'white',
  bgColor: colorScheme === 'default' ? 'white' : 'teal.600',
  borderColor: colorScheme === 'default' ? 'gray.800' : 'teal.600',
  ...sizesMapping[size],
});

interface TopicBadgeProps {
  size?: 'sm' | 'md';
  topic: TopicLinkDataFragment;
  onRemove?: () => void;
  removable?: boolean;
  clickable?: boolean;
  colorScheme?: TopicBadgeColorScheme;
}
export const TopicBadge: React.FC<TopicBadgeProps> = ({
  topic,
  removable,
  onRemove,
  clickable = true,
  size = 'md',
  colorScheme = 'default',
}) => {
  const content = (
    <Stack spacing={1} direction="row" alignItems="center">
      {removable && (
        <CloseButton
          size={size}
          boxSize={{ xs: '16px', sm: '20px', md: '24px' }[size]}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onRemove && onRemove();
          }}
        />
      )}
      <Text textAlign="center" noOfLines={1}>
        {topic.name}
      </Text>
    </Stack>
  );
  return clickable ? (
    <PageLink {...badgeStyleProps(topic, size, colorScheme)} pageInfo={TopicPageInfo(topic)}>
      {content}
    </PageLink>
  ) : (
    <Box {...badgeStyleProps(topic, size, colorScheme)}>{content}</Box>
  );
};
