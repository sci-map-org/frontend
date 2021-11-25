import { Box, BoxProps, CloseButton, LinkProps, Stack, Text } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { TopicPageInfo } from '../../pages/RoutesPageInfos';
import { PageLink } from '../navigation/InternalLink';
import { TopicBadgeDataFragment } from './TopicBadge.generated';

export const TopicBadgeData = gql`
  fragment TopicBadgeData on Topic {
    _id
    key
    name
    # domain {
    #   _id
    #   key
    #   name
    # }
    # known {
    #   level
    # }
  }
`;
interface TopicBadgeProps {
  size?: 'md' | 'sm' | 'xs';
  topic: TopicBadgeDataFragment;
  onRemove?: () => void;
  removable?: boolean;
  clickable?: boolean;
}

const badgeStyleProps = (topic: TopicBadgeDataFragment, size: 'md' | 'sm' | 'xs'): LinkProps & BoxProps => ({
  borderRadius: 11,
  px: { xs: '3px', sm: '4px', md: '6px' }[size],
  // bgColor: topic.known ? 'teal.50' : 'white',
  color: 'gray.800',
  fontWeight: 400,
  borderWidth: '1px',
  borderColor: topic.known ? 'teal.800' : 'gray.800',
  textAlign: 'center',
  fontSize: size,
});
export const TopicBadge: React.FC<TopicBadgeProps> = ({
  topic,
  // domain: domainProp,
  removable,
  onRemove,
  clickable = true,
  size = 'md',
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
    <PageLink {...badgeStyleProps(topic, size)} pageInfo={TopicPageInfo(topic)}>
      {content}
    </PageLink>
  ) : (
    <Box {...badgeStyleProps(topic, size)}>{content}</Box>
  );
};
